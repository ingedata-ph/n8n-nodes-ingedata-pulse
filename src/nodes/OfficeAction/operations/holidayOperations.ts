import { IExecuteFunctions } from 'n8n-workflow';
import { OfficeApi } from '../../../utils/api/OfficeApi';

export async function getHolidayList(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: OfficeApi,
): Promise<any> {
  const additionalFields = executeFunctions.getNodeParameter('additionalFields', itemIndex, {}) as {
    sort?: string;
    pageNumber?: number;
    pageSize?: number;
    filters?: { filter: Array<{ key: string; values: string }> };
    fields?: { field: Array<{ key: string; fields: string }> };
  };
  return pulseApi.getHolidayList(additionalFields);
}

export async function createHoliday(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: OfficeApi,
): Promise<any> {
  const name = executeFunctions.getNodeParameter('name', itemIndex) as string;
  const date = executeFunctions.getNodeParameter('date', itemIndex) as string;
  const organizational_unit = executeFunctions.getNodeParameter('organizational_unit', itemIndex) as string;
  
  const holidayData = {
    data: {
      type: 'office/holidays',
      attributes: {
        name,
        date,
        organizational_unit,
      }
    }
  };

  try {
    return await pulseApi.createHoliday(holidayData);
  } catch (error) {
    throw new Error('Error creating holiday: ' + (error as Error).message);
  }
}

export async function updateHoliday(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: OfficeApi,
): Promise<any> {
  const holidayId = executeFunctions.getNodeParameter('id', itemIndex) as string;
  const name = executeFunctions.getNodeParameter('name', itemIndex) as string;
  const date = executeFunctions.getNodeParameter('date', itemIndex) as string;
  const organizational_unit = executeFunctions.getNodeParameter('organizational_unit', itemIndex) as string;
  
  const holidayData = {
    data: {
      type: 'office/holidays',
      attributes: {
        name,
        date,
        organizational_unit,
      }
    }
  };

  try {
    return await pulseApi.updateHoliday(holidayId, holidayData);
  } catch (error) {
    throw new Error('Error updating holiday: ' + (error as Error).message);
  }
}

export async function deleteHoliday(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: OfficeApi,
): Promise<any> {
  const holidayId = executeFunctions.getNodeParameter('id', itemIndex) as string;

  try {
    return await pulseApi.deleteHoliday(holidayId);
  } catch (error) {
    throw new Error('Error deleting holiday: ' + (error as Error).message);
  }
}
