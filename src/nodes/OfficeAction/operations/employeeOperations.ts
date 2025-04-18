import { IExecuteFunctions } from 'n8n-workflow';
import { OfficeApi } from '../../../utils/api/OfficeApi';

export async function getEmployeeList(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: OfficeApi,
): Promise<any> {
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  const additionalFields = executeFunctions.getNodeParameter('additionalFields', 0, {}) as {
    sort?: string;
    pageNumber?: number;
    pageSize?: number;
    filters?: { filter: Array<{ key: string; values: string }> };
    fields?: { field: Array<{ key: string; fields: string }> };
  };
  return pulseApi.getEmployeeList(additionalFields, included);
}
