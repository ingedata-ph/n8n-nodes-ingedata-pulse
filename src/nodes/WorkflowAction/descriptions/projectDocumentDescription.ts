import type { INodeProperties } from 'n8n-workflow';

export const projectDocumentOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'projectDocuments',
        ],
      },
    },
    noDataExpression: true,
    options: [
      {
        name: 'Add Project Document',
        value: 'createProjectDocument',
        description: 'Add new project document',
        action: 'Add new project document',
      },
      {
        name: 'Update Project Document',
        value: 'updateProjectDocument',
        description: 'Update an existing project document',
        action: 'Update a project document',
      },
      {
        name: 'Delete Project Document',
        value: 'deleteProjectDocument',
        description: 'Delete a project document',
        action: 'Delete a project document',
      },
      {
        name: 'List Project Documents',
        value: 'getProjectDocumentList',
        description: 'List project documents',
        action: 'List project documents',
      },
      {
        name: 'Get Project Document Url',
        value: 'getProjectDocumentUrl',
        description: 'Get a project document Url for download',
        action: 'Get a project document URL',
      }
    ],
    default: 'createProjectDocument',
  }
];

export const projectDocumentFields: INodeProperties[] = [
  {
    displayName: 'Document ID *',
    name: 'documentId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['projectDocuments'],
        operation: ['updateProjectDocument', 'deleteProjectDocument', 'getProjectDocumentUrl'],
      },
    },
    description: 'The ID of the project document',
  },
  {
    displayName: 'Name *',
    name: 'name',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['projectDocuments'],
        operation: ['createProjectDocument', 'updateProjectDocument'],
      },
    },
    description: 'The name of the document',
  },
  {
    displayName: 'Category *',
    name: 'category',
    type: 'options',
    options: [
      {
        name: 'Project Plan',
        value: 'project-plan',
      },
      {
        name: 'Training Book',
        value: 'training-book',
      },
      {
        name: 'Client\'s Instruction',
        value: 'client-instruction',
      },
      {
        name: 'Commercial Document',
        value: 'commercial-document',
      },
    ],
    default: 'project-plan',
    required: true,
    displayOptions: {
      show: {
        resource: ['projectDocuments'],
        operation: ['createProjectDocument', 'updateProjectDocument'],
      },
    },
    description: 'The category of the document',
  },
  {
    displayName: 'URL *',
    name: 'url',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['projectDocuments'],
        operation: ['createProjectDocument'],
      },
    },
    description: 'The URL of the document',
  },
  {
    displayName: 'Rights *',
    name: 'rights',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['projectDocuments'],
        operation: ['createProjectDocument', 'updateProjectDocument'],
      },
    },
    description: 'Document access permissions. Input can be either:\n\n' +
      '• Comma-separated list: "financial,lead,client,staff"\n' +
      '• Array of strings: ["financial", "lead"]\n\n' +
      'Access rules:\n' +
      '• Client users: Can only add documents with "client" right\n' +
      '• Supervisors: Documents must include "lead" right\n' +
      '• Financial users: Documents must include "financial" right',
    placeholder: 'e.g., financial,lead',
  },
  {
    displayName: 'Project ID *',
    name: 'projectId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['projectDocuments'],
        operation: ['createProjectDocument', 'updateProjectDocument'],
      },
    },
    description: 'The project ID',
  }
];
