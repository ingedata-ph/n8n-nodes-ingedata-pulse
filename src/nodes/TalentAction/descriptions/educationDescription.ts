import type { INodeProperties } from 'n8n-workflow';

export const educationOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'education',
        ],
      },
    },
    options: [
      {
        name: 'Get Education List',
        value: 'getEducationList',
        description: 'Get a list of education entries',
        action: 'Get education list',
      },
      {
        name: 'Add Education',
        value: 'createEducation',
        description: 'Add new education entry',
        action: 'Add education',
      },
      {
        name: 'Update Education',
        value: 'updateEducation',
        description: 'Update an education entry',
        action: 'Update education',
      },
      {
        name: 'Delete Education',
        value: 'deleteEducation',
        description: 'Delete an education entry',
        action: 'Delete education',
      },
    ],
    default: 'getEducationList',
    noDataExpression: true,
  },
];

export const educationFields: INodeProperties[] = [
  {
    displayName: 'Talent ID',
    name: 'talentId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createEducation', 'updateEducation'],
        resource: ['education'],
      },
    },
    description: 'The ID of the talent to associate with this education entry',
  },
  {
    displayName: 'Education ID',
    name: 'educationId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['updateEducation', 'deleteEducation'],
        resource: ['education'],
      },
    },
    description: 'The ID of the education entry to update or delete',
  },
  {
    displayName: 'Education Name',
    name: 'educationName',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createEducation', 'updateEducation'],
        resource: ['education'],
      },
    },
    description: 'The name of the education',
  },
  {
    displayName: 'Institution',
    name: 'institution',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createEducation', 'updateEducation'],
        resource: ['education'],
      },
    },
    description: 'The institution where the education was obtained',
  },
  {
    displayName: 'Degree',
    name: 'degree',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createEducation', 'updateEducation'],
        resource: ['education'],
      },
    },
    description: 'The degree obtained',
  },
  {
    displayName: 'Start Date',
    name: 'startDate',
    type: 'dateTime',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createEducation', 'updateEducation'],
        resource: ['education'],
      },
    },
    description: 'The start date of the education',
  },
  {
    displayName: 'End Date',
    name: 'endDate',
    type: 'dateTime',
    default: '',
    required: false,
    displayOptions: {
      show: {
        operation: ['createEducation', 'updateEducation'],
        resource: ['education'],
      },
    },
    description: 'The end date of the education (leave empty if ongoing)',
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
        operation: ['getEducationList'],
        resource: ['education'],
      },
    },
    description: 'Related resources to include in the response',
  },
];
