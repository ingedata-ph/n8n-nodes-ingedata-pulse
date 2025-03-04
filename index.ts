import { INodeType, INodeTypeDescription, ICredentialType } from 'n8n-workflow';

// Import credentials
import { PulseApi } from './src/credentials/PulseApi.credentials';

// Import nodes
import { AccountReadNode } from './src/nodes/AccountRead.node';

// Export the credentials
export const credentials = {
	pulseApi: {
		type: PulseApi,
		extends: [],
	},
};

// Export the nodes
export const nodes = [
	{
		description: {
			displayName: 'Pulse Account Read',
			name: 'accountRead',
			group: ['input'],
			version: 1,
			description: 'Reads account information from Pulse API',
			defaults: {
				name: 'Account Read',
			},
		},
		type: AccountReadNode,
	},
];
