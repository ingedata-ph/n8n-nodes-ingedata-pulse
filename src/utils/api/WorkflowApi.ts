import { ICredentialDataDecryptedObject } from 'n8n-workflow';
import { BasePulseApi } from './BasePulseApi';

export class WorkflowApi extends BasePulseApi {
  constructor(credentials: ICredentialDataDecryptedObject) {
    super(credentials);
  }

  // Project methods

  /**
   * Get a list of projects
   * @param additionalFields Additional fields for filtering, sorting, and pagination
   */
  async getProjectList(
    additionalFields: {
      sort?: string;
      pageNumber?: number;
      pageSize?: number;
      filters?: { filter: Array<{ key: string; values: string }> };
      fields?: { field: Array<{ key: string; fields: string }> };
    },
  ): Promise<any> {
    const queryParams = this.buildQueryParams(additionalFields);

    return this.request<any>('GET', '/api/v3/workflow/projects', undefined, queryParams);
  }

  /**
   * Create a new project
   * @param projectData The data for the new project
   */
  async createProject(projectData: object): Promise<any> {
    const url = '/api/v3/workflow/projects';
    const method = 'POST';
    const body = projectData;

    return this.request<any>(method, url, body);
  }

  /**
   * Update an existing project
   * @param projectId The ID of the project to update
   * @param projectData The updated data for the project
   */
  async updateProject(projectId: string, projectData: object): Promise<any> {
    const url = `/api/v3/workflow/projects/${projectId}`;
    const method = 'PATCH';
    const body = projectData;

    return this.request<any>(method, url, body);
  }

  /**
   * Update project status
   * @param projectId The ID of the project to update status
   * @param statusData The status data to update
   */
  async updateProjectStatus(projectId: string, statusData: object): Promise<any> {
    const url = `/api/v3/workflow/projects/${projectId}`;
    const method = 'PATCH';
    const body = statusData;

    return this.request<any>(method, url, body);
  }

  // Project Member methods

  /**
   * Get a list of project members
   * @param additionalFields Additional fields for filtering, sorting, and pagination
   */
  async getProjectMemberList(
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

    return this.request<any>('GET', '/api/v3/workflow/members', undefined, queryParams);
  }

  /**
   * Create a new project member
   * @param memberData The data for the new project member
   */
  async createProjectMember(memberData: object): Promise<any> {
    const url = '/api/v3/workflow/members';
    const method = 'POST';
    const body = memberData;

    return this.request<any>(method, url, body);
  }

  /**
   * Update an existing project member
   * @param memberId The ID of the project member to update
   * @param memberData The updated data for the project member
   */
  async updateProjectMember(memberId: string, memberData: object): Promise<any> {
    const url = `/api/v3/workflow/members/${memberId}`;
    const method = 'PATCH';
    const body = memberData;

    return this.request<any>(method, url, body);
  }

  /**
   * Delete a project member
   * @param memberId The ID of the project member to delete
   */
  async deleteProjectMember(memberId: string): Promise<any> {
    const url = `/api/v3/workflow/members/${memberId}`;
    const method = 'DELETE';

    return this.request<any>(method, url);
  }

  // Project Document methods

  /**
   * Get a list of project documents
   * @param additionalFields Additional fields for filtering, sorting, and pagination
   */
  async getProjectDocumentList(
    additionalFields: {
      sort?: string;
      pageNumber?: number;
      pageSize?: number;
      filters?: { filter: Array<{ key: string; values: string }> };
      fields?: { field: Array<{ key: string; fields: string }> };
    },
  ): Promise<any> {
    const queryParams = this.buildQueryParams(additionalFields);

    return this.request<any>('GET', '/api/v3/workflow/project/documents', undefined, queryParams);
  }

  /**
   * Create a new project document
   * @param documentData The data for the new project document
   */
  async createProjectDocument(documentData: object): Promise<any> {
    const url = '/api/v3/workflow/project/documents';
    const method = 'POST';
    const body = documentData;

    return this.request<any>(method, url, body);
  }

