import { IExecuteFunctions, NodeConnectionType, INodeExecutionData } from 'n8n-workflow';
import { PulseApiFactory } from '../../utils/api/PulseApiFactory';
import { BasePulseNode } from '../common/BasePulseNode';
import { employeeOperations, planningOperations, announcementOperations, holidayOperations, leaveRequestOperations } from './operations';
import { 
	employeeOperationsFields, employeeFields,
	planningOperationsFields, planningFields,
	announcementOperationsFields, announcementFields,
	holidayOperationsFields, holidayFields,
	leaveRequestOperationsFields, leaveRequestFields,
	commonFields
} from './descriptions';

export class OfficeAction extends BasePulseNode {
	constructor() {
		const now = new Date();
		const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
		const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

		super({
			displayName: 'Pulse Office Action',
			name: 'officeAction',
			icon: 'file:pulse.svg',
			group: ['pulse'],
			version: 1,
			description: 'Office actions from Pulse API',
			defaults: {
				name: 'Office Action',
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
							name: 'Announcement',
							value: 'announcement',
						},
						{
							name: 'Employee',
							value: 'employee',
						},
						{
							name: 'Holiday',
							value: 'holiday',
						},
						{
							name: 'Leave Request',
							value: 'leaveRequest',
						},
						{
							name: 'Planning',
							value: 'planning',
						},
					],
					default: 'employee',
					noDataExpression: true,
					required: true,
					description: 'Select the resource to work with',
				},
				...employeeOperationsFields,
				...employeeFields,
				...planningOperationsFields,
				...planningFields,
				...announcementOperationsFields,
				...announcementFields,
				...holidayOperationsFields,
				...holidayFields,
				...leaveRequestOperationsFields,
				...leaveRequestFields,
				...commonFields,
			],
		});
	}

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;
				const pulseApi = await PulseApiFactory.getPulseApiHelper(this, resource) as any;

				let result;

				if (resource === 'employee') {
					switch (operation) {
						case 'createEmployee':
							result = { 
								json: await employeeOperations.createEmployee(this, i, pulseApi)
							};
							break;
						case 'getEmployeeList':
							result = { 
								json: await employeeOperations.getEmployeeList(this, i, pulseApi)
							};
							break;
						case 'updateEmployee':
							result = { 
								json: await employeeOperations.updateEmployee(this, i, pulseApi)
							};
							break;
						default:
							throw new Error(`Unknown operation: "${operation}"is not supported for resource "${resource}"!`);
					}
				} else if (resource === 'planning') {
					switch (operation) {
						case 'createPlanning':
							result = { 
								json: await planningOperations.createPlanning(this, i, pulseApi)
							};
							break;
						case 'getPlanningList':
							result = { 
								json: await planningOperations.getPlanningList(this, i, pulseApi)
							};
							break;
						case 'updatePlanning':
							result = { 
								json: await planningOperations.updatePlanning(this, i, pulseApi)
							};
							break;
						case 'deletePlanning':
							result = { 
								json: await planningOperations.deletePlanning(this, i, pulseApi)
							};
							break;
						default:
							throw new Error(`Unknown operation: "${operation}"is not supported for resource "${resource}"!`);
					}
				} else if (resource === 'announcement') {
					switch (operation) {
						case 'createAnnouncement':
							result = { 
								json: await announcementOperations.createAnnouncement(this, i, pulseApi)
							};
							break;
						case 'deleteAnnouncement':
							result = { 
								json: await announcementOperations.deleteAnnouncement(this, i, pulseApi)
							};
							break;
						case 'getAnnouncementList':
							result = { 
								json: await announcementOperations.getAnnouncementList(this, i, pulseApi)
							};
							break;
						case 'updateAnnouncement':
							result = { 
								json: await announcementOperations.updateAnnouncement(this, i, pulseApi)
							};
							break;
						default:
							throw new Error(`Unknown operation: "${operation}"is not supported for resource "${resource}"!`);
					}
				} else if (resource === 'holiday') {
					switch (operation) {
						case 'createHoliday':
							result = { 
								json: await holidayOperations.createHoliday(this, i, pulseApi)
							};
							break;
						case 'getHolidayList':
							result = { 
								json: await holidayOperations.getHolidayList(this, i, pulseApi)
							};
							break;
						case 'updateHoliday':
							result = { 
								json: await holidayOperations.updateHoliday(this, i, pulseApi)
							};
							break;
						case 'deleteHoliday':
							result = { 
								json: await holidayOperations.deleteHoliday(this, i, pulseApi)
							};
							break;
						default:
							throw new Error(`Unknown operation: "${operation}"is not supported for resource "${resource}"!`);
					}
				} else if (resource === 'leaveRequest') {
					switch (operation) {
						case 'createLeaveRequest':
							result = { 
								json: await leaveRequestOperations.createLeaveRequest(this, i, pulseApi)
							};
							break;
						case 'generateLeaveBalanceReport':
							result = {
								json: {},
								binary: await leaveRequestOperations.generateLeaveBalanceReport(this, i, pulseApi)
							};
							break
						default:
							throw new Error(`Unknown operation: "${operation}"is not supported for resource "${resource}"!`);
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
