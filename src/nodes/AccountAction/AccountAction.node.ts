import { IExecuteFunctions, NodeConnectionType, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { INodeTypeDescription } from 'n8n-workflow';
import { PulseApiFactory } from '../../utils/api/PulseApiFactory';
import { BasePulseNode } from '../common/BasePulseNode';
import { accountOperations, accountRoleOperations } from './operations';
import {accountOperationsFields, accountFields} from './descriptions/accountDescription';
import {accountRoleOperationsFields, accountRoleFields} from './descriptions/accountRoleDescription';

export class AccountAction extends BasePulseNode {
	constructor() {
		super({
			displayName: 'Pulse Account Read',
			name: 'accountAction',
			icon: 'file:pulse.svg',
			group: ['input'],
			version: 1,
			description: 'Account actions from Pulse API',
			defaults: {
				name: 'Account Action',
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
							name: 'Account',
							value: 'account',
						},
						{
							name: 'Account Role',
							value: 'accountRole',
						},
					],
					default: 'account',
					noDataExpression: true,
					required: true,
					description: 'Get account information',
				},
				...accountOperationsFields,
				...accountFields,
				...accountRoleOperationsFields,
				...accountRoleFields,
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

				// Handle account role operations
				if (resource === 'accountRole') {
					switch (operation) {
						case 'addAccountRole':
							result = { 
								json: await  accountRoleOperations.addAccountRole(this, i, pulseApi)
							};
							break;
						case 'getAccountRoleById':
							result = { 
								json: await  accountRoleOperations.getAccountRoleById(this, i, pulseApi)
							};
							break;
						case 'updateAccountRole':
							result = { 
								json: await  accountRoleOperations.updateAccountRole(this, i, pulseApi)
							};
							break;
						case 'deleteAccountRole':
							result = { 
								json: await  accountRoleOperations.deleteAccountRole(this, i, pulseApi)
							};
							break;
						default:
							throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
					}
				}
				
				// Handle account operations
				else if (resource === 'account') {
					switch (operation) {
						case 'getCurrentUser':
							result = { 
								json: await  accountOperations.getCurrentUser(this, i, pulseApi)
							};
							break;
						case 'getUserById':
							result = { 
								json: await  accountOperations.getUserById(this, i, pulseApi)
							};
							break;
						case 'createAccount':
							result = { 
								json: await  accountOperations.createAccount(this, i, pulseApi)
							};
							break;
						case 'updateAccountStatus':
							result = { 
								json: await  accountOperations.updateAccountStatus(this, i, pulseApi)
							};
							break;
						case 'updateAccount':
							result = { 
								json: await  accountOperations.updateAccount(this, i, pulseApi)
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
