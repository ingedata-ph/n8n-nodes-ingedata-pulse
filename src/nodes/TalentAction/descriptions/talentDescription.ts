import type { INodeProperties } from 'n8n-workflow';

export const talentOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'talent',
        ],
      },
    },
    options: [
      {
        name: 'Get Talent List',
        value: 'getTalentList',
        description: 'Get a list of talents',
        action: 'Get talent list',
      },
      {
        name: 'Create Talent',
        value: 'createTalent',
        description: 'Create a new talent for one person',
        action: 'Create talent',
      },
      {
        name: 'Show Talent details',
        value: 'getTalentById',
        description: 'Show a talent details',
        action: 'Show talent details',
      },
      {
        name: 'Update Talent Acquisition Details',
        value: 'updateTalentAcquisition',
        description: 'Update a talent acquisition',
        action: 'Update talent acquisition',
      },
      {
        name: 'Query Talent',
        value: 'queryTalent',
        description: 'Search for talents by making a query',
        action: 'Query talent',
      }
    ],
    default: 'getTalentList',
    noDataExpression: true,
  },
];

export const talentFields: INodeProperties[] = [
  {
    displayName: 'Talent ID *',
    name: 'talentId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['getTalentById'],
        resource: ['talent'],
      },
    },
    description: 'The ID of the talent to get or update',
  },
  {
    displayName: "Upload Resume",
    name: "fromResume",
    type: "boolean",
    default: true,
    displayOptions: {
      show: {
        operation: ['createTalent'],
        resource: ['talent'],
      },
    },
    description: "If true, the talent will be created from a resume. If false, need to add person Id.",
  },
  {
    displayName: 'Organizational Unit *',
    name: 'organizationalUnit',
    type: 'string',
    default: 'MG',
    required: true,
    displayOptions: {
      show: {
        operation: ['createTalent'],
        resource: ['talent'],
        fromResume: [true],
      },
    },
    description: 'The organizational unit to associate with this talent',
  },
  {
    displayName: 'Resume URL *',
    name: 'resumeUrl',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createTalent'],
        resource: ['talent'],
        fromResume: [true],
      },
    },
    description: 'The URL of the talent\'s resume',
  },
  {
    displayName: 'Mime Type',
    name: 'mimeType',
    type: 'string',
    default: 'application/pdf',
    required: true,
    displayOptions: {
      show: {
        operation: ['createTalent'],
        resource: ['talent'],
        fromResume: [true],
      },
    },
    description: 'The MIME type of the uploaded resume, e.g., application/pdf',
  },
  {
    displayName: 'New Person',
    name: 'newPerson',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        operation: ['createTalent'],
        resource: ['talent'],
        fromResume: [false],
      },
    },
    description: 'If true, a new person will be created for this talent',
  },
  {
    displayName: 'First Name *',
    name: 'firstName',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['talent'],
        operation: ['createTalent'],
        fromResume: [false],
        newPerson: [true],
      },
    },
    description: 'The first name of the person',
  },
  {
    displayName: 'Middle Name',
    name: 'middleName',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['talent'],
        operation: ['createTalent'],
        fromResume: [false],
        newPerson: [true],
      },
    },
    description: 'The middle name of the person',
  },
  {
    displayName: 'Last Name *',
    name: 'lastName',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['talent'],
        operation: ['createTalent'],
        fromResume: [false],
        newPerson: [true],
      },
    },
    description: 'The last name of the person',
  },
  {
    displayName: 'Organizational Unit *',
    name: 'organizationalUnit',
    type: 'string',
    default: 'MG',
    required: true,
    displayOptions: {
      show: {
        resource: ['talent'],
        operation: ['createTalent'],
        fromResume: [false],
        newPerson: [true],
      },
    },
    description: 'The organizational unit of the person',
  },
  {
    displayName: 'Picture URL',
    name: 'pictureUrl',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['talent'],
        operation: ['createTalent'],
        fromResume: [false],
        newPerson: [true],
      },
    },
    description: 'The URL of the person\'s picture',
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
        operation: ['createTalent'],
        resource: ['talent'],
        fromResume: [false],
        newPerson: [true],
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
        operation: ['createTalent'],
        resource: ['talent'],
        fromResume: [false],
        newPerson: [true],
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
        operation: ['createTalent'],
        resource: ['talent'],
        fromResume: [false],
        newPerson: [true],
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
        operation: ['createTalent'],
        resource: ['talent'],
        fromResume: [false],
        newPerson: [true],
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
        operation: ['createTalent'],
        resource: ['talent'],
        fromResume: [false],
        newPerson: [true],
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
        operation: ['createTalent'],
        resource: ['talent'],
        fromResume: [false],
        newPerson: [true],
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
        operation: ['createTalent'],
        resource: ['talent'],
        fromResume: [false],
        newPerson: [true],
      },
    },
    description: 'The address of the person to create',
  },
  {
    displayName: 'Person ID *',
    name: 'personId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createTalent'],
        resource: ['talent'],
        fromResume: [false],
        newPerson: [false],
      },
    },
    description: 'The ID of the person to associate with this talent',
  },
  {
    displayName: 'Received Date *',
    name: 'receivedDate',
    type: 'dateTime',
    default: new Date().toISOString(),
    required: true,
    displayOptions: {
      show: {
        operation: ['createTalent'],
        resource: ['talent'],
        fromResume: [false],
      },
    },
    description: 'The date when the talent profile was received',
  },
  {
    displayName: 'Application Trigger',
    name: 'acquisitionMethod',
    type: 'string',
    default: '',
    required: false,
    displayOptions: {
      show: {
        operation: ['createTalent'],
        resource: ['talent'],
        fromResume: [false],
      },
    },
    description: 'Recruitment campaign that initiated the hiring process ',
  },
    {
    displayName: 'Application Source',
    name: 'acquisitionSource',
    type: 'options',
    options: [
      {
        name: '',
        value: ''
      },
      {
        name: 'Ingedata',
        value: 'ingedata',
      },
      {
        name: 'LinkedIn',
        value: 'linkedin',
      },
      {
        name: 'Spontanné',
        value: 'spontanne',
      },
      {
        name: 'Cooptation',
        value: 'cooptation',
      },
      {
        name: 'Ecole',
        value: 'ecole',
      },
    ],
    default: '',
    required: false,
    displayOptions: {
      show: {
        operation: ['createTalent'],
        resource: ['talent'],
        fromResume: [false],
      },
    },
    description: 'Source of talent profiles',
  },
    {
    displayName: 'Status',
    name: 'status',
    type: 'options',
    options: [
      {
        name: 'To be treated',
        value: 'to_be_treated',
      },
      {
        name: 'To be tested',
        value: 'to_be_tested',
      },
      {
        name: 'Black listed',
        value: 'black_listed',
      },
      {
        name: 'Archived',
        value: 'archived',
      },
    ],
    default: 'to_be_treated',
    required: true,
    displayOptions: {
      show: {
        operation: ['createTalent'],
        resource: ['talent'],
        fromResume: [false],
      },
    },
    description: 'Current talent status',
  },
  {
    displayName: 'Availability',
    name: 'availability',
    type: 'options',
    options: [
      {
        name: 'Available',
        value: 'available',
      },
      {
        name: 'Not Available',
        value: 'not_available',
      },
    ],
    default: 'available',
    required: true,
    displayOptions: {
      show: {
        operation: ['createTalent'],
        resource: ['talent'],
        fromResume: [false],
      },
    },
    description: 'Current talent availability',
  },
  {
    displayName: 'Query *',
    name: 'queryPrompt',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['queryTalent'],
        resource: ['talent'],
      },
    },
    description: 'The query string to search for talents',
  },
  {
    displayName: 'Talent ID *',
    name: 'talentId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['updateTalentAcquisition'],
        resource: ['talent'],
      },
    },
    description: 'The ID of the talent to update or delete',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        operation: ['updateTalentAcquisition'],
        resource: ['talent'],
      },
    },
    description: 'Fields to update in the talent',
    options: [
      {
        displayName: 'Received Date',
        name: 'receivedDate',
        type: 'dateTime',
        default: new Date().toISOString(),
        description: 'The date when the document was received',
      },
      {
        displayName: 'Application Trigger',
        name: 'acquisitionMethod',
        type: 'string',
        default: '',
        description: 'The type of the application trigger',
      },
      {
        displayName: 'Application Source',
        name: 'acquisitionSource',
        type: 'options',
        options: [
          {
            name: '',
            value: ''
          },
          {
            name: 'Ingedata',
            value: 'ingedata',
          },
          {
            name: 'LinkedIn',
            value: 'linkedin',
          },
          {
            name: 'Spontanné',
            value: 'spontanne',
          },
          {
            name: 'Cooptation',
            value: 'cooptation',
          },
          {
            name: 'Ecole',
            value: 'ecole',
          },
        ],
        default: '',
        description: 'Source of talent profiles',
      },
      {
        displayName: 'Availability',
        name: 'availability',
        type: 'options',
        options: [
          {
            name: 'Available',
            value: 'available',
          },
          {
            name: 'Not Available',
            value: 'not_available',
          },
        ],
        default: 'available',
        description: 'Current talent availability',
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
          {
            name: 'To be treated',
            value: 'to_be_treated',
          },
          {
            name: 'To be tested',
            value: 'to_be_tested',
          },
          {
            name: 'Black listed',
            value: 'black_listed',
          },
          {
            name: 'Archived',
            value: 'archived',
          }
        ],
        default: 'to_be_treated',
        description: 'Current talent status',
      }
    ],
  },
];
