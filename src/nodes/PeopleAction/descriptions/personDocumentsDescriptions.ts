import type { INodeProperties } from 'n8n-workflow';

export const personDocumentsOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'personDocument',
        ],
      },
    },
    options: [
      {
        name: 'Get Person Document list',
        value: 'getPersonDocumentList',
        description: 'Get a list of person documents',
        action: 'Get person document list',
      },
      {
        name: 'Create Person Document',
        value: 'createPersonDocument',
        description: 'Create a new person document',
        action: 'Create person document',
      },
      {
        name: 'Update Person Document',
        value: 'updatePersonDocument',
        description: 'Update a person document',
        action: 'Update person document',
      },
      {
        name: 'Delete Person Document',
        value: 'deletePersonDocument',
        description: 'Delete a person document',
        action: 'Delete person document',
      },
    ],
    default: 'getPersonDocumentList',
    noDataExpression: true,
  },
];

export const personDocumentsFields: INodeProperties[] = [
  {
    displayName: 'Person ID *',
    name: 'personId',
    type: 'number',
    default: 0,
    required: true,
    displayOptions: {
      show: {
        operation: ['createPersonDocument'],
        resource: ['personDocument'],
      },
    },
    description: 'The ID of the person to create the document for',
  },
  {
    displayName: 'Document Type *',
    name: 'documentType',
    type: 'options',
    options: [
      {
        name: 'ID Card',
        value: 'id',
      },
      {
        name: 'Duplicata',
        value: 'duplicata',
      },
      {
        name: 'Passport',
        value: 'passport',
      },
      {
        name: 'Driving License',
        value: 'driving_license',
      },
      {
        name: 'ID CNaPs',
        value: 'health_insurance',
      },
      {
        name: 'Resume',
        value: 'resume',
      },
      {
        name: 'Others',
        value: 'other',
      },
    ],
    default: 'id',
    required: true,
    displayOptions: {
      show: {
        operation: ['createPersonDocument'],
        resource: ['personDocument'],
      },
    },
    description: 'The type of the document',
  },
  {
    displayName: 'URL',
    name: 'url',
    type: 'string',
    default: '',
    required: false,
    displayOptions: {
      show: {
        operation: ['createPersonDocument'],
        resource: ['personDocument'],
      },
    },
    description: 'The URL of the document',
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    default: '',
    required: false,
    displayOptions: {
      show: {
        operation: ['createPersonDocument'],
        resource: ['personDocument'],
      },
    },
    description: 'The name of the document',
  },
  {
    displayName: 'Issued Place',
    name: 'issuedPlace',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        operation: ['createPersonDocument'],
        resource: ['personDocument'],
        documentType: ['id', 'duplicata', 'passport', 'driving_license', 'health_insurance', 'other'],
      },
    },
    description: 'The place where the document was issued',
  },
  {
    displayName: 'Issued Date',
    name: 'issuedDate',
    type: 'dateTime',
    default: '',
    displayOptions: {
      show: {
        operation: ['createPersonDocument'],
        resource: ['personDocument'],
        documentType: ['id', 'duplicata', 'passport', 'driving_license', 'health_insurance', 'other'],
      },
    },
    description: 'The date when the document was issued',
  },
  {
    displayName: 'Expiration Date',
    name: 'expirationDate',
    type: 'dateTime',
    default: '',
    displayOptions: {
      show: {
        operation: ['createPersonDocument'],
        resource: ['personDocument'],
        documentType: ['id', 'duplicata', 'passport', 'driving_license', 'health_insurance', 'other'],
      },
    },
    description: 'The expiration date of the document',
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
        operation: ['getPersonDocumentList'],
        resource: ['personDocument'],
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
        resource: ['personDocument'],
        operation: ['getPersonDocumentList'],
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
                placeholder: 'e.g., person_id',
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
                placeholder: 'e.g., iam/person_documents',
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
    displayName: 'Person Document ID *',
    name: 'personDocumentId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['updatePersonDocument', 'deletePersonDocument'],
        resource: ['personDocument'],
      },
    },
    description: 'The ID of the person document to update or delete',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        operation: ['updatePersonDocument'],
        resource: ['personDocument'],
      },
    },
    description: 'Fields to update in the person document',
    options: [
      {
        displayName: 'Document Type',
        name: 'documentType',
        type: 'options',
        options: [
          {
            name: 'ID Card',
            value: 'id',
          },
          {
            name: 'Duplicata',
            value: 'duplicata',
          },
          {
            name: 'Passport',
            value: 'passport',
          },
          {
            name: 'Driving License',
            value: 'driving_license',
          },
          {
            name: 'ID CNaPs',
            value: 'health_insurance',
          },
          {
            name: 'Resume',
            value: 'resume',
          },
          {
            name: 'Others',
            value: 'other',
          },
        ],
        default: 'id',
        description: 'The type of the document',
      },
      {
        displayName: 'URL',
        name: 'url',
        type: 'string',
        default: '',
        description: 'The URL of the document',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'The name of the document',
      },
      {
        displayName: 'Issued Place',
        name: 'issuedPlace',
        type: 'string',
        default: '',
        description: 'The place where the document was issued',
      },
      {
        displayName: 'Issued Date',
        name: 'issuedDate',
        type: 'dateTime',
        default: '',
        description: 'The date when the document was issued',
      },
      {
        displayName: 'Expiration Date',
        name: 'expirationDate',
        type: 'dateTime',
        default: '',
        description: 'The expiration date of the document',
      },
    ],
  },
];
