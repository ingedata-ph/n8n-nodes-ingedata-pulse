import { IExecuteFunctions } from 'n8n-workflow';
import { OfficeApi } from '../../../utils/api/OfficeApi';

/**
 * Create a new leave request
 */
export async function createLeaveRequest(
  executeFunctions: IExecuteFunctions, 
  itemIndex: number, 
  pulseApi: OfficeApi
): Promise<any> {
  // Get all the parameters from the node
  const leaveType = executeFunctions.getNodeParameter('leaveType', itemIndex) as string;
  const startDate = executeFunctions.getNodeParameter('startDate', itemIndex) as string;
  const endDate = executeFunctions.getNodeParameter('endDate', itemIndex) as string;
  const details = executeFunctions.getNodeParameter('details', itemIndex, '') as string;
  const startHalfDay = executeFunctions.getNodeParameter('startHalfDay', itemIndex, false) as boolean;
  const endHalfDay = executeFunctions.getNodeParameter('endHalfDay', itemIndex, false) as boolean;
  const relatedDocument = executeFunctions.getNodeParameter('relatedDocument', itemIndex, '') as string;
  const employeeId = executeFunctions.getNodeParameter('employeeId', itemIndex) as string;

  // Prepare the leave request data
  const leaveRequestData = {
    data: {
      type: 'office/leave/requests',
      attributes: {
        leave_type: leaveType,
        start_date: startDate,
        end_date: endDate,
        details,
        end_half_day: endHalfDay,
        start_half_day: startHalfDay,
        related_document: relatedDocument,
      },
      relationships: {
        employee: {
          data: {
            type: 'office/employees',
            id: employeeId
          }
        }
      }
    }
  };

  return pulseApi.createLeaveRequest(leaveRequestData);
}

/**
 * Generate leave balance report (as Excel file)
 */
export async function generateLeaveBalanceReport(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: OfficeApi
): Promise<any> {
  // Get the date range parameters
  const fromDate = executeFunctions.getNodeParameter('fromDate', itemIndex) as string;
  const toDate = executeFunctions.getNodeParameter('toDate', itemIndex) as string;
  
  // Get the API URL and token from the pulseApi instance
  const apiUrl = (pulseApi as any).apiUrl;
  
  // Construct the URL for the report
  const url = `${apiUrl}/api/v3/office/leave/budgets/export?from=${fromDate}&to=${toDate}`;
  
  return {
    data: {
      url: url,
    },
  }
}
