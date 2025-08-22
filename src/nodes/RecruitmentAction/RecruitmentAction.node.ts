import { IExecuteFunctions, NodeConnectionType, INodeProperties, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { INodeTypeDescription } from 'n8n-workflow';
import { PulseApiFactory } from '../../utils/api/PulseApiFactory';
import { BasePulseNode } from '../common/BasePulseNode';
import {
	candidateOperations,
	quizzSessionOperations,
	pipelineTemplateOperations,
	stageTemplateOperations,
	recruitmentCampaignOperations
} from './operations';
import {
  candidateOperationsFields, candidateFields,
  quizzSessionOperationsFields, quizzSessionFields,
  pipelineTemplateOperationsFields, pipelineTemplateFields,
  stageTemplateOperationsFields, stageTemplateFields,
  recruitmentCampaignOperationsFields, recruitmentCampaignFields,
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
						{
							name: 'Pipeline Templates',
							value: 'pipelineTemplate',
						},
						{
							name: 'Stage Templates',
							value: 'stageTemplate',
						},
						{
							name: 'Recruitment Campaigns',
							value: 'recruitmentCampaign',
						}
					],
					default: 'candidates',
					noDataExpression: true,
					required: true,
					description: 'Resource to use',
				},
				// Operations
				...candidateOperationsFields,
				...quizzSessionOperationsFields,
				...pipelineTemplateOperationsFields,
				...stageTemplateOperationsFields,
				...recruitmentCampaignOperationsFields,
				// Fields
				...candidateFields,
				...quizzSessionFields,
				...pipelineTemplateFields,
				...stageTemplateFields,
				...recruitmentCampaignFields,
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
				}

				else if (resource === 'pipelineTemplate') {
					switch (operation) {
						case 'createPipelineTemplate':
							result = {
								json: await pipelineTemplateOperations.createPipelineTemplate(this, i, pulseApi)
							};
							break;
						case 'updatePipelineTemplate':
							result = {
								json: await pipelineTemplateOperations.updatePipelineTemplate(this, i, pulseApi)
							};
							break;
						case 'deletePipelineTemplate':
							result = {
								json: await pipelineTemplateOperations.deletePipelineTemplate(this, i, pulseApi)
							};
							break;
						case 'getListPipelineTemplates':
							result = {
								json: await pipelineTemplateOperations.getPipelineTemplatesList(this, i, pulseApi)
							};
							break;
						default:
							throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
					}
				}

				else if (resource === 'stageTemplate') {
					switch (operation) {
						case 'createStageTemplate':
							result = {
								json: await stageTemplateOperations.createStageTemplate(this, i, pulseApi)
							};
							break;
						case 'updateStageTemplate':
							result = {
								json: await stageTemplateOperations.updateStageTemplate(this, i, pulseApi)
							};
							break;
						case 'deleteStageTemplate':
							result = {
								json: await stageTemplateOperations.deleteStageTemplate(this, i, pulseApi)
							};
							break;
						case 'getListStageTemplates':
							result = {
								json: await stageTemplateOperations.getStageTemplatesList(this, i, pulseApi)
							};
							break;
						default:
							throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
					}
				}
				else if (resource === 'recruitmentCampaign') {
					switch (operation) {
						case 'createRecruitmentCampaign':
							result = {
								json: await recruitmentCampaignOperations.createRecruitmentCampaign(this, i, pulseApi)
							};
							break;
						case 'updateRecruitmentCampaign':
							result = {
								json: await recruitmentCampaignOperations.updateRecruitmentCampaign(this, i, pulseApi)
							};
							break;
						case 'openRecruitmentCampaign':
							result = {
								json: await recruitmentCampaignOperations.openRecruitmentCampaign(this, i, pulseApi)
							};
							break;
						case 'closeRecruitmentCampaign':
							result = {
								json: await recruitmentCampaignOperations.closeRecruitmentCampaign(this, i, pulseApi)
							};
							break;
						case 'getRecruitmentCampaignsList':
							result = {
								json: await recruitmentCampaignOperations.getRecruitmentCampaignsList(this, i, pulseApi)
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
