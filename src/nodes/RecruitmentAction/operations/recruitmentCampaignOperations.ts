import { IExecuteFunctions } from 'n8n-workflow';
import { RecruitmentApi } from '../../../utils/api/RecruitmentApi';

export async function createRecruitmentCampaign(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: RecruitmentApi,
): Promise<any> {
  const name = executeFunctions.getNodeParameter('name', itemIndex) as string;
  const job_description = executeFunctions.getNodeParameter('job_description', itemIndex) as string;
  const target_date = executeFunctions.getNodeParameter('target_date', itemIndex) as string;
  const hiring_count = executeFunctions.getNodeParameter('hiring_count', itemIndex) as number;
  const hiring_reason = executeFunctions.getNodeParameter('hiring_reason', itemIndex) as string;
  const contract_type = executeFunctions.getNodeParameter('contract_type', itemIndex) as string;
  const requestor_id = executeFunctions.getNodeParameter('requestor_id', itemIndex) as string;
  const related_organization_id = executeFunctions.getNodeParameter('related_organization_id', itemIndex) as number;
  const related_project_id = executeFunctions.getNodeParameter('related_project_id', itemIndex) as number;
  const organizational_unit = executeFunctions.getNodeParameter('organizational_unit', itemIndex) as string;
  const pipeline_template_id = executeFunctions.getNodeParameter('pipeline_template_id', itemIndex) as string;

  const recruitmentCampaignData = {
    data: {
      type: 'recruitment/positions',
      attributes: {
        name,
        job_description,
        organizational_unit,
        target_date,
        hiring_count,
        hiring_reason,
        contract_type,
        requestor_id,
        related_organization_id,
        related_project_id,
        pipeline_template_id,
      },
    },
  };

    const recruitmentCreated = await pulseApi.createRecruitmentCampaign(recruitmentCampaignData);

    try {
      await pulseApi.createStages(recruitmentCreated.data.id, pipeline_template_id);
    } catch (error) {
      throw new Error('Error creating recruitment campaign stages: ' + (error as Error).message);
    }

  return recruitmentCreated;
}

export async function updateRecruitmentCampaign(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: RecruitmentApi,
): Promise<any> {
  const recruitmentCampaignId = executeFunctions.getNodeParameter('id', itemIndex) as string;
  const updateFields = executeFunctions.getNodeParameter('updateFields', itemIndex) as any;

  const recruitmentCampaignData = {
    data: {
      type: 'recruitment/positions',
      id: recruitmentCampaignId,
      attributes: updateFields,
    },
  };

  if (Object.keys(updateFields).length ==  0) {
    throw new Error('No fields to update');
  }

  return await pulseApi.updateRecruitmentCampaign(recruitmentCampaignId, recruitmentCampaignData);
}

export async function getRecruitmentCampaignsList(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: RecruitmentApi,
): Promise<any> {
  const additionalFields = executeFunctions.getNodeParameter('additionalFields', itemIndex, {}) as {
    sort?: string;
    pageNumber?: number;
    pageSize?: number;
    filters?: { filter: Array<{ key: string; values: string }> };
    fields?: { field: Array<{ key: string; fields: string }> };
  };

  return await pulseApi.getRecruitmentCampaignsList(additionalFields);
}

export async function openRecruitmentCampaign(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: RecruitmentApi,
): Promise<any> {
  const recruitmentCampaignId = executeFunctions.getNodeParameter('id', itemIndex) as string;

  return await pulseApi.openRecruitmentCampaign(recruitmentCampaignId);
}

export async function closeRecruitmentCampaign(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: RecruitmentApi,
): Promise<any> {
  const recruitmentCampaignId = executeFunctions.getNodeParameter('id', itemIndex) as string;

  return await pulseApi.closeRecruitmentCampaign(recruitmentCampaignId);
}
