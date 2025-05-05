import type { INodeProperties } from 'n8n-workflow';

export const quizzSessionOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'quizzSessions',
        ],
      },
    },
    noDataExpression: true,
    options: [
      {
        name: 'Create Quizz Session',
        value: 'createQuizzSession',
        description: 'Create a new quizz session for candidates',
        action: 'Create a new quizz session for candidates',
      },
      {
        name: 'Update Quizz Session',
        value: 'updateQuizzSession',
        description: 'Update an existing quizz session',
        action: 'Update a quizz session',
      },
      {
        name: 'Cancel Quizz Session',
        value: 'cancelQuizzSession',
        description: 'Cancel candidate quizz session',
        action: 'Cancel candidate quizz session',
      },
      {
        name: 'Get Quizz Session',
        value: 'getQuizzSessionById',
        description: 'Get a specific candidate quizz session details',
        action: 'Get a candidate quizz session',
      },
      {
        name: 'List Quizz Sessions',
        value: 'getQuizzSessionsList',
        description: 'List quizz sessions',
        action: 'List quizz sessions',
      },
      {
        name: 'Assign New Quizz',
        value: 'assignQuizz',
        description: 'Assign a quizz to a candidate session',
        action: 'Assign a quizz to a candidate session',
      },
      {
        name: 'Share Candidate Quiz Session Link',
        value: 'shareTestLink',
        description: 'Share candidate quiz session link',
        action: 'Share candidate quiz session link',
      }
    ],
    default: 'createQuizzSession',
  },
];

export const quizzSessionFields: INodeProperties[] = [
  {
    displayName: 'Session ID',
    name: 'sessionId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['quizzSessions'],
        operation: [
          'updateQuizzSession',
          'cancelQuizzSession',
          'assignQuizz',
          'getQuizzSessionById',
          'shareTestLink',
        ],
      },
    },
    description: 'The ID of the session',
  },
  {
    displayName: 'Person ID',
    name: 'personId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['quizzSessions'],
        operation: ['createQuizzSession'],
      },
    },
    description: 'The ID of the person',
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    default: 'Session',
    displayOptions: {
      show: {
        resource: ['quizzSessions'],
        operation: ['updateQuizzSession'],
      },
    },
    description: 'The name of the session',
  },
  {
    displayName: 'Expires At',
    name: 'expiresAt',
    type: 'dateTime',
    default: '',
    displayOptions: {
      show: {
        resource: ['quizzSessions'],
        operation: ['createQuizzSession', 'updateQuizzSession'],
      },
    },
    description: 'The expiration date of the session',
  },
  {
    displayName: 'Quiz ID',
    name: 'quizId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['quizzSessions'],
        operation: ['assignQuizz'],
      },
    },
    description: 'The ID of the quiz',
  },
  {
    displayName: 'Include',
    name: 'included',
    type: 'multiOptions',
    options: [
      {
        name: 'Quizzes',
        value: 'quiz',
      },
    ],
    default: [],
    displayOptions: {
      show: {
        resource: ['quizzSessions'],
        operation: ['getQuizzSessionsList', 'getQuizzSessionById'],
      },
    },
    description: 'The resources to include in the response',
  },
];

export const commonFields: INodeProperties[] = [
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['candidates', 'quizzSessions'],
        operation: ['getCandidatesList', 'getQuizzSessionsList'],
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
