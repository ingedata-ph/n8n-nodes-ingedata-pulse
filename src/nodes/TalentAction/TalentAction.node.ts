import { IExecuteFunctions, NodeConnectionType, INodeExecutionData } from 'n8n-workflow';
import { INodeTypeDescription } from 'n8n-workflow';
import { PulseApiFactory } from '../../utils/api/PulseApiFactory';
import { BasePulseNode } from '../common/BasePulseNode';
import { talentOperations, skillOperations, languageOperations } from './operations';

export class TalentAction extends BasePulseNode {
	constructor() {
		super({
			displayName: 'Pulse Talent',
			name: 'talent',
			icon: 'file:pulse.svg',
			group: ['input'],
			version: 1,
			description: 'Talent resource from Pulse API',
			defaults: {
				name: 'Talent',
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
							name: 'Talent',
							value: 'talent',
						},
						{
							name: 'Skill',
							value: 'skill',
						},
						{
							name: 'Language',
							value: 'language',
						},
					],
					default: 'talent',
					noDataExpression: true,
					required: true,
					description: 'Talent resources',
				},
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					displayOptions: {
						show: {
							resource: [
								'talent',
							],
						},
					},
					options: [
						{
							name: 'Get Talent List',
							value: 'getTalentList',
							description: 'Get a list of talents',
							action: 'Get talent list',
						},
						{
							name: 'Create Talent',
							value: 'createTalent',
							description: 'Create a new talent for one person',
							action: 'Create talent',
						},
						{
							name: 'Show Talent details',
							value: 'getTalentById',
							description: 'Get a talent details',
							action: 'Get talent details',
						},
					],
					default: 'getTalentList',
					noDataExpression: true,
				},
				{
					displayName: 'Talent ID',
					name: 'talentId',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['getTalentById'],
							resource: ['talent'],
						},
					},
					description: 'The ID of the talent to get or update',
				},
				{
					displayName: 'Person ID',
					name: 'personId',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createTalent'],
							resource: ['talent'],
						},
					},
					description: 'The ID of the person to associate with this talent',
				},
				// Skill operations
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					displayOptions: {
						show: {
							resource: [
								'skill',
							],
						},
					},
					options: [
						{
							name: 'Get Skills List',
							value: 'getSkillsList',
							description: 'Get a list of skills',
							action: 'Get skills list',
						},
						{
							name: 'Create Skill',
							value: 'createSkill',
							description: 'Create a new skill',
							action: 'Create skill',
						},
						{
							name: 'Update Skill',
							value: 'updateSkill',
							description: 'Update a skill',
							action: 'Update skill',
						},
						{
							name: 'Delete Skill',
							value: 'deleteSkill',
							description: 'Delete a skill',
							action: 'Delete skill',
						},
					],
					default: 'getSkillsList',
					noDataExpression: true,
				},
				{
					displayName: 'Talent ID',
					name: 'talentId',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createSkill', 'updateSkill'],
							resource: ['skill'],
						},
					},
					description: 'The ID of the talent to associate with this skill',
				},
				{
					displayName: 'Skill ID',
					name: 'skillId',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['updateSkill', 'deleteSkill'],
							resource: ['skill'],
						},
					},
					description: 'The ID of the skill to update or delete',
				},
				{
					displayName: 'Skill Name',
					name: 'skillName',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createSkill', 'updateSkill'],
							resource: ['skill'],
						},
					},
					description: 'The name of the skill',
				},
				{
					displayName: 'Skill Level',
					name: 'level',
					type: 'number',
					typeOptions: {
						minValue: 1,
						maxValue: 5,
					},
					default: 1,
					required: true,
					displayOptions: {
						show: {
							operation: ['createSkill', 'updateSkill'],
							resource: ['skill'],
						},
					},
					description: 'The level of the skill (1-5)',
				},
				{
					displayName: 'Include Related Resources',
					name: 'included',
					type: 'multiOptions',
					options: [
						{
							name: 'Talent',
							value: 'talent',
						},
					],
					default: [],
					required: false,
					displayOptions: {
						show: {
							operation: ['getSkillsList'],
							resource: ['skill'],
						},
					},
					description: 'Related resources to include in the response',
				},
				// Language operations
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					displayOptions: {
						show: {
							resource: [
								'language',
							],
						},
					},
					options: [
						{
							name: 'Get Languages List',
							value: 'getLanguagesList',
							description: 'Get a list of languages',
							action: 'Get languages list',
						},
						{
							name: 'Create Language',
							value: 'createLanguage',
							description: 'Create a new language',
							action: 'Create language',
						},
						{
							name: 'Update Language',
							value: 'updateLanguage',
							description: 'Update a language',
							action: 'Update language',
						},
						{
							name: 'Delete Language',
							value: 'deleteLanguage',
							description: 'Delete a language',
							action: 'Delete language',
						},
					],
					default: 'getLanguagesList',
					noDataExpression: true,
				},
				{
					displayName: 'Talent ID',
					name: 'talentId',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createLanguage', 'updateLanguage'],
							resource: ['language'],
						},
					},
					description: 'The ID of the talent to associate with this language',
				},
				{
					displayName: 'Language ID',
					name: 'languageId',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['updateLanguage', 'deleteLanguage'],
							resource: ['language'],
						},
					},
					description: 'The ID of the language to update or delete',
				},
				{
					displayName: 'ISO Code',
					name: 'isoCode',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createLanguage', 'updateLanguage'],
							resource: ['language'],
						},
					},
					description: 'The ISO code of the language',
				},
				{
					displayName: 'Reading Level',
					name: 'readingLevel',
					type: 'number',
					typeOptions: {
						minValue: 1,
						maxValue: 5,
					},
					default: 1,
					required: true,
					displayOptions: {
						show: {
							operation: ['createLanguage', 'updateLanguage'],
							resource: ['language'],
						},
					},
					description: 'The reading level of the language (1-5)',
				},
				{
					displayName: 'Writing Level',
					name: 'writingLevel',
					type: 'number',
					typeOptions: {
						minValue: 1,
						maxValue: 5,
					},
					default: 1,
					required: true,
					displayOptions: {
						show: {
							operation: ['createLanguage', 'updateLanguage'],
							resource: ['language'],
						},
					},
					description: 'The writing level of the language (1-5)',
				},
				{
					displayName: 'Speaking Level',
					name: 'speakingLevel',
					type: 'number',
					typeOptions: {
						minValue: 1,
						maxValue: 5,
					},
					default: 1,
					required: true,
					displayOptions: {
						show: {
							operation: ['createLanguage', 'updateLanguage'],
							resource: ['language'],
						},
					},
					description: 'The speaking level of the language (1-5)',
				},
				{
					displayName: 'Include Related Resources',
					name: 'included',
					type: 'multiOptions',
					options: [
						{
							name: 'Talent',
							value: 'talent',
						},
					],
					default: [],
					required: false,
					displayOptions: {
						show: {
							operation: ['getLanguagesList'],
							resource: ['language'],
						},
					},
					description: 'Related resources to include in the response',
				}
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

				// Handle operations based on resource
				if (resource === 'talent') {
					switch (operation) {
						case 'getTalentList':
							result = await talentOperations.getTalentList(this, i, pulseApi);
							break;
						case 'createTalent':
							result = await talentOperations.createTalent(this, i, pulseApi);
							break;
						case 'getTalentById':
							result = await talentOperations.getTalentById(this, i, pulseApi);
							break;
						default:
							throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
					}
				} else if (resource === 'skill') {
					switch (operation) {
						case 'getSkillsList':
							result = await skillOperations.getSkillsList(this, i, pulseApi);
							break;
						case 'createSkill':
							result = await skillOperations.createSkill(this, i, pulseApi);
							break;
						case 'updateSkill':
							result = await skillOperations.updateSkill(this, i, pulseApi);
							break;
						case 'deleteSkill':
							result = await skillOperations.deleteSkill(this, i, pulseApi);
							break;
						default:
							throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
					}
				} else if (resource === 'language') {
					switch (operation) {
						case 'getLanguagesList':
							result = await languageOperations.getLanguagesList(this, i, pulseApi);
							break;
						case 'createLanguage':
							result = await languageOperations.createLanguage(this, i, pulseApi);
							break;
						case 'updateLanguage':
							result = await languageOperations.updateLanguage(this, i, pulseApi);
							break;
						case 'deleteLanguage':
							result = await languageOperations.deleteLanguage(this, i, pulseApi);
							break;
						default:
							throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
					}
				} else {
					throw new Error(`The resource "${resource}" is not supported!`);
				}
				
				returnData.push({
					json: result,
				});
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
