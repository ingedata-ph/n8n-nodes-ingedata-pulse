import type { INodeProperties } from 'n8n-workflow';

export const peopleDirectoriesOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'peopleDirectories',
        ],
      },
    },
    noDataExpression: true,
    options: [
      {
        name: 'Create People Directory',
        value: 'createPeopleDirectory',
        description: 'Create a new people directory entry',
        action: 'Create a new people directory entry',
      },
      {
        name: 'Update People Directory',
        value: 'updatePeopleDirectory',
        description: 'Update an existing people directory entry',
        action: 'Update a people directory entry',
      },
      {
        name: 'Delete People Directory',
        value: 'deletePeopleDirectory',
        description: 'Delete a people directory entry',
        action: 'Delete a people directory entry',
      },
      {
        name: 'Get People Directory',
        value: 'getPeopleDirectoryById',
        description: 'Get a specific people directory entry',
        action: 'Get a people directory entry',
      },
      {
        name: 'List People Directories',
        value: 'listPeopleDirectories',
        description: 'List people directory entries',
        action: 'List people directory entries',
      },
    ],
    default: 'createPeopleDirectory',
  },
];

export const peopleDirectoriesFields: INodeProperties[] = [
  {
    displayName: 'Person ID',
    name: 'person_id',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['peopleDirectories'],
        operation: ['createPeopleDirectory', 'updatePeopleDirectory'],
      },
    },
    description: 'The ID of the person',
  },
  {
    displayName: 'Organization ID',
    name: 'organization_id',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['peopleDirectories'],
        operation: ['createPeopleDirectory', 'updatePeopleDirectory'],
      },
    },
    description: 'The ID of the organization',
  },
  {
    displayName: 'People Directory ID',
    name: 'peopleDirectoryId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['peopleDirectories'],
        operation: ['updatePeopleDirectory', 'deletePeopleDirectory', 'getPeopleDirectoryById'],
      },
    },
    description: 'The ID of the people directory entry',
  },
  {
    displayName: 'Tag',
    name: 'tag',
    type: 'options',
    options: [
      {
        name: 'Production',
        value: 'production',
      },
      {
        name: 'Account Management',
        value: 'account',
      },
      {
        name: 'Client',
        value: 'client',
      },
    ],
    default: 'production',
    required: true,
    displayOptions: {
      show: {
        resource: ['peopleDirectories'],
        operation: ['createPeopleDirectory', 'updatePeopleDirectory'],
      },
    },
    description: 'The tag for the people directory entry',
  },
  {
    displayName: 'Position',
    name: 'position',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getPositionsBasedOnTag',
      loadOptionsDependsOn: ['tag'],
      disabled: [
        {
          condition: {
            tag: [''],
          },
        },
      ],
    },
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['peopleDirectories'],
        operation: ['createPeopleDirectory', 'updatePeopleDirectory'],
      },
    },
    description: 'The position for the people directory entry',
    placeholder: 'Select a people directory position',
  },
  {
    displayName: 'Project IDs',
    name: 'project_ids',
    type: 'string',
    default: '',
    required: false,
    displayOptions: {
      show: {
        resource: ['peopleDirectories'],
        operation: ['createPeopleDirectory', 'updatePeopleDirectory'],
      },
    },
    placeholder: 'project_id_1, project_id_2',
    description: 'The IDs of the projects. Comma-separated list.',
  },
  {
    displayName: 'Other Contacts',
    name: 'otherContactsUi',
    placeholder: 'Add Other Contact',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    displayOptions: {
      show: {
        resource: ['peopleDirectories'],
        operation: ['createPeopleDirectory', 'updatePeopleDirectory'],
      },
    },
    options: [
      {
        name: 'otherContactsValues',
        displayName: 'Other Contact',
        values: [
          {
            displayName: 'Contact Type',
            name: 'key',
            type: 'string',
            default: '',
            description: 'Contact type (e.g., slack, whatsapp, email)',
          },
          {
            displayName: 'Contact Value',
            name: 'value',
            type: 'string',
            default: '',
            description: 'Contact value (e.g., URL, phone number)',
          },
        ],
      },
    ],
    description: 'Other contact information',
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
      {
        name: 'Organization',
        value: 'organization',
      },
    ],
    default: [],
    required: false,
    displayOptions: {
      show: {
        operation: ['getPeopleDirectoryById', 'listPeopleDirectories'],
        resource: ['peopleDirectories'],
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
        resource: ['peopleDirectories'],
        operation: ['listPeopleDirectories'],
      },
    },
    options: [
      {
        displayName: 'Sort',
        name: 'sort',
        type: 'string',
        default: '',
        description: 'Sort order (e.g., "created_at" or "-created_at" for descending)',
      },
      {
        displayName: 'Filters',
        name: 'filters',
        placeholder: 'Add Filter',
        type: 'fixedCollection',
        typeOptions: {
          multipleValues: true,
        },
        default: {},
        options: [
          {
            name: 'filter',
            displayName: 'Filter',
            values: [
              {
                displayName: 'Key',
                name: 'key',
                type: 'string',
                default: '',
                description: 'The key to filter on',
              },
              {
                displayName: 'Values',
                name: 'values',
                type: 'string',
                default: '',
                description: 'Comma-separated list of values',
              },
            ],
          },
        ],
        description: 'Filter results by specific fields',
      },
      {
        displayName: 'Fields',
        name: 'fields',
        placeholder: 'Add Field',
        type: 'fixedCollection',
        typeOptions: {
          multipleValues: true,
        },
        default: {},
        options: [
          {
            name: 'field',
            displayName: 'Field',
            values: [
              {
                displayName: 'Resource Type',
                name: 'key',
                type: 'string',
                default: '',
                description: 'The resource type to specify fields for',
              },
              {
                displayName: 'Fields',
                name: 'fields',
                type: 'string',
                default: '',
                description: 'Comma-separated list of fields to include',
              },
            ],
          },
        ],
        description: 'Specify which fields to include in the response',
      },
    ],
  },
];
