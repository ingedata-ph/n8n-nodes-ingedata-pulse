import { ICredentialDataDecryptedObject } from 'n8n-workflow';
import { BasePulseApi } from './BasePulseApi';

export class OfficeApi extends BasePulseApi {
  constructor(credentials: ICredentialDataDecryptedObject) {
    super(credentials);
  }

  // Employee methods

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

    return this.request<any>('GET', '/api/v3/office/employees', undefined, queryParams);
  }

  /**
   * Create a new employee
   * @param employeeData The data for the new employee
   */
  async createEmployee(employeeData: object): Promise<any> {
    const url = '/api/v3/office/employees';
    const method = 'POST';
    const body = employeeData;

    return this.request<any>(method, url, body);
  }

  /**
   * Update an existing employee
   * @param employeeId The ID of the employee to update
   * @param employeeData The updated data for the employee
   */
  async updateEmployee(employeeId: string, employeeData: object): Promise<any> {
    const url = `/api/v3/office/employees/${employeeId}`;
    const method = 'PATCH';
    const body = employeeData;

    return this.request<any>(method, url, body);
  }
}
