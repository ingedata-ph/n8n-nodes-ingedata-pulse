import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { OrganizationsApi } from '../../../utils/api/OrganizationsApi';
import { log } from 'console';

export async function createPeopleDirectory(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: OrganizationsApi,
): Promise<any> {
  const personId = executeFunctions.getNodeParameter('person_id', itemIndex) as string;
  const organizationId = executeFunctions.getNodeParameter('organization_id', itemIndex) as string;
  const tag = executeFunctions.getNodeParameter('tag', itemIndex) as string;
  const position = executeFunctions.getNodeParameter('position', itemIndex) as string;
  
  // Get other_contacts as a collection of key-value pairs
  const otherContactsCollection = executeFunctions.getNodeParameter('otherContactsUi.otherContactsValues', itemIndex, []) as IDataObject[];
  const otherContacts: IDataObject = {};
  
  // Convert the collection to an object with dynamic keys
  if (otherContactsCollection && otherContactsCollection.length > 0) {
    for (const contact of otherContactsCollection) {
      if (contact.key && contact.value) {
        otherContacts[contact.key as string] = contact.value;
      }
    }
  }
  
  const projectIds = (executeFunctions.getNodeParameter('project_ids', itemIndex, '') as string)
    .split(',')
    .map(id => parseInt(id.trim(), 10))
    .filter(id => !Number.isNaN(id));
 
  const peopleDirectoryData = {
    data: {
      type: "iam/organizations/people_directories",
      attributes: {
        tag,
        position,
        project_ids: projectIds,
        other_contacts: otherContacts
      },
      relationships: {
        person: {
          data: {
            type: "iam/people",
            id: personId
          }
        },
        organization: {
          data: {
            type: "iam/organizations",
            id: organizationId
          }
        }
      }
    }
  };
  
  return pulseApi.createPeopleDirectory(peopleDirectoryData);
}

export async function updatePeopleDirectory(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: OrganizationsApi,
): Promise<any> {
  const peopleDirectoryId = executeFunctions.getNodeParameter('peopleDirectoryId', itemIndex) as string;
  const tag = executeFunctions.getNodeParameter('tag', itemIndex) as string;
  const position = executeFunctions.getNodeParameter('position', itemIndex) as string;
  const personId = executeFunctions.getNodeParameter('person_id', itemIndex) as string;
  const organizationId = executeFunctions.getNodeParameter('organization_id', itemIndex) as string;
  
  // Get other_contacts as a collection of key-value pairs
  const otherContactsCollection = executeFunctions.getNodeParameter('otherContactsUi.otherContactsValues', itemIndex, []) as IDataObject[];
  const otherContacts: IDataObject = {};
  
  // Convert the collection to an object with dynamic keys
  if (otherContactsCollection && otherContactsCollection.length > 0) {
    for (const contact of otherContactsCollection) {
      if (contact.key && contact.value) {
        otherContacts[contact.key as string] = contact.value;
      }
    }
  }
  
  const projectIds = (executeFunctions.getNodeParameter('project_ids', itemIndex, '') as string)
    .split(',')
    .map(id => id.trim())
    .filter(id => id !== '');
  
  const peopleDirectoryData = {
    data: {
      type: "iam/organizations/people_directories",
      id: peopleDirectoryId,
      attributes: {
        tag,
        position,
        project_ids: projectIds,
        other_contacts: otherContacts
      },
      relationships: {
        person: {
          data: {
            type: "iam/people",
            id: personId
          }
        },
        organization: {
          data: {
            type: "iam/organizations",
            id: organizationId
          }
        }
      }
    }
  };
  
  return pulseApi.updatePeopleDirectory(peopleDirectoryId, peopleDirectoryData);
}

export async function deletePeopleDirectory(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: OrganizationsApi,
): Promise<any> {
  const peopleDirectoryId = executeFunctions.getNodeParameter('peopleDirectoryId', itemIndex) as string;
  return pulseApi.deletePeopleDirectory(peopleDirectoryId);
}

export async function getPeopleDirectoryById(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: OrganizationsApi,
): Promise<any> {
  const peopleDirectoryId = executeFunctions.getNodeParameter('peopleDirectoryId', itemIndex) as string;
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  
  return pulseApi.getPeopleDirectoryById(peopleDirectoryId, included);
}

export async function listPeopleDirectories(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: OrganizationsApi,
): Promise<any> {
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  const additionalFields = executeFunctions.getNodeParameter('additionalFields', itemIndex, {}) as {
    sort?: string;
    pageNumber?: number;
    pageSize?: number;
    filters?: { filter: Array<{ key: string; values: string }> };
    fields?: { field: Array<{ key: string; fields: string }> };
  };
  
  return pulseApi.listPeopleDirectories(additionalFields, included);
}
