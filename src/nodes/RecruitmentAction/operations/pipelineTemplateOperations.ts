import { IExecuteFunctions } from 'n8n-workflow';
import { RecruitmentApi } from '../../../utils/api/RecruitmentApi';

export async function createPipelineTemplate(
	executeFunctions: IExecuteFunctions,
	itemIndex: number,
	pulseApi: RecruitmentApi,
): Promise<any> {
	const name = executeFunctions.getNodeParameter('name', itemIndex) as string;
	const description = executeFunctions.getNodeParameter('description', itemIndex) as string;
	const organizational_unit = executeFunctions.getNodeParameter('organizational_unit', itemIndex) as string;

	const pipelineTemplateData = {
		data: {
			type: 'recruitment/pipeline_templates',
			attributes: {
				name,
				description,
				organizational_unit,
			},
		},
	};

	return await pulseApi.createPipelineTemplate(pipelineTemplateData);
}

export async function updatePipelineTemplate(
	executeFunctions: IExecuteFunctions,
	itemIndex: number,
	pulseApi: RecruitmentApi,
): Promise<any> {
	const pipelineTemplateId = executeFunctions.getNodeParameter('pipelineTemplateId', itemIndex) as string;
	const updateFields = executeFunctions.getNodeParameter('updateFields', itemIndex) as any;

	const pipelineTemplateData = {
		data: {
			type: 'recruitment/pipeline_templates',
			id: pipelineTemplateId,
			attributes: updateFields,
		},
	};

	return await pulseApi.updatePipelineTemplate(pipelineTemplateId, pipelineTemplateData);
}

export async function deletePipelineTemplate(
	executeFunctions: IExecuteFunctions,
	itemIndex: number,
	pulseApi: RecruitmentApi,
): Promise<any> {
	const pipelineTemplateId = executeFunctions.getNodeParameter('pipelineTemplateId', itemIndex) as string;

	return await pulseApi.deletePipelineTemplate(pipelineTemplateId);
}

export async function getPipelineTemplatesList(
	executeFunctions: IExecuteFunctions,
	itemIndex: number,
	pulseApi: RecruitmentApi,
): Promise<any> {
	const additionalFields = executeFunctions.getNodeParameter('additionalFields', itemIndex) as any;

	return await pulseApi.getPipelineTemplatesList(additionalFields);
}
