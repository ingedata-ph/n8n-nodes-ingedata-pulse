import { IExecuteFunctions } from 'n8n-workflow';
import { WorkflowApi } from '../../../utils/api/WorkflowApi';

export async function getProjectList(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: WorkflowApi,
): Promise<any> {
  const additionalFields = executeFunctions.getNodeParameter('additionalFields', itemIndex, {}) as {
    sort?: string;
    pageNumber?: number;
    pageSize?: number;
    filters?: { filter: Array<{ key: string; values: string }> };
    fields?: { field: Array<{ key: string; fields: string }> };
  };
  return pulseApi.getProjectList(additionalFields);
}

export async function createProject(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: WorkflowApi,
): Promise<any> {
  const name = executeFunctions.getNodeParameter('name', itemIndex) as string;
  const organizational_unit = executeFunctions.getNodeParameter('organizationalUnit', itemIndex) as string;
  const organization_id = executeFunctions.getNodeParameter('organizationId', itemIndex) as string;
  
  // Get project definition
  const definition = executeFunctions.getNodeParameter('projectDefinition', itemIndex, '') as string;
  
  const projectData = {
    data: {
      type: 'workflow/projects',
      attributes: {
        name,
        organizational_unit,
        organization_id,
        definition,
      }
    }
  };

  try {
    return await pulseApi.createProject(projectData);
  } catch (error) {
    throw new Error('Error creating project: ' + (error as Error).message);
  }
}

export async function updateProject(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: WorkflowApi,
): Promise<any> {
  const projectId = executeFunctions.getNodeParameter('projectId', itemIndex) as string;
  const name = executeFunctions.getNodeParameter('name', itemIndex) as string;
  
  const projectData = {
    data: {
      type: 'workflow/projects',
      id: projectId,
      attributes: {
        name,
      }
    }
  };

  try {
    return await pulseApi.updateProject(projectId, projectData);
  } catch (error) {
    throw new Error('Error updating project: ' + (error as Error).message);
  }
}

export async function updateProjectStatus(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: WorkflowApi,
): Promise<any> {
  const projectId = executeFunctions.getNodeParameter('projectId', itemIndex) as string;
  const status = executeFunctions.getNodeParameter('status', itemIndex) as boolean;
  
  const statusData = {
    data: {
      type: 'workflow/projects',
      id: projectId,
      attributes: {
        enabled: status,
      }
    }
  };

  try {
    return await pulseApi.updateProjectStatus(projectId, statusData);
  } catch (error) {
    throw new Error('Error updating project status: ' + (error as Error).message);
  }
}
