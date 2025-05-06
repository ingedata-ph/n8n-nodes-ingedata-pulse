import type { INodeProperties } from 'n8n-workflow';

export const languageOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'language',
        ],
      },
    },
    options: [
      {
        name: 'Get Languages List',
        value: 'getLanguagesList',
        description: 'Get a list of languages',
        action: 'Get languages list',
      },
      {
        name: 'Add Language',
        value: 'createLanguage',
        description: 'Add new language',
        action: 'Add language',
      },
      {
        name: 'Update Language',
        value: 'updateLanguage',
        description: 'Update a language',
        action: 'Update language',
      },
      {
        name: 'Delete Language',
        value: 'deleteLanguage',
        description: 'Delete a language',
        action: 'Delete language',
      },
    ],
    default: 'getLanguagesList',
    noDataExpression: true,
  },
];

export const languageFields: INodeProperties[] = [
  {
    displayName: 'Talent ID',
    name: 'talentId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createLanguage', 'updateLanguage'],
        resource: ['language'],
      },
    },
    description: 'The ID of the talent to associate with this language',
  },
  {
    displayName: 'Language ID',
    name: 'languageId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['updateLanguage', 'deleteLanguage'],
        resource: ['language'],
      },
    },
    description: 'The ID of the language to update or delete',
  },
  {
    displayName: 'ISO Code',
    name: 'isoCode',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createLanguage', 'updateLanguage'],
        resource: ['language'],
      },
    },
    description: 'The ISO code of the language',
  },
  {
    displayName: 'Reading Level',
    name: 'readingLevel',
    type: 'number',
    typeOptions: {
      minValue: 1,
      maxValue: 5,
    },
    default: 1,
    required: true,
    displayOptions: {
      show: {
        operation: ['createLanguage', 'updateLanguage'],
        resource: ['language'],
      },
    },
    description: 'The reading level of the language (1-5)',
  },
  {
    displayName: 'Writing Level',
    name: 'writingLevel',
    type: 'number',
    typeOptions: {
      minValue: 1,
      maxValue: 5,
    },
    default: 1,
    required: true,
    displayOptions: {
      show: {
        operation: ['createLanguage', 'updateLanguage'],
        resource: ['language'],
      },
    },
    description: 'The writing level of the language (1-5)',
  },
  {
    displayName: 'Speaking Level',
    name: 'speakingLevel',
    type: 'number',
    typeOptions: {
      minValue: 1,
      maxValue: 5,
    },
    default: 1,
    required: true,
    displayOptions: {
      show: {
        operation: ['createLanguage', 'updateLanguage'],
        resource: ['language'],
      },
    },
    description: 'The speaking level of the language (1-5)',
  },
  {
    displayName: 'Include Related Resources',
    name: 'included',
    type: 'multiOptions',
    options: [
      {
        name: 'Talent',
        value: 'talent',
      },
    ],
    default: [],
    required: false,
    displayOptions: {
      show: {
        operation: ['getLanguagesList'],
        resource: ['language'],
      },
    },
    description: 'Related resources to include in the response',
  },
];
