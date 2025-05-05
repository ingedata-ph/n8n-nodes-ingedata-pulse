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
        resource: [
          'talent',
          'skill',
          'languages',
          'education',
          'certification',
          'experience',
        ],
        operation: [
          'getTalentList',
          'getSkillsList',
          'getLanguagesList',
          'getEducationList',
          'getCertificationList',
          'getExperienceList',
        ],
      },
    },
    options: [
      {
        displayName: 'Sort',
        name: 'sort',
        type: 'string',
        default: '',
        description: 'Sort order, e.g., -relevance',
      },
      {
        displayName: 'Page Number',
        name: 'pageNumber',
        type: 'number',
        default: 1,
        description: 'Pagination - page number (requires page size)',
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
                displayName: 'Filter Key',
                name: 'key',
                type: 'string',
                default: '',
                placeholder: 'e.g., organization_id',
              },
              {
                displayName: 'Values',
                name: 'values',
                type: 'string',
                default: '',
                placeholder: 'Comma-separated values (e.g., 1,2,3)',
              },
            ],
          },
        ],
      },
      {
        displayName: 'Fields',
        name: 'fields',
        type: 'fixedCollection',
        typeOptions: {
          multipleValues: true,
        },
        default: {},
        options: [
          {
            name: 'field',
            displayName: 'Field Group',
            values: [
              {
                displayName: 'Field Key',
                name: 'key',
                type: 'string',
                default: '',
                placeholder: 'e.g., iam/organizations/people_directories',
              },
              {
                displayName: 'Fields',
                name: 'fields',
                type: 'string',
                default: '',
                placeholder: 'Comma-separated field names (e.g., id,name)',
              },
            ],
          },
        ],
      },
    ],
  }
];
