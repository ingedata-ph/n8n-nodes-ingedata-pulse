import { ICredentialDataDecryptedObject } from 'n8n-workflow';
import { BasePulseApi } from './BasePulseApi';
import { log } from 'console';

export class OfficeApi extends BasePulseApi {
  constructor(credentials: ICredentialDataDecryptedObject) {
    super(credentials);
  }

  // Talent methods

  /**
   * Get a list of talents
   * @param included Optional array of related resources to include (e.g., ['person'])
   */
  async getEmployeeList(
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
    console.log('Fetching talent list:', queryParams);

    return this.request<any>('GET', '/api/v3/office/employees', undefined, queryParams);
  }
}
