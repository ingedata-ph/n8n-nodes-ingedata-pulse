import type { INodeProperties } from 'n8n-workflow';

export const commonFields: INodeProperties[] = [
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['candidates', 'pipelineTemplate', 'recruitmentCampaign', 'stageTemplate'],
        operation: ['getCandidatesList', 'getListPipelineTemplates', 'getRecruitmentCampaignsList', 'getListStageTemplates'],
      },
    },
    options: [
      {
        displayName: 'Sort',
        name: 'sort',
        type: 'string',
        default: '',
        description: 'Sort order (e.g., "created_at" or "-created_at" for descending)',
      },
      {
        displayName: 'Page Number',
        name: 'pageNumber',
        type: 'number',
        default: 1,
        description: 'Pagination - page number',
      },
      {
        displayName: 'Page Size',
        name: 'pageSize',
        type: 'number',
        default: 10,
        description: 'Pagination - page size',
      },
      {
        displayName: 'Filters',
        name: 'filters',
        placeholder: 'Add Filter',
        type: 'fixedCollection',
        typeOptions: {
          multipleValues: true,
        },
        default: {},
        options: [
          {
            name: 'filter',
            displayName: 'Filter',
            values: [
              {
                displayName: 'Key',
                name: 'key',
                type: 'string',
                default: '',
                description: 'The key to filter on',
              },
              {
                displayName: 'Values',
                name: 'values',
                type: 'string',
                default: '',
                description: 'Comma-separated list of values',
              },
            ],
          },
        ],
        description: 'Filter results by specific fields',
      },
      {
        displayName: 'Fields',
        name: 'fields',
        placeholder: 'Add Field',
        type: 'fixedCollection',
        typeOptions: {
          multipleValues: true,
        },
        default: {},
        options: [
          {
            name: 'field',
            displayName: 'Field',
            values: [
              {
                displayName: 'Resource Type',
                name: 'key',
                type: 'string',
                default: '',
                description: 'The resource type to specify fields for',
              },
              {
                displayName: 'Fields',
                name: 'fields',
                type: 'string',
                default: '',
                description: 'Comma-separated list of fields to include',
              },
            ],
          },
        ],
        description: 'Specify which fields to include in the response',
      },
    ],
  },
];
