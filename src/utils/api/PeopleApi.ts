import { ICredentialDataDecryptedObject } from 'n8n-workflow';
import { BasePulseApi } from './BasePulseApi';

export class PeopleApi extends BasePulseApi {
  constructor(credentials: ICredentialDataDecryptedObject) {
    super(credentials);
  }

  /**
   * Get a list of people
   * @param included Optional array of related resources to include (e.g., ['account'])
   */
  async getPeopleList(
    additionalFields: {
      operation?: string[];
      inputs?: object;
      sort?: string;
      pageNumber?: number;
      pageSize?: number;
      filters?: { filter: Array<{ key: string; values: string }> };
      fields?: { field: Array<{ key: string; fields: string }> };
    },
    included?: string[],
  ): Promise<any> {
    const queryParams = this.buildQueryParams(additionalFields, included);

    return this.request<any>('GET', '/api/v3/iam/people', undefined, queryParams);
  }

  /**
   * Create a new person
   */
  async createPerson(personData: object): Promise<any> {
    return this.request<any>('POST', '/api/v3/iam/people', personData);
  }

  /**
   * Get a person by ID
   * @param personId ID of the person to retrieve
   * @param included Optional array of related resources to include (e.g., ['account'])
   */
  async getPersonById(personId: string, included?: string[]): Promise<any> {
    const queryParams: Record<string, string | string[]> = {};
    
    if (included && included.length > 0) {
      queryParams.included = included;
    }
    
    return this.request<any>('GET', `/api/v3/iam/people/${personId}`, undefined, queryParams);
  }

  /**
   * Update a person by ID
   */
  async updatePersonById(personId: string, personData: object): Promise<any> {
    return this.request<any>('PATCH', `/api/v3/iam/people/${personId}`, personData);
  }
}
