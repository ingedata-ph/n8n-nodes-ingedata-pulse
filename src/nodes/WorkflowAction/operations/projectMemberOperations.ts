import { IExecuteFunctions, NodeParameterValue } from 'n8n-workflow';
import { WorkflowApi } from '../../../utils/api/WorkflowApi';

export async function getProjectMemberList(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: WorkflowApi,
): Promise<any> {
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  const additionalFields = executeFunctions.getNodeParameter('additionalFields', itemIndex, {}) as {
    sort?: string;
    pageNumber?: number;
    pageSize?: number;
    filters?: { filter: Array<{ key: string; values: string }> };
    fields?: { field: Array<{ key: string; fields: string }> };
  };
  return pulseApi.getProjectMemberList(additionalFields, included);
}

export async function createProjectMember(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: WorkflowApi,
): Promise<any> {
  const account_id = executeFunctions.getNodeParameter('accountId', itemIndex) as string;
  const project_id = executeFunctions.getNodeParameter('projectId', itemIndex) as string;
  const isManager = executeFunctions.getNodeParameter('isManager', itemIndex, false) as boolean;
  
  // Get actor roles (can be a comma-separated string or an array of strings)
  const actorRolesInput = executeFunctions.getNodeParameter('actorRoles', itemIndex) as NodeParameterValue;
  let actor_roles: string[] = [];
  
  if (Array.isArray(actorRolesInput)) {
    actor_roles = actorRolesInput.map(item => String(item));
  } else if (typeof actorRolesInput === 'string') {
    actor_roles = actorRolesInput.split(',').map(role => role.trim()).filter(role => role !== '');
  }
  
  const memberData = {
    data: {
      type: 'workflow/project/members',
      attributes: {
        is_supervisor: isManager,
        account_id,
        actor_roles,
      },
      relationships: {
        project: {
          data: {
            type: 'workflow/projects',
            id: project_id,
          },
        },
      },
    },
  };

  try {
    return await pulseApi.createProjectMember(memberData);
  } catch (error) {
    throw new Error('Error creating project member: ' + (error as Error).message);
  }
}

export async function updateProjectMember(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: WorkflowApi,
): Promise<any> {
  const memberId = executeFunctions.getNodeParameter('memberId', itemIndex) as string;
  const isManager = executeFunctions.getNodeParameter('isManager', itemIndex) as boolean;
  
  // Get actor roles (can be a comma-separated string or an array of strings)
  const actorRolesInput = executeFunctions.getNodeParameter('actorRoles', itemIndex) as NodeParameterValue;
  let actor_roles: string[] = [];
  
  if (Array.isArray(actorRolesInput)) {
    actor_roles = actorRolesInput.map(item => String(item));
  } else if (typeof actorRolesInput === 'string') {
    actor_roles = actorRolesInput.split(',').map(role => role.trim()).filter(role => role !== '');
  }
  
  const memberData = {
    data: {
      type: 'workflow/project/members',
      id: memberId,
      attributes: {
        is_supervisor: isManager,
        actor_roles,
      },
    },
  };

  try {
    return await pulseApi.updateProjectMember(memberId, memberData);
  } catch (error) {
    throw new Error('Error updating project member: ' + (error as Error).message);
  }
}

export async function deleteProjectMember(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: WorkflowApi,
): Promise<any> {
  const memberId = executeFunctions.getNodeParameter('memberId', itemIndex) as string;

  try {
    return await pulseApi.deleteProjectMember(memberId);
  } catch (error) {
    throw new Error('Error deleting project member: ' + (error as Error).message);
  }
}
