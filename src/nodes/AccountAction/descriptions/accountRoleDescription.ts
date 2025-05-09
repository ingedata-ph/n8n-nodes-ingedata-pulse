import type { INodeProperties } from 'n8n-workflow';

export const accountRoleOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'accountRole',
        ],
      },
    },
    noDataExpression: true,
    options: [
      {
        name: 'Add New Account Role',
        value: 'addAccountRole',
        description: 'Add a new account role',
        action: 'Add a new account role',
      },
      {
        name: 'Update Account Role',
        value: 'updateAccountRole',
        description: 'Update an existing account role',
        action: 'Update scopes for existing account role',
      },
      {
        name: 'Get Account Role Details',
        value: 'getAccountRoleById',
        description: 'Get specific account role details',
        action: 'Get account role details',
      },
      {
        name: 'Delete Account Role',
        value: 'deleteAccountRole',
        description: 'Delete an account role',
        action: 'Delete account role',
      }
    ],
    default: 'addAccountRole',
  },
]

export const accountRoleFields: INodeProperties[] = [
  {
    displayName: 'Account ID *',
    name: 'account_id',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['addAccountRole'],
        resource: ['accountRole'],
      },
    },
    description: 'The ID of the account',
  },
  {
    displayName: 'Account Role ID *',
    name: 'account_role_id',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['updateAccountRole', 'getAccountRoleById', 'deleteAccountRole'],
        resource: ['accountRole'],
      },
    },
    description: 'The ID of the account role',
  },
  {
    displayName: 'Role Name *',
    name: 'role_name',
    type: 'options',
    options: [
      {
        name: 'Admin',
        value: 'admin',
      },
      {
        name: 'HR Staff',
        value: 'hr_staff',
      },
      {
        name: 'Staff',
        value: 'staff',
      },
      {
        name: 'Lead',
        value: 'lead',
      },
      {
        name: 'Office Manager',
        value: 'office_manager',
      },
      {
        name: 'Production Manager',
        value: 'production_manager',
      },
      {
        name: 'Client',
        value: 'client',
      },
    ],
    default: 'admin',
    required: true,
    displayOptions: {
      show: {
        operation: ['addAccountRole', 'updateAccountRole'],
        resource: ['accountRole'],
      },
    },
    description: 'The name of the role',
  },
  {
    displayName: 'Organization ID *',
    name: 'organization_id',
    type: 'string',
    default: '',
    required: false,
    displayOptions: {
      show: {
        operation: ['addAccountRole'],
        resource: ['accountRole'],
        role_name: ['client'],
      },
    },
    description: 'The ID of the organization (required for Client role)',
  },
  {
    displayName: 'Organizational Unit *',
    name: 'organizational_unit',
    type: 'string',
    default: '',
    required: false,
    displayOptions: {
      show: {
        operation: ['addAccountRole'],
        resource: ['accountRole'],
        role_name: ['office_manager', 'hr_staff', 'production_manager'],
      },
    },
    description: 'The organizational unit (required for Office Manager, HR staff, or Production Manager roles)',
  },
  {
    displayName: 'Project IDs *',
    name: 'project_ids',
    type: 'string',
    default: '',
    required: false,
    displayOptions: {
      show: {
        operation: ['addAccountRole'],
        resource: ['accountRole'],
        role_name: ['lead', 'staff'],
      },
    },
    placeholder: 'project_id_1, project_id_2',
    description: 'The IDs of the projects (required for Lead or Staff roles). Comma-separated list.',
  },
  {
    displayName: 'Include Related Resources',
    name: 'included',
    type: 'multiOptions',
    options: [
      {
        name: 'Account',
        value: 'account',
      },
    ],
    default: [],
    required: false,
    displayOptions: {
      show: {
        operation: ['getAccountRoleById'],
        resource: ['accountRole'],
      },
    },
    description: 'Related resources to include in the response',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: [
          'accountRole',
        ],
        operation: [
          'updateAccountRole',
        ],
      },
    },
    options: [
      {
        displayName: 'Scopes',
        name: 'scopes',
        type: 'string',
        default: '',
        description: 'The scopes for the role. This is a JSON object that specifies the resources and permissions for the role.',
        placeholder: 'e.g., {"project": ["project_id_1", "project_id_2"]}',
      },
    ],
  },
]
