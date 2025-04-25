import { ICredentialDataDecryptedObject } from 'n8n-workflow';
import { BasePulseApi } from './BasePulseApi';

export class OfficeApi extends BasePulseApi {
  constructor(credentials: ICredentialDataDecryptedObject) {
    super(credentials);
  }

  // Planning methods

  /**
   * Get a list of plannings
   * @param additionalFields Additional fields for filtering, sorting, and pagination
   * @param included Optional array of related resources to include (e.g., ['employees'])
   */
  async getPlanningList(
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

    return this.request<any>('GET', '/api/v3/office/plannings', undefined, queryParams);
  }

  /**
   * Create a new planning
   * @param planningData The data for the new planning
   */
  async createPlanning(planningData: object): Promise<any> {
    const url = '/api/v3/office/plannings';
    const method = 'POST';
    const body = planningData;

    return this.request<any>(method, url, body);
  }

  /**
   * Update an existing planning
   * @param planningId The ID of the planning to update
   * @param planningData The updated data for the planning
   */
  async updatePlanning(planningId: string, planningData: object): Promise<any> {
    const url = `/api/v3/office/plannings/${planningId}`;
    const method = 'PATCH';
    const body = planningData;

    return this.request<any>(method, url, body);
  }

  /**
   * Delete a planning
   * @param planningId The ID of the planning to delete
   */
  async deletePlanning(planningId: string): Promise<any> {
    const url = `/api/v3/office/plannings/${planningId}`;
    const method = 'DELETE';

    return this.request<any>(method, url);
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
