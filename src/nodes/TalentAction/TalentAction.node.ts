import { IExecuteFunctions, NodeConnectionType, INodeExecutionData } from 'n8n-workflow';
import { INodeTypeDescription } from 'n8n-workflow';
import { PulseApiFactory } from '../../utils/api/PulseApiFactory';
import { BasePulseNode } from '../common/BasePulseNode';
import { talentOperations } from './operations';

export class TalentAction extends BasePulseNode {
	constructor() {
		super({
			displayName: 'Pulse Talent',
			name: 'talent',
			icon: 'file:pulse.svg',
			group: ['input'],
			version: 1,
			description: 'Talent resource from Pulse API',
			defaults: {
				name: 'Talent',
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
							name: 'Talent',
							value: 'talent',
						},
					],
					default: 'talent',
					noDataExpression: true,
					required: true,
					description: 'Talents Resource Action',
				},
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					displayOptions: {
						show: {
							resource: [
								'talent',
							],
						},
					},
					options: [
						{
							name: 'Get Talent List',
							value: 'getTalentList',
							description: 'Get a list of talents',
							action: 'Get talent list',
						},
						{
							name: 'Create Talent',
							value: 'createTalent',
							description: 'Create a new talent for one person',
							action: 'Create talent',
						},
						{
							name: 'Show Talent details',
							value: 'getTalentById',
							description: 'Get a talent details',
							action: 'Get talent details',
						},
					],
					default: 'getTalentList',
					noDataExpression: true,
				},
				{
					displayName: 'Talent ID',
					name: 'talentId',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['getTalentById'],
							resource: ['talent'],
						},
					},
					description: 'The ID of the talent to get or update',
				},
				{
					displayName: 'Person ID',
					name: 'personId',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createTalent'],
							resource: ['talent'],
						},
					},
					description: 'The ID of the person to associate with this talent',
				}
			],
		});
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

				// Handle talent operations
				if (resource === 'talent') {
					switch (operation) {
						case 'getTalentList':
							result = await talentOperations.getTalentList(this, i, pulseApi);
							break;
						case 'createTalent':
							result = await talentOperations.createTalent(this, i, pulseApi);
							break;
						case 'getTalentById':
							result = await talentOperations.getTalentById(this, i, pulseApi);
							break;
						default:
							throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
					}
				}
				
				else {
					throw new Error(`The resource "${resource}" is not supported!`);
				}
				
				returnData.push({
					json: result,
				});
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
