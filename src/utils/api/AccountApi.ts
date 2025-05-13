import { ICredentialDataDecryptedObject } from 'n8n-workflow';
import { BasePulseApi } from './BasePulseApi';

export class AccountApi extends BasePulseApi {
  constructor(credentials: ICredentialDataDecryptedObject) {
    super(credentials);
  }

  /**
   * Get account information for a user
   * @param userId ID of the user account to retrieve
   * @param included Optional array of related resources to include
   */
  async getAccount(userId: string, included?: string[]): Promise<any> {
    const queryParams: Record<string, string | string[]> = {};
    
    if (included && included.length > 0) {
      queryParams.included = included;
    }
    
    return this.request<any>('GET', `/api/v3/iam/accounts/${userId}`, undefined, queryParams);
  }

  /**
   * Get current user account information
   * @param included Optional array of related resources to include
   */
  async getCurrentAccount(included?: string[]): Promise<any> {
    const queryParams: Record<string, string | string[]> = {};
    
    if (included && included.length > 0) {
      queryParams.included = included;
    }
    
    return this.request<any>('GET', '/api/v3/iam/accounts/me', undefined, queryParams);
  }

  /**
   * Create a new account
   */
  async createAccount(accountData: object): Promise<any> {
    return this.request<any>('POST', '/api/v3/iam/accounts', accountData);
  }

  /**
   * Update an account
   */
  async updateAccount(accountId: string, accountData: object): Promise<any> {
    return this.request<any>('PATCH', `/api/v3/iam/accounts/${accountId}`, accountData);
  }

  /**
   * Create a new account role
   */
  async createAccountRole(roleData: object): Promise<any> {
    return this.request<any>('POST', '/api/v3/iam/account_roles', roleData);
  }

  /**
   * Update an account role
   */
  async updateAccountRole(roleId: string, roleData: object): Promise<any> {
    return this.request<any>('PATCH', `/api/v3/iam/account_roles/${roleId}`, roleData);
  }

  /**
   * Get a role by ID
   * @param roleId ID of the role to retrieve
   * @param included Optional array of related resources to include (e.g., ['account'])
   */
  async getAccountRoleById(roleId: string, included?: string[]): Promise<any> {
    const queryParams: Record<string, string | string[]> = {};

    if (included && included.length > 0) {
      queryParams.included = included;
    }

    return this.request<any>('GET', `/api/v3/iam/account_roles/${roleId}`, undefined, queryParams);
  }

  /**
   * Delete an account role by ID
   */
  async deleteAccountRole(accountRoleId: string): Promise<any> {
    return this.request<any>('DELETE', `/api/v3/iam/account_roles/${accountRoleId}`);
  }
}
