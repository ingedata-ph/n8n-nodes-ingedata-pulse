import type { INodeProperties } from 'n8n-workflow';

export const talentOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'talent',
        ],
      },
    },
    options: [
      {
        name: 'Get Talent List',
        value: 'getTalentList',
        description: 'Get a list of talents',
        action: 'Get talent list',
      },
      {
        name: 'Create Talent',
        value: 'createTalent',
        description: 'Create a new talent for one person',
        action: 'Create talent',
      },
      {
        name: 'Show Talent details',
        value: 'getTalentById',
        description: 'Show a talent details',
        action: 'Show talent details',
      },
      {
        name: 'Query Talent',
        value: 'queryTalent',
        description: 'Search for talents by making a query',
        action: 'Query talent',
      }
    ],
    default: 'getTalentList',
    noDataExpression: true,
  },
];

export const talentFields: INodeProperties[] = [
  {
    displayName: 'Talent ID',
    name: 'talentId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['getTalentById'],
        resource: ['talent'],
      },
    },
    description: 'The ID of the talent to get or update',
  },
  {
    displayName: "Upload Resume",
    name: "fromResume",
    type: "boolean",
    default: true,
    displayOptions: {
      show: {
        operation: ['createTalent'],
        resource: ['talent'],
      },
    },
    description: "If true, the talent will be created from a resume. If false, need to add person Id.",
  },
  {
    displayName: 'Organizational Unit',
    name: 'organizationalUnit',
    type: 'string',
    default: 'MG',
    required: true,
    displayOptions: {
      show: {
        operation: ['createTalent'],
        resource: ['talent'],
        fromResume: [true],
      },
    },
    description: 'The organizational unit to associate with this talent',
  },
  {
    displayName: 'Resume URL',
    name: 'resumeUrl',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createTalent'],
        resource: ['talent'],
        fromResume: [true],
      },
    },
    description: 'The URL of the talent\'s resume',
  },
  {
    displayName: 'Mime Type',
    name: 'mimeType',
    type: 'string',
    default: 'application/pdf',
    required: true,
    displayOptions: {
      show: {
        operation: ['createTalent'],
        resource: ['talent'],
        fromResume: [true],
      },
    },
    description: 'The MIME type of the uploaded resume, e.g., application/pdf',
  },
  {
    displayName: 'Person ID',
    name: 'personId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createTalent'],
        resource: ['talent'],
        fromResume: [false],
      },
    },
    description: 'The ID of the person to associate with this talent',
  },
  {
    displayName: 'Query',
    name: 'queryPrompt',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['queryTalent'],
        resource: ['talent'],
      },
    },
    description: 'The query string to search for talents',
  },
];
