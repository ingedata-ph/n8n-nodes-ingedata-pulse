import { log } from 'console';
import { BasePulseApi } from './BasePulseApi';
import { ICredentialDataDecryptedObject } from 'n8n-workflow';

export class RecruitmentApi extends BasePulseApi {
  constructor(credentials: ICredentialDataDecryptedObject) {
    super(credentials);
  }

  /**
   * Get a list of candidates
   */
  async getCandidatesList(
    additionalFields: {
      sort?: string;
      pageNumber?: number;
      pageSize?: number;
      filters?: { filter: Array<{ key: string; values: string }> };
      fields?: { field: Array<{ key: string; fields: string }> };
    },
    included?: string[],
  ): Promise<any> {
    const queryParams = this.buildQueryParams(additionalFields, included);
    return this.request<any>('GET', '/api/v3/recruitment/candidates', undefined, queryParams);
  }

  /**
   * Create a new candidate
   */
  async createCandidate(candidateData: any): Promise<any> {
    return this.request<any>('POST', '/api/v3/recruitment/candidates', candidateData);
  }

  /**
   * Get a candidate by ID
   */
  async getCandidateById(candidateId: string, included?: string[]): Promise<any> {
    const queryParams: Record<string, string | string[]> = {};
    if (included && included.length > 0) {
      queryParams.included = included;
    }
    return this.request<any>('GET', `/api/v3/recruitment/candidates/${candidateId}`, undefined, queryParams);
  }

  // /**
  //  * Update a candidate by ID
  //  */
  // async updateCandidateById(candidateId: string, candidateData: any): Promise<any> {
  //   return this.request<any>('PATCH', `/api/v3/recruitment/candidates/${candidateId}`, candidateData);
  // }

  /**
   * Get a list of pipeline templates
   */
  async getPipelineTemplatesList(
    additionalFields: {
      sort?: string;
      pageNumber?: number;
      pageSize?: number;
      filters?: { filter: Array<{ key: string; values: string }> };
      fields?: { field: Array<{ key: string; fields: string }> };
    },
    included?: string[],
  ): Promise<any> {
    const queryParams = this.buildQueryParams(additionalFields, included);
    return this.request<any>('GET', '/api/v3/recruitment/pipeline_templates', undefined, queryParams);
  }

  /**
   * Create a new pipeline template
   */
  async createPipelineTemplate(pipelineTemplateData: any): Promise<any> {
    return this.request<any>('POST', '/api/v3/recruitment/pipeline_templates', pipelineTemplateData);
  }

  /**
   * Update a pipeline template by ID
   */
  async updatePipelineTemplate(pipelineTemplateId: string, pipelineTemplateData: any): Promise<any> {
    return this.request<any>('PATCH', `/api/v3/recruitment/pipeline_templates/${pipelineTemplateId}`, pipelineTemplateData);
  }

  /**
   * Delete a pipeline template by ID
   */
  async deletePipelineTemplate(pipelineTemplateId: string): Promise<any> {
    return this.request<any>('DELETE', `/api/v3/recruitment/pipeline_templates/${pipelineTemplateId}`);
  }

  /**
   * Get a list of stage templates
   */
  async getStageTemplatesList(
    additionalFields: {
      sort?: string;
      pageNumber?: number;
      pageSize?: number;
      filters?: { filter: Array<{ key: string; values: string }> };
      fields?: { field: Array<{ key: string; fields: string }> };
    },
    included?: string[],
  ): Promise<any> {
    const queryParams = this.buildQueryParams(additionalFields, included);
    return this.request<any>('GET', '/api/v3/recruitment/stage_templates', undefined, queryParams);
  }

  /**
   * Create a new stage template
   */
  async createStageTemplate(stageTemplateData: any): Promise<any> {
    return this.request<any>('POST', '/api/v3/recruitment/stage_templates', stageTemplateData);
  }

  /**
   * Update a stage template by ID
   */
  async updateStageTemplate(stageTemplateId: string, stageTemplateData: any): Promise<any> {
    return this.request<any>('PATCH', `/api/v3/recruitment/stage_templates/${stageTemplateId}`, stageTemplateData);
  }

  /**
   * Delete a stage template by ID
   */
  async deleteStageTemplate(stageTemplateId: string): Promise<any> {
    return this.request<any>('DELETE', `/api/v3/recruitment/stage_templates/${stageTemplateId}`);
  }

  /**
   * Get a list of recruitment campaigns
   */
  async getRecruitmentCampaignsList(
    additionalFields: {
      sort?: string;
      pageNumber?: number;
      pageSize?: number;
      filters?: { filter: Array<{ key: string; values: string }> };
      fields?: { field: Array<{ key: string; fields: string }> };
    },
    included?: string[],
  ): Promise<any> {
    const queryParams = this.buildQueryParams(additionalFields, included);
    return this.request<any>('GET', '/api/v3/recruitment/positions', undefined, queryParams);
  }

  /**
   * Create a new recruitment campaign
   */
  async createRecruitmentCampaign(recruitmentCampaignData: any): Promise<any> {
    return this.request<any>('POST', '/api/v3/recruitment/positions', recruitmentCampaignData);
  }

  /**
   * Update a recruitment campaign by ID
   */
  async updateRecruitmentCampaign(recruitmentCampaignId: string, recruitmentCampaignData: any): Promise<any> {
    return this.request<any>('PATCH', `/api/v3/recruitment/positions/${recruitmentCampaignId}`, recruitmentCampaignData);
  }

  /**
   * Update a recruitment campaign status to open
   */
  async openRecruitmentCampaign(recruitmentCampaignId: string): Promise<any> {
    return this.request<any>('PATCH', `/api/v3/recruitment/positions/${recruitmentCampaignId}/open`);
  }

  /**
   * Update a recruitment campaign status to closed
   */
  async closeRecruitmentCampaign(recruitmentCampaignId: string): Promise<any> {
    return this.request<any>('PATCH', `/api/v3/recruitment/positions/${recruitmentCampaignId}/close`);
  }

  /**
   * Create stages for a recruitment campaign
   */
  async createStages(recruitmentCampaignId: string, pipelineTemplateId: string): Promise<any> {
    return this.request<any>('POST', `/api/v3/recruitment/stages/create_with_templates`, undefined, {
      pipeline_template_id: pipelineTemplateId,
      position_id: recruitmentCampaignId
    });
  }

  /**
   * Create candidates for a recruitment campaign
   */
  async createCandidates(candidateData: any): Promise<any> {
    return this.request<any>('POST', '/api/v3/recruitment/candidates/create_candidates', candidateData);
  }

  /**
   * Move a candidate to another stage
   */
  async moveCandidate(candidateId: string, stageId: string): Promise<any> {
    return this.request<any>('PATCH', `/api/v3/recruitment/candidates/move?id=${candidateId}&stage_id=${stageId}`);
  }

  /**
   * Hire a candidate
   */
  async hireCandidate(candidateId: string): Promise<any> {
    return this.request<any>('PATCH', `/api/v3/recruitment/candidates/${candidateId}/hire`);
  }

  /**
   * Reject a candidate
   */
  async rejectCandidate(candidateId: string): Promise<any> {
    return this.request<any>('PATCH', `/api/v3/recruitment/candidates/${candidateId}/reject`);
  }

  /**
   * Remove a candidate
   */
  async removeCandidate(candidateId: string): Promise<any> {
    return this.request<any>('DELETE', `/api/v3/recruitment/candidates/${candidateId}`);
  }
}
