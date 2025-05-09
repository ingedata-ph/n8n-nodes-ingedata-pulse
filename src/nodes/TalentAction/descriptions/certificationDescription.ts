import type { INodeProperties } from 'n8n-workflow';

export const certificationOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'certification',
        ],
      },
    },
    options: [
      {
        name: 'Get Certification List',
        value: 'getCertificationList',
        description: 'Get a list of certification entries',
        action: 'Get certification list',
      },
      {
        name: 'Add Certification',
        value: 'createCertification',
        description: 'Add new certification entry',
        action: 'Add certification',
      },
      {
        name: 'Update Certification',
        value: 'updateCertification',
        description: 'Update a certification entry',
        action: 'Update certification',
      },
      {
        name: 'Delete Certification',
        value: 'deleteCertification',
        description: 'Delete a certification entry',
        action: 'Delete certification',
      },
    ],
    default: 'getCertificationList',
    noDataExpression: true,
  },
];

export const certificationFields: INodeProperties[] = [
  {
    displayName: 'Talent ID *',
    name: 'talentId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createCertification', 'updateCertification'],
        resource: ['certification'],
      },
    },
    description: 'The ID of the talent to associate with this certification entry',
  },
  {
    displayName: 'Certification ID *',
    name: 'certificationId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['updateCertification', 'deleteCertification'],
        resource: ['certification'],
      },
    },
    description: 'The ID of the certification entry to update or delete',
  },
  {
    displayName: 'Certification Name *',
    name: 'certificationName',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createCertification', 'updateCertification'],
        resource: ['certification'],
      },
    },
    description: 'The name of the certification',
  },
  {
    displayName: 'Organization *',
    name: 'organization',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createCertification', 'updateCertification'],
        resource: ['certification'],
      },
    },
    description: 'The organization that issued the certification',
  },
  {
    displayName: 'Certificate URL *',
    name: 'url',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createCertification', 'updateCertification'],
        resource: ['certification'],
      },
    },
    description: 'The URL associated with the certification',
  },
  {
    displayName: 'Obtention Date *',
    name: 'obtentionDate',
    type: 'dateTime',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createCertification', 'updateCertification'],
        resource: ['certification'],
      },
    },
    description: 'The date when the certification was obtained',
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
        operation: ['getCertificationList'],
        resource: ['certification'],
      },
    },
    description: 'Related resources to include in the response',
  },
];
