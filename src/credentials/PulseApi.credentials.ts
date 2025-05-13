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
			displayName: 'API URL',
			name: 'apiUrl',
			type: 'string',
			default: 'http://pulse.localhost:3000', // local testing
			description: 'The URL of the Pulse API. Update to use with the staging environment.',
		},
	];
}
