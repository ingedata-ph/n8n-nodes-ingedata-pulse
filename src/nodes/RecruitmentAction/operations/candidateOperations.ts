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

export async function getCandidateById(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: RecruitmentApi,
): Promise<any> {
  const candidateId = executeFunctions.getNodeParameter('candidateId', itemIndex) as string;
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  return pulseApi.getCandidateById(candidateId, included);
}
