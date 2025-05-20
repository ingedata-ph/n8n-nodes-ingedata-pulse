import { IExecuteFunctions, NodeParameterValue, IDataObject } from 'n8n-workflow';
import { WorkflowApi } from '../../../utils/api/WorkflowApi';

export async function getProjectIndicators(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: WorkflowApi,
): Promise<any> {
  const projectId = executeFunctions.getNodeParameter('projectId', itemIndex) as string;
  const period = executeFunctions.getNodeParameter('period', itemIndex) as string;
  const indicatorName = executeFunctions.getNodeParameter('indicatorName', itemIndex) as string;
  let from = executeFunctions.getNodeParameter('from', itemIndex) as string;
  let to = executeFunctions.getNodeParameter('to', itemIndex) as string;
  const additionalFields = executeFunctions.getNodeParameter('additionalFields', itemIndex) as IDataObject;
  let selector = additionalFields.selector as string | undefined;
  let accountId = additionalFields.accountId as string | undefined;

  from = new Date(from).toISOString().split('T')[0];
  to = new Date(to).toISOString().split('T')[0];

  selector = selector ? selector : "null";
  accountId = accountId ? accountId : "null";

  const queryParams = {
    from,
    to,
    selector,
    accountId,
  };

  return pulseApi.showIndicatorsByKeyAndPeriod(projectId, indicatorName, period, queryParams);
}

export async function getProjectIndicatorKeys(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: WorkflowApi,
): Promise<any> {
  const projectId = executeFunctions.getNodeParameter('projectId', itemIndex) as string;

  return pulseApi.getProjectIndicatorKeys(projectId);
}

export async function getProjectIndicatorOptions(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: WorkflowApi,
): Promise<any> {
  const projectId = executeFunctions.getNodeParameter('projectId', itemIndex) as string;
  const indicatorName = executeFunctions.getNodeParameter('indicatorName', itemIndex) as string;

  return pulseApi.getProjectIndicatorOptions(projectId, indicatorName);
}
