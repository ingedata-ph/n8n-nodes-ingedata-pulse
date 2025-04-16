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

export async function getTalentById(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: TalentApi,
): Promise<any> {
  const talentId = executeFunctions.getNodeParameter('talentId', itemIndex) as string;
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  return pulseApi.getTalentById(talentId, included);
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
