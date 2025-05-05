import type { INodeProperties } from 'n8n-workflow';

export const employeeOperationsFields: INodeProperties[] = [
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
];

export const employeeFields: INodeProperties[] = [
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
];
