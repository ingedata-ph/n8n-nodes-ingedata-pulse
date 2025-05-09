import type { INodeProperties } from 'n8n-workflow';

export const leaveRequestOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'leaveRequest',
        ],
      },
    },
    noDataExpression: true,
    options: [
      {
        name: 'Create Leave Request',
        value: 'createLeaveRequest',
        description: 'Create a new leave request',
        action: 'Create a new leave request',
      },
      {
        name: 'Generate Leave Balance Report',
        value: 'generateLeaveBalanceReport',
        description: 'Generate leave balance report as Excel file',
        action: 'Generate leave balance report',
      },
    ],
    default: 'createLeaveRequest',
  },
];

export const leaveRequestFields: INodeProperties[] = [
  // Leave Request properties
  {
    displayName: 'Employee ID *',
    name: 'employeeId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createLeaveRequest'],
        resource: ['leaveRequest'],
      },
    },
    description: 'The ID of the employee submitting the leave request',
  },
  {
    displayName: 'Leave Type *',
    name: 'leaveType',
    type: 'options',
    options: [
      {
        name: 'Paid',
        value: 'paid',
      },
      {
        name: 'Unpaid',
        value: 'unpaid',
      },
      {
        name: 'Sick Leave',
        value: 'sick_leave',
      },
    ],
    default: 'paid',
    required: true,
    displayOptions: {
      show: {
        operation: ['createLeaveRequest'],
        resource: ['leaveRequest'],
      },
    },
    description: 'The type of leave request',
  },
  {
    displayName: 'Start Date *',
    name: 'startDate',
    type: 'dateTime',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createLeaveRequest'],
        resource: ['leaveRequest'],
      },
    },
    description: 'The start date of the leave request',
  },
  {
    displayName: 'End Date *',
    name: 'endDate',
    type: 'dateTime',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createLeaveRequest'],
        resource: ['leaveRequest'],
      },
    },
    description: 'The end date of the leave request',
  },
  {
    displayName: 'Details',
    name: 'details',
    type: 'string',
    typeOptions: {
      rows: 4,
    },
    default: '',
    displayOptions: {
      show: {
        operation: ['createLeaveRequest'],
        resource: ['leaveRequest'],
      },
    },
    description: 'Additional details about the leave request',
  },
  {
    displayName: 'Start Half Day',
    name: 'startHalfDay',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        operation: ['createLeaveRequest'],
        resource: ['leaveRequest'],
      },
    },
    description: 'Whether the first day of leave is a half day',
  },
  {
    displayName: 'End Half Day',
    name: 'endHalfDay',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        operation: ['createLeaveRequest'],
        resource: ['leaveRequest'],
      },
    },
    description: 'Whether the last day of leave is a half day',
  },
  {
    displayName: 'Related Document URL',
    name: 'relatedDocument',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        operation: ['createLeaveRequest'],
        resource: ['leaveRequest'],
      },
    },
    description: 'URL to a related document (e.g., medical certificate)',
  },
  // Generate Leave Balance Report properties
  {
    displayName: 'From Date *',
    name: 'fromDate',
    type: 'dateTime',
    default: '', // First day of current month
    required: true,
    displayOptions: {
      show: {
        operation: ['generateLeaveBalanceReport'],
        resource: ['leaveRequest'],
      },
    },
    description: 'Start date for the leave balance report (format: YYYY-MM-DD)',
  },
  {
    displayName: 'To Date *',
    name: 'toDate',
    type: 'dateTime',
    default: '', // Last day of current month
    required: true,
    displayOptions: {
      show: {
        operation: ['generateLeaveBalanceReport'],
        resource: ['leaveRequest'],
      },
    },
    description: 'End date for the leave balance report (format: YYYY-MM-DD)',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        operation: ['generateLeaveBalanceReport'],
        resource: ['leaveRequest'],
      },
    },
    description: 'Additional fields to include in the request',
    options: [
      {
        displayName: 'Report Name',
        name: 'reportName',
        type: 'string',
        default: 'Leave Balance Report',
        description: 'The name of the leave balance report',
      },
    ],
  },
];
