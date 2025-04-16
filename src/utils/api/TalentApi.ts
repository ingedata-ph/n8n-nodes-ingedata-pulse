import { ICredentialDataDecryptedObject } from 'n8n-workflow';
import { BasePulseApi } from './BasePulseApi';

export class TalentApi extends BasePulseApi {
  constructor(credentials: ICredentialDataDecryptedObject) {
    super(credentials);
  }

  /**
   * Get a list of talents
   * @param included Optional array of related resources to include (e.g., ['person'])
   */
  async getTalentList(included?: string[]): Promise<any> {
    const queryParams: Record<string, string | string[]> = {};
    
    if (included && included.length > 0) {
      queryParams.included = included;
    }

    console.log('Fetching talent list');
    console.log('Query Params:', queryParams);
    
    return this.request<any>('GET', '/api/v3/talent/talents', undefined, queryParams);
  }

  /**
   * Create a new talent
   */
  async createTalent(talentData: object): Promise<any> {
    return this.request<any>('POST', '/api/v3/talent/talents', talentData);
  }

  /**
   * Get a talent by ID
   * @param talentId ID of the talent to retrieve
   * @param included Optional array of related resources to include (e.g., ['person'])
   */
  async getTalentById(talentId: string, included?: string[]): Promise<any> {
    const queryParams: Record<string, string | string[]> = {};
    
    if (included && included.length > 0) {
      queryParams.included = included;
    }
    
    return this.request<any>('GET', `/api/v3/talent/talents/${talentId}`, undefined, queryParams);
  }

  // /**
  //  * Update a talent by ID
  //  */
  // async updateTalentById(talentId: string, talentData: object): Promise<any> {
  //   return this.request<any>('PATCH', `/api/v3/talent/talents/${talentId}`, talentData);
  // }
}
