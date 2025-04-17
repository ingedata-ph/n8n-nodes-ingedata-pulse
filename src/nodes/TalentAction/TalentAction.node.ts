import { IExecuteFunctions, NodeConnectionType, INodeExecutionData } from 'n8n-workflow';
import { PulseApiFactory } from '../../utils/api/PulseApiFactory';
import { BasePulseNode } from '../common/BasePulseNode';
import {
	talentOperations,
	skillOperations,
	languageOperations,
	educationOperations,
	certificationOperations,
	experienceOperations
} from './operations';

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
						{
							name: 'Education',
							value: 'education',
						},
						{
							name: 'Certification',
							value: 'certification',
						},
						{
							name: 'Experience',
							value: 'experience',
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
						{
							name: 'Query Talent',
							value: 'queryTalent',
							description: 'Search for talents by making a query',
							action: 'Query talent',
						}
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
					displayName: "Upload Resume",
					name: "fromResume",
					type: "boolean",
					default: true,
					displayOptions: {
						show: {
							operation: ['createTalent'],
							resource: ['talent'],
						},
					},
					description: "If true, the talent will be created from a resume. If false, need to add person Id.",
				},
				{
					displayName: 'Organizational Unit',
					name: 'organizationalUnit',
					type: 'string',
					default: 'MG',
					required: true,
					displayOptions: {
						show: {
							operation: ['createTalent'],
							resource: ['talent'],
							fromResume: [true],
						},
					},
					description: 'The organizational unit to associate with this talent',
				},
				{
					displayName: 'Resume URL',
					name: 'resumeUrl',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createTalent'],
							resource: ['talent'],
							fromResume: [true],
						},
					},
					description: 'The URL of the talent\'s resume',
				},
				{
					displayName: 'Mime Type',
					name: 'mimeType',
					type: 'string',
					default: 'application/pdf',
					required: true,
					displayOptions: {
						show: {
							operation: ['createTalent'],
							resource: ['talent'],
							fromResume: [true],
						},
					},
					description: 'The MIME type of the uploaded resume, e.g., application/pdf',
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
							fromResume: [false],
						},
					},
					description: 'The ID of the person to associate with this talent',
				},
				{
					displayName: 'Query',
					name: 'queryPrompt',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['queryTalent'],
							resource: ['talent'],
						},
					},
					description: 'The query string to search for talents',
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
							name: 'Add new Skill',
							value: 'createSkill',
							description: 'Add new skill',
							action: 'Add skill',
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
							name: 'Add Language',
							value: 'createLanguage',
							description: 'Add new language',
							action: 'Add language',
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
				},

				// Education operations
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					displayOptions: {
						show: {
							resource: [
								'education',
							],
						},
					},
					options: [
						{
							name: 'Get Education List',
							value: 'getEducationList',
							description: 'Get a list of education entries',
							action: 'Get education list',
						},
						{
							name: 'Add Education',
							value: 'createEducation',
							description: 'Add new education entry',
							action: 'Add education',
						},
						{
							name: 'Update Education',
							value: 'updateEducation',
							description: 'Update an education entry',
							action: 'Update education',
						},
						{
							name: 'Delete Education',
							value: 'deleteEducation',
							description: 'Delete an education entry',
							action: 'Delete education',
						},
					],
					default: 'getEducationList',
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
							operation: ['createEducation', 'updateEducation'],
							resource: ['education'],
						},
					},
					description: 'The ID of the talent to associate with this education entry',
				},
				{
					displayName: 'Education ID',
					name: 'educationId',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['updateEducation', 'deleteEducation'],
							resource: ['education'],
						},
					},
					description: 'The ID of the education entry to update or delete',
				},
				{
					displayName: 'Education Name',
					name: 'educationName',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createEducation', 'updateEducation'],
							resource: ['education'],
						},
					},
					description: 'The name of the education',
				},
				{
					displayName: 'Institution',
					name: 'institution',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createEducation', 'updateEducation'],
							resource: ['education'],
						},
					},
					description: 'The institution where the education was obtained',
				},
				{
					displayName: 'Degree',
					name: 'degree',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createEducation', 'updateEducation'],
							resource: ['education'],
						},
					},
					description: 'The degree obtained',
				},
				{
					displayName: 'Start Date',
					name: 'startDate',
					type: 'dateTime',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createEducation', 'updateEducation'],
							resource: ['education'],
						},
					},
					description: 'The start date of the education',
				},
				{
					displayName: 'End Date',
					name: 'endDate',
					type: 'dateTime',
					default: '',
					required: false,
					displayOptions: {
						show: {
							operation: ['createEducation', 'updateEducation'],
							resource: ['education'],
						},
					},
					description: 'The end date of the education (leave empty if ongoing)',
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
							operation: ['getEducationList'],
							resource: ['education'],
						},
					},
					description: 'Related resources to include in the response',
				},

				// Certification operations
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					displayOptions: {
						show: {
							resource: [
								'certification',
							],
						},
					},
					options: [
						{
							name: 'Get Certification List',
							value: 'getCertificationList',
							description: 'Get a list of certification entries',
							action: 'Get certification list',
						},
						{
							name: 'Add Certification',
							value: 'createCertification',
							description: 'Add new certification entry',
							action: 'Add certification',
						},
						{
							name: 'Update Certification',
							value: 'updateCertification',
							description: 'Update a certification entry',
							action: 'Update certification',
						},
						{
							name: 'Delete Certification',
							value: 'deleteCertification',
							description: 'Delete a certification entry',
							action: 'Delete certification',
						},
					],
					default: 'getCertificationList',
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
							operation: ['createCertification', 'updateCertification'],
							resource: ['certification'],
						},
					},
					description: 'The ID of the talent to associate with this certification entry',
				},
				{
					displayName: 'Certification ID',
					name: 'certificationId',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['updateCertification', 'deleteCertification'],
							resource: ['certification'],
						},
					},
					description: 'The ID of the certification entry to update or delete',
				},
				{
					displayName: 'Certification Name',
					name: 'certificationName',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createCertification', 'updateCertification'],
							resource: ['certification'],
						},
					},
					description: 'The name of the certification',
				},
				{
					displayName: 'Organization',
					name: 'organization',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createCertification', 'updateCertification'],
							resource: ['certification'],
						},
					},
					description: 'The organization that issued the certification',
				},
				{
					displayName: 'Certificate URL',
					name: 'url',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createCertification', 'updateCertification'],
							resource: ['certification'],
						},
					},
					description: 'The URL associated with the certification',
				},
				{
					displayName: 'Obtention Date',
					name: 'obtentionDate',
					type: 'dateTime',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createCertification', 'updateCertification'],
							resource: ['certification'],
						},
					},
					description: 'The date when the certification was obtained',
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
							operation: ['getCertificationList'],
							resource: ['certification'],
						},
					},
					description: 'Related resources to include in the response',
				},

				// Experience operations
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					displayOptions: {
						show: {
							resource: [
								'experience',
							],
						},
					},
					options: [
						{
							name: 'Get Experience List',
							value: 'getExperienceList',
							description: 'Get a list of experience entries',
							action: 'Get experience list',
						},
						{
							name: 'Add Experience',
							value: 'createExperience',
							description: 'Add new experience entry',
							action: 'Add experience',
						},
						{
							name: 'Update Experience',
							value: 'updateExperience',
							description: 'Update an experience entry',
							action: 'Update experience',
						},
						{
							name: 'Delete Experience',
							value: 'deleteExperience',
							description: 'Delete an experience entry',
							action: 'Delete experience',
						},
					],
					default: 'getExperienceList',
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
							operation: ['createExperience', 'updateExperience'],
							resource: ['experience'],
						},
					},
					description: 'The ID of the talent to associate with this experience entry',
				},
				{
					displayName: 'Experience ID',
					name: 'experienceId',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['updateExperience', 'deleteExperience'],
							resource: ['experience'],
						},
					},
					description: 'The ID of the experience entry to update or delete',
				},
				{
					displayName: 'Organization',
					name: 'organization',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createExperience', 'updateExperience'],
							resource: ['experience'],
						},
					},
					description: 'The organization where the experience was gained',
				},
				{
					displayName: 'Position',
					name: 'position',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createExperience', 'updateExperience'],
							resource: ['experience'],
						},
					},
					description: 'The position held during the experience',
				},
				{
					displayName: 'Start Date',
					name: 'startDate',
					type: 'dateTime',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createExperience', 'updateExperience'],
							resource: ['experience'],
						},
					},
					description: 'The start date of the experience',
				},
				{
					displayName: 'End Date',
					name: 'endDate',
					type: 'dateTime',
					default: '',
					required: false,
					displayOptions: {
						show: {
							operation: ['createExperience', 'updateExperience'],
							resource: ['experience'],
						},
					},
					description: 'The end date of the experience (leave empty if ongoing)',
				},
				{
					displayName: 'Summary',
					name: 'summary',
					type: 'string',
					typeOptions: {
						rows: 4,
					},
					default: '',
					required: false,
					displayOptions: {
						show: {
							operation: ['createExperience', 'updateExperience'],
							resource: ['experience'],
						},
					},
					description: 'A summary of the experience',
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
							operation: ['getExperienceList'],
							resource: ['experience'],
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
						case 'queryTalent':
							result = await talentOperations.queryTalent(this, i, pulseApi);
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
				} else if (resource === 'education') {
					switch (operation) {
						case 'getEducationList':
							result = await educationOperations.getEducationList(this, i, pulseApi);
							break;
						case 'createEducation':
							result = await educationOperations.createEducation(this, i, pulseApi);
							break;
						case 'updateEducation':
							result = await educationOperations.updateEducation(this, i, pulseApi);
							break;
						case 'deleteEducation':
							result = await educationOperations.deleteEducation(this, i, pulseApi);
							break;
						default:
							throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
					}
				} else if (resource === 'certification') {
					switch (operation) {
						case 'getCertificationList':
							result = await certificationOperations.getCertificationList(this, i, pulseApi);
							break;
						case 'createCertification':
							result = await certificationOperations.createCertification(this, i, pulseApi);
							break;
						case 'updateCertification':
							result = await certificationOperations.updateCertification(this, i, pulseApi);
							break;
						case 'deleteCertification':
							result = await certificationOperations.deleteCertification(this, i, pulseApi);
							break;
						default:
							throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
					}
				} else if (resource === 'experience') {
					switch (operation) {
						case 'getExperienceList':
							result = await experienceOperations.getExperienceList(this, i, pulseApi);
							break;
						case 'createExperience':
							result = await experienceOperations.createExperience(this, i, pulseApi);
							break;
						case 'updateExperience':
							result = await experienceOperations.updateExperience(this, i, pulseApi);
							break;
						case 'deleteExperience':
							result = await experienceOperations.deleteExperience(this, i, pulseApi);
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
