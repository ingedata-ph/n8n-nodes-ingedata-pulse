import type { INodeProperties } from 'n8n-workflow';

export const activityOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'activities',
        ],
      },
    },
    noDataExpression: true,
    options: [
      {
        name: 'Get List of Activities',
        value: 'getActivityList',
        description: 'Get a list of activities',
        action: 'Get a list of activities',
      },
      {
        name: 'Assign Member',
        value: 'assignMember',
        description: 'Assign a member to an activity',
        action: 'Assign a member to an activity',
      },
      {
        name: 'Unassign Member',
        value: 'unassignMember',
        description: 'Unassign a member from an activity',
        action: 'Unassign a member from an activity',
      },
    ],
    default: 'assignMember',
  }
];

export const activityFields: INodeProperties[] = [
  {
    displayName: 'Activity ID *',
    name: 'activityId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['activities'],
        operation: ['assignMember', 'unassignMember'],
      },
    },
    description: 'The ID of the activity',
  },
  {
    displayName: 'Account ID *',
    name: 'accountId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['activities'],
        operation: ['assignMember'],
      },
    },
    description: 'The account ID of the member to assign',
  },
  {
    displayName: 'Start Working',
    name: 'startWorking',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['activities'],
        operation: ['assignMember'],
      },
    },
    description: 'Whether to start working on the activity immediately',
  }
];
