import { IExecuteFunctions } from 'n8n-workflow';
import { TalentApi } from '../../../utils/api/TalentApi';

export async function getLanguagesList(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: TalentApi,
): Promise<any> {
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  const additionalFields = executeFunctions.getNodeParameter('additionalFields', itemIndex, {}) as object;
  return pulseApi.getLanguagesList(additionalFields, included);
}

export async function createLanguage(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: TalentApi,
): Promise<any> {
  const talentId = executeFunctions.getNodeParameter('talentId', itemIndex) as string;
  const isoCode = executeFunctions.getNodeParameter('isoCode', itemIndex) as string;
  const readingLevel = executeFunctions.getNodeParameter('readingLevel', itemIndex) as number;
  const writingLevel = executeFunctions.getNodeParameter('writingLevel', itemIndex) as number;
  const speakingLevel = executeFunctions.getNodeParameter('speakingLevel', itemIndex) as number;
  
  const languageData = {
    data: {
      type: "talent/languages",
      attributes: {
        iso_code: isoCode,
        reading: readingLevel,
        writing: writingLevel,
        speaking: speakingLevel,
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
  
  return pulseApi.createLanguage(languageData);
}

export async function updateLanguage(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: TalentApi,
): Promise<any> {
  const languageId = executeFunctions.getNodeParameter('languageId', itemIndex) as string;
  const talentId = executeFunctions.getNodeParameter('talentId', itemIndex) as string;
  const isoCode = executeFunctions.getNodeParameter('isoCode', itemIndex) as string;
  const readingLevel = executeFunctions.getNodeParameter('readingLevel', itemIndex) as number;
  const writingLevel = executeFunctions.getNodeParameter('writingLevel', itemIndex) as number;
  const speakingLevel = executeFunctions.getNodeParameter('speakingLevel', itemIndex) as number;
  
  const languageData = {
    data: {
      type: "talent/languages",
      id: languageId,
      attributes: {
        iso_code: isoCode,
        reading: readingLevel,
        writing: writingLevel,
        speaking: speakingLevel,
      },
    }
  };
  
  return pulseApi.updateLanguageById(languageId, languageData);
}

export async function deleteLanguage(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: TalentApi,
): Promise<any> {
  const languageId = executeFunctions.getNodeParameter('languageId', itemIndex) as string;
  return pulseApi.deleteLanguageById(languageId);
}
