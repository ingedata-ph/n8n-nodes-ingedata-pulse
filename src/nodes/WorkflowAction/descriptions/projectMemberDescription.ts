import type { INodeProperties } from 'n8n-workflow';

export const projectMemberOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'projectMembers',
        ],
      },
    },
    noDataExpression: true,
    options: [
      {
        name: 'Add New Project Member',
        value: 'createProjectMember',
        description: 'Add new project member',
        action: 'Create new project member',
      },
      {
        name: 'Update Project Member',
        value: 'updateProjectMember',
        description: 'Update an existing project member',
        action: 'Update a project member',
      },
      {
        name: 'Remove Project Member',
        value: 'deleteProjectMember',
        description: 'Remove a project member',
        action: 'Delete a project member',
      },
      {
        name: 'List Project Members',
        value: 'getProjectMemberList',
        description: 'List project members',
        action: 'List project members',
      },
    ],
    default: 'getProjectMemberList',
  }
];

export const projectMemberFields: INodeProperties[] = [
  {
    displayName: 'Member ID *',
    name: 'memberId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['projectMembers'],
        operation: ['updateProjectMember', 'deleteProjectMember'],
      },
    },
    description: 'The ID of the project member',
  },
  {
    displayName: 'Account ID *',
    name: 'accountId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['projectMembers'],
        operation: ['createProjectMember'],
      },
    },
    description: 'The account ID',
  },
  {
    displayName: 'Project ID *',
    name: 'projectId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['projectMembers'],
        operation: ['createProjectMember'],
      },
    },
    description: 'The project ID',
  },
  {
    displayName: 'Actor Roles *',
    name: 'actorRoles',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['projectMembers'],
        operation: ['createProjectMember', 'updateProjectMember'],
      },
    },
    description: 'Comma-separated list of actor roles',
    placeholder: 'e.g., agent_role,qc_role',
  },
  {
    displayName: 'Is Manager',
    name: 'isManager',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['projectMembers'],
        operation: ['createProjectMember', 'updateProjectMember'],
      },
    },
    description: 'Whether the member is a manager',
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
        operation: ['getProjectMemberList'],
        resource: ['projectMembers'],
      },
    },
    description: 'Related resources to include in the response',
  },
];
