import { IExecuteFunctions } from 'n8n-workflow';
import { TalentApi } from '../../../utils/api/TalentApi';
import { PulseApiFactory } from '../../../utils/api/PulseApiFactory';

export async function getTalentList(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: TalentApi,
): Promise<any> {
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  const additionalFields = executeFunctions.getNodeParameter('additionalFields', 0, {}) as {
    sort?: string;
    pageNumber?: number;
    pageSize?: number;
    filters?: { filter: Array<{ key: string; values: string }> };
    fields?: { field: Array<{ key: string; fields: string }> };
  };
  return pulseApi.getTalentList(additionalFields, included);
}

export async function createTalent(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: TalentApi,
): Promise<any> {
  const fromResume = executeFunctions.getNodeParameter('fromResume', itemIndex) as boolean;
  
  if (fromResume) {
    const organizationalUnit = executeFunctions.getNodeParameter('organizationalUnit', itemIndex, '') as string;
    const resumeUrl = executeFunctions.getNodeParameter('resumeUrl', itemIndex) as string;
    const mimeType = executeFunctions.getNodeParameter('mimeType', itemIndex) as string;

    return pulseApi.createTalentFromResume(resumeUrl, organizationalUnit, mimeType);
  } else {
    let person_id: string;
    const newPerson = executeFunctions.getNodeParameter('newPerson', itemIndex) as boolean;
    if (newPerson) {
      const PeopleApi = await PulseApiFactory.getPulseApiHelper(executeFunctions, 'people') as any;
      const first_name = executeFunctions.getNodeParameter('firstName', itemIndex) as string;
      const last_name = executeFunctions.getNodeParameter('lastName', itemIndex) as string;
      const middle_name = executeFunctions.getNodeParameter('middleName', itemIndex, '') as string;
      const organizational_unit = executeFunctions.getNodeParameter('organizationalUnit', itemIndex) as string;
      const picture_url = executeFunctions.getNodeParameter('pictureUrl', itemIndex, '') as string;
      const gender = executeFunctions.getNodeParameter('gender', itemIndex) as string;
      const relationship_status = executeFunctions.getNodeParameter('relationshipStatus', itemIndex) as string;
      const birthday = executeFunctions.getNodeParameter('birthday', itemIndex, '') as string;
      const secondary_email = executeFunctions.getNodeParameter('secondaryEmail', itemIndex, '') as string;
      const number_of_kids = executeFunctions.getNodeParameter('numberOfKids', itemIndex, 0) as number;
      const contact_number = executeFunctions.getNodeParameter('contactNumber', itemIndex, '') as string;
      const address = executeFunctions.getNodeParameter('address', itemIndex, '') as string;

      const personData = {
        data: {
          type: "iam/people",
          attributes: {
            first_name,
            last_name,
            middle_name,
            organizational_unit,
            picture_url,
            gender,
            relationship_status,
            birthday,
            secondary_email,
            number_of_kids,
            contact_number,
            address,
          },
        }
      };

      try {
        const person = await PeopleApi.createPerson(personData);
        person_id = person.data.id;
      } catch (error) {
        throw new Error('Error creating person: ' + (error as Error).message);
      }
    } else {
      // Use existing person ID
      person_id = executeFunctions.getNodeParameter('personId', itemIndex) as string;
    }
    // Create talent data
    const talentData = {
      data: {
        type: "talent/talents",
        attributes: {
          id: person_id
        },
      }
    };
    
    return pulseApi.createTalent(talentData);
  }
}

export async function getTalentById(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: TalentApi,
): Promise<any> {
  const talentId = executeFunctions.getNodeParameter('talentId', itemIndex) as string;
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  return pulseApi.getTalentById(talentId, included);
}

export async function queryTalent(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: TalentApi,
): Promise<any> {
  const queryPrompt = executeFunctions.getNodeParameter('queryPrompt', itemIndex) as string;

  const queryData = {
    data: {
      type: "talent/queries",
      attributes: {
        prompt: queryPrompt
      }
    }
  };
  return pulseApi.queryTalent(queryData);
}

// export async function updateTalent(
//   executeFunctions: IExecuteFunctions,
//   itemIndex: number,
//   pulseApi: TalentApi,
// ): Promise<any> {
//   const talentId = executeFunctions.getNodeParameter('talentId', itemIndex) as string;
//   const person_id = executeFunctions.getNodeParameter('personId', itemIndex) as string;
  
//   const talentData = {
//     data: {
//       type: "iam/talents",
//       id: talentId,
//       attributes: {},
//       relationships: {
//         person: {
//           data: {
//             type: "iam/people",
//             id: person_id
//           }
//         }
//       }
//     }
//   };
  
//   return pulseApi.updateTalentById(talentId, talentData);
// }
