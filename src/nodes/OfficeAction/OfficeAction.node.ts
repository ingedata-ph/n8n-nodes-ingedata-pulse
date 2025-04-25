import { IExecuteFunctions, NodeConnectionType, INodeExecutionData } from 'n8n-workflow';
import { PulseApiFactory } from '../../utils/api/PulseApiFactory';
import { BasePulseNode } from '../common/BasePulseNode';
import { employeeOperations, planningOperations, announcementOperations } from './operations';

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
							name: 'Announcement',
							value: 'announcement',
						},
						{
							name: 'Employee',
							value: 'employee',
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
					default: 'getEmployeeList',
				},
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					displayOptions: {
						show: {
							resource: [
								'announcement',
							],
						},
					},
					noDataExpression: true,
					options: [
						{
							name: 'Create Announcement',
							value: 'createAnnouncement',
							description: 'Create a new announcement',
							action: 'Create a new announcement',
						},
						{
							name: 'Get Announcement List',
							value: 'getAnnouncementList',
							description: 'Get a list of announcements',
							action: 'Get announcement list',
						},
						{
							name: 'Update Announcement',
							value: 'updateAnnouncement',
							description: 'Update an existing announcement',
							action: 'Update an existing announcement',
						},
					],
					default: 'getAnnouncementList',
				},
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					displayOptions: {
						show: {
							resource: [
								'planning',
							],
						},
					},
					noDataExpression: true,
					options: [
						{
							name: 'Create Planning',
							value: 'createPlanning',
							description: 'Create a new planning',
							action: 'Create a new planning',
						},
						{
							name: 'Get Planning List',
							value: 'getPlanningList',
							description: 'Get a list of plannings',
							action: 'Get planning list',
						},
						{
							name: 'Update Planning',
							value: 'updatePlanning',
							description: 'Update an existing planning',
							action: 'Update an existing planning',
						},
						{
							name: 'Delete Planning',
							value: 'deletePlanning',
							description: 'Delete a planning',
							action: 'Delete a planning',
						},
					],
					default: 'getPlanningList',
				},
				// Node properties for operations will be defined here
				{
					displayName: 'Employee ID',
					name: 'employeeId',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['updateEmployee'],
							resource: ['employee'],
						},
					},
					description: 'The ID of the employee to update',
				},
				{
					displayName: 'Include Related Resources',
					name: 'included',
					type: 'multiOptions',
					options: [
						{
							name: 'Planning',
							value: 'planning',
						},
						{
							name: 'Leave Budget',
							value: 'leave_budget',
						},
					],
					default: [],
					required: false,
					displayOptions: {
						show: {
							operation: ['getEmployeeList'],
							resource: ['employee'],
						},
					},
					description: 'Related resources to include in the response',
				},
				{
          displayName: 'Additional Fields',
          name: 'fieldsToUpdate',
          type: 'collection',
          placeholder: 'Add Field',
          default: {},
          displayOptions: {
            show: {
              resource: ['planning', 'employee', 'announcement'],
              operation: ['getPlanningList', 'getEmployeeList', 'getAnnouncementList'],
            },
          },
          description: 'Additional fields to include in the request',
          options: [
						{
              displayName: 'Sort',
              name: 'sort',
              type: 'string',
              default: '',
              description: 'The sort order to use in the request',
            },
            {
              displayName: 'Page Number',
              name: 'pageNumber',
              type: 'number',
              default: 1,
              description: 'Pagination - page number',
            },
            {
              displayName: 'Page Size',
              name: 'pageSize',
              type: 'number',
              default: 10,
              description: 'Pagination - page size',
            },
            {
              displayName: 'Filters',
              name: 'filters',
              type: 'fixedCollection',
              typeOptions: {
                multipleValues: true,
              },
              description: 'The filters to use in the request',
              default: {},
              options: [
                {
                  name: 'filter',
                  displayName: 'Filter Values',
                  values: [
										{
											displayName: 'Filter Key',
											name: 'key',
											type: 'string',
											default: '',
											placeholder: 'e.g., organization_id',
										},
										{
											displayName: 'Values',
											name: 'values',
											type: 'string',
											default: '',
											placeholder: 'Comma-separated values (e.g., 1,2,3)',
										},
									],
                },
              ],
            },
            {
              displayName: 'Fields',
              name: 'fields',
              type: 'fixedCollection',
              typeOptions: {
                multipleValues: true,
              },
              description: 'The fields to use in the request',
              default: {},
              options: [
                {
                  displayName: 'Field',
                  name: 'field',
									values: [
										{
											displayName: 'Field Key',
											name: 'key',
											type: 'string',
											default: '',
											placeholder: 'e.g., iam/organizations/people_directories',
										},
										{
											displayName: 'Fields',
											name: 'fields',
											type: 'string',
											default: '',
											placeholder: 'Comma-separated field names (e.g., id,name)',
										},
									],
                },
              ],
            },
          ],
        },
				// if createEmployee with new person
				{
					displayName: "New Person",
					name: "withPerson",
					type: "boolean",
					default: false,
					displayOptions: {
						show: {
							operation: ['createEmployee'],
							resource: ['employee'],
						},
					},
					description: "If true, the employee will be created with a person",
				},
				{
					displayName: 'Person ID',
					name: 'personId',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createEmployee'],
							resource: ['employee'],
							withPerson: [false],
						},
					},
					description: 'The ID of the person to associate with the employee to create',
				},
				// Person properties
				{
					displayName: 'First Name',
					name: 'firstName',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createEmployee'],
							resource: ['employee'],
							withPerson: [true],
						},
					},
					description: 'The first name of the person to create',
				},
				{
					displayName: 'Middle Name',
					name: 'middleName',
					type: 'string',
					default: '',
					displayOptions: {
						show: {
							operation: ['createEmployee'],
							resource: ['employee'],
							withPerson: [true],
						},
					},
					description: 'The middle name of the person to create',
				},
				{
					displayName: 'Last Name',
					name: 'lastName',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createEmployee'],
							resource: ['employee'],
							withPerson: [true],
						},
					},
					description: 'The last name of the person to create',
				},
				{
					displayName: 'Gender',
					name: 'gender',
					type: 'options',
					options: [
						{
							name: 'Male',
							value: 'male',
						},
						{
							name: 'Female',
							value: 'female',
						},
					],
					default: 'male',
					displayOptions: {
						show: {
							operation: ['createEmployee'],
							resource: ['employee'],
							withPerson: [true],
						},
					},
					description: 'The gender of the person to create',
				},
				{
					displayName: 'Birthday',
					name: 'birthday',
					type: 'dateTime',
					default: '',
					displayOptions: {
						show: {
							operation: ['createEmployee'],
							resource: ['employee'],
							withPerson: [true],
						},
					},
					description: 'The birthday of the person to create',
				},
				{
					displayName: 'Relationship Status',
					name: 'relationshipStatus',
					type: 'options',
					options: [
						{
							name: 'Single',
							value: 'single',
						},
						{
							name: 'Married',
							value: 'married',
						},
					],
					default: 'single',
					displayOptions: {
						show: {
							operation: ['createEmployee'],
							resource: ['employee'],
							withPerson: [true],
						},
					},
					description: 'The relationship status of the person to create',
				},
				{
					displayName: 'Number of Kids',
					name: 'numberOfKids',
					type: 'number',
					typeOptions: {
						minValue: 0,
					},
					default: 0,
					displayOptions: {
						show: {
							operation: ['createEmployee'],
							resource: ['employee'],
							withPerson: [true],
						},
					},
					description: 'The number of kids of the person to create',
				},
				{
					displayName: 'Secondary Email',
					name: 'secondaryEmail',
					type: 'string',
					default: '',
					displayOptions: {
						show: {
							operation: ['createEmployee'],
							resource: ['employee'],
							withPerson: [true],
						},
					},
					description: 'The secondary email of the person to create',
				},
				{
					displayName: 'Phone Number',
					name: 'contactNumber',
					type: 'string',
					default: '',
					displayOptions: {
						show: {
							operation: ['createEmployee'],
							resource: ['employee'],
							withPerson: [true],
						},
					},
					description: 'The phone number of the person to create',
				},
				{
					displayName: 'Address',
					name: 'address',
					type: 'string',
					default: '',
					displayOptions: {
						show: {
							operation: ['createEmployee'],
							resource: ['employee'],
							withPerson: [true],
						},
					},
					description: 'The address of the person to create',
				},
				// Employee properties
				{
					displayName: 'Organizatonal Unit',
					name: 'organizationalUnit',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createEmployee', 'updateEmployee'],
							resource: ['employee'],
						},
					},
					description: 'The Organizational Unit of the employee',
				},
				{
					displayName: 'Planning ID',
					name: 'planningId',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createEmployee', 'updateEmployee'],
							resource: ['employee'],
						},
					},
					description: 'The ID of the planning to associate with the employee to create',
				},
				{
					displayName: 'Manager IDs',
					name: 'managerIds',
					type: 'string',
					default: '',
					required: false,
					displayOptions: {
						show: {
							operation: ['createEmployee', 'updateEmployee'],
							resource: ['employee'],
						},
					},
					description: 'Comma-separated list of manager IDs to associate with the employee',
					placeholder: 'manager_id_1, manager_id_2',
				},
				{
					displayName: 'Teams',
					name: 'teamsNames',
					type: 'string',
					default: '',
					required: false,
					displayOptions: {
						show: {
							operation: ['createEmployee', 'updateEmployee'],
							resource: ['employee'],
						},
					},
					description: 'Comma-separated list of team names to associate with the employee',
				},
				{
					displayName: 'Position',
					name: 'positionName',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createEmployee', 'updateEmployee'],
							resource: ['employee'],
						},
					},
					description: 'The position of the employee',
				},
				{
					displayName: 'Employement Type',
					name: 'employmentType',
					type: 'options',
					options: [
						{
							name: 'Full-time',
							value: 'full_time',
						},
						{
							name: 'Part-time',
							value: 'part_time',
						},
						{
							name: 'Freelance',
							value: 'freelance',
						},
						{
							name: 'Other',
							value: 'other',
						}
					],
					default: 'full_time',
					required: true,
					displayOptions: {
						show: {
							operation: ['createEmployee', 'updateEmployee'],
							resource: ['employee'],
						},
					},
					description: 'The employment type of the employee',
				},
				{
					displayName: 'Service number',
					name: 'serviceNumber',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createEmployee', 'updateEmployee'],
							resource: ['employee'],
						},
					},
					description: 'The service number of the employee',
				},
				{
					displayName: 'Hired at',
					name: 'hiredAt',
					type: 'dateTime',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createEmployee', 'updateEmployee'],
							resource: ['employee'],
						},
					},
					description: 'The date the employee was hired',
				},
				{
					displayName: 'Is Manager',
					name: 'isManager',
					type: 'boolean',
					default: false,
					required: false,
					displayOptions: {
						show: {
							operation: ['createEmployee', 'updateEmployee'],
							resource: ['employee'],
						},
					},
					description: 'Whether the employee is a manager',
				},
				{
					displayName: 'Is HR',
					name: 'isHR',
					type: 'boolean',
					default: false,
					required: false,
					displayOptions: {
						show: {
							operation: ['createEmployee', 'updateEmployee'],
							resource: ['employee'],
						},
					},
					description: 'Whether the employee is an HR',
				},
				{
					displayName: 'Terminated',
					name: 'terminated',
					type: 'boolean',
					displayOptions: {
						show: {
							operation: ['createEmployee', 'updateEmployee'],
							resource: ['employee'],
						},
					},
					description: 'Whether the employee is terminated',
					default: false,
				},
				{
					displayName: 'Terminated at',
					name: 'terminatedAt',
					type: 'dateTime',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createEmployee', 'updateEmployee'],
							resource: ['employee'],
							terminated: [true],
						},
					},
					description: 'The date the employee was terminated',
				},
				{
					displayName: 'On Hold',
					name: 'onHold',
					type: 'boolean',
					default: false,
					required: false,
					displayOptions: {
						show: {
							operation: ['createEmployee', 'updateEmployee'],
							resource: ['employee'],
							terminated: [true],
						},
					},
					description: 'Whether the employee is on hold',
				},
				{
					displayName: 'Emergency Contact Name',
					name: 'emergencyContactName',
					type: 'string',
					default: '',
					required: false,
					displayOptions: {
						show: {
							operation: ['createEmployee', 'updateEmployee'],
							resource: ['employee'],
						},
					},
					description: 'The name of the emergency contact for the employee',
				},
				{
					displayName: 'Emergency Contact Phone',
					name: 'emergencyContactPhone',
					type: 'string',
					default: '',
					required: false,
					displayOptions: {
						show: {
							operation: ['createEmployee', 'updateEmployee'],
							resource: ['employee'],
						},
					},
					description: 'The phone number of the emergency contact for the employee',
				},
				{
					displayName: 'Emergency Contact Relationship',
					name: 'emergencyContactRelationship',
					type: 'string',
					default: '',
					required: false,
					displayOptions: {
						show: {
							operation: ['createEmployee', 'updateEmployee'],
							resource: ['employee'],
						},
					},
					description: 'The relationship of the emergency contact to the employee',
				},
				{
					displayName: 'Create an account',
					name: 'createAccount',
					type: 'boolean',
					default: false,
					required: false,
					displayOptions: {
						show: {
							operation: ['createEmployee'],
							resource: ['employee'],
						},
					},
					description: 'Whether to create an account for the employee',
				},
				{
					displayName: 'Account Email',
					name: 'accountEmail',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createEmployee'],
							resource: ['employee'],
							createAccount: [true],
						},
					},
					description: 'The email address to use for the account',
				},
				{
					displayName: 'Account Type',
					name: 'accountType',
					type: 'options',
					options: [
						{
							name: 'Personal Account',
							value: 'personal_account',
						},
					],
					default: 'personal_account',
					required: false,
					displayOptions: {
						show: {
							operation: ['createEmployee'],
							resource: ['employee'],
							createAccount: [true],
						},
					},
					description: 'The type of account to create for the employee',
				},
				{
					displayName: 'Account Expiration Date',
					name: 'expiredAt',
					type: 'dateTime',
					default: '',
					required: false,
					displayOptions: {
						show: {
							operation: ['createEmployee'],
							resource: ['employee'],
							createAccount: [true],
						},
					},
					description: 'The date the account will expire',
				},
				// Planning properties
				{
					displayName: 'Planning ID',
					name: 'planningId',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['updatePlanning', 'deletePlanning'],
							resource: ['planning'],
						},
					},
					description: 'The ID of the planning to update or delete',
				},
				{
					displayName: 'Name',
					name: 'name',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createPlanning', 'updatePlanning'],
							resource: ['planning'],
						},
					},
					description: 'The name of the planning',
				},
				{
					displayName: 'Timezone',
					name: 'timezone',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createPlanning', 'updatePlanning'],
							resource: ['planning'],
						},
					},
					description: 'The timezone of the planning (e.g., Africa/Nairobi)',
				},
				{
					displayName: 'Organizational Unit',
					name: 'organizationalUnit',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createPlanning', 'updatePlanning'],
							resource: ['planning'],
						},
					},
					description: 'The organizational unit of the planning',
				},
				{
					displayName: 'Working Hours Per Day',
					name: 'workingHourPerDay',
					type: 'number',
					typeOptions: {
						minValue: 0,
						numberPrecision: 2,
					},
					default: 8,
					required: true,
					displayOptions: {
						show: {
							operation: ['createPlanning', 'updatePlanning'],
							resource: ['planning'],
						},
					},
					description: 'The number of working hours per day',
				},
				{
					displayName: 'Schedule',
					name: 'schedule',
					type: 'json',
					default: '{\n  "monday": ["8:00", "12:00", "14:00", "18:00"],\n  "tuesday": ["8:00", "12:00", "14:00", "18:00"]\n}',
					required: true,
					displayOptions: {
						show: {
							operation: ['createPlanning', 'updatePlanning'],
							resource: ['planning'],
						},
					},
					description: 'The schedule of the planning in JSON format. Format: { "day": ["start1", "end1", "start2", "end2"] }',
				},
				{
					displayName: 'Include Related Resources',
					name: 'included',
					type: 'multiOptions',
					options: [
						{
							name: 'Employees',
							value: 'employees',
						},
					],
					default: [],
					required: false,
					displayOptions: {
						show: {
							operation: ['getPlanningList'],
							resource: ['planning'],
						},
					},
					description: 'Related resources to include in the response',
				},
				// Announcement properties
				{
					displayName: 'Announcement ID',
					name: 'announcementId',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							resource: ['announcement'],
							operation: ['updateAnnouncement'],
						},
					},
					description: 'The ID of the announcement to update',
				},
				{
          displayName: 'Fields to Update',
          name: 'additionalFields',
          type: 'collection',
          placeholder: 'Add Field',
          default: {},
          displayOptions: {
            show: {
							resource: ['announcement'],
              operation: ['updateAnnouncement'],
            },
          },
          description: 'Additional fields to update in the announcement',
          options: [
						{
              displayName: 'Title',
              name: 'title',
              type: 'string',
              default: '',
              description: 'The title of the announcement',
            },
            {
              displayName: 'Content (Markdown)',
              name: 'contentMd',
              type: 'string',
              typeOptions: {
                rows: 5,
              },
              default: '',
              description: 'The content of the announcement in Markdown format',
            },
            {
              displayName: 'Publishing Date',
              name: 'publishingAt',
              type: 'dateTime',
              default: '',
              description: 'The date when the announcement will be published (cannot be before today)',
            },
            {
              displayName: 'Organizational Units',
              name: 'organizationalUnits',
              type: 'string',
              default: '',
              description: 'Comma-separated list of organizational units for the announcement',
              placeholder: 'MG, IT, HR',
            },
          ],
        },
				{
					displayName: 'Title',
					name: 'title',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createAnnouncement'],
							resource: ['announcement'],
						},
					},
					description: 'The title of the announcement',
				},
				{
					displayName: 'Content (Markdown)',
					name: 'contentMd',
					type: 'string',
					typeOptions: {
						rows: 5,
					},
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createAnnouncement'],
							resource: ['announcement'],
						},
					},
					description: 'The content of the announcement in Markdown format',
				},
				{
					displayName: 'Publishing Date',
					name: 'publishingAt',
					type: 'dateTime',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createAnnouncement'],
							resource: ['announcement'],
						},
					},
					description: 'The date when the announcement will be published (cannot be before today)',
				},
				{
					displayName: 'Organizational Units',
					name: 'organizationalUnits',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createAnnouncement'],
							resource: ['announcement'],
						},
					},
					description: 'Comma-separated list of organizational units for the announcement',
					placeholder: 'MG, IT, HR',
				},
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
							result = await employeeOperations.createEmployee(this, i, pulseApi);
							break;
						case 'getEmployeeList':
							result = await employeeOperations.getEmployeeList(this, i, pulseApi);
							break;
						case 'updateEmployee':
							result = await employeeOperations.updateEmployee(this, i, pulseApi);
							break;
						default:
							throw new Error(`Unknown operation: "${operation}"is not supported for resource "${resource}"!`);
					}
				} else if (resource === 'planning') {
					switch (operation) {
						case 'createPlanning':
							result = await planningOperations.createPlanning(this, i, pulseApi);
							break;
						case 'getPlanningList':
							result = await planningOperations.getPlanningList(this, i, pulseApi);
							break;
						case 'updatePlanning':
							result = await planningOperations.updatePlanning(this, i, pulseApi);
							break;
						case 'deletePlanning':
							result = await planningOperations.deletePlanning(this, i, pulseApi);
							break;
						default:
							throw new Error(`Unknown operation: "${operation}"is not supported for resource "${resource}"!`);
					}
				} else if (resource === 'announcement') {
					switch (operation) {
						case 'createAnnouncement':
							result = await announcementOperations.createAnnouncement(this, i, pulseApi);
							break;
						case 'getAnnouncementList':
							result = await announcementOperations.getAnnouncementList(this, i, pulseApi);
							break;
						case 'updateAnnouncement':
							result = await announcementOperations.updateAnnouncement(this, i, pulseApi);
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
