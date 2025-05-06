import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { AccountApi } from '../../../utils/api/AccountApi';

export async function addAccountRole(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: AccountApi,
): Promise<any> {
  const account_id = executeFunctions.getNodeParameter('account_id', itemIndex) as string;
  const role_name = executeFunctions.getNodeParameter('role_name', itemIndex) as string;

  // Prepare scopes based on role
  let scopes = {};
  // ToDo: add validation of the fields
  if (role_name === 'client') {
    const organization_id = executeFunctions.getNodeParameter('organization_id', itemIndex, '') as string;
    if (organization_id) {
      organization_id.split(',').map(id => id.trim());
      scopes = { organization: organization_id.split(',').map(id => id.trim()) };
    }
  } else if (['office_manager', 'hr_staff', 'production_manager'].includes(role_name)) {
    const organizational_unit = executeFunctions.getNodeParameter('organizational_unit', itemIndex, '') as string;
    if (organizational_unit) {
      scopes = { ou: organizational_unit.split(',').map(id => id.trim()) };
    }
  } else if (['lead', 'staff'].includes(role_name)) {
    const project_ids_str = executeFunctions.getNodeParameter('project_ids', itemIndex, '') as string;
    if (project_ids_str) {
      scopes = { project: project_ids_str.split(',').map(id => id.trim()) };
    }
  }

  const roleData = {
    data: {
      type: "iam/account/roles",
      attributes: {
        name: role_name,
        scopes: scopes,
      },
      relationships: {
        account: {
          data: {
            type: "iam/accounts",
            id: account_id
          }
        }
      }
    }
  };

  return pulseApi.createAccountRole(roleData);
}

export async function getAccountRoleById(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: AccountApi,
): Promise<any> {
  const account_role_id = executeFunctions.getNodeParameter('account_role_id', itemIndex) as string;
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];

  return pulseApi.getAccountRoleById(account_role_id, included);
}

export async function updateAccountRole(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: AccountApi,
): Promise<any> {
  const account_role_id = executeFunctions.getNodeParameter('account_role_id', itemIndex) as string;
  const role_name = executeFunctions.getNodeParameter('role_name', itemIndex) as string;

  const additionalFields = executeFunctions.getNodeParameter('additionalFields', itemIndex, {}) as IDataObject;
  let scopesRaw = additionalFields.scopes as string;

  let scopes : IDataObject

  if (typeof scopesRaw === 'string') {
    try {
      scopes = JSON.parse(scopesRaw);
    } catch (error) {
      throw new Error(`Error parsing scopes: ${error}`);
    }
  } else if (typeof scopesRaw === 'object' && scopesRaw !== null) {
    scopes = scopesRaw as IDataObject;
  } else {
    throw new Error('Scopes must be an object or a JSON-formatted string');
  }

  let scopes_value;
  // Prepare scopes based on role
  if (role_name === 'client' && scopes['organization']) {
    scopes_value = {
      organization: scopes['organization']
    }
  } else if (['office_manager', 'hr_staff', 'production_manager'].includes(role_name) && scopes['ou']) {
    scopes_value = {
      ou: scopes['ou']
    }
  } else if (['lead', 'staff'].includes(role_name) && scopes['project']) {
    scopes_value = {
      project: scopes['project']
    };
  } else {
    throw new Error('Invalid role or scopes provided');
  }

  const roleData = {
    data: {
      type: "iam/account/roles",
      attributes: {
        scopes: scopes_value,
      },
    }
  };

  return pulseApi.updateAccountRole(account_role_id, roleData);
}

export async function deleteAccountRole(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: AccountApi,
): Promise<any> {
  const account_role_id = executeFunctions.getNodeParameter('account_role_id', itemIndex) as string;
  return pulseApi.deleteAccountRole(account_role_id);
}
