import { IExecuteFunctions, NodeConnectionType, INodeProperties, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { INodeTypeDescription } from 'n8n-workflow';
import { PulseApiFactory } from '../../utils/api/PulseApiFactory';
import { BasePulseNode } from '../common/BasePulseNode';
import { candidateOperations, quizzSessionOperations } from './operations';

export class RecruitmentAction extends BasePulseNode {
	constructor() {
		super({
			displayName: 'Pulse Recruitment',
			name: 'recruitmentAction',
			icon: 'file:pulse.svg',
			group: ['input'],
			version: 1,
			description: 'Recruitment actions from Pulse API',
			defaults: {
				name: 'Recruitment Action',
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
							name: 'Candidates',
							value: 'candidates',
						},
						{
							name: 'Candidates Quizz Sessions',
							value: 'quizzSessions',
						},
					],
					default: 'candidates',
					noDataExpression: true,
					required: true,
					description: 'Resource to use',
				},
				// Candidates operations
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					displayOptions: {
						show: {
							resource: [
								'candidates',
							],
						},
					},
					noDataExpression: true,
					options: [
						{
							name: 'Create Candidate',
							value: 'createCandidate',
							description: 'Create a new candidate',
							action: 'Create a new candidate',
						},
						{
							name: 'Update Candidate',
							value: 'updateCandidate',
							description: 'Update an existing candidate',
							action: 'Update a candidate',
						},
						{
							name: 'Get Candidate',
							value: 'getCandidateById',
							description: 'Get a specific candidate',
							action: 'Get a candidate',
						},
						{
							name: 'List Candidates',
							value: 'getCandidatesList',
							description: 'List candidates',
							action: 'List candidates',
						},
					],
					default: 'createCandidate',
				},
				{
					displayName: 'Candidate ID',
					name: 'candidateId',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							resource: ['candidates'],
							operation: ['getCandidateById', 'updateCandidate'],
						},
					},
					description: 'The ID of the candidate',
				},

				// Quizz Sessions operations
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					displayOptions: {
						show: {
							resource: [
								'quizzSessions',
							],
						},
					},
					noDataExpression: true,
					options: [
						{
							name: 'Create Quizz Session',
							value: 'createQuizzSession',
							description: 'Create a new quizz session for candidates',
							action: 'Create a new quizz session for candidates',
						},
						{
							name: 'Update Quizz Session',
							value: 'updateQuizzSession',
							description: 'Update an existing quizz session',
							action: 'Update a quizz session',
						},
						{
							name: 'Cancel Quizz Session',
							value: 'cancelQuizzSession',
							description: 'Cancel candidate quizz session',
							action: 'Cancel candidate quizz session',
						},
						{
							name: 'Get Quizz Session',
							value: 'getQuizzSessionById',
							description: 'Get a specific candidate quizz session details',
							action: 'Get a candidate quizz session',
						},
						{
							name: 'List Quizz Sessions',
							value: 'getQuizzSessionsList',
							description: 'List quizz sessions',
							action: 'List quizz sessions',
						},
						{
							name: 'Assign New Quizz',
							value: 'assignQuizz',
							description: 'Assign a quizz to a candidate session',
							action: 'Assign a quizz to a candidate session',
						},
						{
							name: 'Share Candidate Quiz Session Link',
							value: 'shareTestLink',
							description: 'Share candidate quiz session link',
							action: 'Share candidate quiz session link',
						}
					],
					default: 'createQuizzSession',
				},
				{
					displayName: 'New Person',
					name: 'newPerson',
					type: 'boolean',
					default: true,
					required: true,
					displayOptions: {
						show: {
							resource: ['candidates'],
							operation: ['createCandidate'],
						},
					},
					description: 'Whether to create a new person or use an existing one',
				},
				{
					displayName: 'Person ID',
					name: 'personId',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							resource: ['candidates'],
							operation: ['createCandidate'],
							newPerson: [false],
						},
					},
					description: 'The ID of the existing person',
				},
				{
					displayName: 'First Name',
					name: 'firstName',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							resource: ['candidates'],
							operation: ['createCandidate'],
							newPerson: [true],
						},
					},
					description: 'The first name of the person',
				},
        {
					displayName: 'First Name',
					name: 'firstName',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							resource: ['candidates'],
							operation: ['updateCandidate'],
						},
					},
					description: 'The first name of the person',
				},
        {
					displayName: 'Middle Name',
					name: 'middleName',
					type: 'string',
					default: '',
					displayOptions: {
						show: {
							resource: ['candidates'],
							operation: ['createCandidate'],
							newPerson: [true],
						},
					},
					description: 'The middle name of the person',
				},
        {
					displayName: 'Middle Name',
					name: 'middleName',
					type: 'string',
					default: '',
					displayOptions: {
						show: {
							resource: ['candidates'],
							operation: ['updateCandidate'],
						},
					},
					description: 'The middle name of the person',
				},
				{
					displayName: 'Last Name',
					name: 'lastName',
					type: 'string',
					default: '',
					required: true,
          displayOptions: {
            show: {
              resource: ['candidates'],
              operation: ['updateCandidate'],
            },
          },
					description: 'The last name of the person',
				},
        {
					displayName: 'Last Name',
					name: 'lastName',
					type: 'string',
					default: '',
					required: true,
          displayOptions: {
            show: {
              resource: ['candidates'],
              operation: ['createCandidate'],
              newPerson: [true],
            },
          },
					description: 'The last name of the person',
				},
				{
					displayName: 'Organizational Unit',
					name: 'organizationalUnit',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							resource: ['candidates'],
							operation: ['createCandidate'],
							newPerson: [true],
						},
					},
					description: 'The organizational unit of the person',
				},
				{
					displayName: 'Picture URL',
					name: 'pictureUrl',
					type: 'string',
					default: '',
					displayOptions: {
						show: {
							resource: ['candidates'],
							operation: ['createCandidate'],
							newPerson: [true],
						},
					},
					description: 'The URL of the person\'s picture',
				},
        {
					displayName: 'Organizational Unit',
					name: 'organizationalUnit',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							resource: ['candidates'],
							operation: ['updateCandidate'],

						},
					},
					description: 'The organizational unit of the person',
				},
				{
					displayName: 'Picture URL',
					name: 'pictureUrl',
					type: 'string',
					default: '',
					displayOptions: {
						show: {
							resource: ['candidates'],
							operation: ['updateCandidate'],
						},
					},
					description: 'The URL of the person\'s picture',
				},
				// Quizz Session parameters
				{
					displayName: 'Session ID',
					name: 'sessionId',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							resource: ['quizzSessions'],
							operation: [
								'updateQuizzSession',
								'cancelQuizzSession',
								'assignQuizz',
								'getQuizzSessionById',
								'shareTestLink',
							],
						},
					},
					description: 'The ID of the session',
				},
				{
					displayName: 'Person ID',
					name: 'personId',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							resource: ['quizzSessions'],
							operation: ['createQuizzSession'],
						},
					},
					description: 'The ID of the person',
				},
				{
					displayName: 'Name',
					name: 'name',
					type: 'string',
					default: 'Session',
					displayOptions: {
						show: {
							resource: ['quizzSessions'],
							operation: ['updateQuizzSession'],
						},
					},
					description: 'The name of the session',
				},
				{
					displayName: 'Expires At',
					name: 'expiresAt',
					type: 'dateTime',
					default: '',
					displayOptions: {
						show: {
							resource: ['quizzSessions'],
							operation: ['createQuizzSession', 'updateQuizzSession'],
						},
					},
					description: 'The expiration date of the session',
				},
				{
					displayName: 'Quiz ID',
					name: 'quizId',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							resource: ['quizzSessions'],
							operation: ['assignQuizz'],
						},
					},
					description: 'The ID of the quiz',
				},
				{
					displayName: 'Include',
					name: 'included',
					type: 'multiOptions',
					options: [
						{
							name: 'Quizzes',
							value: 'quiz',
						},
					],
					default: [],
					displayOptions: {
						show: {
							resource: ['quizzSessions'],
							operation: ['getQuizzSessionsList', 'getQuizzSessionById'],
						},
					},
					description: 'The resources to include in the response',
				},
        {
					displayName: 'Additional Fields',
					name: 'additionalFields',
					type: 'collection',
					placeholder: 'Add Field',
					default: {},
					displayOptions: {
						show: {
							resource: ['candidates', 'quizzSessions'],
							operation: ['getCandidatesList', 'getQuizzSessionsList'],
						},
					},
					options: [
						{
							displayName: 'Sort',
							name: 'sort',
							type: 'string',
							default: '',
							description: 'Sort order (e.g., "created_at" or "-created_at" for descending)',
						},
						{
							displayName: 'Page Number',
							name: 'pageNumber',
							type: 'number',
							default: 1,
							description: 'Pagination - page number',
						},
						{
							displayName: 'Page Size',
							name: 'pageSize',
							type: 'number',
							default: 10,
							description: 'Pagination - page size',
						},
						{
							displayName: 'Filters',
							name: 'filters',
							placeholder: 'Add Filter',
							type: 'fixedCollection',
							typeOptions: {
								multipleValues: true,
							},
							default: {},
							options: [
								{
									name: 'filter',
									displayName: 'Filter',
									values: [
										{
											displayName: 'Key',
											name: 'key',
											type: 'string',
											default: '',
											description: 'The key to filter on',
										},
										{
											displayName: 'Values',
											name: 'values',
											type: 'string',
											default: '',
											description: 'Comma-separated list of values',
										},
									],
								},
							],
							description: 'Filter results by specific fields',
						},
						{
							displayName: 'Fields',
							name: 'fields',
							placeholder: 'Add Field',
							type: 'fixedCollection',
							typeOptions: {
								multipleValues: true,
							},
							default: {},
							options: [
								{
									name: 'field',
									displayName: 'Field',
									values: [
										{
											displayName: 'Resource Type',
											name: 'key',
											type: 'string',
											default: '',
											description: 'The resource type to specify fields for',
										},
										{
											displayName: 'Fields',
											name: 'fields',
											type: 'string',
											default: '',
											description: 'Comma-separated list of fields to include',
										},
									],
								},
							],
							description: 'Specify which fields to include in the response',
						},
					],
				},
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

				// Handle candidates operations
				if (resource === 'candidates') {
					switch (operation) {
						case 'createCandidate':
							result = { 
								json: await  candidateOperations.createCandidate(this, i, pulseApi)
							};
							break;
						case 'updateCandidate':
							result = { 
								json: await  candidateOperations.updateCandidate(this, i, pulseApi)
							};
							break;
						case 'getCandidateById':
							result = { 
								json: await  candidateOperations.getCandidateById(this, i, pulseApi)
							};
							break;
						case 'getCandidatesList':
							result = { 
								json: await  candidateOperations.getCandidatesList(this, i, pulseApi)
							};
							break;
						default:
							throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
					}
				}
				
				else if (resource === 'quizzSessions') {
					switch (operation) {
						case 'createQuizzSession':
							result = { 
								json: await  quizzSessionOperations.createQuizzSession(this, i, pulseApi)
							};
							break;
						case 'updateQuizzSession':
							result = { 
								json: await  quizzSessionOperations.updateQuizzSession(this, i, pulseApi)
							};
							break;
						case 'cancelQuizzSession':
							result = { 
								json: await  quizzSessionOperations.cancelQuizzSession(this, i, pulseApi)
							};
							break;
						case 'getQuizzSessionById':
							result = { 
								json: await  quizzSessionOperations.getQuizzSessionById(this, i, pulseApi)
							};
							break;
						case 'getQuizzSessionsList':
							result = { 
								json: await  quizzSessionOperations.getQuizzSessionsList(this, i, pulseApi)
							};
							break;
						case 'assignQuizz':
							result = { 
								json: await  quizzSessionOperations.assignQuizz(this, i, pulseApi)
							};
							break;
						case 'shareTestLink':
							result = { 
								json: await  quizzSessionOperations.shareTestLink(this, i, pulseApi)
							};
							break;
						default:
							throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
					}
				} else {
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
