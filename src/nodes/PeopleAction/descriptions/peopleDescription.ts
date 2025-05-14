import type { INodeProperties } from 'n8n-workflow';

export const peopleOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'people',
        ],
      },
    },
    options: [
      {
        name: 'Get People list',
        value: 'getPeopleList',
        description: 'Get a list of people',
        action: 'Get people list',
      },
      {
        name: 'Create Person',
        value: 'createPerson',
        description: 'Create a new person',
        action: 'Create person',
      },
      {
        name: 'Show Person details info',
        value: 'getPersonById',
        description: 'Show person details info',
        action: 'Show person details',
      },
      {
        name: 'Update Person',
        value: 'updatePerson',
        description: 'Update a person details',
        action: 'Update person',
      },
    ],
    default: 'getPeopleList',
    noDataExpression: true,
  },
];

export const peopleFields: INodeProperties[] = [
  {
    displayName: 'Person ID *',
    name: 'personId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['getPersonById', 'updatePerson'],
        resource: ['people'],
      },
    },
    description: 'The ID of the person to get or update',
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
        operation: ['getPeopleList', 'getPersonById'],
        resource: ['people'],
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
        resource: ['people'],
        operation: ['getPeopleList'],
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
    displayName: 'First Name *',
    name: 'firstName',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createPerson', 'updatePerson'],
        resource: ['people'],
      },
    },
    description: 'The first name of the person to create',
  },
  {
    displayName: 'Middle Name',
    name: 'middleName',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        operation: ['createPerson', 'updatePerson'],
        resource: ['people'],
      },
    },
    description: 'The middle name of the person to create',
  },
  {
    displayName: 'Last Name *',
    name: 'lastName',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createPerson', 'updatePerson'],
        resource: ['people'],
      },
    },
    description: 'The last name of the person to create',
  },
  {
    displayName: 'Gender',
    name: 'gender',
    type: 'options',
    options: [
      {
        name: 'Male',
        value: 'male',
      },
      {
        name: 'Female',
        value: 'female',
      },
    ],
    default: 'male',
    displayOptions: {
      show: {
        operation: ['createPerson', 'updatePerson'],
        resource: ['people'],
      },
    },
    description: 'The gender of the person to create',
  },
  {
    displayName: 'Birthday',
    name: 'birthday',
    type: 'dateTime',
    default: '',
    displayOptions: {
      show: {
        operation: ['createPerson', 'updatePerson'],
        resource: ['people'],
      },
    },
    description: 'The birthday of the person to create',
  },
  {
    displayName: 'Relationship Status',
    name: 'relationshipStatus',
    type: 'options',
    options: [
      {
        name: 'Single',
        value: 'single',
      },
      {
        name: 'Married',
        value: 'married',
      },
    ],
    default: 'single',
    displayOptions: {
      show: {
        operation: ['createPerson', 'updatePerson'],
        resource: ['people'],
      },
    },
    description: 'The relationship status of the person to create',
  },
  {
    displayName: 'Number of Kids',
    name: 'numberOfKids',
    type: 'number',
    typeOptions: {
      minValue: 0,
    },
    default: 0,
    displayOptions: {
      show: {
        operation: ['createPerson', 'updatePerson'],
        resource: ['people'],
      },
    },
    description: 'The number of kids of the person to create',
  },
  {
    displayName: 'Secondary Email',
    name: 'secondaryEmail',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        operation: ['createPerson', 'updatePerson'],
        resource: ['people'],
      },
    },
    description: 'The secondary email of the person to create',
  },
  {
    displayName: 'Phone Number',
    name: 'contactNumber',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        operation: ['createPerson', 'updatePerson'],
        resource: ['people'],
      },
    },
    description: 'The phone number of the person to create',
  },
  {
    displayName: 'Address',
    name: 'address',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        operation: ['createPerson', 'updatePerson'],
        resource: ['people'],
      },
    },
    description: 'The address of the person to create',
  },
  {
    displayName: 'Organizational Unit *',
    name: 'organizationalUnit',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createPerson', 'updatePerson'],
        resource: ['people'],
      },
    },
    description: 'The organizational unit of the person to create',
  },
];
