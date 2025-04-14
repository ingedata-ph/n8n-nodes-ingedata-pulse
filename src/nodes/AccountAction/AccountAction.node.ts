import { IExecuteFunctions, NodeConnectionType, IDataObject } from 'n8n-workflow';
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
							'accountRole',
						],
					},
				},
				noDataExpression: true,
				options: [
					{
						name: 'Add New Account Role',
						value: 'addAccountRole',
						description: 'Add a new account role',
						action: 'Add a new account role',
					},
					{
						name: 'Update Account Role',
						value: 'updateAccountRole',
						description: 'Update an existing account role',
						action: 'Update scopes for existing account role',
					},
					{
						name: 'Get Account Role Details',
						value: 'getAccountRoleById',
						description: 'Get specific account role details',
						action: 'Get account role details',
					},
					{
						name: 'Delete Account Role',
						value: 'deleteAccountRole',
						description: 'Delete an account role',
						action: 'Delete account role',
					}
				],
				default: 'addAccountRole',
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
						name: 'Get User Account details',
						value: 'getUserById',
						description: 'Get an user account details',
						action: 'Get user account details',
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
				name: 'expiresAt',
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
			},
			{
				displayName: 'Account ID',
				name: 'account_id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: ['addAccountRole'],
						resource: ['accountRole'],
					},
				},
				description: 'The ID of the account',
			},
			{
				displayName: 'Account Role ID',
				name: 'account_role_id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: ['updateAccountRole', 'getAccountRoleById', 'deleteAccountRole'],
						resource: ['accountRole'],
					},
				},
				description: 'The ID of the account role',
			},
			{
				displayName: 'Role Name',
				name: 'role_name',
				type: 'options',
				options: [
					{
						name: 'Admin',
						value: 'admin',
					},
					{
						name: 'HR Staff',
						value: 'hr_staff',
					},
					{
						name: 'Staff',
						value: 'staff',
					},
					{
						name: 'Lead',
						value: 'lead',
					},
					{
						name: 'Office Manager',
						value: 'office_manager',
					},
					{
						name: 'Production Manager',
						value: 'production_manager',
					},
					{
						name: 'Client',
						value: 'client',
					},
				],
				default: 'admin',
				required: true,
				displayOptions: {
					show: {
						operation: ['addAccountRole', 'updateAccountRole'],
						resource: ['accountRole'],
					},
				},
				description: 'The name of the role',
			},
			{
				displayName: 'Organization ID',
				name: 'organization_id',
				type: 'string',
				default: '',
				required: false,
				displayOptions: {
					show: {
						operation: ['addAccountRole'],
						resource: ['accountRole'],
						role_name: ['client'],
					},
				},
				description: 'The ID of the organization (required for Client role)',
			},
			{
				displayName: 'Organizational Unit',
				name: 'organizational_unit',
				type: 'string',
				default: '',
				required: false,
				displayOptions: {
					show: {
						operation: ['addAccountRole'],
						resource: ['accountRole'],
						role_name: ['office_manager', 'hr_staff', 'production_manager'],
					},
				},
				description: 'The organizational unit (required for Office Manager, HR staff, or Production Manager roles)',
			},
			{
				displayName: 'Project IDs',
				name: 'project_ids',
				type: 'string',
				default: '',
				required: false,
				displayOptions: {
					show: {
						operation: ['addAccountRole'],
						resource: ['accountRole'],
						role_name: ['lead', 'staff'],
					},
				},
				placeholder: 'project_id_1, project_id_2',
				description: 'The IDs of the projects (required for Lead or Staff roles). Comma-separated list.',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: [
							'accountRole',
						],
						operation: [
							'updateAccountRole',
						],
					},
				},
				options: [
					{
						displayName: 'Scopes',
						name: 'scopes',
						type: 'string',
						default: '',
						description: 'The scopes for the role. This is a JSON object that specifies the resources and permissions for the role.',
						placeholder: 'e.g., {"project": ["project_id_1", "project_id_2"]}',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions) {
		const items = this.getInputData();
		const returnData: Array<{json: any}> = [];

		// For each item (though there will usually just be one)
		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;
				const pulseApi = await getPulseApiHelper.apply(this);

				let result;

				if (resource === 'accountRole' && operation === 'addAccountRole') {
					// Add a new account role
					const account_id = this.getNodeParameter('account_id', i) as string;
					const role_name = this.getNodeParameter('role_name', i) as string;

					// Prepare scopes based on role
					let scopes = {};
					// ToDo: add validation of the fields
					if (role_name === 'client') {
						const organization_id = this.getNodeParameter('organization_id', i, '') as string;
						if (organization_id) {
							organization_id.split(',').map(id => id.trim());
							scopes = { organization: organization_id.split(',').map(id => id.trim()) };
						}
					} else if (['office_manager', 'hr_staff', 'production_manager'].includes(role_name)) {
						const organizational_unit = this.getNodeParameter('organizational_unit', i, '') as string;
						if (organizational_unit) {
							scopes = { ou: organizational_unit.split(',').map(id => id.trim()) };
						}
					} else if (['lead', 'staff'].includes(role_name)) {
						const project_ids_str = this.getNodeParameter('project_ids', i, '') as string;
						if (project_ids_str) {
							scopes = { project: project_ids_str.split(',').map(id => id.trim()) };
						}
					}

					const roleData = {
						data: {
							type: "iam/account/roles",
							attributes: {
								name: role_name,
								scopes: scopes,
							},
							relationships: {
								account: {
									data: {
										type: "iam/accounts",
										id: account_id
									}
								}
							}
						}
					};

					result = await pulseApi.createAccountRole(roleData);
				} else if (resource === 'accountRole' && operation === 'getAccountRoleById') {
					// Get account role by ID
					const account_role_id = this.getNodeParameter('account_role_id', i) as string;
					const included = this.getNodeParameter('included', i, []) as string[];

					result = await pulseApi.getAccountRoleById(account_role_id, included);
				} else if (resource === 'accountRole' && operation === 'updateAccountRole') {
					// Update an account role
					const account_role_id = this.getNodeParameter('account_role_id', i) as string;
					const role_name = this.getNodeParameter('role_name', i) as string;

					const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
					let scopesRaw = additionalFields.scopes as string;

					let scopes : IDataObject

					if (typeof scopesRaw === 'string') {
						try {
							scopes = JSON.parse(scopesRaw);
						} catch (error) {
							throw new Error(`Error parsing scopes: ${error}`);
						}
					} else if (typeof scopesRaw === 'object' && scopesRaw !== null) {
						scopes = scopesRaw as IDataObject;
					} else {
						throw new Error('Scopes must be an object or a JSON-formatted string');
					}

					let scopes_value;
					// Prepare scopes based on role
					if (role_name === 'client' && scopes['organization']) {
						scopes_value = {
							organization: scopes['organization']
						}
					} else if (['office_manager', 'hr_staff', 'production_manager'].includes(role_name) && scopes['ou']) {
						scopes_value = {
							ou: scopes['ou']
						}
					} else if (['lead', 'staff'].includes(role_name) && scopes['project']) {
						scopes_value = {
							project: scopes['project']
						};
					} else {
						throw new Error('Invalid role or scopes provided');
					}

					const roleData = {
						data: {
							type: "iam/account/roles",
							attributes: {
								scopes: scopes_value,
							},
						}
					};

					result = await pulseApi.updateAccountRole(account_role_id, roleData);
				} else if (resource === 'accountRole' && operation === 'deleteAccountRole') {
					// Delete an account role
					const account_role_id = this.getNodeParameter('account_role_id', i) as string;
					result = await pulseApi.deleteAccountRole(account_role_id);
				} else if (operation === 'getCurrentUser') {
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
					const account_type = this.getNodeParameter('accountType', i) as string;
					const personId = this.getNodeParameter('personId', i) as string;
					const expires_at = this.getNodeParameter('expiresAt', i, '') as string;
					
					const accountData = {
						data: {
							type: "iam/accounts",
							attributes: {
								email: email,
								account_type: account_type,
								enabled: true,
								expires_at: expires_at ? new Date(expires_at).toISOString() : undefined,
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
					const account_type = this.getNodeParameter('accountType', i) as string;
					const expires_at = this.getNodeParameter('expiresAt', i, '') as string;
					
					const accountData = {
						data: {
							type: "iam/accounts",
							id: accountId,
							attributes: {
								email: email,
								account_type: account_type,
								enabled: true,
								expires_at: expires_at ? new Date(expires_at).toISOString() : undefined,
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
