import type { INodeProperties } from 'n8n-workflow';

export const candidateOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'candidates',
        ],
      },
    },
    noDataExpression: true,
    options: [
      {
        name: 'Create Candidate',
        value: 'createCandidate',
        description: 'Create a new candidate',
        action: 'Create a new candidate',
      },
      {
        name: 'Update Candidate',
        value: 'updateCandidate',
        description: 'Update an existing candidate',
        action: 'Update a candidate',
      },
      {
        name: 'Get Candidate',
        value: 'getCandidateById',
        description: 'Get a specific candidate',
        action: 'Get a candidate',
      },
      {
        name: 'List Candidates',
        value: 'getCandidatesList',
        description: 'List candidates',
        action: 'List candidates',
      },
    ],
    default: 'createCandidate',
  },
];

export const candidateFields: INodeProperties[] = [
  {
    displayName: 'Candidate ID',
    name: 'candidateId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['candidates'],
        operation: ['getCandidateById', 'updateCandidate'],
      },
    },
    description: 'The ID of the candidate',
  },
  {
    displayName: 'New Person',
    name: 'newPerson',
    type: 'boolean',
    default: true,
    required: true,
    displayOptions: {
      show: {
        resource: ['candidates'],
        operation: ['createCandidate'],
      },
    },
    description: 'Whether to create a new person or use an existing one',
  },
  {
    displayName: 'Person ID',
    name: 'personId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['candidates'],
        operation: ['createCandidate'],
        newPerson: [false],
      },
    },
    description: 'The ID of the existing person',
  },
  {
    displayName: 'First Name',
    name: 'firstName',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['candidates'],
        operation: ['createCandidate'],
        newPerson: [true],
      },
    },
    description: 'The first name of the person',
  },
  {
    displayName: 'First Name',
    name: 'firstName',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['candidates'],
        operation: ['updateCandidate'],
      },
    },
    description: 'The first name of the person',
  },
  {
    displayName: 'Middle Name',
    name: 'middleName',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['candidates'],
        operation: ['createCandidate'],
        newPerson: [true],
      },
    },
    description: 'The middle name of the person',
  },
  {
    displayName: 'Middle Name',
    name: 'middleName',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['candidates'],
        operation: ['updateCandidate'],
      },
    },
    description: 'The middle name of the person',
  },
  {
    displayName: 'Last Name',
    name: 'lastName',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['candidates'],
        operation: ['updateCandidate'],
      },
    },
    description: 'The last name of the person',
  },
  {
    displayName: 'Last Name',
    name: 'lastName',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['candidates'],
        operation: ['createCandidate'],
        newPerson: [true],
      },
    },
    description: 'The last name of the person',
  },
  {
    displayName: 'Organizational Unit',
    name: 'organizationalUnit',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['candidates'],
        operation: ['createCandidate'],
        newPerson: [true],
      },
    },
    description: 'The organizational unit of the person',
  },
  {
    displayName: 'Picture URL',
    name: 'pictureUrl',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['candidates'],
        operation: ['createCandidate'],
        newPerson: [true],
      },
    },
    description: 'The URL of the person\'s picture',
  },
  {
    displayName: 'Organizational Unit',
    name: 'organizationalUnit',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['candidates'],
        operation: ['updateCandidate'],
      },
    },
    description: 'The organizational unit of the person',
  },
  {
    displayName: 'Picture URL',
    name: 'pictureUrl',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['candidates'],
        operation: ['updateCandidate'],
      },
    },
    description: 'The URL of the person\'s picture',
  }
];
