import { IExecuteFunctions } from 'n8n-workflow';
import { WorkflowApi } from '../../../utils/api/WorkflowApi';

export async function getProjectDataList(
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
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  return pulseApi.getProjectDataList(additionalFields, included);
}

export async function createProjectData(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: WorkflowApi,
): Promise<any> {
  const key = executeFunctions.getNodeParameter('key', itemIndex) as string;
  const value = executeFunctions.getNodeParameter('value', itemIndex) as string;
  const label = executeFunctions.getNodeParameter('label', itemIndex) as string;
  const project_id = executeFunctions.getNodeParameter('projectId', itemIndex) as string;
  
  const projectDataObj = {
    data: {
      type: 'workflow/project/data',
      attributes: {
        key,
        value,
        label,
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
    return await pulseApi.createProjectData(projectDataObj);
  } catch (error) {
    throw new Error('Error creating project data: ' + (error as Error).message);
  }
}

export async function updateProjectData(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: WorkflowApi,
): Promise<any> {
  const dataId = executeFunctions.getNodeParameter('dataId', itemIndex) as string;
  const key = executeFunctions.getNodeParameter('key', itemIndex) as string;
  const value = executeFunctions.getNodeParameter('value', itemIndex) as string;
  const label = executeFunctions.getNodeParameter('label', itemIndex) as string;
  
  const projectDataObj = {
    data: {
      type: 'workflow/project/data',
      id: dataId,
      attributes: {
        key,
        value,
        label,
      },
    },
  };

  try {
    return await pulseApi.updateProjectData(dataId, projectDataObj);
  } catch (error) {
    throw new Error('Error updating project data: ' + (error as Error).message);
  }
}

export async function updateProjectDataVisibility(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: WorkflowApi,
): Promise<any> {
  const dataId = executeFunctions.getNodeParameter('dataId', itemIndex) as string;
  const visible = executeFunctions.getNodeParameter('is_visible', itemIndex) as boolean;
  
  const projectDataObj = {
    data: {
      type: 'workflow/project/data',
      id: dataId,
      attributes: {
        visible,
      },
    },
  };

  try {
    return await pulseApi.updateProjectData(dataId, projectDataObj);
  } catch (error) {
    throw new Error('Error updating project data: ' + (error as Error).message);
  }
}
