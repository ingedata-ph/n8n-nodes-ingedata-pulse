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
}
