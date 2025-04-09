import { IExecuteFunctions, NodeConnectionType } from 'n8n-workflow';
import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { getPulseApiHelper } from '../../utils/PulseApiHelper';

export class AccountAction implements INodeType {
	description: INodeTypeDescription = {
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
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'account',
						],
					},
				},
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
					{
						name: 'Create new User Account',
						value: 'createAccount',
						description: 'Create a new user account',
						action: 'Create new user account',
					},
					{
						name: 'Activate/Deactivate Account',
						value: 'updateAccountStatus',
						description: 'Activate or deactivate an account',
						action: 'Update account status',
					},
					{
						name: 'Update Account',
						value: 'updateAccount',
						description: 'Update an account',
						action: 'Update account',
					}
				],
				default: 'getCurrentUser',
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
						name: 'Roles',
						value: 'roles',
					},
				],
				default: [],
				required: false,
				displayOptions: {
					show: {
						operation: ['getCurrentUser', 'getUserById'],
						resource: ['account'],
					},
				},
				description: 'Related resources to include in the response',
			},
			{
				displayName: 'Account ID',
				name: 'accountId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: ['getUserById', 'updateAccountStatus', 'updateAccount'],
						resource: ['account'],
					},
				},
				description: 'The ID of the account to get/update',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: ['createAccount', 'updateAccount'],
						resource: ['account'],
					}
				},
				description: 'The email address of the new user account',
			},
			{
				displayName: 'Account type',
				name: 'accountType',
				type: 'options',
				required: true,
				options: [
					{
						name: 'Personal Account',
						value: 'personal_account',
					},
					{
						name: 'Service Account',
						value: 'service_account',
					},
					{
						name: 'Local Account',
						value: 'local_account',
					},
				],
				default: 'personal_account',
				displayOptions: {
					show: {
						operation: ['createAccount', 'updateAccount'],
						resource: ['account'],
					},
				},
				description: 'The type of account to create',
			},
			{
				displayName: 'Person ID',
				name: 'personId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: ['createAccount'],
						resource: ['account'],
					},
				},
				description: 'The ID of the person to associate with this account',
			},
			{
				displayName: 'Status',
				name: 'enabled',
				type: 'boolean',
				default: true,
				required: true,
				displayOptions: {
					show: {
						operation: ['updateAccountStatus'],
						resource: ['account'],
					},
				},
				description: 'Whether the account should be enabled or disabled',
				typeOptions: {
					labelTrue: 'Activate',
					labelFalse: 'Deactivate',
				},
			},
			{
				displayName: 'Expired At',
				name: 'expiredAt',
				type: 'dateTime',
				default: '',
				required: false,
				displayOptions: {
					show: {
						operation: ['updateAccount', 'createAccount'],
						resource: ['account'],
					},
				},
				description: 'The expiration date of the account',
				typeOptions: {
					dateOnly: true
				},
			}
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
					const included = this.getNodeParameter('included', i, []) as string[];
					result = await pulseApi.getCurrentAccount(included);
				} else if (operation === 'getUserById') {
					// Get user account by ID
					const accountId = this.getNodeParameter('accountId', i) as string;
					const included = this.getNodeParameter('included', i, []) as string[];
					result = await pulseApi.getAccount(accountId, included);
				} else if (operation === 'createAccount') {
					// Create a new user account
					const email = this.getNodeParameter('email', i) as string;
					const accountType = this.getNodeParameter('accountType', i) as string;
					const personId = this.getNodeParameter('personId', i) as string;
					const expiredAt = this.getNodeParameter('expiredAt', i, '') as string;
					
					const accountData = {
						data: {
							type: "iam/accounts",
							attributes: {
								email: email,
								accountType: accountType,
								enabled: true,
								expiredAt: expiredAt ? new Date(expiredAt).toISOString() : undefined,
							},
							relationships: {
								person: {
									data: {
										type: "iam/people",
										id: personId
									}
								}
							}
						}
					};
					
					result = await pulseApi.createAccount(accountData);
				} else if (operation === 'updateAccountStatus') {
					// Update account status (enable/disable)
					const accountId = this.getNodeParameter('accountId', i) as string;
					const enabled = this.getNodeParameter('enabled', i) as boolean;
					
					const attributes: {
						enabled: boolean;
					} = {
						enabled: enabled
					};

					const accountData = {
						data: {
							type: "iam/accounts",
							id: accountId,
							attributes
						}
					};
					
					result = await pulseApi.updateAccount(accountId, accountData);
				} else if (operation === 'updateAccount') {
					// Update an account
					const accountId = this.getNodeParameter('accountId', i) as string;
					const email = this.getNodeParameter('email', i) as string;
					const accountType = this.getNodeParameter('accountType', i) as string;
					const expiredAt = this.getNodeParameter('expiredAt', i, '') as string;
					
					const accountData = {
						data: {
							type: "iam/accounts",
							id: accountId,
							attributes: {
								email: email,
								accountType: accountType,
								enabled: true,
								expiredAt: expiredAt ? new Date(expiredAt).toISOString() : undefined,
							},
						}
					};
					
					result = await pulseApi.updateAccount(accountId, accountData);
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
