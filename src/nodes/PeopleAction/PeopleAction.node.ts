import { IExecuteFunctions, NodeConnectionType } from 'n8n-workflow';
import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { getPulseApiHelper } from '../../utils/PulseApiHelper';

export class PeopleAction implements INodeType {
	description: INodeTypeDescription = {
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
	};

	async execute(this: IExecuteFunctions) {
		const items = this.getInputData();
		const returnData: Array<{json: any}> = [];

		// For each item (though there will usually just be one)
		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;
				const pulseApi = await getPulseApiHelper.apply(this);

				let result;

				if (operation === 'getPeopleList') {
					// Get list of people
					const included = this.getNodeParameter('included', i, []) as string[];
					result = await pulseApi.getPeopleList(included);
				} else if (operation === 'createPerson') {
					// Get new person
					const first_name = this.getNodeParameter('firstName', i) as string;
					const last_name = this.getNodeParameter('lastName', i) as string;
					const middle_name = this.getNodeParameter('middleName', i) as string;
					const gender = this.getNodeParameter('gender', i) as string;
					const birthday = this.getNodeParameter('birthday', i) as string;
					const relationship_status = this.getNodeParameter('relationshipStatus', i) as string;
					const number_of_kids = this.getNodeParameter('numberOfKids', i) as number;
					const secondary_email = this.getNodeParameter('secondaryEmail', i) as string;
					const contact_number = this.getNodeParameter('contactNumber', i) as string;
					const physical_address = this.getNodeParameter('address', i) as string;
					const organizational_unit = this.getNodeParameter('organizationalUnit', i) as string;
					
					const personData = {
						data: {
							type: "iam/people",
							attributes: {
								first_name,
								last_name,
								middle_name,
								gender,
								birthday,
								relationship_status,
								number_of_kids,
								secondary_email,
								contact_number,
								physical_address,
								organizational_unit,
							}
						}
					};
					console.log('Updating person with ID:', personData);
					// Create a new person
					result = await pulseApi.createPerson(personData);
				} else if (operation === 'getPersonById') {
					// Get person by ID
					const personId = this.getNodeParameter('personId', i) as string;
					const included = this.getNodeParameter('included', i, []) as string[];
					result = await pulseApi.getPersonById(personId, included);
				} else if (operation === 'updatePerson') {
					// Update person by ID
					const personId = this.getNodeParameter('personId', i) as string;

					const first_name = this.getNodeParameter('firstName', i) as string;
					const last_name = this.getNodeParameter('lastName', i) as string;
					const middle_name = this.getNodeParameter('middleName', i) as string;
					const gender = this.getNodeParameter('gender', i) as string;
					const birthday = this.getNodeParameter('birthday', i) as string;
					const relationship_status = this.getNodeParameter('relationshipStatus', i) as string;
					const number_of_kids = this.getNodeParameter('numberOfKids', i) as number;
					const secondary_email = this.getNodeParameter('secondaryEmail', i) as string;
					const contact_number = this.getNodeParameter('contactNumber', i) as string;
					const physical_address = this.getNodeParameter('address', i) as string;
					const organizational_unit = this.getNodeParameter('organizationalUnit', i) as string;
					
					const personData = {
						data: {
							type: "iam/people",
							id: personId,
							attributes: {
								first_name,
								last_name,
								middle_name,
								gender,
								birthday,
								relationship_status,
								number_of_kids,
								secondary_email,
								contact_number,
								physical_address,
								organizational_unit,
							}
						}
					};
					result = await pulseApi.updatePersonById(personId, personData);
				} else {
					throw new Error(`The operation "${operation}" is not supported!`);
				}

				returnData.push({ json: result });
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message } });
					continue;
				}
				throw error;
			}
		}

		return this.prepareOutputData(returnData);
	}
}
