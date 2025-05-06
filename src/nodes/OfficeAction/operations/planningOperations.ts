import { IExecuteFunctions } from 'n8n-workflow';
import { OfficeApi } from '../../../utils/api/OfficeApi';

export async function getPlanningList(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: OfficeApi,
): Promise<any> {
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  const additionalFields = executeFunctions.getNodeParameter('additionalFields', itemIndex, {}) as {
    sort?: string;
    pageNumber?: number;
    pageSize?: number;
    filters?: { filter: Array<{ key: string; values: string }> };
    fields?: { field: Array<{ key: string; fields: string }> };
  };
  return pulseApi.getPlanningList(additionalFields, included);
}

export async function createPlanning(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: OfficeApi,
): Promise<any> {
  const name = executeFunctions.getNodeParameter('name', itemIndex) as string;
  const timezone = executeFunctions.getNodeParameter('timezone', itemIndex) as string;
  const organizational_unit = executeFunctions.getNodeParameter('organizationalUnit', itemIndex) as string;
  const working_hour_per_day = executeFunctions.getNodeParameter('workingHourPerDay', itemIndex) as number;
  
  // Get schedule data from the schedule parameter and parse it from JSON if it's a string
  const scheduleParam = executeFunctions.getNodeParameter('schedule', itemIndex);
  let schedule;
  
  if (typeof scheduleParam === 'string') {
    try {
      schedule = JSON.parse(scheduleParam);
    } catch (e) {
      throw new Error('Invalid schedule format. Schedule must be a valid JSON object.');
    }
  } else {
    schedule = scheduleParam;
  }
  
  
  const planningData = {
    data: {
      type: 'office/plannings',
      attributes: {
        name,
        timezone,
        schedule,
        organizational_unit,
        working_hour_per_day,
      }
    }
  };

  try {
    return await pulseApi.createPlanning(planningData);
  } catch (error) {
    throw new Error('Error creating planning: ' + (error as Error).message);
  }
}

export async function updatePlanning(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: OfficeApi,
): Promise<any> {
  const planningId = executeFunctions.getNodeParameter('planningId', itemIndex) as string;
  const name = executeFunctions.getNodeParameter('name', itemIndex) as string;
  const timezone = executeFunctions.getNodeParameter('timezone', itemIndex) as string;
  const organizational_unit = executeFunctions.getNodeParameter('organizationalUnit', itemIndex) as string;
  const working_hour_per_day = executeFunctions.getNodeParameter('workingHourPerDay', itemIndex) as number;
  
  // Get schedule data from the schedule parameter and parse it from JSON if it's a string
  const scheduleParam = executeFunctions.getNodeParameter('schedule', itemIndex);
  let schedule;
  
  if (typeof scheduleParam === 'string') {
    try {
      schedule = JSON.parse(scheduleParam);
    } catch (e) {
      throw new Error('Invalid schedule format. Schedule must be a valid JSON object.');
    }
  } else {
    schedule = scheduleParam;
  }
  
  const planningData = {
    data: {
      type: 'office/plannings',
      attributes: {
        name,
        timezone,
        schedule,
        organizational_unit,
        working_hour_per_day,
      }
    }
  };

  try {
    return await pulseApi.updatePlanning(planningId, planningData);
  } catch (error) {
    throw new Error('Error updating planning: ' + (error as Error).message);
  }
}

export async function deletePlanning(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: OfficeApi,
): Promise<any> {
  const planningId = executeFunctions.getNodeParameter('planningId', itemIndex) as string;

  try {
    return await pulseApi.deletePlanning(planningId);
  } catch (error) {
    throw new Error('Error deleting planning: ' + (error as Error).message);
  }
}
