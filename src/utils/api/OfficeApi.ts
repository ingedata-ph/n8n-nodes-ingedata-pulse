import { ICredentialDataDecryptedObject } from 'n8n-workflow';
import { BasePulseApi } from './BasePulseApi';

export class OfficeApi extends BasePulseApi {
  // Holiday methods
  
  /**
   * Get a list of holidays
   * @param additionalFields Additional fields for filtering, sorting, and pagination
   */
  async getHolidayList(
    additionalFields: {
      sort?: string;
      pageNumber?: number;
      pageSize?: number;
      filters?: { filter: Array<{ key: string; values: string }> };
      fields?: { field: Array<{ key: string; fields: string }> };
    },
  ): Promise<any> {
    const queryParams = this.buildQueryParams(additionalFields);

    return this.request<any>('GET', '/api/v3/office/holidays', undefined, queryParams);
  }

  /**
   * Create a new holiday
   * @param holidayData The data for the new holiday
   */
  async createHoliday(holidayData: object): Promise<any> {
    const url = '/api/v3/office/holidays';
    const method = 'POST';
    const body = holidayData;

    return this.request<any>(method, url, body);
  }

  /**
   * Update an existing holiday
   * @param holidayId The ID of the holiday to update
   * @param holidayData The updated data for the holiday
   */
  async updateHoliday(holidayId: string, holidayData: object): Promise<any> {
    const url = `/api/v3/office/holidays/${holidayId}`;
    const method = 'PATCH';
    const body = holidayData;

    return this.request<any>(method, url, body);
  }

  /**
   * Delete a holiday
   * @param holidayId The ID of the holiday to delete
   */
  async deleteHoliday(holidayId: string): Promise<any> {
    const url = `/api/v3/office/holidays/${holidayId}`;
    const method = 'DELETE';

    return this.request<any>(method, url);
  }

  // Announcement methods
  
  /**
   * Get a list of announcements
   * @param additionalFields Additional fields for filtering, sorting, and pagination
   */
  async getAnnouncementList(
    additionalFields: {
      sort?: string;
      pageNumber?: number;
      pageSize?: number;
      filters?: { filter: Array<{ key: string; values: string }> };
      fields?: { field: Array<{ key: string; fields: string }> };
    },
  ): Promise<any> {
    const queryParams = this.buildQueryParams(additionalFields);

    return this.request<any>('GET', '/api/v3/notification/announcements', undefined, queryParams);
  }

  /**
   * Create a new announcement
   * @param announcementData The data for the new announcement
   */
  async createAnnouncement(announcementData: object): Promise<any> {
    const url = '/api/v3/notification/announcements';
    const method = 'POST';
    const body = announcementData;

    return this.request<any>(method, url, body);
  }

  /**
   * Update an existing announcement
   * @param announcementId The ID of the announcement to update
   * @param announcementData The updated data for the announcement
   */
  async updateAnnouncement(announcementId: string, announcementData: object): Promise<any> {
    const url = `/api/v3/notification/announcements/${announcementId}`;
    const method = 'PATCH';
    const body = announcementData;

    return this.request<any>(method, url, body);
  }

  /**
   * Delete an announcement
   * @param announcementId The ID of the announcement to delete
   */
  async deleteAnnouncement(announcementId: string): Promise<any> {
    const url = `/api/v3/notification/announcements/${announcementId}`;
    const method = 'DELETE';

    return this.request<any>(method, url);
  }

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

  // Leave Request methods

  /**
   * Create a new leave request
   * @param leaveRequestData The data for the new leave request
   */
  async createLeaveRequest(leaveRequestData: object): Promise<any> {
    const url = '/api/v3/office/leave/requests';
    const method = 'POST';
    const body = leaveRequestData;

    return this.request<any>(method, url, body);
  }
}
