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
  {
    displayName: 'Place of Birth',
    name: 'placeOfBirth',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        operation: ['createEmployee'],
        resource: ['employee'],
        withPerson: [true],
      },
    },
    required: false,
    description: 'The place of birth of the person to create',
  },
  {
    displayName: 'Spouse Name',
    name: 'spouseName',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        operation: ['createEmployee'],
        resource: ['employee'],
        withPerson: [true],
      },
    },
    required: false,
    description: 'The spouse name of the person to create',
  },
  {
    displayName: 'Mother\'s Name',
    name: 'mothersName',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        operation: ['createEmployee'],
        resource: ['employee'],
        withPerson: [true],
      },
    },
    required: false,
    description: 'The mother\'s name of the person to create',
  },
  {
    displayName: 'Father\'s Name',
    name: 'fathersName',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        operation: ['createEmployee'],
        resource: ['employee'],
        withPerson: [true],
      },
    },
    required: false,
    description: 'The father\'s name of the person to create',
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
        operation: ['createEmployee'],
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
        operation: ['createEmployee'],
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
    displayName: 'Starting Date',
    name: 'startingDate',
    type: 'dateTime',
    default: '',
    required: false,
    displayOptions: {
      show: {
        operation: ['createEmployee'],
        resource: ['employee'],
      },
    },
    description: 'The starting date of the employee',
  },
  {
    displayName: 'Is Manager',
    name: 'isManager',
    type: 'boolean',
    default: false,
    required: false,
    displayOptions: {
      show: {
        operation: ['createEmployee'],
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
        operation: ['createEmployee'],
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
        operation: ['createEmployee'],
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
        operation: ['createEmployee'],
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
        operation: ['createEmployee'],
        resource: ['employee'],
        terminated: [true],
      },
    },
    description: 'Whether the employee is on hold',
  },
  // Identification cards properties
  {
    displayName: 'ID Cards',
    name: 'idCards',
    placeholder: 'Add ID Card',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    displayOptions: {
      show: {
        operation: ['createEmployee'],
        resource: ['employee']
      },
    },
    options: [
      {
        name: 'idCardValues',
        displayName: 'ID Card',
        values: [
          {
            displayName: 'ID Card Type',
            name: 'idCardType',
            type: 'string',
            default: '',
            required: true,
            description: 'The type of ID card of the employee',
          },
          {
            displayName: 'ID Card Number',
            name: 'idCardNumber',
            type: 'string',
            default: '',
            required: true,
            description: 'The ID card number of the employee',
          },
          {
            displayName: 'ID Card Issue Date',
            name: 'idCardIssueDate',
            type: 'dateTime',
            default: '',
            required: false,
            description: 'The issue date of the ID card of the employee',
          },
          {
            displayName: 'ID Card Issue Place',
            name: 'idCardIssuePlace',
            type: 'string',
            default: '',
            required: false,
            description: 'The issue place of the ID card of the employee',
          },
          {
            displayName: 'ID Card Expiration Date',
            name: 'idCardExpirationDate',
            type: 'dateTime',
            default: '',
            required: false,
            description: 'The expiration date of the ID card of the employee',
          },
        ],
      },
    ],
    description: 'The identification cards of the employee',
  },
  {
    displayName: 'Emergency Contact Name',
    name: 'emergencyContactName',
    type: 'string',
    default: '',
    required: false,
    displayOptions: {
      show: {
        operation: ['createEmployee'],
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
        operation: ['createEmployee'],
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
        operation: ['createEmployee'],
        resource: ['employee'],
      },
    },
    description: 'The relationship of the emergency contact to the employee',
  },
  {
    displayName: 'End of probation date',
    name: 'endOfProbationDate',
    type: 'dateTime',
    default: '',
    required: false,
    displayOptions: {
      show: {
        operation: ['createEmployee'],
        resource: ['employee'],
      },
    },
    description: 'The end of probation date of the employee',
  },
  {
    displayName: 'Department',
    name: 'department',
    type: 'options',
    options: [
      {
        name: '',
        value: '',
      },
      {
        name: 'HR',
        value: 'hr',
      },
      {
        name: 'Training',
        value: 'training',
      },
      {
        name: 'Production',
        value: 'production',
      },
      {
        name: 'Operation',
        value: 'operation',
      },
      {
        name: 'LAB',
        value: 'lab',
      },
      {
        name: 'Compliance',
        value: 'compliance',
      },
      {
        name: 'IT/Dev',
        value: 'it_dev',
      },
      {
        name: 'IT',
        value: 'it',
      },
      {
        name: 'Finance',
        value: 'finance',
      },
      {
        name: 'Sales',
        value: 'sales',
      },
    ],
    default: '',
    required: false,
    displayOptions: {
      show: {
        operation: ['createEmployee'],
        resource: ['employee'],
      },
    },
    description: 'The department service of the employee',
    placeholder: 'Select department',
  },
  {
    displayName: 'Job Classification',
    name: 'jobClassification',
    type: 'options',
    options: [
      {
        name: '',
        value: '',
      },
     {
        name: 'Officer',
        value: 'officer',
      },
      {
        name: 'Outsourcer',
        value: 'outsourcer',
      },
      {
        name: 'Agent',
        value: 'agent',
      },
      {
        name: 'Project manager',
        value: 'project_manager',
      },
      {
        name: 'Manager',
        value: 'manager',
      },
      {
        name: 'Director',
        value: 'director',
      },
      {
        name: 'Team leader',
        value: 'team_leader',
      },
      {
        name: 'Automation Architect',
        value: 'automation_architect',
      },
      {
        name: 'Production Assistant',
        value: 'production_assistant',
      },
      {
        name: 'Data Analyst',
        value: 'data_analyst',
      },
      {
        name: 'Cloud',
        value: 'cloud',
      },
    ],
    default: '',
    required: false,
    displayOptions: {
      show: {
        operation: ['createEmployee'],
        resource: ['employee'],
      },
    },
    description: 'The job classification is a group of employee position',
    placeholder: 'Select job classification',
  },
  // job level
  {
    displayName: 'Category',
    name: 'jobLevel',
    type: 'options',
    options: [
      {
        name: '',
        value: '',
      },
      {
        name: 'HC',
        value: 'hc',
      },
      {
        name: '5B',
        value: '5b',
      },
      {
        name: '1B',
        value: '1b',
      },
    ],
    default: '',
    required: false,
    displayOptions: {
      show: {
        operation: ['createEmployee'],
        resource: ['employee'],
      },
    },
    description: 'The job level is the professional category of the employee',
    placeholder: 'Select job level',
  },
  // JOB SUBLEVEL
  {
    displayName: 'Group',
    name: 'jobSubLevel',
    type: 'options',
    options: [
      {
        name: '',
        value: '',
      },
      {
        name: 'I',
        value: 'i',
      },
      {
        name: 'II',
        value: 'ii',
      },
      {
        name: 'III',
        value: 'iii',
      },
      {
        name: 'IV',
        value: 'iv',
      },
      {
        name: 'V',
        value: 'v',
      },
    ],
    default: '',
    required: false,
    displayOptions: {
      show: {
        operation: ['createEmployee'],
        resource: ['employee'],
      },
    },
    description: 'The job sublevel is the professional group of the employee',
    placeholder: 'Select job sublevel',
  },
    //////////////////////////////////////////
   // Additional fields for updateEmployee //
  //////////////////////////////////////////
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field to Update',
    default: {},
    displayOptions: {
      show: {
        operation: ['updateEmployee'],
        resource: ['employee'],
      },
    },
    options: [
      {
        displayName: 'Manager IDs',
        name: 'managerIds',
        type: 'string',
        default: '',
        description: 'Comma-separated list of manager IDs to associate with the employee',
        placeholder: 'manager_id_1, manager_id_2',
      },
      {
        displayName: 'Teams',
        name: 'teamsNames',
        type: 'string',
        default: '',
        description: 'Comma-separated list of team names to associate with the employee',
      },
      {
        displayName: 'Starting Date',
        name: 'startingDate',
        type: 'dateTime',
        default: '',
        description: 'The starting date of the employee',
      },
      {
        displayName: 'Is Manager',
        name: 'isManager',
        type: 'boolean',
        default: false,
        description: 'Whether the employee is a manager',
      },
      {
        displayName: 'Is HR',
        name: 'isHR',
        type: 'boolean',
        default: false,
        description: 'Whether the employee is an HR',
      },
      {
        displayName: 'Terminated at',
        name: 'terminatedAt',
        type: 'dateTime',
        default: '',
        description: 'The date the employee was terminated',
      },
      {
        displayName: 'On Hold',
        name: 'onHold',
        type: 'boolean',
        default: false,
        description: 'Whether the employee is on hold',
      },
      {
        displayName: 'Emergency Contact Name',
        name: 'emergencyContactName',
        type: 'string',
        default: '',
        description: 'The name of the emergency contact for the employee',
      },
      {
        displayName: 'Emergency Contact Phone',
        name: 'emergencyContactPhone',
        type: 'string',
        default: '',
        description: 'The phone number of the emergency contact for the employee',
      },
      {
        displayName: 'Emergency Contact Relationship',
        name: 'emergencyContactRelationship',
        type: 'string',
        default: '',
        description: 'The relationship of the emergency contact to the employee',
      },
      {
        displayName: 'End of probation date',
        name: 'endOfProbationDate',
        type: 'dateTime',
        default: '',
        description: 'The end of probation date of the employee',
      },
      {
        displayName: 'Department',
        name: 'department',
        type: 'options',
        options: [
          {
            name: '',
            value: '',
          },
          {
            name: 'HR',
            value: 'hr',
          },
          {
            name: 'Training',
            value: 'training',
          },
          {
            name: 'Production',
            value: 'production',
          },
          {
            name: 'Operation',
            value: 'operation',
          },
          {
            name: 'LAB',
            value: 'lab',
          },
          {
            name: 'Compliance',
            value: 'compliance',
          },
          {
            name: 'IT/Dev',
            value: 'it_dev',
          },
          {
            name: 'IT',
            value: 'it',
          },
          {
            name: 'Finance',
            value: 'finance',
          },
          {
            name: 'Sales',
            value: 'sales',
          },
        ],
        default: '',
        description: 'The department service of the employee',
        placeholder: 'Select department',
      },
      {
        displayName: 'Job Classification',
        name: 'jobClassification',
        type: 'options',
        options: [
          {
            name: '',
            value: '',
          },
         {
            name: 'Officer',
            value: 'officer',
          },
          {
            name: 'Outsourcer',
            value: 'outsourcer',
          },
          {
            name: 'Agent',
            value: 'agent',
          },
          {
            name: 'Project manager',
            value: 'project_manager',
          },
          {
            name: 'Manager',
            value: 'manager',
          },
          {
            name: 'Director',
            value: 'director',
          },
          {
            name: 'Team leader',
            value: 'team_leader',
          },
          {
            name: 'Automation Architect',
            value: 'automation_architect',
          },
          {
            name: 'Production Assistant',
            value: 'production_assistant',
          },
          {
            name: 'Data Analyst',
            value: 'data_analyst',
          },
          {
            name: 'Cloud',
            value: 'cloud',
          },
        ],
        default: '',
        description: 'The job classification is a group of employee position',
        placeholder: 'Select job classification',
      },
      // job level
      {
        displayName: 'Category',
        name: 'jobLevel',
        type: 'options',
        options: [
          {
            name: '',
            value: '',
          },
          {
            name: 'HC',
            value: 'hc',
          },
          {
            name: '5B',
            value: '5b',
          },
          {
            name: '1B',
            value: '1b',
          },
        ],
        default: '',
        description: 'The job level is the professional category of the employee',
        placeholder: 'Select job level',
      },
      // JOB SUBLEVEL
      {
        displayName: 'Group',
        name: 'jobSubLevel',
        type: 'options',
        options: [
          {
            name: '',
            value: '',
          },
          {
            name: 'I',
            value: 'i',
          },
          {
            name: 'II',
            value: 'ii',
          },
          {
            name: 'III',
            value: 'iii',
          },
          {
            name: 'IV',
            value: 'iv',
          },
          {
            name: 'V',
            value: 'v',
          },
        ],
        default: '',
        description: 'The job sublevel is the professional group of the employee',
        placeholder: 'Select job sublevel',
      },
    ],
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
