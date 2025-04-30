import { IExecuteFunctions } from 'n8n-workflow';
import { WorkflowApi } from '../../../utils/api/WorkflowApi';

export async function getProjectWorkUnitList(
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
  return pulseApi.getProjectWorkUnitList(additionalFields);
}

export async function createProjectWorkUnit(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: WorkflowApi,
): Promise<any> {
  const project_id = executeFunctions.getNodeParameter('projectId', itemIndex) as string;
  const name = executeFunctions.getNodeParameter('name', itemIndex, '') as string;
  
  const workUnitData = {
    data: {
      type: 'workflow/work_units',
      attributes: {
        ...(name !== '' && { name }),
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
    return await pulseApi.createProjectWorkUnit(workUnitData);
  } catch (error) {
    throw new Error('Error creating project work unit: ' + (error as Error).message);
  }
}

export async function cancelProjectWorkUnit(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: WorkflowApi,
): Promise<any> {
  const workUnitId = executeFunctions.getNodeParameter('workUnitId', itemIndex) as string;

  try {
    return await pulseApi.cancelProjectWorkUnit(workUnitId);
  } catch (error) {
    throw new Error('Error canceling project work unit: ' + (error as Error).message);
  }
}
