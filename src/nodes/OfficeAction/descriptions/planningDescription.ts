import type { INodeProperties } from 'n8n-workflow';

export const planningOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'planning',
        ],
      },
    },
    noDataExpression: true,
    options: [
      {
        name: 'Create Planning',
        value: 'createPlanning',
        description: 'Create a new planning',
        action: 'Create a new planning',
      },
      {
        name: 'Get Planning List',
        value: 'getPlanningList',
        description: 'Get a list of plannings',
        action: 'Get planning list',
      },
      {
        name: 'Update Planning',
        value: 'updatePlanning',
        description: 'Update an existing planning',
        action: 'Update an existing planning',
      },
      {
        name: 'Delete Planning',
        value: 'deletePlanning',
        description: 'Delete a planning',
        action: 'Delete a planning',
      },
    ],
    default: 'getPlanningList',
  },
];

export const planningFields: INodeProperties[] = [
  {
    displayName: 'Planning ID',
    name: 'planningId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['updatePlanning', 'deletePlanning'],
        resource: ['planning'],
      },
    },
    description: 'The ID of the planning to update or delete',
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createPlanning', 'updatePlanning'],
        resource: ['planning'],
      },
    },
    description: 'The name of the planning',
  },
  {
    displayName: 'Timezone',
    name: 'timezone',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createPlanning', 'updatePlanning'],
        resource: ['planning'],
      },
    },
    description: 'The timezone of the planning (e.g., Africa/Nairobi)',
  },
  {
    displayName: 'Organizational Unit',
    name: 'organizationalUnit',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createPlanning', 'updatePlanning'],
        resource: ['planning'],
      },
    },
    description: 'The organizational unit of the planning',
  },
  {
    displayName: 'Working Hours Per Day',
    name: 'workingHourPerDay',
    type: 'number',
    typeOptions: {
      minValue: 0,
      numberPrecision: 2,
    },
    default: 8,
    required: true,
    displayOptions: {
      show: {
        operation: ['createPlanning', 'updatePlanning'],
        resource: ['planning'],
      },
    },
    description: 'The number of working hours per day',
  },
  {
    displayName: 'Schedule',
    name: 'schedule',
    type: 'json',
    default: '{\n  "monday": ["8:00", "12:00", "14:00", "18:00"],\n  "tuesday": ["8:00", "12:00", "14:00", "18:00"]\n}',
    required: true,
    displayOptions: {
      show: {
        operation: ['createPlanning', 'updatePlanning'],
        resource: ['planning'],
      },
    },
    description: 'The schedule of the planning in JSON format. Format: { "day": ["start1", "end1", "start2", "end2"] }',
  },
  {
    displayName: 'Include Related Resources',
    name: 'included',
    type: 'multiOptions',
    options: [
      {
        name: 'Employees',
        value: 'employees',
      },
    ],
    default: [],
    required: false,
    displayOptions: {
      show: {
        operation: ['getPlanningList'],
        resource: ['planning'],
      },
    },
    description: 'Related resources to include in the response',
  },
];
