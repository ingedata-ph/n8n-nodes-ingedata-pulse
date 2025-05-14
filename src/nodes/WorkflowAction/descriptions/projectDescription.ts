import type { INodeProperties } from 'n8n-workflow';

export const projectOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'projects',
        ],
      },
    },
    noDataExpression: true,
    options: [
      {
        name: 'Create Project',
        value: 'createProject',
        description: 'Create a new project',
        action: 'Create a new project',
      },
      {
        name: 'Update Project',
        value: 'updateProject',
        description: 'Update an existing project',
        action: 'Update a project',
      },
      {
        name: 'Activate/Desactivate Project',
        value: 'updateProjectStatus',
        description: 'Activate or Desactivate an existing project status',
        action: 'Update a project status',
      },
      {
        name: 'List Projects',
        value: 'getProjectList',
        description: 'List projects',
        action: 'List projects',
      },
    ],
    default: 'createProject',
  }
];

export const projectFields: INodeProperties[] = [
  {
    displayName: 'Project ID *',
    name: 'projectId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['projects'],
        operation: ['updateProject', 'updateProjectStatus'],
      },
    },
    description: 'The ID of the project to update',
  },
  {
    displayName: 'Name *',
    name: 'name',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['projects'],
        operation: ['createProject', 'updateProject'],
      },
    },
    description: 'The name of the project',
  },
  {
    displayName: 'Organizational Unit *',
    name: 'organizationalUnit',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['projects'],
        operation: ['createProject'],
      },
    },
    description: 'The organizational unit of the project',
  },
  {
    displayName: 'Organization ID *',
    name: 'organizationId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['projects'],
        operation: ['createProject'],
      },
    },
    description: 'The organization ID',
  },
  {
    displayName: 'Project Definition *',
    name: 'projectDefinition',
    type: 'string',
    required: true,
    typeOptions: {
      rows: 10,
    },
    default: '',
    displayOptions: {
      show: {
        resource: ['projects'],
        operation: ['createProject'],
      },
    },
    description: 'The project definition JSON',
  },
  {
    displayName: 'Status *',
    name: 'status',
    type: 'boolean',
    default: true,
    displayOptions: {
      show: {
        resource: ['projects'],
        operation: ['updateProjectStatus'],
      },
    },
    description: 'Whether the project is active or not',
  }
];
