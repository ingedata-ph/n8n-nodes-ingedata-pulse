import { IExecuteFunctions, NodeConnectionType, IDataObject, INodeExecutionData, ILoadOptionsFunctions } from 'n8n-workflow';
import { INodeTypeDescription } from 'n8n-workflow';
import { PulseApiFactory } from '../../utils/api/PulseApiFactory';
import { BasePulseNode } from '../common/BasePulseNode';
import { organizationsOperations, peopleDirectoriesOperations } from './operations';

export class OrganizationsAction extends BasePulseNode {
	constructor() {
		super({
			displayName: 'Pulse Organizations',
			name: 'organizationsAction',
			icon: 'file:pulse.svg',
			group: ['input'],
			version: 1,
			description: 'Organizations actions from Pulse API',
			defaults: {
				name: 'Organizations Action',
				color: '#1F8EB2',
			},
			inputs: [NodeConnectionType.Main],
			outputs: [NodeConnectionType.Main],
			credentials: [
				{
					name: 'pulseApi',
					required: true,
				},
			],
			properties: [
				{
					displayName: 'Resource',
					name: 'resource',
					type: 'options',
					options: [
						{
							name: 'Organizations',
							value: 'organizations',
						},
						{
							name: 'People Directories',
							value: 'peopleDirectories',
						},
					],
					default: 'organizations',
					noDataExpression: true,
					required: true,
					description: 'Resource to use',
				},
				// Organizations operations
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					displayOptions: {
						show: {
							resource: [
								'organizations',
							],
						},
					},
					noDataExpression: true,
					options: [
						{
							name: 'Create Organization',
							value: 'createOrganization',
							description: 'Create a new organization',
							action: 'Create a new organization',
						},
						{
							name: 'Update Organization',
							value: 'updateOrganization',
							description: 'Update an existing organization',
							action: 'Update an organization',
						},
						{
							name: 'Enable/Disable Organization Status',
							value: 'updateOrganizationStatus',
							description: 'Enable or disable an organization',
							action: 'Update an organization status',
						},
					],
					default: 'createOrganization',
				},
				{
					displayName: 'Organization ID',
					name: 'organizationId',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							resource: ['organizations'],
							operation: ['updateOrganization', 'updateOrganizationStatus'],
						},
					},
					description: 'The ID of the organization to update',
				},
				{
					displayName: 'Name',
					name: 'name',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							resource: ['organizations'],
							operation: ['createOrganization', 'updateOrganization'],
						},
					},
					description: 'The name of the organization',
				},
				{
					displayName: 'Enabled',
					name: 'enabled',
					type: 'boolean',
					default: true,
					required: true,
					displayOptions: {
						show: {
							resource: ['organizations'],
							operation: ['createOrganization', 'updateOrganizationStatus'],
						},
					},
					description: 'Whether the organization is enabled',
				},
				
				// People Directories operations
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					displayOptions: {
						show: {
							resource: [
								'peopleDirectories',
							],
						},
					},
					noDataExpression: true,
					options: [
						{
							name: 'Create People Directory',
							value: 'createPeopleDirectory',
							description: 'Create a new people directory entry',
							action: 'Create a new people directory entry',
						},
						{
							name: 'Update People Directory',
							value: 'updatePeopleDirectory',
							description: 'Update an existing people directory entry',
							action: 'Update a people directory entry',
						},
						{
							name: 'Delete People Directory',
							value: 'deletePeopleDirectory',
							description: 'Delete a people directory entry',
							action: 'Delete a people directory entry',
						},
						{
							name: 'Get People Directory',
							value: 'getPeopleDirectoryById',
							description: 'Get a specific people directory entry',
							action: 'Get a people directory entry',
						},
						{
							name: 'List People Directories',
							value: 'listPeopleDirectories',
							description: 'List people directory entries',
							action: 'List people directory entries',
						},
					],
					default: 'createPeopleDirectory',
				},
				{
					displayName: 'Person ID',
					name: 'person_id',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							resource: ['peopleDirectories'],
							operation: ['createPeopleDirectory', 'updatePeopleDirectory'],
						},
					},
					description: 'The ID of the person',
				},
				{
					displayName: 'Organization ID',
					name: 'organization_id',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							resource: ['peopleDirectories'],
							operation: ['createPeopleDirectory', 'updatePeopleDirectory'],
						},
					},
					description: 'The ID of the organization',
				},
				{
					displayName: 'People Directory ID',
					name: 'peopleDirectoryId',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							resource: ['peopleDirectories'],
							operation: ['updatePeopleDirectory', 'deletePeopleDirectory', 'getPeopleDirectoryById'],
						},
					},
					description: 'The ID of the people directory entry',
				},
				{
					displayName: 'Tag',
					name: 'tag',
					type: 'options',
					options: [
						{
							name: 'Production',
							value: 'production',
						},
						{
							name: 'Account Management',
							value: 'account',
						},
						{
							name: 'Client',
							value: 'client',
						},
					],
					default: 'production',
					required: true,
					displayOptions: {
						show: {
							resource: ['peopleDirectories'],
							operation: ['createPeopleDirectory', 'updatePeopleDirectory'],
						},
					},
					description: 'The tag for the people directory entry',
				},
				{
					displayName: 'Position',
					name: 'position',
					type: 'options',
					typeOptions: {
						loadOptionsMethod: 'getPositionsBasedOnTag',
						loadOptionsDependsOn: ['tag'],
						disabled: [
							{
								condition: {
									tag: [''],
								},
							},
						],
					},
					default: '',
					required: true,
					displayOptions: {
						show: {
							resource: ['peopleDirectories'],
							operation: ['createPeopleDirectory', 'updatePeopleDirectory'],
						},
					},
					description: 'The position for the people directory entry',
					placeholder: 'Select a people directory position',
				},
				{
					displayName: 'Project IDs',
					name: 'project_ids',
					type: 'string',
					default: '',
					required: false,
					displayOptions: {
						show: {
							resource: ['peopleDirectories'],
							operation: ['createPeopleDirectory', 'updatePeopleDirectory'],
						},
					},
					placeholder: 'project_id_1, project_id_2',
					description: 'The IDs of the projects. Comma-separated list.',
				},
				{
					displayName: 'Other Contacts',
					name: 'otherContactsUi',
					placeholder: 'Add Other Contact',
					type: 'fixedCollection',
					typeOptions: {
						multipleValues: true,
					},
					default: {},
					displayOptions: {
						show: {
							resource: ['peopleDirectories'],
							operation: ['createPeopleDirectory', 'updatePeopleDirectory'],
						},
					},
					options: [
						{
							name: 'otherContactsValues',
							displayName: 'Other Contact',
							values: [
								{
									displayName: 'Contact Type',
									name: 'key',
									type: 'string',
									default: '',
									description: 'Contact type (e.g., slack, whatsapp, email)',
								},
								{
									displayName: 'Contact Value',
									name: 'value',
									type: 'string',
									default: '',
									description: 'Contact value (e.g., URL, phone number)',
								},
							],
						},
					],
					description: 'Other contact information',
				},
				{
					displayName: 'Include Related Resources',
					name: 'included',
					type: 'multiOptions',
					options: [
						{
							name: 'Person',
							value: 'person',
						},
						{
							name: 'Organization',
							value: 'organization',
						},
					],
					default: [],
					required: false,
					displayOptions: {
						show: {
							operation: ['getPeopleDirectoryById', 'listPeopleDirectories'],
							resource: ['peopleDirectories'],
						},
					},
					description: 'Related resources to include in the response',
				},
				{
					displayName: 'Additional Fields',
					name: 'additionalFields',
					type: 'collection',
					placeholder: 'Add Field',
					default: {},
					displayOptions: {
						show: {
							resource: ['peopleDirectories'],
							operation: ['listPeopleDirectories'],
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
			],
		});
	}

	methods = {
		loadOptions: {
			async getPositionsBasedOnTag(this: ILoadOptionsFunctions) {
				const tag = this.getCurrentNodeParameter('tag') as string;
				
				const optionsByTag: Record<string, { name: string; value: string }[]> = {
					production: [
						{ name: 'Production Manager', value: 'production_manager' },
						{ name: 'Operations Manager', value: 'operations_manager' },
						{ name: 'Others', value: 'others' },
					],
					account: [
						{ name: 'Client Success Manager', value: 'client_success_manager' },
						{ name: 'Account Executive', value: 'account_executive' },
						{ name: 'HR & Talent Acquisition', value: 'hr_talent_acquisition' },
						{ name: 'Training & Development', value: 'training_development' },
						{ name: 'Data & Technical solutions', value: 'data_technical_solutions' },
						{ name: 'Billing & Finance', value: 'billing_finance' },
						{ name: 'Others', value: 'others' },
					],
					client: [
						{ name: 'Production Manager', value: 'production_manager' },
						{ name: 'Operations Manager', value: 'operations_manager' },
						{ name: 'Client Success Manager', value: 'client_success_manager' },
						{ name: 'Account Executive', value: 'account_executive' },
						{ name: 'HR & Talent Acquisition', value: 'hr_talent_acquisition' },
						{ name: 'Training & Development', value: 'training_development' },
						{ name: 'Data & Technical solutions', value: 'data_technical_solutions' },
						{ name: 'Billing & Finance', value: 'billing_finance' },
						{ name: 'Others', value: 'others' },
					],
				};
	
				return optionsByTag[tag] || [];
			},
		},
	}

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		// For each item (though there will usually just be one)
		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;
				// Cast the API helper to the appropriate type
				const pulseApi = await PulseApiFactory.getPulseApiHelper(this, resource) as any;

				let result;

				// Handle organizations operations
				if (resource === 'organizations') {
					switch (operation) {
						case 'createOrganization':
							result = { 
								json: await  organizationsOperations.createOrganization(this, i, pulseApi)
							};
							break;
						case 'updateOrganization':
							result = { 
								json: await  organizationsOperations.updateOrganization(this, i, pulseApi)
							};
							break;
						case 'updateOrganizationStatus':
							result = { 
								json: await  organizationsOperations.updateOrganizationStatus(this, i, pulseApi)
							};
							break;
						default:
							throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
					}
				}
				
				// Handle people directories operations
				else if (resource === 'peopleDirectories') {
					switch (operation) {
						case 'createPeopleDirectory':
							result = { 
								json: await  peopleDirectoriesOperations.createPeopleDirectory(this, i, pulseApi)
							};
							break;
						case 'updatePeopleDirectory':
							result = { 
								json: await  peopleDirectoriesOperations.updatePeopleDirectory(this, i, pulseApi)
							};
							break;
						case 'deletePeopleDirectory':
							result = { 
								json: await  peopleDirectoriesOperations.deletePeopleDirectory(this, i, pulseApi)
							};
							break;
						case 'getPeopleDirectoryById':
							result = { 
								json: await  peopleDirectoriesOperations.getPeopleDirectoryById(this, i, pulseApi)
							};
							break;
						case 'listPeopleDirectories':
							result = { 
								json: await  peopleDirectoriesOperations.listPeopleDirectories(this, i, pulseApi)
							};
							break;
						default:
							throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
					}
				}
				
				else {
					throw new Error(`The resource "${resource}" is not supported!`);
				}
				
				returnData.push(result);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: (error as Error).message,
						},
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
