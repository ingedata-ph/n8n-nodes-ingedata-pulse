import { INodeProperties } from 'n8n-workflow';

export const pipelineTemplateOperationsFields: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['pipelineTemplate'],
			},
		},
		options: [
			{
				name: 'Create Pipeline Template',
				value: 'createPipelineTemplate',
				description: 'Create a new pipeline template',
				action: 'Create a pipeline template',
			},
			{
				name: 'Update Pipeline Template',
				value: 'updatePipelineTemplate',
				description: 'Update a pipeline template',
				action: 'Update a pipeline template',
			},
			{
				name: 'Delete Pipeline Template',
				value: 'deletePipelineTemplate',
				description: 'Delete a pipeline template',
				action: 'Delete a pipeline template',
			},
			{
				name: 'Get List of Pipeline Templates',
				value: 'getListPipelineTemplates',
				description: 'Get list of pipeline templates',
				action: 'Get list of pipeline templates',
			},
		],
		default: 'getListPipelineTemplates',
	},
];

export const pipelineTemplateFields: INodeProperties[] = [
	// Create fields
	{
		displayName: 'Name *',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['pipelineTemplate'],
				operation: ['createPipelineTemplate'],
			},
		},
		default: '',
		description: 'Name of the pipeline template',
	},
	{
		displayName: 'Description *',
		name: 'description',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['pipelineTemplate'],
				operation: ['createPipelineTemplate'],
			},
		},
		default: '',
		description: 'Description of the pipeline template',
	},
	{
		displayName: 'Organizational Unit *',
		name: 'organizational_unit',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['pipelineTemplate'],
				operation: ['createPipelineTemplate'],
			},
		},
		default: '',
		description: 'Organizational unit for the pipeline template',
	},

	// Update/Delete fields
	{
		displayName: 'Pipeline Template ID *',
		name: 'pipelineTemplateId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['pipelineTemplate'],
				operation: ['updatePipelineTemplate', 'deletePipelineTemplate'],
			},
		},
		default: '',
		description: 'ID of the pipeline template to update or delete',
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
				resource: ['pipelineTemplate'],
				operation: ['updatePipelineTemplate'],
			},
		},
		description: 'Fields to update in the pipeline template',
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the pipeline template',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the pipeline template',
			},
			{
				displayName: 'Organizational Unit',
				name: 'organizational_unit',
				type: 'string',
				default: '',
				description: 'Organizational unit for the pipeline template',
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
				resource: ['pipelineTemplate'],
				operation: ['getListPipelineTemplates'],
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
								placeholder: 'e.g., recruitment/pipeline_templates',
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
