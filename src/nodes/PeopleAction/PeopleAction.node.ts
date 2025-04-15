import { IExecuteFunctions, NodeConnectionType } from 'n8n-workflow';
import { INodeTypeDescription } from 'n8n-workflow';
import { BasePulseNode } from '../common/BasePulseNode';
import { peopleOperations } from './operations';

export class PeopleAction extends BasePulseNode {
	constructor() {
		super({
			displayName: 'Pulse People',
			name: 'people',
			icon: 'file:pulse.svg',
			group: ['input'],
			version: 1,
			description: 'People resource from Pulse API',
			defaults: {
				name: 'People',
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
							name: 'People',
							value: 'people',
						},
					],
					default: 'people',
					noDataExpression: true,
					required: true,
					description: 'Get list of people',
				},
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					displayOptions: {
						show: {
							resource: [
								'people',
							],
						},
					},
					options: [
						{
							name: 'Get People list',
							value: 'getPeopleList',
							description: 'Get a list of people',
							action: 'Get people list',
						},
						{
							name: 'Create Person',
							value: 'createPerson',
							description: 'Create a new person',
							action: 'Create person',
						},
						{
							name: 'Get Person by ID',
							value: 'getPersonById',
							description: 'Get a person by ID',
							action: 'Get person by ID',
						},
						{
							name: 'Update Person by ID',
							value: 'updatePerson',
							description: 'Update a person by ID',
							action: 'Update person by ID',
						},
					],
					default: 'getPeopleList',
					noDataExpression: true,
				},
				{
					displayName: 'Person ID',
					name: 'personId',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['getPersonById', 'updatePerson'],
							resource: ['people'],
						},
					},
					description: 'The ID of the person to get or update',
				},
				{
					displayName: 'Include Related Resources',
					name: 'included',
					type: 'multiOptions',
					options: [
						{
							name: 'Account',
							value: 'account',
						},
					],
					default: [],
					required: false,
					displayOptions: {
						show: {
							operation: ['getPeopleList', 'getPersonById'],
							resource: ['people'],
						},
					},
					description: 'Related resources to include in the response',
				},
				{
					displayName: 'First Name',
					name: 'firstName',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createPerson', 'updatePerson'],
							resource: ['people'],
						},
					},
					description: 'The first name of the person to create',
				},
				{
					displayName: 'Last Name',
					name: 'lastName',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createPerson', 'updatePerson'],
							resource: ['people'],
						},
					},
					description: 'The last name of the person to create',
				},
				{
					displayName: 'Middle Name',
					name: 'middleName',
					type: 'string',
					default: '',
					displayOptions: {
						show: {
							operation: ['createPerson', 'updatePerson'],
							resource: ['people'],
						},
					},
					description: 'The middle name of the person to create',
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
							operation: ['createPerson', 'updatePerson'],
							resource: ['people'],
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
							operation: ['createPerson', 'updatePerson'],
							resource: ['people'],
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
							operation: ['createPerson', 'updatePerson'],
							resource: ['people'],
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
							operation: ['createPerson', 'updatePerson'],
							resource: ['people'],
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
							operation: ['createPerson', 'updatePerson'],
							resource: ['people'],
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
							operation: ['createPerson', 'updatePerson'],
							resource: ['people'],
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
							operation: ['createPerson', 'updatePerson'],
							resource: ['people'],
						},
					},
					description: 'The address of the person to create',
				},
				{
					displayName: 'Organizational Unit',
					name: 'organizationalUnit',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createPerson', 'updatePerson'],
							resource: ['people'],
						},
					},
					description: 'The organizational unit of the person to create',
				},
			],
		});
	}

	protected async processOperation(
		resource: string,
		operation: string,
		itemIndex: number,
		pulseApi: any,
		executeFunctions: IExecuteFunctions,
	): Promise<any> {
		// Handle people operations
		if (resource === 'people') {
			switch (operation) {
				case 'getPeopleList':
					return peopleOperations.getPeopleList(executeFunctions, itemIndex, pulseApi);
				case 'createPerson':
					return peopleOperations.createPerson(executeFunctions, itemIndex, pulseApi);
				case 'getPersonById':
					return peopleOperations.getPersonById(executeFunctions, itemIndex, pulseApi);
				case 'updatePerson':
					return peopleOperations.updatePerson(executeFunctions, itemIndex, pulseApi);
				default:
					throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
			}
		}
		
		throw new Error(`The resource "${resource}" is not supported!`);
	}
}
