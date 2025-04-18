import { IExecuteFunctions } from 'n8n-workflow';
import { TalentApi } from '../../../utils/api/TalentApi';

export async function getExperienceList(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: TalentApi,
): Promise<any> {
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  const additionalFields = executeFunctions.getNodeParameter('additionalFields', itemIndex, {}) as object;
  return pulseApi.getExperienceList(additionalFields, included);
}

export async function createExperience(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: TalentApi,
): Promise<any> {
  const talentId = executeFunctions.getNodeParameter('talentId', itemIndex) as string;
  const organization = executeFunctions.getNodeParameter('organization', itemIndex) as string;
  const position = executeFunctions.getNodeParameter('position', itemIndex) as string;
  const startDate = executeFunctions.getNodeParameter('startDate', itemIndex) as string;
  const endDate = executeFunctions.getNodeParameter('endDate', itemIndex, null) as string | null;
  const summary = executeFunctions.getNodeParameter('summary', itemIndex, '') as string;
  
  const experienceData = {
    data: {
      type: "talent/experiences",
      attributes: {
        organization: organization,
        position: position,
        start_date: startDate,
        end_date: endDate,
        summary: summary,
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
  
  return pulseApi.createExperience(experienceData);
}

export async function updateExperience(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: TalentApi,
): Promise<any> {
  const experienceId = executeFunctions.getNodeParameter('experienceId', itemIndex) as string;
  const organization = executeFunctions.getNodeParameter('organization', itemIndex) as string;
  const position = executeFunctions.getNodeParameter('position', itemIndex) as string;
  const startDate = executeFunctions.getNodeParameter('startDate', itemIndex) as string;
  const endDate = executeFunctions.getNodeParameter('endDate', itemIndex, null) as string | null;
  const summary = executeFunctions.getNodeParameter('summary', itemIndex, '') as string;
  
  const experienceData = {
    data: {
      type: "talent/experiences",
      id: experienceId,
      attributes: {
        organization: organization,
        position: position,
        start_date: startDate,
        end_date: endDate,
        summary: summary,
      }
    }
  };
  
  return pulseApi.updateExperienceById(experienceId, experienceData);
}

export async function deleteExperience(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: TalentApi,
): Promise<any> {
  const experienceId = executeFunctions.getNodeParameter('experienceId', itemIndex) as string;
  return pulseApi.deleteExperienceById(experienceId);
}
