import { IExecuteFunctions } from 'n8n-workflow';
import { RecruitmentApi } from '../../../utils/api/RecruitmentApi';
import { PeopleApi } from '../../../utils/api/PeopleApi';
import { PulseApiFactory } from '../../../utils/api/PulseApiFactory';

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
  const queryId = executeFunctions.getNodeParameter('query_id', itemIndex) as string;
  const updateFields = executeFunctions.getNodeParameter('updateFields', itemIndex) as any;

  // Build attributes only with defined values
  const attributes = Object.fromEntries(
    Object.entries(updateFields).filter(([, value]) => value !== undefined)
  );

  if (Object.keys(attributes).length === 0) {
    throw new Error('No fields to update');
  }

  // Always include query_id
  attributes.query_id = queryId;

  const recruitmentCampaignData = {
    data: {
      type: 'recruitment/positions',
      id: recruitmentCampaignId,
      attributes: attributes,
    },
  };

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

export async function addCandidate(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: RecruitmentApi,
): Promise<any> {
  const talent_id = executeFunctions.getNodeParameter('talent_id', itemIndex) as string;
  const stage_id = executeFunctions.getNodeParameter('stage_id', itemIndex) as string;
  const position_id = executeFunctions.getNodeParameter('position_id', itemIndex) as string;

  let person: any;
  // Get person data from PeopleApi
  const peopleApi = await PulseApiFactory.getPulseApiHelper(executeFunctions, 'people') as any;
  try {
    const personResponse = await peopleApi.getPersonById(talent_id);
    if (!personResponse || !personResponse.data) {
      throw new Error('Person not found');
    }

    person = personResponse.data;
  } catch (error) {
    throw new Error('Error fetching person data: ' + (error as Error).message);
  }

  const candidateData = {
    data: [{
      attributes: {
        person_id: parseInt(talent_id),
        first_name: person.attributes.first_name,
        middle_name: person.attributes.middle_name,
        last_name: person.attributes.last_name,
        picture_url: person.attributes.picture_url,
        position_id: parseInt(position_id),
        secondary_email: person.attributes.secondary_email,
        organizational_unit: person.attributes.organizational_unit,
        facets: person.attributes.facets,
        stage_id: parseInt(stage_id),
        status: "in_progress",
      },
      type: "recruitment/candidates"
    }],
    position_id: parseInt(position_id),
    stage_id: parseInt(stage_id)
  };

  return await pulseApi.createCandidates(candidateData);
}

export async function moveCandidate(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: RecruitmentApi,
): Promise<any> {
  const candidateId = executeFunctions.getNodeParameter('id', itemIndex) as string;
  const position_id = executeFunctions.getNodeParameter('position_id', itemIndex) as string;
  const stage_id = executeFunctions.getNodeParameter('stage_id', itemIndex) as string;

  // Check if candidate exists in this position
  const candidates = await pulseApi.getCandidatesList({
    filters: {
      filter: [{
        key: 'id',
        values: candidateId
      }, {
        key: 'position_id',
        values: position_id
      }]
    }
  });

  if (!candidates.data || candidates.data.length === 0) {
    throw new Error('Candidate not found in this position');
  }

  return await pulseApi.moveCandidate(candidateId, stage_id);
}

export async function hireCandidate(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: RecruitmentApi,
): Promise<any> {
  const candidateId = executeFunctions.getNodeParameter('id', itemIndex) as string;
  const position_id = executeFunctions.getNodeParameter('position_id', itemIndex) as string;

  // Check if candidate exists in this position
  const candidates = await pulseApi.getCandidatesList({
    filters: {
      filter: [{
        key: 'id',
        values: candidateId
      }, {
        key: 'position_id',
        values: position_id
      }]
    }
  });

  if (!candidates.data || candidates.data.length === 0) {
    throw new Error('Candidate not found in this position');
  }

  return await pulseApi.hireCandidate(candidateId);
}

export async function rejectCandidate(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: RecruitmentApi,
): Promise<any> {
  const candidateId = executeFunctions.getNodeParameter('id', itemIndex) as string;
  const position_id = executeFunctions.getNodeParameter('position_id', itemIndex) as string;

  // Check if candidate exists in this position
  const candidates = await pulseApi.getCandidatesList({
    filters: {
      filter: [{
        key: 'id',
        values: candidateId
      }, {
        key: 'position_id',
        values: position_id
      }]
    }
  });

  if (!candidates.data || candidates.data.length === 0) {
    throw new Error('Candidate not found in this position');
  }

  return await pulseApi.rejectCandidate(candidateId);
}

export async function removeCandidate(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: RecruitmentApi,
): Promise<any> {
  const candidateId = executeFunctions.getNodeParameter('id', itemIndex) as string;

  return await pulseApi.removeCandidate(candidateId);
}
