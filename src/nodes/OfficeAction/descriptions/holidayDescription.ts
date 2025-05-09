import type { INodeProperties } from 'n8n-workflow';

export const holidayOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'holiday',
        ],
      },
    },
    noDataExpression: true,
    options: [
      {
        name: 'Create Holiday',
        value: 'createHoliday',
        description: 'Create a new holiday',
        action: 'Create a new holiday',
      },
      {
        name: 'Get Holiday List',
        value: 'getHolidayList',
        description: 'Get a list of holidays',
        action: 'Get holiday list',
      },
      {
        name: 'Update Holiday',
        value: 'updateHoliday',
        description: 'Update an existing holiday',
        action: 'Update an existing holiday',
      },
      {
        name: 'Delete Holiday',
        value: 'deleteHoliday',
        description: 'Delete a holiday',
        action: 'Delete a holiday',
      },
    ],
    default: 'getHolidayList',
  },
];

export const holidayFields: INodeProperties[] = [
  {
    displayName: 'Holiday ID *',
    name: 'id',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['updateHoliday', 'deleteHoliday'],
        resource: ['holiday'],
      },
    },
    description: 'The ID of the holiday to update or delete',
  },
  {
    displayName: 'Name *',
    name: 'name',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createHoliday', 'updateHoliday'],
        resource: ['holiday'],
      },
    },
    description: 'The name of the holiday',
  },
  {
    displayName: 'Date *',
    name: 'date',
    type: 'dateTime',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createHoliday', 'updateHoliday'],
        resource: ['holiday'],
      },
    },
    description: 'The date of the holiday',
  },
  {
    displayName: 'Organizational Unit *',
    name: 'organizational_unit',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createHoliday', 'updateHoliday'],
        resource: ['holiday'],
      },
    },
    description: 'The organizational unit for the holiday',
  },
];
