import type { INodeProperties } from 'n8n-workflow';

export const organizationsOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'organizations',
        ],
      },
    },
    noDataExpression: true,
    options: [
      {
        name: 'Create Organization',
        value: 'createOrganization',
        description: 'Create a new organization',
        action: 'Create a new organization',
      },
      {
        name: 'Update Organization',
        value: 'updateOrganization',
        description: 'Update an existing organization',
        action: 'Update an organization',
      },
      {
        name: 'Enable/Disable Organization Status',
        value: 'updateOrganizationStatus',
        description: 'Enable or disable an organization',
        action: 'Update an organization status',
      },
    ],
    default: 'createOrganization',
  },
];

export const organizationsFields: INodeProperties[] = [
  {
    displayName: 'Organization ID',
    name: 'organizationId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['organizations'],
        operation: ['updateOrganization', 'updateOrganizationStatus'],
      },
    },
    description: 'The ID of the organization to update',
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['organizations'],
        operation: ['createOrganization', 'updateOrganization'],
      },
    },
    description: 'The name of the organization',
  },
  {
    displayName: 'Enabled',
    name: 'enabled',
    type: 'boolean',
    default: true,
    required: true,
    displayOptions: {
      show: {
        resource: ['organizations'],
        operation: ['createOrganization', 'updateOrganizationStatus'],
      },
    },
    description: 'Whether the organization is enabled',
  },
];
