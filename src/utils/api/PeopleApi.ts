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
      // operation?: string[];
      // inputs?: object;
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

  /**
   * Create an identity document for a person
   * @param identityDocumentData The identity document data to create
   */
  async createIdentityDocument(identityDocumentData: object): Promise<any> {
    return this.request<any>('POST', '/api/v3/iam/identity_documents', identityDocumentData);
  }

  /**
   * Get a list of identity documents
   * @param additionalFields Optional additional fields for filtering and sorting
   * @param included Optional array of related resources to include (e.g., ['person'])
   */
  async getIdentityDocumentList(
    additionalFields: {
      // operation?: string[];
      // inputs?: object;
      sort?: string;
      pageNumber?: number;
      pageSize?: number;
      filters?: { filter: Array<{ key: string; values: string }> };
      fields?: { field: Array<{ key: string; fields: string }> };
    },
    included?: string[],
  ): Promise<any> {
    const queryParams = this.buildQueryParams(additionalFields, included);

    return this.request<any>('GET', '/api/v3/iam/identity_documents', undefined, queryParams);
  }
  /**
   * Get an identity document by ID
   * @param identityDocumentId ID of the identity document to retrieve
   * @param included Optional array of related resources to include (e.g., ['person'])
   * */
  async getIdentityDocumentById(identityDocumentId: string, included?: string[]): Promise<any> {
    const queryParams: Record<string, string | string[]> = {};

    if (included && included.length > 0) {
      queryParams.included = included;
    }

    return this.request<any>('GET', `/api/v3/iam/identity_documents/${identityDocumentId}`, undefined, queryParams);
  }
  /**
   * Update an identity document by ID
   * @param identityDocumentId ID of the identity document to update
   * @param identityDocumentData The updated identity document data
   */
  async updateIdentityDocument(identityDocumentId: string, identityDocumentData: object): Promise<any> {
    return this.request<any>('PATCH', `/api/v3/iam/identity_documents/${identityDocumentId}`, identityDocumentData);
  }

  /**
   * Get a list of person documents
   * @param additionalFields Optional additional fields for filtering and sorting
   * @param included Optional array of related resources to include (e.g., ['person'])
   */
  async getPersonDocumentList(
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

    return this.request<any>('GET', '/api/v3/iam/person_documents', undefined, queryParams);
  }

  /**
   * Create a person document
   * @param personDocumentData The person document data to create
   */
  async createPersonDocument(personDocumentData: object): Promise<any> {
    return this.request<any>('POST', '/api/v3/iam/person_documents', personDocumentData);
  }

  /**
   * Update a person document by ID
   * @param personDocumentId ID of the person document to update
   * @param personDocumentData The updated person document data
   */
  async updatePersonDocument(personDocumentId: string, personDocumentData: object): Promise<any> {
    return this.request<any>('PATCH', `/api/v3/iam/person_documents/${personDocumentId}`, personDocumentData);
  }

  /**
   * Delete a person document by ID
   * @param personDocumentId ID of the person document to delete
   */
  async deletePersonDocument(personDocumentId: string): Promise<any> {
    return this.request<any>('DELETE', `/api/v3/iam/person_documents/${personDocumentId}`);
  }
}
