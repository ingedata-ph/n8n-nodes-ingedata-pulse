import type { INodeProperties } from 'n8n-workflow';

export const skillOperationsFields: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: [
          'skill',
        ],
      },
    },
    options: [
      {
        name: 'Get Skills List',
        value: 'getSkillsList',
        description: 'Get a list of skills',
        action: 'Get skills list',
      },
      {
        name: 'Add new Skill',
        value: 'createSkill',
        description: 'Add new skill',
        action: 'Add skill',
      },
      {
        name: 'Update Skill',
        value: 'updateSkill',
        description: 'Update a skill',
        action: 'Update skill',
      },
      {
        name: 'Delete Skill',
        value: 'deleteSkill',
        description: 'Delete a skill',
        action: 'Delete skill',
      },
    ],
    default: 'getSkillsList',
    noDataExpression: true,
  },
];

export const skillFields: INodeProperties[] = [
  {
    displayName: 'Talent ID *',
    name: 'talentId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createSkill', 'updateSkill'],
        resource: ['skill'],
      },
    },
    description: 'The ID of the talent to associate with this skill',
  },
  {
    displayName: 'Skill ID *',
    name: 'skillId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['updateSkill', 'deleteSkill'],
        resource: ['skill'],
      },
    },
    description: 'The ID of the skill to update or delete',
  },
  {
    displayName: 'Skill Name *',
    name: 'skillName',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        operation: ['createSkill', 'updateSkill'],
        resource: ['skill'],
      },
    },
    description: 'The name of the skill',
  },
  {
    displayName: 'Skill Level *',
    name: 'level',
    type: 'number',
    typeOptions: {
      minValue: 1,
      maxValue: 5,
    },
    default: 1,
    required: true,
    displayOptions: {
      show: {
        operation: ['createSkill', 'updateSkill'],
        resource: ['skill'],
      },
    },
    description: 'The level of the skill (1-5)',
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
        operation: ['getSkillsList'],
        resource: ['skill'],
      },
    },
    description: 'Related resources to include in the response',
  },
];
