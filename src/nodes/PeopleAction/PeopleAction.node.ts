import { IExecuteFunctions, NodeConnectionType, INodeExecutionData } from 'n8n-workflow';
import { INodeTypeDescription } from 'n8n-workflow';
import { PulseApiFactory } from '../../utils/api/PulseApiFactory';
import { BasePulseNode } from '../common/BasePulseNode';
import { peopleOperations, identityDocumentsOperations } from './operations';
import {
	peopleOperationsFields,
	peopleFields,
	identityDocumentsOperationsFields,
	identityDocumentsFields,
} from './descriptions';

export class PeopleAction extends BasePulseNode {
	constructor() {
		super({
			displayName: 'Pulse People',
			name: 'people',
			icon: 'file:pulse.svg',
			group: ['input'],
			version: 1,
			description: 'People resource from Pulse API',
			defaults: {
				name: 'People',
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
							name: 'People',
							value: 'people',
						},
						{
							name: 'Person Identity Document',
							value: 'identityDocument',
						}
					],
					default: 'people',
					noDataExpression: true,
					required: true,
					description: 'People Actions',
				},
				...peopleOperationsFields,
				...peopleFields,
				...identityDocumentsOperationsFields,
				...identityDocumentsFields,
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

				// Handle people operations
				if (resource === 'people') {
					switch (operation) {
						case 'getPeopleList':
							result = { 
								json: await  peopleOperations.getPeopleList(this, i, pulseApi)
							};
							break;
						case 'createPerson':
							result = { 
								json: await  peopleOperations.createPerson(this, i, pulseApi)
							};
							break;
						case 'getPersonById':
							result = { 
								json: await  peopleOperations.getPersonById(this, i, pulseApi)
							};
							break;
						case 'updatePerson':
							result = { 
								json: await  peopleOperations.updatePerson(this, i, pulseApi)
							};
							break;
						default:
							throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
					}
				}

				else if (resource === 'identityDocument') {
					switch (operation) {
						case 'getIdentityDocumentList':
							result = { 
								json: await  identityDocumentsOperations.getIdentityDocumentList(this, i, pulseApi)
							};
							break;
						case 'createIdentityDocument':
							result = { 
								json: await  identityDocumentsOperations.createIdentityDocument(this, i, pulseApi)
							};
							break;
						case 'getIdentityDocumentById':
							result = { 
								json: await  identityDocumentsOperations.getIdentityDocumentById(this, i, pulseApi)
							};
							break;
						case 'updateIdentityDocument':
							result = { 
								json: await  identityDocumentsOperations.updateIdentityDocument(this, i, pulseApi)
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
