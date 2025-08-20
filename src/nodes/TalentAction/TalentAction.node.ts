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
import {
	talentOperationsFields, talentFields,
	skillOperationsFields, skillFields,
	languageOperationsFields, languageFields,
	educationOperationsFields, educationFields,
	certificationOperationsFields, certificationFields,
	experienceOperationsFields, experienceFields,
	commonFields
} from './descriptions';

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
				...talentOperationsFields,
				...talentFields,
				...skillOperationsFields,
				...skillFields,
				...languageOperationsFields,
				...languageFields,
				...educationOperationsFields,
				...educationFields,
				...certificationOperationsFields,
				...certificationFields,
				...experienceOperationsFields,
				...experienceFields,
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

				// Handle operations based on resource
				if (resource === 'talent') {
					switch (operation) {
						case 'getTalentList':
							result = {
								json: await  talentOperations.getTalentList(this, i, pulseApi)
							};
							break;
						case 'createTalent':
							result = {
								json: await  talentOperations.createTalent(this, i, pulseApi)
							};
							break;
						case 'getTalentById':
							result = {
								json: await  talentOperations.getTalentById(this, i, pulseApi)
							};
							break;
						case 'queryTalent':
							result = {
								json: await  talentOperations.queryTalent(this, i, pulseApi)
							};
							break;
						case 'updateTalentAcquisition':
							result = {
								json: await  talentOperations.updateTalentAcquisition(this, i, pulseApi)
							};
							break;
						default:
							throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
					}
				} else if (resource === 'skill') {
					switch (operation) {
						case 'getSkillsList':
							result = {
								json: await  skillOperations.getSkillsList(this, i, pulseApi)
							};
							break;
						case 'createSkill':
							result = {
								json: await  skillOperations.createSkill(this, i, pulseApi)
							};
							break;
						case 'updateSkill':
							result = {
								json: await  skillOperations.updateSkill(this, i, pulseApi)
							};
							break;
						case 'deleteSkill':
							result = {
								json: await  skillOperations.deleteSkill(this, i, pulseApi)
							};
							break;
						default:
							throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
					}
				} else if (resource === 'language') {
					switch (operation) {
						case 'getLanguagesList':
							result = {
								json: await  languageOperations.getLanguagesList(this, i, pulseApi)
							};
							break;
						case 'createLanguage':
							result = {
								json: await  languageOperations.createLanguage(this, i, pulseApi)
							};
							break;
						case 'updateLanguage':
							result = {
								json: await  languageOperations.updateLanguage(this, i, pulseApi)
							};
							break;
						case 'deleteLanguage':
							result = {
								json: await  languageOperations.deleteLanguage(this, i, pulseApi)
							};
							break;
						default:
							throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
					}
				} else if (resource === 'education') {
					switch (operation) {
						case 'getEducationList':
							result = {
								json: await  educationOperations.getEducationList(this, i, pulseApi)
							};
							break;
						case 'createEducation':
							result = {
								json: await  educationOperations.createEducation(this, i, pulseApi)
							};
							break;
						case 'updateEducation':
							result = {
								json: await  educationOperations.updateEducation(this, i, pulseApi)
							};
							break;
						case 'deleteEducation':
							result = {
								json: await  educationOperations.deleteEducation(this, i, pulseApi)
							};
							break;
						default:
							throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
					}
				} else if (resource === 'certification') {
					switch (operation) {
						case 'getCertificationList':
							result = {
								json: await  certificationOperations.getCertificationList(this, i, pulseApi)
							};
							break;
						case 'createCertification':
							result = {
								json: await  certificationOperations.createCertification(this, i, pulseApi)
							};
							break;
						case 'updateCertification':
							result = {
								json: await  certificationOperations.updateCertification(this, i, pulseApi)
							};
							break;
						case 'deleteCertification':
							result = {
								json: await  certificationOperations.deleteCertification(this, i, pulseApi)
							};
							break;
						default:
							throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
					}
				} else if (resource === 'experience') {
					switch (operation) {
						case 'getExperienceList':
							result = {
								json: await  experienceOperations.getExperienceList(this, i, pulseApi)
							};
							break;
						case 'createExperience':
							result = {
								json: await  experienceOperations.createExperience(this, i, pulseApi)
							};
							break;
						case 'updateExperience':
							result = {
								json: await  experienceOperations.updateExperience(this, i, pulseApi)
							};
							break;
						case 'deleteExperience':
							result = {
								json: await  experienceOperations.deleteExperience(this, i, pulseApi)
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
