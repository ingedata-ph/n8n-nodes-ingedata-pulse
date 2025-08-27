import { IExecuteFunctions } from 'n8n-workflow';
import { RecruitmentApi } from '../../../utils/api/RecruitmentApi';

export async function createStageTemplate(
	executeFunctions: IExecuteFunctions,
	itemIndex: number,
	pulseApi: RecruitmentApi,
): Promise<any> {
	const name = executeFunctions.getNodeParameter('name', itemIndex) as string;
	const description = executeFunctions.getNodeParameter('description', itemIndex) as string;
	const indexValue = executeFunctions.getNodeParameter('index', itemIndex) as number;
	const pipeline_template_id = executeFunctions.getNodeParameter('pipeline_template_id', itemIndex) as string;
	const warning_after_days = executeFunctions.getNodeParameter('warning_after_days', itemIndex) as number;

	const attributes: any = {
		name,
		description,
		index: indexValue,
	};

	// Only add warning_after_days if it's provided and greater than 0
	if (warning_after_days && warning_after_days > 0) {
		attributes.warning_after_days = warning_after_days;
	}

	const stageTemplateData = {
		data: {
			type: 'recruitment/stage_templates',
			attributes,
			relationships: {
				pipeline_template: {
					data: {
						type: 'recruitment/pipeline_templates',
						id: pipeline_template_id,
					},
				},
			},
		},
	};

	return await pulseApi.createStageTemplate(stageTemplateData);
}

export async function updateStageTemplate(
	executeFunctions: IExecuteFunctions,
	itemIndex: number,
	pulseApi: RecruitmentApi,
): Promise<any> {
	const stageTemplateId = executeFunctions.getNodeParameter('stageTemplateId', itemIndex) as string;
	const updateFields = executeFunctions.getNodeParameter('updateFields', itemIndex) as any;

	const stageTemplateData = {
		data: {
			type: 'recruitment/stage_templates',
			id: stageTemplateId,
			attributes: updateFields,
		},
	};

	return await pulseApi.updateStageTemplate(stageTemplateId, stageTemplateData);
}

export async function deleteStageTemplate(
	executeFunctions: IExecuteFunctions,
	itemIndex: number,
	pulseApi: RecruitmentApi,
): Promise<any> {
	const stageTemplateId = executeFunctions.getNodeParameter('stageTemplateId', itemIndex) as string;

	return await pulseApi.deleteStageTemplate(stageTemplateId);
}

export async function getStageTemplatesList(
	executeFunctions: IExecuteFunctions,
	itemIndex: number,
	pulseApi: RecruitmentApi,
): Promise<any> {
	const additionalFields = executeFunctions.getNodeParameter('additionalFields', itemIndex) as any;

	return await pulseApi.getStageTemplatesList(additionalFields);
}
