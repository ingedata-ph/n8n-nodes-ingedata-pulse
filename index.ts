import { INodeType, INodeTypeDescription, ICredentialType } from 'n8n-workflow';

// Import credentials
import { PulseApi } from './src/credentials/PulseApi.credentials';

// Import nodes
import { AccountRead } from './src/nodes/AccountRead/AccountRead.node';

// Export the credentials
export const credentials = {
	pulseApi: {
		type: PulseApi,
		extends: [],
	},
};

// Export the nodes
export const nodes = [
	AccountRead,
];
