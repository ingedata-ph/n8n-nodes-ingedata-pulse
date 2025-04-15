import { IExecuteFunctions, NodeConnectionType, IDataObject } from 'n8n-workflow';
import { INodeTypeDescription } from 'n8n-workflow';
import { BasePulseNode } from '../common/BasePulseNode';
import { accountOperations, accountRoleOperations } from './operations';

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
				}
			],
		});
	}

	protected async processOperation(
		resource: string,
		operation: string,
		itemIndex: number,
		pulseApi: any,
		executeFunctions: IExecuteFunctions,
	): Promise<any> {
		// Handle account role operations
		if (resource === 'accountRole') {
			switch (operation) {
				case 'addAccountRole':
					return accountRoleOperations.addAccountRole(executeFunctions, itemIndex, pulseApi);
				case 'getAccountRoleById':
					return accountRoleOperations.getAccountRoleById(executeFunctions, itemIndex, pulseApi);
				case 'updateAccountRole':
					return accountRoleOperations.updateAccountRole(executeFunctions, itemIndex, pulseApi);
				case 'deleteAccountRole':
					return accountRoleOperations.deleteAccountRole(executeFunctions, itemIndex, pulseApi);
				default:
					throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
			}
		}
		
		// Handle account operations
		if (resource === 'account') {
			switch (operation) {
				case 'getCurrentUser':
					return accountOperations.getCurrentUser(executeFunctions, itemIndex, pulseApi);
				case 'getUserById':
					return accountOperations.getUserById(executeFunctions, itemIndex, pulseApi);
				case 'createAccount':
					return accountOperations.createAccount(executeFunctions, itemIndex, pulseApi);
				case 'updateAccountStatus':
					return accountOperations.updateAccountStatus(executeFunctions, itemIndex, pulseApi);
				case 'updateAccount':
					return accountOperations.updateAccount(executeFunctions, itemIndex, pulseApi);
				default:
					throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
			}
		}
		
		throw new Error(`The resource "${resource}" is not supported!`);
	}
}
