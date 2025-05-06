import { IExecuteFunctions, NodeConnectionType, IDataObject, INodeExecutionData, ILoadOptionsFunctions } from 'n8n-workflow';
import { INodeTypeDescription } from 'n8n-workflow';
import { PulseApiFactory } from '../../utils/api/PulseApiFactory';
import { BasePulseNode } from '../common/BasePulseNode';
import { organizationsOperations, peopleDirectoriesOperations } from './operations';
import { 
	organizationsOperationsFields, organizationsFields,
	peopleDirectoriesOperationsFields, peopleDirectoriesFields 
} from './descriptions';

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
				...organizationsOperationsFields,
				...organizationsFields,
				...peopleDirectoriesOperationsFields,
				...peopleDirectoriesFields,
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
