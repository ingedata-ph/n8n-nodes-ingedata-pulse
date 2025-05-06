import { IExecuteFunctions } from 'n8n-workflow';
import { TalentApi } from '../../../utils/api/TalentApi';

export async function getCertificationList(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: TalentApi,
): Promise<any> {
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  const additionalFields = executeFunctions.getNodeParameter('additionalFields', itemIndex, {}) as object;
  return pulseApi.getCertificationList(additionalFields, included);
}

export async function createCertification(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: TalentApi,
): Promise<any> {
  const talentId = executeFunctions.getNodeParameter('talentId', itemIndex) as string;
  const certificationName = executeFunctions.getNodeParameter('certificationName', itemIndex) as string;
  const organization = executeFunctions.getNodeParameter('organization', itemIndex) as string;
  const certificateUrl = executeFunctions.getNodeParameter('url', itemIndex) as string;
  const obtentionDate = executeFunctions.getNodeParameter('obtentionDate', itemIndex) as string; 
 
  const certificationData = {
    data: {
      type: "talent/certifications",
      attributes: {
        name: certificationName,
        organization: organization,
        url: certificateUrl,
        obtention_date: obtentionDate,
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
  
  return pulseApi.createCertification(certificationData);
}

export async function updateCertification(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: TalentApi,
): Promise<any> {
  const certificationId = executeFunctions.getNodeParameter('certificationId', itemIndex) as string;
  const certificationName = executeFunctions.getNodeParameter('certificationName', itemIndex) as string;
  const organization = executeFunctions.getNodeParameter('organization', itemIndex) as string;
  const certificateUrl = executeFunctions.getNodeParameter('url', itemIndex) as string;
  const obtentionDate = executeFunctions.getNodeParameter('obtentionDate', itemIndex) as string;
   
  const certificationData = {
    data: {
      type: "talent/certifications",
      id: certificationId,
      attributes: {
        name: certificationName,
        organization: organization,
        url: certificateUrl,
        obtention_date: obtentionDate,
      }
    }
  };
  
  return pulseApi.updateCertificationById(certificationId, certificationData);
}

export async function deleteCertification(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: TalentApi,
): Promise<any> {
  const certificationId = executeFunctions.getNodeParameter('certificationId', itemIndex) as string;
  return pulseApi.deleteCertificationById(certificationId);
}
