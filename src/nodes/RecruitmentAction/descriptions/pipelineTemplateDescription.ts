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
];
