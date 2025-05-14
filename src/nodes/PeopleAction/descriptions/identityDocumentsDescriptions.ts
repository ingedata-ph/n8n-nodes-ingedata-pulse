import type { INodeProperties } from 'n8n-workflow';

export const identityDocumentsOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'identityDocument',
        ],
      },
    },
    options: [
      {
        name: 'Get Identity Document list',
        value: 'getIdentityDocumentList',
        description: 'Get a list of identity documents',
        action: 'Get identity document list',
      },
      {
        name: 'Create Identity Document',
        value: 'createIdentityDocument',
        description: 'Create a new identity document',
        action: 'Create identity document',
      },
      {
        name: 'Show Identity Document details info',
        value: 'getIdentityDocumentById',
        description: 'Show identity document details info',
        action: 'Show identity document details',
      },
      {
        name: 'Update Identity Document',
        value: 'updateIdentityDocument',
        description: 'Update an identity document details',
        action: 'Update identity document',
      },
    ],
    default: 'getIdentityDocumentList',
    noDataExpression: true,
  },
];

export const identityDocumentsFields: INodeProperties[] = [
  {
    displayName: 'Person ID *',
    name: 'personId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createIdentityDocument'],
        resource: ['identityDocument'],
      },
    },
    description: 'The ID of the person to create the identity document for',
  },
  {
    displayName: 'Include Related Resources',
    name: 'included',
    type: 'multiOptions',
    options: [
      {
        name: 'Person',
        value: 'person',
      },
    ],
    default: [],
    required: false,
    displayOptions: {
      show: {
        operation: ['getIdentityDocumentList', 'getIdentityDocumentById'],
        resource: ['identityDocument'],
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
        resource: ['identityDocument'],
        operation: ['getIdentityDocumentList'],
      },
    },
    description: 'Additional fields to include in the request',
    options: [
      {
        displayName: 'Sort',
        name: 'sort',
        type: 'string',
        default: '',
        description: 'The sort order to use in the request',
      },
      {
        displayName: 'Page Number',
        name: 'pageNumber',
        type: 'number',
        default: 1,
        description: 'Pagination - page number',
      },
      {
        displayName: 'Page Size',
        name: 'pageSize',
        type: 'number',
        default: 10,
        description: 'Pagination - page size',
      },
      {
        displayName: 'Filters',
        name: 'filters',
        type: 'fixedCollection',
        typeOptions: {
          multipleValues: true,
        },
        description: 'The filters to use in the request',
        default: {},
        options: [
          {
            name: 'filter',
            displayName: 'Filter Values',
            values: [
              {
                displayName: 'Filter Key',
                name: 'key',
                type: 'string',
                default: '',
                placeholder: 'e.g., organization_id',
              },
              {
                displayName: 'Values',
                name: 'values',
                type: 'string',
                default: '',
                placeholder: 'Comma-separated values (e.g., 1,2,3)',
              },
            ],
          },
        ],
      },
      {
        displayName: 'Fields',
        name: 'fields',
        type: 'fixedCollection',
        typeOptions: {
          multipleValues: true,
        },
        description: 'The fields to use in the request',
        default: {},
        options: [
          {
            displayName: 'Field',
            name: 'field',
            values: [
              {
                displayName: 'Field Key',
                name: 'key',
                type: 'string',
                default: '',
                placeholder: 'e.g., iam/organizations/people_directories',
              },
              {
                displayName: 'Fields',
                name: 'fields',
                type: 'string',
                default: '',
                placeholder: 'Comma-separated field names (e.g., id,name)',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    displayName: 'Identity Document ID *',
    name: 'identityDocumentId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['getIdentityDocumentById', 'updateIdentityDocument'],
        resource: ['identityDocument'],
      },
    },
    description: 'The ID of the identity document to retrieve or update',
  },
  {
    displayName: 'Identity Document Type *',
    name: 'identityDocumentType',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createIdentityDocument'],
        resource: ['identityDocument'],
      },
    },
    description: 'The type of the identity document to create or update',
    placeholder: 'e.g., passport, driver_license, national_id, etc.',
  },
  {
    displayName: 'Identity Document Number *',
    name: 'identityDocumentNumber',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createIdentityDocument'],
        resource: ['identityDocument'],
      },
    },
    description: 'The Serial number of the identity document to create',
  },
  {
    displayName: 'Issue Place *',
    name: 'issuePlace',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createIdentityDocument'],
        resource: ['identityDocument'],
      },
    },
    description: 'The place where the identity document was issued',
  },
  {
    displayName: 'Issue Date *',
    name: 'issueDate',
    type: 'dateTime',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createIdentityDocument'],
        resource: ['identityDocument'],
      },
    },
    description: 'The issue date of the identity document',
  },
  {
    displayName: 'Expiration Date *',
    name: 'expirationDate',
    type: 'dateTime',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createIdentityDocument'],
        resource: ['identityDocument'],
      },
    },
    description: 'The expiration date of the identity document to create',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        operation: ['updateIdentityDocument'],
        resource: ['identityDocument'],
      },
    },
    description: 'Fields to update in the identity document',
    options: [
      {
        displayName: 'Identity Document Type',
        name: 'identityDocumentType',
        type: 'string',
        default: '',
        description: 'The type of the identity document to update',
        placeholder: 'e.g., passport, driver_license, national_id, etc.', 
      },
      {
        displayName: 'Identity Document Number',
        name: 'identityDocumentNumber',
        type: 'string',
        default: '',
        description: 'The Serial number of the identity document to update',
      },
      {
        displayName: 'Issue Place',
        name: 'issuePlace',
        type: 'string',
        default: '',
        description: 'The place where the identity document was issued',
      },
      {
        displayName: 'Issue Date',
        name: 'issueDate',
        type: 'dateTime',
        default: '',
        description: 'The issue date of the identity document to update',
      },
      {
        displayName: 'Expiration Date',
        name: 'expirationDate',
        type: 'dateTime',
        default: '',
        description: 'The expiration date of the identity document to update',
      },
    ],
  },
];
