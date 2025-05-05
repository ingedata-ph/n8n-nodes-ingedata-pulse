import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { OfficeApi } from '../../../utils/api/OfficeApi';
import { json } from 'stream/consumers';

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
  const additionalFields = executeFunctions.getNodeParameter('additionalFields', itemIndex, {}) as {
    reportName?: string;
  };

  let reportName = additionalFields.reportName as string;

  const response =  await pulseApi.generateLeaveBalanceReport(fromDate, toDate);

  let filename: string;
  if (reportName && reportName !== '') {
    // If a report name is provided, set the filename in the response
     filename = reportName.endsWith('.xlsx') ? reportName : `${reportName}.xlsx`;

  } else {
    // If no report name is provided, use the default filename
    filename = 'leave_balance_report.xlsx';
  }

  const buffer = Buffer.from(response);

  // Use helper to prepare binary data
  const binaryData = await executeFunctions.helpers.prepareBinaryData(
    buffer,
    filename,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  );

  return {
    data: binaryData,
  };
}
