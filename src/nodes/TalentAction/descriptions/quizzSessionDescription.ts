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
        description: 'Create a new quizz session for talents',
        action: 'Create a new quizz session for talents',
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
        description: 'Cancel talent quizz session',
        action: 'Cancel talent quizz session',
      },
      {
        name: 'Get Quizz Session',
        value: 'getQuizzSessionById',
        description: 'Get a specific talent quizz session details',
        action: 'Get a talent quizz session',
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
        description: 'Assign a quizz to a talent session',
        action: 'Assign a quizz to a talent session',
      },
      {
        name: 'Share Talent Quiz Session Link',
        value: 'shareTestLink',
        description: 'Share talent quiz session link',
        action: 'Share talent quiz session link',
      }
    ],
    default: 'createQuizzSession',
  },
];

export const quizzSessionFields: INodeProperties[] = [
  {
    displayName: 'Session ID *',
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
    displayName: 'Talent ID *',
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
    description: 'The ID of the talent which this session belongs to',
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
    displayName: 'Quiz ID *',
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
