import { IExecuteFunctions, NodeConnectionType, INodeExecutionData } from 'n8n-workflow';
import { PulseApiFactory } from '../../utils/api/PulseApiFactory';
import { BasePulseNode } from '../common/BasePulseNode';
import { employeeOperations } from './operations';

export class OfficeAction extends BasePulseNode {
	constructor() {
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
							name: 'Employee',
							value: 'employee',
						},
					],
					default: 'employee',
					noDataExpression: true,
					required: true,
					description: 'Get employee information',
				},
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					displayOptions: {
						show: {
							resource: [
								'employee',
							],
						},
					},
					noDataExpression: true,
					options: [
						{
							name: 'Create Employee',
							value: 'createEmployee',
							description: 'Create a new employee',
							action: 'Create a new employee',
						},
						{
							name: 'Get Employee List',
							value: 'getEmployeeList',
							description: 'Get a list of employees',
							action: 'Get employee list',
						},
						{
							name: 'Update Employee',
							value: 'updateEmployee',
							description: 'Update an existing employee',
							action: 'Update an existing employee',
						},
					],
					default: 'createEmployee',
				},
				// Node properties for operations will be defined here
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
				const pulseApi = await PulseApiFactory.getPulseApiHelper(this, resource) as any; // Assuming PulseApiFactory and helper are set up

				let result;

				if (resource === 'employee') {
					switch (operation) {
						case 'createEmployee':
							// result = await employeeOperations.createEmployee(this, i, pulseApi);
							break;
						case 'getEmployeeList':
							result = await employeeOperations.getEmployeeList(this, i, pulseApi);
							break;
						case 'updateEmployee':
							// result = await employeeOperations.updateEmployee(this, i, pulseApi);
							break;
						default:
							throw new Error(`Unknown operation: "${operation}"is not supported for resource "${resource}"!`);
					}
				} else {
					throw new Error(`The resource "${resource}" is not supported!`);
				}

				returnData.push({
					json: result,
				});
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
