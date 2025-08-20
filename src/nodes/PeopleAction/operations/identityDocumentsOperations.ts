import { IExecuteFunctions } from 'n8n-workflow';
import { PeopleApi } from '../../../utils/api/PeopleApi';

export async function getIdentityDocumentList(
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

  return pulseApi.getIdentityDocumentList(additionalFields, included);
}

export async function createIdentityDocument(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: PeopleApi,
): Promise<any> {
  const personId = executeFunctions.getNodeParameter('personId', itemIndex) as string;
  const identification_type = executeFunctions.getNodeParameter('identityDocumentType', itemIndex) as string;
  const number = executeFunctions.getNodeParameter('identityDocumentNumber', itemIndex) as string;
  const issued_place = executeFunctions.getNodeParameter('issuePlace', itemIndex) as string;
  const issued_date = executeFunctions.getNodeParameter('issueDate', itemIndex) as string;
  const expiration_date = executeFunctions.getNodeParameter('expirationDate', itemIndex) as string;


  const identityDocumentData = {
    data: {
      type: "iam/identity_documents",
      attributes: {
        identification_type,
        number,
        issued_place,
        issued_date: issued_date ? new Date(issued_date).toISOString() : undefined,
        expiration_date: expiration_date ? new Date(expiration_date).toISOString() : undefined,
      },
      relationships: {
        person: {
          data: {
            type: "iam/people",
            id: personId,
          }
        }
      }
    }
  };

  return pulseApi.createIdentityDocument(identityDocumentData);
}

export async function getIdentityDocumentById(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: PeopleApi,
): Promise<any> {
  const identityDocumentId = executeFunctions.getNodeParameter('identityDocumentId', itemIndex) as string;
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  return pulseApi.getIdentityDocumentById(identityDocumentId, included);
}

export async function updateIdentityDocument(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: PeopleApi,
): Promise<any> {
  const identityDocumentId = executeFunctions.getNodeParameter('identityDocumentId', itemIndex) as string;
  const updateFields = executeFunctions.getNodeParameter('updateFields', itemIndex, {}) as {
    identityDocumentType: string;
    identityDocumentNumber?: string;
    issuedPlace?: string;
    issuedDate?: string;
    expirationDate?: string;
  };

  const attributes = {} as any;
  if (updateFields.identityDocumentType) {
    attributes['identification_type'] = updateFields.identityDocumentType;
  }

  if (updateFields.identityDocumentNumber) {
    attributes['number'] = updateFields.identityDocumentNumber;
  }
  if (updateFields.issuedPlace) {
    attributes['issued_place'] = updateFields.issuedPlace;
  }
  if (updateFields.issuedDate) {
    attributes['issued_date'] = new Date(updateFields.issuedDate).toISOString();
  }
  if (updateFields.expirationDate) {
    attributes['expiration_date'] = new Date(updateFields.expirationDate).toISOString();
  }

  const identityDocumentData = {
    data: {
      type: "iam/identity_documents",
      id: identityDocumentId,
      attributes: attributes,
    }
  };

  if (Object.keys(attributes).length === 0) {
    throw new Error('No fields to update');
  }

  return pulseApi.updateIdentityDocument(identityDocumentId, identityDocumentData);
}
