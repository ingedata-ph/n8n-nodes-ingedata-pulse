import { IExecuteFunctions } from 'n8n-workflow';
import { TalentApi } from '../../../utils/api/TalentApi';

export async function getEducationList(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: TalentApi,
): Promise<any> {
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  const additionalFields = executeFunctions.getNodeParameter('additionalFields', itemIndex, {}) as object;
  return pulseApi.getEducationList(additionalFields, included);
}

export async function createEducation(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: TalentApi,
): Promise<any> {
  const talentId = executeFunctions.getNodeParameter('talentId', itemIndex) as string;
  const educationName = executeFunctions.getNodeParameter('educationName', itemIndex) as string;
  const institution = executeFunctions.getNodeParameter('institution', itemIndex) as string;
  const degree = executeFunctions.getNodeParameter('degree', itemIndex) as string;
  const startDate = executeFunctions.getNodeParameter('startDate', itemIndex) as string;
  const endDate = executeFunctions.getNodeParameter('endDate', itemIndex, null) as string | null;
  
  const educationData = {
    data: {
      type: "talent/educations",
      attributes: {
        name: educationName,
        institution: institution,
        degree: degree,
        start_date: startDate,
        end_date: endDate,
      },
      relationships: {
        talent: {
          data: {
            type: "talent/talents",
            id: talentId
          }
        }
      }
    }
  };
  
  return pulseApi.createEducation(educationData);
}

export async function updateEducation(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: TalentApi,
): Promise<any> {
  const educationId = executeFunctions.getNodeParameter('educationId', itemIndex) as string;
  const educationName = executeFunctions.getNodeParameter('educationName', itemIndex) as string;
  const institution = executeFunctions.getNodeParameter('institution', itemIndex) as string;
  const degree = executeFunctions.getNodeParameter('degree', itemIndex) as string;
  const startDate = executeFunctions.getNodeParameter('startDate', itemIndex) as string;
  const endDate = executeFunctions.getNodeParameter('endDate', itemIndex, null) as string | null;
  
  const educationData = {
    data: {
      type: "talent/educations",
      id: educationId,
      attributes: {
        name: educationName,
        institution: institution,
        degree: degree,
        start_date: startDate,
        end_date: endDate,
      }
    }
  };
  
  return pulseApi.updateEducationById(educationId, educationData);
}

export async function deleteEducation(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: TalentApi,
): Promise<any> {
  const educationId = executeFunctions.getNodeParameter('educationId', itemIndex) as string;
  return pulseApi.deleteEducationById(educationId);
}
