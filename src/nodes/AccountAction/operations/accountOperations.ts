import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { AccountApi } from '../../../utils/api/AccountApi';

export async function getCurrentUser(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: AccountApi,
): Promise<any> {
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  return pulseApi.getCurrentAccount(included);
}

export async function getUserById(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: AccountApi,
): Promise<any> {
  const accountId = executeFunctions.getNodeParameter('accountId', itemIndex) as string;
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  return pulseApi.getAccount(accountId, included);
}

export async function createAccount(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: AccountApi,
): Promise<any> {
  const email = executeFunctions.getNodeParameter('email', itemIndex) as string;
  const account_type = executeFunctions.getNodeParameter('accountType', itemIndex) as string;
  const personId = executeFunctions.getNodeParameter('personId', itemIndex) as string;
  const expires_at = executeFunctions.getNodeParameter('expiresAt', itemIndex, '') as string;
  
  const accountData = {
    data: {
      type: "iam/accounts",
      attributes: {
        email: email,
        account_type: account_type,
        enabled: true,
        expires_at: expires_at ? new Date(expires_at).toISOString() : undefined,
      },
      relationships: {
        person: {
          data: {
            type: "iam/people",
            id: personId
          }
        }
      }
    }
  };
  
  return pulseApi.createAccount(accountData);
}

export async function updateAccountStatus(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: AccountApi,
): Promise<any> {
  const accountId = executeFunctions.getNodeParameter('accountId', itemIndex) as string;
  const enabled = executeFunctions.getNodeParameter('enabled', itemIndex) as boolean;
  
  const attributes: {
    enabled: boolean;
  } = {
    enabled: enabled
  };

  const accountData = {
    data: {
      type: "iam/accounts",
      id: accountId,
      attributes
    }
  };
  
  return pulseApi.updateAccount(accountId, accountData);
}

export async function updateAccount(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: AccountApi,
): Promise<any> {
  const accountId = executeFunctions.getNodeParameter('accountId', itemIndex) as string;
  const email = executeFunctions.getNodeParameter('email', itemIndex) as string;
  const account_type = executeFunctions.getNodeParameter('accountType', itemIndex) as string;
  const expires_at = executeFunctions.getNodeParameter('expiresAt', itemIndex, '') as string;
  
  const accountData = {
    data: {
      type: "iam/accounts",
      id: accountId,
      attributes: {
        email: email,
        account_type: account_type,
        enabled: true,
        expires_at: expires_at ? new Date(expires_at).toISOString() : undefined,
      },
    }
  };
  
  return pulseApi.updateAccount(accountId, accountData);
}
