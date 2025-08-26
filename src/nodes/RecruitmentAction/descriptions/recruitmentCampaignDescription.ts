import type { INodeProperties } from 'n8n-workflow';

export const recruitmentCampaignOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'recruitmentCampaign',
        ],
      },
    },
    noDataExpression: true,
    options: [
      {
        name: 'Create Recruitment Campaign',
        value: 'createRecruitmentCampaign',
        description: 'Create a new recruitment campaign',
        action: 'Create a recruitment campaign',
      },
      {
        name: 'Update Recruitment Campaign',
        value: 'updateRecruitmentCampaign',
        description: 'Update a recruitment campaign',
        action: 'Update a recruitment campaign',
      },
      {
        name: 'Recruitment Campaigns List',
        value: 'getRecruitmentCampaignsList',
        description: 'Get list of recruitment campaigns',
        action: 'Get list of recruitment campaigns',
      },
      {
        name: 'Open Recruitment Campaign',
        value: 'openRecruitmentCampaign',
        description: 'Update recruitment campaign status to open',
        action: 'Open a recruitment campaign',
      },
      {
        name: 'Close Recruitment Campaign',
        value: 'closeRecruitmentCampaign',
        description: 'Update recruitment campaign status to closed',
        action: 'Close a recruitment campaign',
      },
      {
        name: 'Add Candidate',
        value: 'addCandidate',
        description: 'Add a candidate to the recruitment campaign',
        action: 'Add a candidate to recruitment campaign',
      },
      {
        name: 'Move Candidate',
        value: 'moveCandidate',
        description: 'Move a candidate to another stage',
        action: 'Move a candidate to another stage',
      },
      {
        name: 'Hire Candidate',
        value: 'hireCandidate',
        description: 'Hire a candidate',
        action: 'Hire a candidate',
      },
      {
        name: 'Reject Candidate',
        value: 'rejectCandidate',
        description: 'Reject a candidate',
        action: 'Reject a candidate',
      },
      {
        name: 'Remove Candidate',
        value: 'removeCandidate',
        description: 'Remove a candidate from recruitment campaign',
        action: 'Remove a candidate from recruitment campaign',
      },
    ],
    default: 'createRecruitmentCampaign',
  },
];

