import { IExecuteFunctions, NodeConnectionType, INodeProperties, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { INodeTypeDescription } from 'n8n-workflow';
import { PulseApiFactory } from '../../utils/api/PulseApiFactory';
import { BasePulseNode } from '../common/BasePulseNode';
import { candidateOperations, quizzSessionOperations } from './operations';
import { 
  candidateOperationsFields, candidateFields, 
  quizzSessionOperationsFields, quizzSessionFields, 
  commonFields 
} from './descriptions';

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
				// Operations
				...candidateOperationsFields,
				...quizzSessionOperationsFields,
				// Fields
				...candidateFields,
				...quizzSessionFields,
				...commonFields,
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
