import { IExecuteFunctions } from 'n8n-workflow';
import { TalentApi } from '../../../utils/api/TalentApi';

export async function getTalentList(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: TalentApi,
): Promise<any> {
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  return pulseApi.getTalentList(included);
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
    const person_id = executeFunctions.getNodeParameter('personId', itemIndex) as string;

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
