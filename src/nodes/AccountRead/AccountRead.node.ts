import { IExecuteFunctions, NodeConnectionType } from 'n8n-workflow';
import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { getPulseApiHelper } from '../../utils/PulseApiHelper';

export class AccountRead implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Pulse Account Read',
		name: 'accountRead',
		group: ['input'],
		version: 1,
		description: 'Reads account information from Pulse API',
		defaults: {
			name: 'Account Read',
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
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get Current User',
						value: 'getCurrentUser',
						description: 'Get the current authenticated user account information',
						action: 'Get current user account information',
					},
					{
						name: 'Get User by ID',
						value: 'getUserById',
						description: 'Get a user account by ID',
						action: 'Get user account by ID',
					},
				],
				default: 'getCurrentUser',
			},
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: ['getUserById'],
					},
				},
				description: 'The ID of the user to get account information for',
			},
		],
	};

	async execute(this: IExecuteFunctions) {
		const items = this.getInputData();
		const returnData: Array<{json: any}> = [];

		// For each item (though there will usually just be one)
		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;
				const pulseApi = await getPulseApiHelper.apply(this);

				let result;

				if (operation === 'getCurrentUser') {
					// Get current user account information
					result = await pulseApi.getCurrentAccount();
				} else if (operation === 'getUserById') {
					// Get user account by ID
					const userId = this.getNodeParameter('userId', i) as string;
					result = await pulseApi.getAccount(userId);
				} else {
					throw new Error(`The operation "${operation}" is not supported!`);
				}

				returnData.push({ json: result });
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message } });
					continue;
				}
				throw error;
			}
		}

		return this.prepareOutputData(returnData);
	}
}
