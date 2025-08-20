import { IExecuteFunctions } from 'n8n-workflow';
import { PeopleApi } from '../../../utils/api/PeopleApi';

export async function getPersonDocumentList(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: PeopleApi,
): Promise<any> {
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  const additionalFields = executeFunctions.getNodeParameter('additionalFields', itemIndex, {}) as {
    sort?: string;
    pageNumber?: number;
    pageSize?: number;
    filters?: { filter: Array<{ key: string; values: string }> };
    fields?: { field: Array<{ key: string; fields: string }> };
  };

  return pulseApi.getPersonDocumentList(additionalFields, included);
}

export async function createPersonDocument(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: PeopleApi,
): Promise<any> {
  const personId = executeFunctions.getNodeParameter('personId', itemIndex) as number;
  const document_type = executeFunctions.getNodeParameter('documentType', itemIndex) as string;
  const url = executeFunctions.getNodeParameter('url', itemIndex, '') as string;
  const name = executeFunctions.getNodeParameter('name', itemIndex, '') as string;
  const number = executeFunctions.getNodeParameter('number', itemIndex, '') as string;
  const issued_place = executeFunctions.getNodeParameter('issuedPlace', itemIndex, '') as string;
  const issued_date = executeFunctions.getNodeParameter('issuedDate', itemIndex, '') as string;
  const expiration_date = executeFunctions.getNodeParameter('expirationDate', itemIndex, '') as string;

  const attributes: any = {
    document_type,
  };

  if (url) attributes.url = url;
  if (name) attributes.name = name;
  if (number) attributes.number = number;
  if (issued_place) attributes.issued_place = issued_place;
  if (issued_date) attributes.issued_date = new Date(issued_date).toISOString().split('T')[0];
  if (expiration_date) attributes.expiration_date = new Date(expiration_date).toISOString().split('T')[0];

  const personDocumentData = {
    data: {
      type: "iam/person_documents",
      attributes,
      relationships: {
        person: {
          data: {
            type: "iam/persons",
            id: personId.toString(),
          }
        }
      }
    }
  };

  return pulseApi.createPersonDocument(personDocumentData);
}

export async function updatePersonDocument(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: PeopleApi,
): Promise<any> {
  const personDocumentId = executeFunctions.getNodeParameter('personDocumentId', itemIndex) as string;
  const updateFields = executeFunctions.getNodeParameter('updateFields', itemIndex, {}) as {
    documentType?: string;
    url?: string;
    name?: string;
    number?: string;
    issuedPlace?: string;
    issuedDate?: string;
    expirationDate?: string;
  };

  const attributes = {} as any;

  if (updateFields.documentType) {
    attributes['document_type'] = updateFields.documentType;
  }
  if (updateFields.url !== undefined) {
    attributes['url'] = updateFields.url;
  }
  if (updateFields.name !== undefined) {
    attributes['name'] = updateFields.name;
  }
  if (updateFields.number !== undefined) {
    attributes['number'] = updateFields.number;
  }
  if (updateFields.issuedPlace !== undefined) {
    attributes['issued_place'] = updateFields.issuedPlace;
  }
  if (updateFields.issuedDate) {
    attributes['issued_date'] = new Date(updateFields.issuedDate).toISOString().split('T')[0];
  }
  if (updateFields.expirationDate) {
    attributes['expiration_date'] = new Date(updateFields.expirationDate).toISOString().split('T')[0];
  }

  const personDocumentData = {
    data: {
      type: "iam/person_documents",
      id: personDocumentId,
      attributes: attributes,
    }
  };

  if (Object.keys(attributes).length === 0) {
    throw new Error('No fields to update');
  }

  return pulseApi.updatePersonDocument(personDocumentId, personDocumentData);
}

export async function deletePersonDocument(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: PeopleApi,
): Promise<any> {
  const personDocumentId = executeFunctions.getNodeParameter('personDocumentId', itemIndex) as string;

  return pulseApi.deletePersonDocument(personDocumentId);
}
