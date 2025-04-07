import { INodeType, INodeTypeDescription, ICredentialType } from 'n8n-workflow';

// Import credentials
import { PulseApi } from './src/credentials/PulseApi.credentials';

// Import nodes
import { AccountAction } from './src/nodes/AccountAction/AccountAction.node';
import { PeopleAction } from './src/nodes/PeopleAction/PeopleAction.node';

// Export the credentials
export const credentials = {
	pulseApi: {
		type: PulseApi,
		extends: [],
	},
};

// Export the nodes
export const nodes = [
	AccountAction,
	PeopleAction,
];
