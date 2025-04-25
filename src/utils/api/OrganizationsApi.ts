import { ICredentialDataDecryptedObject } from 'n8n-workflow';
import { BasePulseApi } from './BasePulseApi';

export class OrganizationsApi extends BasePulseApi {
  constructor(credentials: ICredentialDataDecryptedObject) {
    super(credentials);
  }

  /**
   * Create a new organization
   */
  async createOrganization(organizationData: object): Promise<any> {
    return this.request<any>('POST', '/api/v3/iam/organizations', organizationData);
  }

  /**
   * Update an organization
   */
  async updateOrganization(organizationId: string, organizationData: object): Promise<any> {
    return this.request<any>('PATCH', `/api/v3/iam/organizations/${organizationId}`, organizationData);
  }

  /**
   * Create a new people directory entry
   */
  async createPeopleDirectory(peopleDirectoryData: object): Promise<any> {
    return this.request<any>('POST', '/api/v3/iam/organization/people_directories', peopleDirectoryData);
  }

  /**
   * Update a people directory entry
   */
  async updatePeopleDirectory(peopleDirectoryId: string, peopleDirectoryData: object): Promise<any> {
    return this.request<any>('PATCH', `/api/v3/iam/organization/people_directories/${peopleDirectoryId}`, peopleDirectoryData);
  }

  /**
   * Delete a people directory entry
   */
  async deletePeopleDirectory(peopleDirectoryId: string): Promise<any> {
    return this.request<any>('DELETE', `/api/v3/iam/organization/people_directories/${peopleDirectoryId}`);
  }

  /**
   * Get list of people directory entries
   * @param included Optional array of related resources to include
   */
  async listPeopleDirectories(
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
    
    return this.request<any>('GET', '/api/v3/iam/organization/people_directories', undefined, queryParams);
  }

  /**
   * Get a specific people directory entry
   * @param peopleDirectoryId ID of the people directory entry to retrieve
   * @param included Optional array of related resources to include
   */
  async getPeopleDirectoryById(peopleDirectoryId: string, included?: string[]): Promise<any> {
    const queryParams: Record<string, string | string[]> = {};
    
    if (included && included.length > 0) {
      queryParams.included = included;
    }
    
    return this.request<any>('GET', `/api/v3/iam/organization/people_directories/${peopleDirectoryId}`, undefined, queryParams);
  }
}
