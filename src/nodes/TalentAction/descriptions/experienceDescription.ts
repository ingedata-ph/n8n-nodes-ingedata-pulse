import type { INodeProperties } from 'n8n-workflow';

export const experienceOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'experience',
        ],
      },
    },
    options: [
      {
        name: 'Get Experience List',
        value: 'getExperienceList',
        description: 'Get a list of experience entries',
        action: 'Get experience list',
      },
      {
        name: 'Add Experience',
        value: 'createExperience',
        description: 'Add new experience entry',
        action: 'Add experience',
      },
      {
        name: 'Update Experience',
        value: 'updateExperience',
        description: 'Update an experience entry',
        action: 'Update experience',
      },
      {
        name: 'Delete Experience',
        value: 'deleteExperience',
        description: 'Delete an experience entry',
        action: 'Delete experience',
      },
    ],
    default: 'getExperienceList',
    noDataExpression: true,
  },
];

export const experienceFields: INodeProperties[] = [
  {
    displayName: 'Talent ID',
    name: 'talentId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createExperience', 'updateExperience'],
        resource: ['experience'],
      },
    },
    description: 'The ID of the talent to associate with this experience entry',
  },
  {
    displayName: 'Experience ID',
    name: 'experienceId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['updateExperience', 'deleteExperience'],
        resource: ['experience'],
      },
    },
    description: 'The ID of the experience entry to update or delete',
  },
  {
    displayName: 'Organization',
    name: 'organization',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createExperience', 'updateExperience'],
        resource: ['experience'],
      },
    },
    description: 'The organization where the experience was gained',
  },
  {
    displayName: 'Position',
    name: 'position',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createExperience', 'updateExperience'],
        resource: ['experience'],
      },
    },
    description: 'The position held during the experience',
  },
  {
    displayName: 'Start Date',
    name: 'startDate',
    type: 'dateTime',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createExperience', 'updateExperience'],
        resource: ['experience'],
      },
    },
    description: 'The start date of the experience',
  },
  {
    displayName: 'End Date',
    name: 'endDate',
    type: 'dateTime',
    default: '',
    required: false,
    displayOptions: {
      show: {
        operation: ['createExperience', 'updateExperience'],
        resource: ['experience'],
      },
    },
    description: 'The end date of the experience (leave empty if ongoing)',
  },
  {
    displayName: 'Summary',
    name: 'summary',
    type: 'string',
    typeOptions: {
      rows: 4,
    },
    default: '',
    required: false,
    displayOptions: {
      show: {
        operation: ['createExperience', 'updateExperience'],
        resource: ['experience'],
      },
    },
    description: 'A summary of the experience',
  },
  {
    displayName: 'Include Related Resources',
    name: 'included',
    type: 'multiOptions',
    options: [
      {
        name: 'Talent',
        value: 'talent',
      },
    ],
    default: [],
    required: false,
    displayOptions: {
      show: {
        operation: ['getExperienceList'],
        resource: ['experience'],
      },
    },
    description: 'Related resources to include in the response',
  },
];
