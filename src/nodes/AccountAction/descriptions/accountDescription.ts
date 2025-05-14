import type { INodeProperties } from 'n8n-workflow';

export const accountOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'account',
        ],
      },
    },
    noDataExpression: true,
    options: [
      {
        name: 'Get Current User',
        value: 'getCurrentUser',
        description: 'Get the current authenticated user account information',
        action: 'Get current user account information',
      },
      {
        name: 'Get User Account details',
        value: 'getUserAccountById',
        description: 'Get an user account details',
        action: 'Get user account details',
      },
      {
        name: 'Create new User Account',
        value: 'createAccount',
        description: 'Create a new user account',
        action: 'Create new user account',
      },
      {
        name: 'Activate/Deactivate Account',
        value: 'updateAccountStatus',
        description: 'Activate or deactivate an account',
        action: 'Update account status',
      },
      {
        name: 'Update User Account',
        value: 'updateAccount',
        description: 'Update an account',
        action: 'Update account',
      }
    ],
    default: 'getCurrentUser',
  },
];

export const accountFields: INodeProperties[] = [
  {
    displayName: 'Include Related Resources',
    name: 'included',
    type: 'multiOptions',
    options: [
      {
        name: 'Person',
        value: 'person',
      },
      {
        name: 'Roles',
        value: 'roles',
      },
    ],
    default: [],
    required: false,
    displayOptions: {
      show: {
        operation: ['getCurrentUser', 'getUserAccountById'],
        resource: ['account'],
      },
    },
    description: 'Related resources to include in the response',
  },
  {
    displayName: 'Account ID *',
    name: 'accountId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['getUserAccountById', 'updateAccountStatus', 'updateAccount'],
        resource: ['account'],
      },
    },
    description: 'The ID of the account to get/update',
  },
  {
    displayName: 'Email *',
    name: 'email',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createAccount', 'updateAccount'],
        resource: ['account'],
      }
    },
    description: 'The email address of the new user account',
  },
  {
    displayName: 'Account type *',
    name: 'accountType',
    type: 'options',
    required: true,
    options: [
      {
        name: 'Personal Account',
        value: 'personal_account',
      },
      {
        name: 'Service Account',
        value: 'service_account',
      },
      {
        name: 'Local Account',
        value: 'local_account',
      },
    ],
    default: 'personal_account',
    displayOptions: {
      show: {
        operation: ['createAccount', 'updateAccount'],
        resource: ['account'],
      },
    },
    description: 'The type of account to create',
  },
  {
    displayName: 'Person ID *',
    name: 'personId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createAccount'],
        resource: ['account'],
      },
    },
    description: 'The ID of the person to associate with this account',
  },
  {
    displayName: 'Status *',
    name: 'enabled',
    type: 'boolean',
    default: true,
    required: true,
    displayOptions: {
      show: {
        operation: ['updateAccountStatus'],
        resource: ['account'],
      },
    },
    description: 'Whether the account should be enabled or disabled',
    typeOptions: {
      labelTrue: 'Activate',
      labelFalse: 'Deactivate',
    },
  },
  {
    displayName: 'Expired At',
    name: 'expiresAt',
    type: 'dateTime',
    default: '',
    required: false,
    displayOptions: {
      show: {
        operation: ['updateAccount', 'createAccount'],
        resource: ['account'],
      },
    },
    description: 'The expiration date of the account',
    typeOptions: {
      dateOnly: true
    },
  },
];
