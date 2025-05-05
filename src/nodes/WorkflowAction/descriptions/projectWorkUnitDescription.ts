import type { INodeProperties } from 'n8n-workflow';

export const projectWorkUnitOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'projectWorkUnits',
        ],
      },
    },
    noDataExpression: true,
    options: [
      {
        name: 'Create Project Work Unit',
        value: 'createProjectWorkUnit',
        description: 'Create a new project work unit',
        action: 'Create a new project work unit',
      },
      {
        name: 'Cancel Project Work Unit',
        value: 'cancelProjectWorkUnit',
        description: 'Cancel a project work unit',
        action: 'Cancel a project work unit',
      },
      {
        name: 'List Project Work Units',
        value: 'getProjectWorkUnitList',
        description: 'List project work units',
        action: 'List project work units',
      },
    ],
    default: 'createProjectWorkUnit',
  }
];

export const projectWorkUnitFields: INodeProperties[] = [
  {
    displayName: 'Work Unit ID',
    name: 'workUnitId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['projectWorkUnits'],
        operation: ['cancelProjectWorkUnit'],
      },
    },
    description: 'The ID of the work unit',
  },
  {
    displayName: 'Project ID',
    name: 'projectId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['projectWorkUnits'],
        operation: ['createProjectWorkUnit'],
      },
    },
    description: 'The project ID',
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    default: '',
    required: false,
    displayOptions: {
      show: {
        resource: ['projectWorkUnits'],
        operation: ['createProjectWorkUnit'],
      },
    },
    description: 'The name of the work unit',
  }
];
