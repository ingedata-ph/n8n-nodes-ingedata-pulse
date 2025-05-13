import type { INodeProperties } from 'n8n-workflow';

export const projectDataOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'projectData',
        ],
      },
    },
    noDataExpression: true,
    options: [
      {
        name: 'Add Project Data',
        value: 'createProjectData',
        description: 'Add project data',
        action: 'Add project data',
      },
      {
        name: 'Update Project Data',
        value: 'updateProjectData',
        description: 'Update project data',
        action: 'Update project data',
      },
      {
        name: 'Show/Hide Project Data',
        value: 'updateProjectDataVisibility',
        description: 'Hide or show project data',
        action: 'Show or hide project data',
      },
      {
        name: 'List Project Data',
        value: 'getProjectDataList',
        description: 'List project data',
        action: 'List project data',
      },
    ],
    default: 'createProjectData',
  }
];

export const projectDataFields: INodeProperties[] = [
  {
    displayName: 'Data ID *',
    name: 'dataId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['projectData'],
        operation: ['updateProjectData', 'updateProjectDataVisibility'],
      },
    },
    description: 'The ID of the project data',
  },
  {
    displayName: 'Project ID *',
    name: 'projectId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['projectData'],
        operation: ['createProjectData'],
      },
    },
    description: 'The project ID',
  },
  {
    displayName: 'Key *',
    name: 'key',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['projectData'],
        operation: ['createProjectData', 'updateProjectData', 'updateProjectDataVisibility'],
      },
    },
    description: 'The key of the data',
  },
  {
    displayName: 'Value *',
    name: 'value',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['projectData'],
        operation: ['createProjectData', 'updateProjectData', 'updateProjectDataVisibility'],
      },
    },
    description: 'The value of the data',
  },
  {
    displayName: 'Label *',
    name: 'label',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['projectData'],
        operation: ['createProjectData', 'updateProjectData', 'updateProjectDataVisibility'],
      },
    },
    description: 'The label of the data',
  },
  {
    displayName: 'Visibility',
    name: 'is_visible',
    type: 'boolean',
    default: true,
    displayOptions: {
      show: {
        resource: ['projectData'],
        operation: ['updateProjectDataVisibility'],
      },
    },
    description: 'Show or hide the project data',
  },
  {
    displayName: 'Include Related Resources',
    name: 'included',
    type: 'multiOptions',
    options: [
      {
        name: 'Project',
        value: 'project',
      },
    ],
    default: [],
    required: false,
    displayOptions: {
      show: {
        operation: ['getProjectDataList'],
        resource: ['projectData'],
      },
    },
    description: 'Related resources to include in the response',
  }
];
