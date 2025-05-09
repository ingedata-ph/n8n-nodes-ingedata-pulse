import type { INodeProperties } from 'n8n-workflow';

export const announcementOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'announcement',
        ],
      },
    },
    noDataExpression: true,
    options: [
      {
        name: 'Create Announcement',
        value: 'createAnnouncement',
        description: 'Create a new announcement',
        action: 'Create a new announcement',
      },
      {
        name: 'Delete Announcement',
        value: 'deleteAnnouncement',
        description: 'Delete an announcement',
        action: 'Delete an announcement',
      },
      {
        name: 'Get Announcement List',
        value: 'getAnnouncementList',
        description: 'Get a list of announcements',
        action: 'Get announcement list',
      },
      {
        name: 'Update Announcement',
        value: 'updateAnnouncement',
        description: 'Update an existing announcement',
        action: 'Update an existing announcement',
      },
    ],
    default: 'getAnnouncementList',
  },
];

export const announcementFields: INodeProperties[] = [
  {
    displayName: 'Announcement ID *',
    name: 'announcementId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['announcement'],
        operation: ['updateAnnouncement', 'deleteAnnouncement'],
      },
    },
    description: 'The ID of the announcement to update or delete',
  },
  {
    displayName: 'Fields to Update',
    name: 'fieldsToUpdate',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['announcement'],
        operation: ['updateAnnouncement'],
      },
    },
    description: 'Additional fields to update in the announcement',
    options: [
      {
        displayName: 'Title',
        name: 'title',
        type: 'string',
        default: '',
        description: 'The title of the announcement',
      },
      {
        displayName: 'Content (Markdown)',
        name: 'contentMd',
        type: 'string',
        typeOptions: {
          rows: 5,
        },
        default: '',
        description: 'The content of the announcement in Markdown format',
      },
      {
        displayName: 'Publishing Date',
        name: 'publishingAt',
        type: 'dateTime',
        default: '',
        description: 'The date when the announcement will be published (cannot be before today)',
      },
      {
        displayName: 'Organizational Units',
        name: 'organizationalUnits',
        type: 'string',
        default: '',
        description: 'Comma-separated list of organizational units for the announcement',
        placeholder: 'MG, IT, HR',
      },
    ],
  },
  {
    displayName: 'Title *',
    name: 'title',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createAnnouncement'],
        resource: ['announcement'],
      },
    },
    description: 'The title of the announcement',
  },
  {
    displayName: 'Content (Markdown)',
    name: 'contentMd',
    type: 'string',
    typeOptions: {
      rows: 5,
    },
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createAnnouncement'],
        resource: ['announcement'],
      },
    },
    description: 'The content of the announcement in Markdown format',
  },
  {
    displayName: 'Publishing Date *',
    name: 'publishingAt',
    type: 'dateTime',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createAnnouncement'],
        resource: ['announcement'],
      },
    },
    description: 'The date when the announcement will be published (cannot be before today)',
  },
  {
    displayName: 'Organizational Units *',
    name: 'organizationalUnits',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createAnnouncement'],
        resource: ['announcement'],
      },
    },
    description: 'Comma-separated list of organizational units for the announcement',
    placeholder: 'MG, IT, HR',
  },
];
