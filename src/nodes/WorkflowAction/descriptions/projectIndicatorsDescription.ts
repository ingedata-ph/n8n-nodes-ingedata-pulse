import type { INodeProperties } from 'n8n-workflow';

export const projectIndicatorsOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'projectIndicators',
        ],
      },
    },
    noDataExpression: true,
    options: [
      {
        name: 'Show project indicators',
        value: 'getProjectIndicator',
        description: 'Show list of the project indicators by key and period',
        action: 'Show project indicators',
      },
      {
        name: 'Get Project Indicator Keys',
        value: 'getProjectIndicatorKeys',
        description: 'Get project indicator keys',
        action: 'Get project indicator keys',
      },
      {
        name: 'Get Project Indicator Options',
        value: 'getProjectIndicatorOptions',
        description: 'Get project indicator options',
        action: 'Get project indicator options',
      },
    ],
    default: 'getProjectIndicator',
  }
];

export const projectIndicatorsFields: INodeProperties[] = [
  {
    displayName: 'Project ID *',
    name: 'projectId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['projectIndicators'],
        operation: ['getProjectIndicator', 'getProjectIndicatorKeys', 'getProjectIndicatorOptions'],
      },
    },
    description: 'The ID of the project to get the indicators for',
  },
  {
    displayName: 'Period *',
    name: 'period',
    type: 'options',
    displayOptions: {
      show: {
        resource: ['projectIndicators'],
        operation: ['getProjectIndicator'],
      },
    },
    options: [
      {
        name: 'Daily',
        value: 'daily',
        description: 'Daily period',
      },
      {
        name: 'Weekly',
        value: 'weekly',
        description: 'Weekly period',
      },
      {
        name: 'Monthly',
        value: 'monthly',
        description: 'Monthly period',
      },
      {
        name: 'Quarterly',
        value: 'quarterly',
        description: 'Quartely period',
      },
    ],
    default: 'daily',
    description: 'The period of the indicators',
  },
  {
    displayName: 'Indicator Name *',
    name: 'indicatorName',
    type: 'options',
    displayOptions: {
      show: {
        resource: ['projectIndicators'],
        operation: ['getProjectIndicator', 'getProjectIndicatorOptions'],
      },
    },
    typeOptions: {
      loadOptionsMethod: 'loadProjectIndicatorKeysList',
      loadOptionsDependsOn: ['projectId'],
    },
    default: [],
    required: true,
    description: 'The name of the indicator to get',
  },
  {
    displayName: 'From *',
    name: 'from',
    type: 'dateTime',
    default: new Date().toISOString(),
    required: true,
    displayOptions: {
      show: {
        resource: ['projectIndicators'],
        operation: ['getProjectIndicator'],
      },
    },
    description: 'The start date of the period to get the indicators for',
  },
  {
    displayName: 'To *',
    name: 'to',
    type: 'dateTime',
    default: (() => {
      const date = new Date();
      date.setMonth(date.getMonth() + 1);
      return date.toISOString();
    })(),
    required: true,
    displayOptions: {
      show: {
        resource: ['projectIndicators'],
        operation: ['getProjectIndicator'],
      },
    },
    description: 'The end date of the period to get the indicators for',
  },

  {
    displayName: "Additional Filters",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Additional Filter Field for the project indicator",
    default: {},
    displayOptions: {
      show: {
        resource: ['projectIndicators'],
        operation: ['getProjectIndicator'],
      },
    },
    options: [
      {
        displayName: 'Selector',
        name: 'selector',
        type: 'options',
        default: '',
        typeOptions: {
          loadOptionsMethod: 'loadProjectIndicatorSelectorList',
          loadOptionsDependsOn: ['projectId', 'indicatorName'],
        },
        description: 'The selector to filter the indicators by',
      },
      {
        displayName: 'Member Account ID',
        name: 'accountId',
        type: 'string',
        default: '',
        description: 'The account ID to filter the indicators by',
      },
    ],
  },
];
