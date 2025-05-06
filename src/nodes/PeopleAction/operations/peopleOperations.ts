import { IExecuteFunctions } from 'n8n-workflow';
import { PeopleApi } from '../../../utils/api/PeopleApi';

export async function getPeopleList(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: PeopleApi,
): Promise<any> {
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  const additionalFields = executeFunctions.getNodeParameter('additionalFields', itemIndex, {}) as {
    operation?: string[];
    inputs?: object;
    sort?: string;
    pageNumber?: number;
    pageSize?: number;
    filters?: { filter: Array<{ key: string; values: string }> };
    fields?: { field: Array<{ key: string; fields: string }> };
  };

  return pulseApi.getPeopleList(additionalFields, included);
}

export async function createPerson(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: PeopleApi,
): Promise<any> {
  const first_name = executeFunctions.getNodeParameter('firstName', itemIndex) as string;
  const last_name = executeFunctions.getNodeParameter('lastName', itemIndex) as string;
  const middle_name = executeFunctions.getNodeParameter('middleName', itemIndex) as string;
  const gender = executeFunctions.getNodeParameter('gender', itemIndex) as string;
  const birthday = executeFunctions.getNodeParameter('birthday', itemIndex) as string;
  const relationship_status = executeFunctions.getNodeParameter('relationshipStatus', itemIndex) as string;
  const number_of_kids = executeFunctions.getNodeParameter('numberOfKids', itemIndex) as number;
  const secondary_email = executeFunctions.getNodeParameter('secondaryEmail', itemIndex) as string;
  const contact_number = executeFunctions.getNodeParameter('contactNumber', itemIndex) as string;
  const physical_address = executeFunctions.getNodeParameter('address', itemIndex) as string;
  const organizational_unit = executeFunctions.getNodeParameter('organizationalUnit', itemIndex) as string;
  
  const personData = {
    data: {
      type: "iam/people",
      attributes: {
        first_name,
        last_name,
        middle_name,
        gender,
        birthday,
        relationship_status,
        number_of_kids,
        secondary_email,
        contact_number,
        physical_address,
        organizational_unit,
      }
    }
  };
  
  return pulseApi.createPerson(personData);
}

export async function getPersonById(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: PeopleApi,
): Promise<any> {
  const personId = executeFunctions.getNodeParameter('personId', itemIndex) as string;
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  return pulseApi.getPersonById(personId, included);
}

export async function updatePerson(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: PeopleApi,
): Promise<any> {
  const personId = executeFunctions.getNodeParameter('personId', itemIndex) as string;

  const first_name = executeFunctions.getNodeParameter('firstName', itemIndex) as string;
  const last_name = executeFunctions.getNodeParameter('lastName', itemIndex) as string;
  const middle_name = executeFunctions.getNodeParameter('middleName', itemIndex) as string;
  const gender = executeFunctions.getNodeParameter('gender', itemIndex) as string;
  const birthday = executeFunctions.getNodeParameter('birthday', itemIndex) as string;
  const relationship_status = executeFunctions.getNodeParameter('relationshipStatus', itemIndex) as string;
  const number_of_kids = executeFunctions.getNodeParameter('numberOfKids', itemIndex) as number;
  const secondary_email = executeFunctions.getNodeParameter('secondaryEmail', itemIndex) as string;
  const contact_number = executeFunctions.getNodeParameter('contactNumber', itemIndex) as string;
  const physical_address = executeFunctions.getNodeParameter('address', itemIndex) as string;
  const organizational_unit = executeFunctions.getNodeParameter('organizationalUnit', itemIndex) as string;
  
  const personData = {
    data: {
      type: "iam/people",
      id: personId,
      attributes: {
        first_name,
        last_name,
        middle_name,
        gender,
        birthday,
        relationship_status,
        number_of_kids,
        secondary_email,
        contact_number,
        physical_address,
        organizational_unit,
      }
    }
  };
  
  return pulseApi.updatePersonById(personId, personData);
}
