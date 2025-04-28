import { IExecuteFunctions } from 'n8n-workflow';
import { RecruitmentApi } from '../../../utils/api/RecruitmentApi';
import { PulseApiFactory } from '../../../utils/api/PulseApiFactory';
import { PeopleApi } from '../../../utils/api/PeopleApi';

export async function getCandidatesList(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: RecruitmentApi,
): Promise<any> {
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  const additionalFields = executeFunctions.getNodeParameter('additionalFields', itemIndex, {}) as {
    sort?: string;
    pageNumber?: number;
    pageSize?: number;
    filters?: { filter: Array<{ key: string; values: string }> };
    fields?: { field: Array<{ key: string; fields: string }> };
  };

  return pulseApi.getCandidatesList(additionalFields, included);
}

export async function createCandidate(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: RecruitmentApi,
): Promise<any> {
  const newPerson = executeFunctions.getNodeParameter('newPerson', itemIndex) as boolean;
  const PeopleApi = await PulseApiFactory.getPulseApiHelper(executeFunctions, 'people') as any;
  let personId: string;
  let personData: any = {};
  let person: any;

  if (newPerson) {
    // Get person data from the node parameters
    const first_name = executeFunctions.getNodeParameter('firstName', itemIndex) as string;
    const last_name = executeFunctions.getNodeParameter('lastName', itemIndex) as string;
    const middle_name = executeFunctions.getNodeParameter('middleName', itemIndex, '') as string;
    const organizational_unit = executeFunctions.getNodeParameter('organizationalUnit', itemIndex) as string;
    const picture_url = executeFunctions.getNodeParameter('pictureUrl', itemIndex, '') as string;

    personData = {
      first_name,
      last_name,
      middle_name,
      organizational_unit,
      picture_url,
    };

    try {
      person = await PeopleApi.createPerson(personData);
      personId = person.data.id;
    } catch (error) {
      throw new Error('Error creating person: ' + (error as Error).message);
    }

  } else {
    // Use existing person ID
    personId = executeFunctions.getNodeParameter('personId', itemIndex) as string;
    person = await PeopleApi.getPersonById(personId);
    if (!person) {
      throw new Error(`Person with ID ${personId} not found`);
    }

    personData = {
      first_name: person.data.attributes.first_name,
      last_name: person.data.attributes.last_name,
      middle_name: person.data.attributes.middle_name,
      organizational_unit: person.data.attributes.organizational_unit,
      picture_url: person.data.attributes.picture_url,
    };
  }

  const candidateData = {
    data: {
      type: "recruitment/candidates",
      attributes: {
        id: personId,
        ...personData,
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

  return pulseApi.createCandidate(candidateData);
}

export async function getCandidateById(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: RecruitmentApi,
): Promise<any> {
  const candidateId = executeFunctions.getNodeParameter('candidateId', itemIndex) as string;
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  return pulseApi.getCandidateById(candidateId, included);
}

export async function updateCandidate(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: RecruitmentApi,
): Promise<any> {
  const candidateId = executeFunctions.getNodeParameter('candidateId', itemIndex) as string;
  const PeopleApi = await PulseApiFactory.getPulseApiHelper(executeFunctions, 'people') as any;

  const first_name = executeFunctions.getNodeParameter('firstName', itemIndex) as string;
  const last_name = executeFunctions.getNodeParameter('lastName', itemIndex) as string;
  const middle_name = executeFunctions.getNodeParameter('middleName', itemIndex, '') as string;
  const organizational_unit = executeFunctions.getNodeParameter('organizationalUnit', itemIndex) as string;
  const picture_url = executeFunctions.getNodeParameter('pictureUrl', itemIndex, '') as string;

  const personData = {
    first_name,
    last_name,
    middle_name,
    organizational_unit,
    picture_url,
  };

  // updating candidates details is equivalent to updating person details
  // so we just need to update the person details
  const candidateData = {
    data: {
      type: "iam/people",
      id: candidateId,
      attributes: {
        ...personData,
      }
    }
  };

  await PeopleApi.updatePersonById(candidateId, candidateData);
  // Now just return the candidate details
  return pulseApi.getCandidateById(candidateId);
}