export const recruitmentCampaignFields: INodeProperties[] = [
  // ID field for update, open, close operations
  {
    displayName: 'Campaign ID *',
    name: 'id',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['recruitmentCampaign'],
        operation: ['updateRecruitmentCampaign', 'openRecruitmentCampaign', 'closeRecruitmentCampaign'],
      },
    },
    default: '',
    description: 'ID of the recruitment campaign',
  },

  // query_id for update operation
  {
    displayName: 'Query ID *',
    name: 'query_id',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['recruitmentCampaign'],
        operation: ['updateRecruitmentCampaign'],
      },
    },
    default: '',
    description: 'ID of the query to update',
  },

  // Fields for Create operation
  {
    displayName: 'Name *',
    name: 'name',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['recruitmentCampaign'],
        operation: ['createRecruitmentCampaign'],
      },
    },
    default: '',
    description: 'Name of the recruitment campaign',
  },
  {
    displayName: 'Job Description *',
    name: 'job_description',
    type: 'string',
    typeOptions: {
      rows: 4,
    },
    required: true,
    displayOptions: {
      show: {
        resource: ['recruitmentCampaign'],
        operation: ['createRecruitmentCampaign'],
      },
    },
    default: '',
    description: 'Job description for the recruitment campaign (must have some text)',
  },
  {
    displayName: 'Target Date *',
    name: 'target_date',
    type: 'dateTime',
    required: true,
    displayOptions: {
      show: {
        resource: ['recruitmentCampaign'],
        operation: ['createRecruitmentCampaign'],
      },
    },
    default: '',
    description: 'Target date for the recruitment campaign',
  },
  {
    displayName: 'Hiring Count *',
    name: 'hiring_count',
    type: 'number',
    required: true,
    displayOptions: {
      show: {
        resource: ['recruitmentCampaign'],
        operation: ['createRecruitmentCampaign'],
      },
    },
    default: 1,
    description: 'Number of people to hire',
  },
  {
    displayName: 'Hiring Reason *',
    name: 'hiring_reason',
    type: 'options',
    required: true,
    displayOptions: {
      show: {
        resource: ['recruitmentCampaign'],
        operation: ['createRecruitmentCampaign'],
      },
    },
    options: [
      {
        name: 'Staff Increase',
        value: 'staff_increase',
      },
      {
        name: 'Replacement',
        value: 'replacement',
      },
    ],
    default: 'staff_increase',
    description: 'Reason for hiring',
  },
  {
    displayName: 'Contract Type *',
    name: 'contract_type',
    type: 'options',
    required: true,
    displayOptions: {
      show: {
        resource: ['recruitmentCampaign'],
        operation: ['createRecruitmentCampaign'],
      },
    },
    options: [
      {
        name: 'Full Time',
        value: 'full_time',
      },
      {
        name: 'Part Time',
        value: 'part_time',
      },
      {
        name: 'Internship',
        value: 'internship',
      },
      {
        name: 'Freelance',
        value: 'freelance',
      },
      {
        name: 'Others',
        value: 'others',
      },
    ],
    default: 'full_time',
    description: 'Type of contract',
  },
  {
    displayName: 'Employee Requestor ID *',
    name: 'requestor_id',
    type: 'number',
    required: true,
    displayOptions: {
      show: {
        resource: ['recruitmentCampaign'],
        operation: ['createRecruitmentCampaign'],
      },
    },
    default: 0,
    description: 'ID of the employee requesting the recruitment',
  },
  {
    displayName: 'Organization ID *',
    name: 'related_organization_id',
    type: 'number',
    required: true,
    displayOptions: {
      show: {
        resource: ['recruitmentCampaign'],
        operation: ['createRecruitmentCampaign'],
      },
    },
    default: 0,
    description: 'ID of the related organization',
  },
  {
    displayName: 'Project ID *',
    name: 'related_project_id',
    type: 'number',
    required: true,
    displayOptions: {
      show: {
        resource: ['recruitmentCampaign'],
        operation: ['createRecruitmentCampaign'],
      },
    },
    default: 0,
    description: 'ID of the related project',
  },
  {
    displayName: 'Organizational Unit *',
    name: 'organizational_unit',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['recruitmentCampaign'],
        operation: ['createRecruitmentCampaign'],
      },
    },
    default: '',
    description: 'Organizational unit',
  },
  {
    displayName: 'Pipeline Template ID *',
    name: 'pipeline_template_id',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['recruitmentCampaign'],
        operation: ['createRecruitmentCampaign'],
      },
    },
    default: '',
    description: 'ID of the pipeline template attached to the recruitment campaign',
  },

  // Update Fields for update operation
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['recruitmentCampaign'],
        operation: ['updateRecruitmentCampaign'],
      },
    },
    description: 'Fields to update in the recruitment campaign',
    options: [
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Name of the recruitment campaign',
      },
      {
        displayName: 'Job Description',
        name: 'job_description',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Job description for the recruitment campaign',
      },
      {
        displayName: 'Target Date',
        name: 'target_date',
        type: 'dateTime',
        default: '',
        description: 'Target date for the recruitment campaign',
      },
      {
        displayName: 'Hiring Count',
        name: 'hiring_count',
        type: 'number',
        default: 1,
        description: 'Number of people to hire',
      },
      {
        displayName: 'Hiring Reason',
        name: 'hiring_reason',
        type: 'options',
        options: [
          {
            name: 'Staff Increase',
            value: 'staff_increase',
          },
          {
            name: 'Replacement',
            value: 'replacement',
          },
        ],
        default: 'staff_increase',
        description: 'Reason for hiring',
      },
      {
        displayName: 'Contract Type',
        name: 'contract_type',
        type: 'options',
        options: [
          {
            name: 'Full Time',
            value: 'full_time',
          },
          {
            name: 'Part Time',
            value: 'part_time',
          },
          {
            name: 'Internship',
            value: 'internship',
          },
          {
            name: 'Freelance',
            value: 'freelance',
          },
          {
            name: 'Others',
            value: 'others',
          },
        ],
        default: 'full_time',
        description: 'Type of contract',
      },
      {
        displayName: 'Requestor ID',
        name: 'requestor_id',
        type: 'number',
        default: 0,
        description: 'ID of the person requesting the recruitment',
      },
      {
        displayName: 'Related Organization ID',
        name: 'related_organization_id',
        type: 'number',
        default: 0,
        description: 'ID of the related organization',
      },
      {
        displayName: 'Related Project ID',
        name: 'related_project_id',
        type: 'number',
        default: 0,
        description: 'ID of the related project',
      },
      {
        displayName: 'Organizational Unit',
        name: 'organizational_unit',
        type: 'string',
        default: '',
        description: 'Organizational unit',
      },
    ],
  },

  // Additional Fields for getList operation
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['recruitmentCampaign'],
        operation: ['getRecruitmentCampaignsList'],
      },
    },
    description: 'Additional fields to include in the request',
    options: [
      {
        displayName: 'Sort',
        name: 'sort',
        type: 'string',
        default: '',
        description: 'The sort order to use in the request',
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
        type: 'fixedCollection',
        typeOptions: {
          multipleValues: true,
        },
        description: 'The filters to use in the request',
        default: {},
        options: [
          {
            name: 'filter',
            displayName: 'Filter Values',
            values: [
              {
                displayName: 'Filter Key',
                name: 'key',
                type: 'string',
                default: '',
                placeholder: 'e.g., organizational_unit',
              },
              {
                displayName: 'Values',
                name: 'values',
                type: 'string',
                default: '',
                placeholder: 'Comma-separated values (e.g., MG,TN)',
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
        description: 'The fields to use in the request',
        default: {},
        options: [
          {
            displayName: 'Field',
            name: 'field',
            values: [
              {
                displayName: 'Field Key',
                name: 'key',
                type: 'string',
                default: '',
                placeholder: 'e.g., recruitment/positions',
              },
              {
                displayName: 'Fields',
                name: 'fields',
                type: 'string',
                default: '',
                placeholder: 'Comma-separated field names (e.g., id,name,status)',
              },
            ],
          },
        ],
      },
    ],
  },

  // Add Candidate operation fields
  {
    displayName: 'Talent ID *',
    name: 'talent_id',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['recruitmentCampaign'],
        operation: ['addCandidate'],
      },
    },
    default: '',
    description: 'The ID of the talent to add as candidate',
  },
  {
    displayName: 'Recruitment Campaign ID *',
    name: 'position_id',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['recruitmentCampaign'],
        operation: ['addCandidate', 'moveCandidate', 'hireCandidate', 'rejectCandidate'],
      },
    },
    default: '',
    description: 'The ID of the recruitment campaign position',
  },
  {
    displayName: 'Stage ID *',
    name: 'stage_id',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['recruitmentCampaign'],
        operation: ['addCandidate'],
      },
    },
    default: '',
    description: 'The ID of the stage to assign the candidate to',
  },

  // Move Candidate operation fields
  {
    displayName: 'Candidate ID *',
    name: 'id',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['recruitmentCampaign'],
        operation: ['moveCandidate', 'hireCandidate', 'rejectCandidate', 'removeCandidate'],
      },
    },
    default: '',
    description: 'The ID of the candidate to move/ hire/ reject/ remove',
  },
  {
    displayName: ' New Stage ID *',
    name: 'stage_id',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['recruitmentCampaign'],
        operation: ['moveCandidate'],
      },
    },
    default: '',
    description: 'The ID of the new stage to move the candidate to',
  },
];
