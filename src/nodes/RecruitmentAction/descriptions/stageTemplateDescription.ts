import { INodeProperties } from 'n8n-workflow';

export const stageTemplateOperationsFields: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['stageTemplate'],
			},
		},
		options: [
			{
				name: 'Create Stage Template',
				value: 'createStageTemplate',
				description: 'Create a new stage template',
				action: 'Create a stage template',
			},
			{
				name: 'Update Stage Template',
				value: 'updateStageTemplate',
				description: 'Update a stage template',
				action: 'Update a stage template',
			},
			{
				name: 'Delete Stage Template',
				value: 'deleteStageTemplate',
				description: 'Delete a stage template',
				action: 'Delete a stage template',
			},
			{
				name: 'Get List Stage Templates',
				value: 'getListStageTemplates',
				description: 'Get list of stage templates',
				action: 'Get list of stage templates',
			},
		],
		default: 'getListStageTemplates',
	},
];

export const stageTemplateFields: INodeProperties[] = [
	// Create fields
  {
		displayName: 'Pipeline Template ID *',
		name: 'pipeline_template_id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['stageTemplate'],
				operation: ['createStageTemplate'],
			},
		},
		default: '',
		description: 'ID of the pipeline template this stage belongs to',
	},
	{
		displayName: 'Stage Name *',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['stageTemplate'],
				operation: ['createStageTemplate'],
			},
		},
		default: '',
		description: 'Name of the stage template',
	},
	{
		displayName: 'Description *',
		name: 'description',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['stageTemplate'],
				operation: ['createStageTemplate'],
			},
		},
		default: '',
		description: 'Description of the stage template',
	},
	{
		displayName: 'Index *',
		name: 'index',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['stageTemplate'],
				operation: ['createStageTemplate'],
			},
		},
		default: 1,
		description: 'Index of the stage template (must be greater than or equal to 1)',
		typeOptions: {
			minValue: 1,
		},
	},
	{
		displayName: 'Threshold days (Optional)',
		name: 'warning_after_days',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['stageTemplate'],
				operation: ['createStageTemplate'],
			},
		},
		default: '',
		description: 'Number of days after which to show a warning (must be greater than 0 if provided)',
	},

	// Update/Delete fields
	{
		displayName: 'Stage Template ID *',
		name: 'stageTemplateId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['stageTemplate'],
				operation: ['updateStageTemplate', 'deleteStageTemplate'],
			},
		},
		default: '',
		description: 'ID of the stage template to update or delete',
	},

	// Update fields
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['stageTemplate'],
				operation: ['updateStageTemplate'],
			},
		},
		description: 'Fields to update in the stage template',
		options: [
			{
				displayName: 'Stage Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the stage template',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the stage template',
			},
			{
				displayName: 'Index',
				name: 'index',
				type: 'number',
				default: 1,
				description: 'Index of the stage template (must be greater than or equal to 1)',
				typeOptions: {
					minValue: 1,
				},
			},
			{
				displayName: 'Threshold days',
				name: 'warning_after_days',
				type: 'number',
				default: '',
				description: 'Number of days after which to show a warning (must be greater than 0 if provided)',
			},
		],
	},

	// List fields
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['stageTemplate'],
				operation: ['getListStageTemplates'],
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
								placeholder: 'e.g., pipeline_template_id',
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
								placeholder: 'e.g., recruitment/stage_templates',
							},
							{
								displayName: 'Fields',
								name: 'fields',
								type: 'string',
								default: '',
								placeholder: 'Comma-separated field names (e.g., id,name,description)',
							},
						],
					},
				],
			},
		],
	},
];
