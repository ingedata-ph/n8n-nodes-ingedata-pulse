import type { INodeProperties } from 'n8n-workflow';

export const candidateOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'candidates',
        ],
      },
    },
    noDataExpression: true,
    options: [
      {
        name: 'Get Candidate',
        value: 'getCandidateById',
        description: 'Get a specific candidate',
        action: 'Get a candidate',
      },
      {
        name: 'List Candidates',
        value: 'getCandidatesList',
        description: 'List candidates',
        action: 'List candidates',
      },
    ],
    default: 'getCandidatesList',
  },
];

export const candidateFields: INodeProperties[] = [
  {
    displayName: 'Candidate ID *',
    name: 'candidateId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['candidates'],
        operation: ['getCandidateById'],
      },
    },
    description: 'The ID of the candidate',
  },
];