  /**
   * Update an existing project document
   * @param documentId The ID of the project document to update
   * @param documentData The updated data for the project document
   */
  async updateProjectDocument(documentId: string, documentData: object): Promise<any> {
    const url = `/api/v3/workflow/project/documents/${documentId}`;
    const method = 'PATCH';
    const body = documentData;

    return this.request<any>(method, url, body);
  }

  /**
   * Delete a project document
   * @param documentId The ID of the project document to delete
   */
  async deleteProjectDocument(documentId: string): Promise<any> {
    const url = `/api/v3/workflow/project/documents/${documentId}`;
    const method = 'DELETE';

    return this.request<any>(method, url);
  }

  /**
   * Get a specific project document by ID
   * @param documentId The ID of the project document to retrieve
   */
  async getProjectDocument(documentId: string): Promise<any> {
    const url = `/api/v3/workflow/project/documents/${documentId}`;
    const method = 'GET';

    return this.request<any>(method, url);
  }

  // Project Data methods

  /**
   * Get a list of project data
   * @param additionalFields Additional fields for filtering, sorting, and pagination
   */
  async getProjectDataList(
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

    return this.request<any>('GET', '/api/v3/workflow/project_data', undefined, queryParams);
  }

  /**
   * Create project data
   * @param projectDataObj The data for the project data
   */
  async createProjectData(projectDataObj: object): Promise<any> {
    const url = '/api/v3/workflow/project_data';
    const method = 'POST';
    const body = projectDataObj;

    return this.request<any>(method, url, body);
  }

  /**
   * Update project data
   * @param dataId The ID of the project data to update
   * @param projectDataObj The updated data
   */
  async updateProjectData(dataId: string, projectDataObj: object): Promise<any> {
    const url = `/api/v3/workflow/project_data/${dataId}`;
    const method = 'PATCH';
    const body = projectDataObj;

    return this.request<any>(method, url, body);
  }

  // Project Work Unit methods

  /**
   * Get a list of project work units
   * @param additionalFields Additional fields for filtering, sorting, and pagination
   */
  async getProjectWorkUnitList(
    additionalFields: {
      sort?: string;
      pageNumber?: number;
      pageSize?: number;
      filters?: { filter: Array<{ key: string; values: string }> };
      fields?: { field: Array<{ key: string; fields: string }> };
    },
  ): Promise<any> {
    const queryParams = this.buildQueryParams(additionalFields);

    return this.request<any>('GET', '/api/v3/workflow/work_units', undefined, queryParams);
  }

  /**
   * Create a new project work unit
   * @param workUnitData The data for the new project work unit
   */
  async createProjectWorkUnit(workUnitData: object): Promise<any> {
    const url = '/api/v3/workflow/work_units';
    const method = 'POST';
    const body = workUnitData;

    return this.request<any>(method, url, body);
  }

  /**
   * Cancel a project work unit
   * @param workUnitId The ID of the work unit to cancel
   */
  async cancelProjectWorkUnit(workUnitId: string): Promise<any> {
    const url = `/api/v3/workflow/work_units/${workUnitId}/cancel`;
    const method = 'POST';

    return this.request<any>(method, url);
  }
  
  // Activity methods
  
  /**
   * Assign a member to an activity
   * @param activityId The ID of the activity
   * @param assignData The data for assignment (account_id and start_working)
   */
  async assignActivityMember(activityId: string, assignData: object): Promise<any> {
    const url = `/api/v3/workflow/activities/${activityId}/assign`;
    const method = 'PATCH';
    const body = assignData;

    return this.request<any>(method, url, body);
  }
  
  /**
   * Unassign a member from an activity
   * @param activityId The ID of the activity
   */
  async unassignActivityMember(activityId: string): Promise<any> {
    const url = `/api/v3/workflow/activities/${activityId}/unassign`;
    const method = 'PATCH';

    return this.request<any>(method, url);
  }
}
