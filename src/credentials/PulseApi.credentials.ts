import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class PulseApi implements ICredentialType {
	name = 'pulseApi';
	displayName = 'Pulse API';
	documentationUrl = 'https://developers.ingedata.ai';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
		},
		{
			displayName: 'API Secret',
			name: 'apiSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
		{
			displayName: 'API URL',
			name: 'apiUrl',
			type: 'string',
			default: 'https://pulse.ingedata.ai',
			description: 'The URL of the Pulse API. Update to use with the staging environment.',
		},
	];
}
