import { IExecuteFunctions, NodeParameterValue } from 'n8n-workflow';
import { WorkflowApi } from '../../../utils/api/WorkflowApi';

export async function getProjectDocumentList(
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
  return pulseApi.getProjectDocumentList(additionalFields);
}

export async function createProjectDocument(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: WorkflowApi,
): Promise<any> {
  const name = executeFunctions.getNodeParameter('name', itemIndex) as string;
  const category = executeFunctions.getNodeParameter('category', itemIndex) as string;
  const url = executeFunctions.getNodeParameter('url', itemIndex) as string;
  const project_id = executeFunctions.getNodeParameter('projectId', itemIndex) as string;
  
  // Get rights (can be a comma-separated string or an array of strings)
  const rightsInput = executeFunctions.getNodeParameter('rights', itemIndex) as NodeParameterValue;
  let rights: string[] = [];
  
  if (Array.isArray(rightsInput)) {
    rights = rightsInput.map(item => String(item));
  } else if (typeof rightsInput === 'string') {
    rights = rightsInput.split(',').map(right => right.trim()).filter(right => right !== '');
  }
  
  const documentData = {
    data: {
      type: 'workflow/project/documents',
      attributes: {
        name,
        category,
        url,
        rights,
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
    return await pulseApi.createProjectDocument(documentData);
  } catch (error) {
    throw new Error('Error creating project document: ' + (error as Error).message);
  }
}

export async function updateProjectDocument(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: WorkflowApi,
): Promise<any> {
  const documentId = executeFunctions.getNodeParameter('documentId', itemIndex) as string;
  const name = executeFunctions.getNodeParameter('name', itemIndex) as string;
  const category = executeFunctions.getNodeParameter('category', itemIndex) as string;
  const project_id = executeFunctions.getNodeParameter('projectId', itemIndex) as string;
  
  // Get rights (can be a comma-separated string or an array of strings)
  const rightsInput = executeFunctions.getNodeParameter('rights', itemIndex) as NodeParameterValue;
  let rights: string[] = [];
  
  if (Array.isArray(rightsInput)) {
    rights = rightsInput.map(item => String(item));
  } else if (typeof rightsInput === 'string') {
    rights = rightsInput.split(',').map(right => right.trim()).filter(right => right !== '');
  }
  
  const documentData = {
    data: {
      type: 'workflow/project/documents',
      id: documentId,
      attributes: {
        name,
        category,
        rights,
        url: '', // URL is not updatable so just mock it.
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
    return await pulseApi.updateProjectDocument(documentId, documentData);
  } catch (error) {
    throw new Error('Error updating project document: ' + (error as Error).message);
  }
}

export async function deleteProjectDocument(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: WorkflowApi,
): Promise<any> {
  const documentId = executeFunctions.getNodeParameter('documentId', itemIndex) as string;

  try {
    return await pulseApi.deleteProjectDocument(documentId);
  } catch (error) {
    throw new Error('Error deleting project document: ' + (error as Error).message);
  }
}

export async function getProjectDocumentUrl(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: WorkflowApi,
): Promise<any> {
  const documentId = executeFunctions.getNodeParameter('documentId', itemIndex) as string;

  try {
    const document = await pulseApi.getProjectDocument(documentId);

    const url = document.data.attributes.url;

    return {
      data: {
        url,
      },
    };
  } catch (error) {
    throw new Error('Error getting project document URL: ' + (error as Error).message);
  }
}
