import { IExecuteFunctions, NodeConnectionType, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { INodeTypeDescription } from 'n8n-workflow';
import { PulseApiFactory } from '../../utils/api/PulseApiFactory';
import { BasePulseNode } from '../common/BasePulseNode';
import {
  activityOperations,
  projectOperations,
  projectMemberOperations,
  projectDocumentOperations,
  projectDataOperations,
  projectWorkUnitOperations,
} from './operations';

export class WorkflowAction extends BasePulseNode {
  constructor() {
    super({
      displayName: 'Pulse Workflow',
      name: 'workflowAction',
      icon: 'file:pulse.svg',
      group: ['input'],
      version: 1,
      description: 'Workflow actions from Pulse API',
      defaults: {
        name: 'Workflow Action',
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
              name: 'Activities',
              value: 'activities',
            },
            {
              name: 'Project',
              value: 'projects',
            },
            {
              name: 'Project Member',
              value: 'projectMembers',
            },
            {
              name: 'Project Document',
              value: 'projectDocuments',
            },
            {
              name: 'Project Data',
              value: 'projectData',
            },
            {
              name: 'Project Work Unit',
              value: 'projectWorkUnits',
            },
          ],
          default: 'projects',
          noDataExpression: true,
          required: true,
          description: 'Resource to use',
        },
        
        // Activity operations
        {
          displayName: 'Operation',
          name: 'operation',
          type: 'options',
          displayOptions: {
            show: {
              resource: [
                'activities',
              ],
            },
          },
          noDataExpression: true,
          options: [
            {
              name: 'Assign Member',
              value: 'assignMember',
              description: 'Assign a member to an activity',
              action: 'Assign a member to an activity',
            },
            {
              name: 'Unassign Member',
              value: 'unassignMember',
              description: 'Unassign a member from an activity',
              action: 'Unassign a member from an activity',
            },
          ],
          default: 'assignMember',
        },
        {
          displayName: 'Activity ID',
          name: 'activityId',
          type: 'string',
          default: '',
          required: true,
          displayOptions: {
            show: {
              resource: ['activities'],
              operation: ['assignMember', 'unassignMember'],
            },
          },
          description: 'The ID of the activity',
        },
        {
          displayName: 'Account ID',
          name: 'accountId',
          type: 'string',
          default: '',
          required: true,
          displayOptions: {
            show: {
              resource: ['activities'],
              operation: ['assignMember'],
            },
          },
          description: 'The account ID of the member to assign',
        },
        {
          displayName: 'Start Working',
          name: 'startWorking',
          type: 'boolean',
          default: false,
          required: true,
          displayOptions: {
            show: {
              resource: ['activities'],
              operation: ['assignMember'],
            },
          },
          description: 'Whether to start working on the activity immediately',
        },
        
        // Project operations
        {
          displayName: 'Operation',
          name: 'operation',
          type: 'options',
          displayOptions: {
            show: {
              resource: [
                'projects',
              ],
            },
          },
          noDataExpression: true,
          options: [
            {
              name: 'Create Project',
              value: 'createProject',
              description: 'Create a new project',
              action: 'Create a new project',
            },
            {
              name: 'Update Project',
              value: 'updateProject',
              description: 'Update an existing project',
              action: 'Update a project',
            },
            {
              name: 'Activate/Desactivate Project',
              value: 'updateProjectStatus',
              description: 'Activate or Desactivate an existing project status',
              action: 'Update a project status',
            },
            {
              name: 'List Projects',
              value: 'getProjectList',
              description: 'List projects',
              action: 'List projects',
            },
          ],
          default: 'createProject',
        },
        {
          displayName: 'Project ID',
          name: 'projectId',
          type: 'string',
          default: '',
          required: true,
          displayOptions: {
            show: {
              resource: ['projects'],
              operation: ['updateProject', 'updateProjectStatus'],
            },
          },
          description: 'The ID of the project to update',
        },
        {
          displayName: 'Name',
          name: 'name',
          type: 'string',
          default: '',
          required: true,
          displayOptions: {
            show: {
              resource: ['projects'],
              operation: ['createProject', 'updateProject'],
            },
          },
          description: 'The name of the project',
        },
        {
          displayName: 'Organizational Unit',
          name: 'organizationalUnit',
          type: 'string',
          default: '',
          required: true,
          displayOptions: {
            show: {
              resource: ['projects'],
              operation: ['createProject'],
            },
          },
          description: 'The organizational unit of the project',
        },
        {
          displayName: 'Organization ID',
          name: 'organizationId',
          type: 'string',
          default: '',
          required: true,
          displayOptions: {
            show: {
              resource: ['projects'],
              operation: ['createProject'],
            },
          },
          description: 'The organization ID',
        },
        {
          displayName: 'Project Definition',
          name: 'projectDefinition',
          type: 'string',
          required: true,
          typeOptions: {
            rows: 10,
          },
          default: '',
          displayOptions: {
            show: {
              resource: ['projects'],
              operation: ['createProject'],
            },
          },
          description: 'The project definition JSON',
        },
        {
          displayName: 'Status',
          name: 'status',
          type: 'boolean',
          default: '',
          required: true,
          displayOptions: {
            show: {
              resource: ['projects'],
              operation: ['updateProjectStatus'],
            },
          },
          description: '',
        },

        // Project Member operations
        {
          displayName: 'Operation',
          name: 'operation',
          type: 'options',
          displayOptions: {
            show: {
              resource: [
                'projectMembers',
              ],
            },
          },
          noDataExpression: true,
          options: [
            {
              name: 'Add New Project Member',
              value: 'createProjectMember',
              description: 'Add new project member',
              action: 'Create new project member',
            },
            {
              name: 'Update Project Member',
              value: 'updateProjectMember',
              description: 'Update an existing project member',
              action: 'Update a project member',
            },
            {
              name: 'Remove Project Member',
              value: 'deleteProjectMember',
              description: 'Remove a project member',
              action: 'Delete a project member',
            },
            {
              name: 'List Project Members',
              value: 'getProjectMemberList',
              description: 'List project members',
              action: 'List project members',
            },
          ],
          default: 'getProjectMemberList',
        },
        {
          displayName: 'Member ID',
          name: 'memberId',
          type: 'string',
          default: '',
          required: true,
          displayOptions: {
            show: {
              resource: ['projectMembers'],
              operation: ['updateProjectMember', 'deleteProjectMember'],
            },
          },
          description: 'The ID of the project member',
        },
        {
          displayName: 'Account ID',
          name: 'accountId',
          type: 'string',
          default: '',
          required: true,
          displayOptions: {
            show: {
              resource: ['projectMembers'],
              operation: ['createProjectMember'],
            },
          },
          description: 'The account ID',
        },
        {
          displayName: 'Project ID',
          name: 'projectId',
          type: 'string',
          default: '',
          required: true,
          displayOptions: {
            show: {
              resource: ['projectMembers'],
              operation: ['createProjectMember'],
            },
          },
          description: 'The project ID',
        },
        {
          displayName: 'Actor Roles',
          name: 'actorRoles',
          type: 'string',
          default: '',
          required: true,
          displayOptions: {
            show: {
              resource: ['projectMembers'],
              operation: ['createProjectMember', 'updateProjectMember'],
            },
          },
          description: 'Comma-separated list of actor roles',
          placeholder: 'e.g., agent_role,qc_role',
        },
        {
          displayName: 'Is Manager',
          name: 'isManager',
          type: 'boolean',
          default: false,
          required: true,
          displayOptions: {
            show: {
              resource: ['projectMembers'],
              operation: ['createProjectMember', 'updateProjectMember'],
            },
          },
          description: 'Whether the member is a manager',
        },
        
        // Project Document operations
        {
          displayName: 'Operation',
          name: 'operation',
          type: 'options',
          displayOptions: {
            show: {
              resource: [
                'projectDocuments',
              ],
            },
          },
          noDataExpression: true,
          options: [
            {
              name: 'Add Project Document',
              value: 'createProjectDocument',
              description: 'Add a new project document',
              action: 'Create a new project document',
            },
            {
              name: 'Update Project Document',
              value: 'updateProjectDocument',
              description: 'Update an existing project document',
              action: 'Update a project document',
            },
            {
              name: 'Delete Project Document',
              value: 'deleteProjectDocument',
              description: 'Delete a project document',
              action: 'Delete a project document',
            },
            {
              name: 'List Project Documents',
              value: 'getProjectDocumentList',
              description: 'List project documents',
              action: 'List project documents',
            },
            {
              name: 'Get Project Document Url',
              value: 'getProjectDocumentUrl',
              description: 'Get a project document Url for download',
              action: 'Get a project document URL',
            }
          ],
          default: 'createProjectDocument',
        },
        {
          displayName: 'Document ID',
          name: 'documentId',
          type: 'string',
          default: '',
          required: true,
          displayOptions: {
            show: {
              resource: ['projectDocuments'],
              operation: ['updateProjectDocument', 'deleteProjectDocument', 'getProjectDocumentUrl'],
            },
          },
          description: 'The ID of the project document',
        },
        {
          displayName: 'Name',
          name: 'name',
          type: 'string',
          default: '',
          required: true,
          displayOptions: {
            show: {
              resource: ['projectDocuments'],
              operation: ['createProjectDocument', 'updateProjectDocument'],
            },
          },
          description: 'The name of the document',
        },
        {
          displayName: 'Category',
          name: 'category',
          type: 'options',
          options: [
            {
              name: 'Project Plan',
              value: 'project-plan',
            },
            {
              name: 'Training Book',
              value: 'training-book',
            },
            {
              name: 'Client\'s Instruction',
              value: 'client-instruction',
            },
            {
              name: 'Commercial Document',
              value: 'commercial-document',
            },
          ],
          default: 'project-plan',
          required: true,
          displayOptions: {
            show: {
              resource: ['projectDocuments'],
              operation: ['createProjectDocument', 'updateProjectDocument'],
            },
          },
          description: 'The category of the document',
        },
        {
          displayName: 'URL',
          name: 'url',
          type: 'string',
          default: '',
          required: true,
          displayOptions: {
            show: {
              resource: ['projectDocuments'],
              operation: ['createProjectDocument'],
            },
          },
          description: 'The URL of the document',
        },
        {
          displayName: 'Rights',
          name: 'rights',
          type: 'string',
          default: '',
          required: true,
          displayOptions: {
            show: {
              resource: ['projectDocuments'],
              operation: ['createProjectDocument', 'updateProjectDocument'],
            },
          },
          description: 'Document access permissions. Input can be either:\n\n' +
            '• Comma-separated list: "financial,lead,client,staff"\n' +
            '• Array of strings: ["financial", "lead"]\n\n' +
            'Access rules:\n' +
            '• Client users: Can only add documents with "client" right\n' +
            '• Supervisors: Documents must include "lead" right\n' +
            '• Financial users: Documents must include "financial" right',
          placeholder: 'e.g., financial,lead',
        },
        {
          displayName: 'Project ID',
          name: 'projectId',
          type: 'string',
          default: '',
          required: true,
          displayOptions: {
            show: {
              resource: ['projectDocuments'],
              operation: ['createProjectDocument', 'updateProjectDocument'],
            },
          },
          description: 'The project ID',
        },
        
        // Project Data operations
        {
          displayName: 'Operation',
          name: 'operation',
          type: 'options',
          displayOptions: {
            show: {
              resource: [
                'projectData',
              ],
            },
          },
          noDataExpression: true,
          options: [
            {
              name: 'Create Project Data',
              value: 'createProjectData',
              description: 'Create project data',
              action: 'Create project data',
            },
            {
              name: 'Update Project Data',
              value: 'updateProjectData',
              description: 'Update project data',
              action: 'Update project data',
            },
            {
              name: 'Show/Hide Project Data',
              value: 'updateProjectDataVisibility',
              description: 'Hide or show project data',
              action: 'Show or hide project data',
            },
            {
              name: 'List Project Data',
              value: 'getProjectDataList',
              description: 'List project data',
              action: 'List project data',
            },
          ],
          default: 'createProjectData',
        },
        {
          displayName: 'Data ID',
          name: 'dataId',
          type: 'string',
          default: '',
          required: true,
          displayOptions: {
            show: {
              resource: ['projectData'],
              operation: ['updateProjectData', 'updateProjectDataVisibility'],
            },
          },
          description: 'The ID of the project data',
        },
        {
          displayName: 'Project ID',
          name: 'projectId',
          type: 'string',
          default: '',
          required: true,
          displayOptions: {
            show: {
              resource: ['projectData'],
              operation: ['createProjectData'],
            },
          },
          description: 'The project ID',
        },
        {
          displayName: 'Key',
          name: 'key',
          type: 'string',
          default: '',
          required: true,
          displayOptions: {
            show: {
              resource: ['projectData'],
              operation: ['createProjectData', 'updateProjectData', 'updateProjectDataVisibility'],
            },
          },
          description: 'The key of the data',
        },
        {
          displayName: 'Value',
          name: 'value',
          type: 'string',
          default: '',
          required: true,
          displayOptions: {
            show: {
              resource: ['projectData'],
              operation: ['createProjectData', 'updateProjectData', 'updateProjectDataVisibility'],
            },
          },
          description: 'The value of the data',
        },
        {
          displayName: 'Label',
          name: 'label',
          type: 'string',
          default: '',
          required: true,
          displayOptions: {
            show: {
              resource: ['projectData'],
              operation: ['createProjectData', 'updateProjectData', 'updateProjectDataVisibility'],
            },
          },
          description: 'The label of the data',
        },
        {
          displayName: 'Visibility',
          name: 'is_visible',
          type: 'boolean',
          default: true,
          required: true,
          displayOptions: {
            show: {
              resource: ['projectData'],
              operation: ['updateProjectDataVisibility'],
            },
          },
          description: 'Show or hide the project data',
        },
        
        // Project Work Unit operations
        {
          displayName: 'Operation',
          name: 'operation',
          type: 'options',
          displayOptions: {
            show: {
              resource: [
                'projectWorkUnits',
              ],
            },
          },
          noDataExpression: true,
          options: [
            {
              name: 'Create Project Work Unit',
              value: 'createProjectWorkUnit',
              description: 'Create a new project work unit',
              action: 'Create a new project work unit',
            },
            {
              name: 'Cancel Project Work Unit',
              value: 'cancelProjectWorkUnit',
              description: 'Cancel a project work unit',
              action: 'Cancel a project work unit',
            },
            {
              name: 'List Project Work Units',
              value: 'getProjectWorkUnitList',
              description: 'List project work units',
              action: 'List project work units',
            },
          ],
          default: 'createProjectWorkUnit',
        },
        {
          displayName: 'Work Unit ID',
          name: 'workUnitId',
          type: 'string',
          default: '',
          required: true,
          displayOptions: {
            show: {
              resource: ['projectWorkUnits'],
              operation: ['cancelProjectWorkUnit'],
            },
          },
          description: 'The ID of the work unit',
        },
        {
          displayName: 'Project ID',
          name: 'projectId',
          type: 'string',
          default: '',
          required: true,
          displayOptions: {
            show: {
              resource: ['projectWorkUnits'],
              operation: ['createProjectWorkUnit'],
            },
          },
          description: 'The project ID',
        },
        {
          displayName: 'Name',
          name: 'name',
          type: 'string',
          default: '',
          required: false,
          displayOptions: {
            show: {
              resource: ['projectWorkUnits'],
              operation: ['createProjectWorkUnit'],
            },
          },
          description: 'The name of the work unit',
        },

        // Additional fields
				{
					displayName: 'Include Related Resources',
					name: 'included',
					type: 'multiOptions',
					options: [
						{
							name: 'Project',
							value: 'project',
						},
          ],
					default: [],
					required: false,
					displayOptions: {
						show: {
							operation: ['getProjectMemberList', 'getProjectDataList'],
							resource: ['projectMembers', 'projectData'],
						},
					},
					description: 'Related resources to include in the response',
				},
        {
          displayName: 'Additional Fields',
          name: 'additionalFields',
          type: 'collection',
          placeholder: 'Add Field',
          default: {},
          displayOptions: {
            show: {
              resource: ['projects', 'projectWorkUnits', 'projectData', 'projectDocuments', 'projectMembers'],
              operation: [
                'getProjectList',
                'getProjectWorkUnitList',
                'getProjectDataList',
                'getProjectDocumentList',
                'getProjectMemberList',
              ],
            },
          },
          options: [
            {
              displayName: 'Sort',
              name: 'sort',
              type: 'string',
              default: '',
              description: 'Sort order (e.g., "created_at" or "-created_at" for descending)',
            },
            {
              displayName: 'Page Number',
              name: 'pageNumber',
              type: 'number',
              default: 1,
              description: 'Page number for pagination',
            },
            {
              displayName: 'Page Size',
              name: 'pageSize',
              type: 'number',
              default: 20,
              description: 'Number of results per page',
            },
            {
              displayName: 'Filters',
              name: 'filters',
              placeholder: 'Add Filter',
              type: 'fixedCollection',
              typeOptions: {
                multipleValues: true,
              },
              default: {},
              options: [
                {
                  name: 'filter',
                  displayName: 'Filter',
                  values: [
                    {
                      displayName: 'Key',
                      name: 'key',
                      type: 'string',
                      default: '',
                      description: 'The key to filter on',
                    },
                    {
                      displayName: 'Values',
                      name: 'values',
                      type: 'string',
                      default: '',
                      description: 'Comma-separated list of values',
                    },
                  ],
                },
              ],
              description: 'Filter results by specific fields',
            },
            {
              displayName: 'Fields',
              name: 'fields',
              placeholder: 'Add Field',
              type: 'fixedCollection',
              typeOptions: {
                multipleValues: true,
              },
              default: {},
              options: [
                {
                  name: 'field',
                  displayName: 'Field',
                  values: [
                    {
                      displayName: 'Resource Type',
                      name: 'key',
                      type: 'string',
                      default: '',
                      description: 'The resource type to specify fields for',
                    },
                    {
                      displayName: 'Fields',
                      name: 'fields',
                      type: 'string',
                      default: '',
                      description: 'Comma-separated list of fields to include',
                    },
                  ],
                },
              ],
              description: 'Specify which fields to include in the response',
            },
          ],
        },
      ],
    });
  }

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    // For each item (though there will usually just be one)
    for (let i = 0; i < items.length; i++) {
      try {
        const resource = this.getNodeParameter('resource', i) as string;
        const operation = this.getNodeParameter('operation', i) as string;
        // Cast the API helper to the appropriate type
        const pulseApi = await PulseApiFactory.getPulseApiHelper(this, resource) as any;

        let result;

        // Handle projects operations
        if (resource === 'projects') {
          switch (operation) {
            case 'createProject':
              result = await projectOperations.createProject(this, i, pulseApi);
              break;
            case 'updateProject':
              result = await projectOperations.updateProject(this, i, pulseApi);
              break;
            case 'updateProjectStatus':
              result = await projectOperations.updateProjectStatus(this, i, pulseApi);
              break;
            case 'getProjectList':
              result = await projectOperations.getProjectList(this, i, pulseApi);
              break;
            default:
              throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
          }
        }
        
        // Handle project members operations
        else if (resource === 'projectMembers') {
          switch (operation) {
            case 'createProjectMember':
              result = await projectMemberOperations.createProjectMember(this, i, pulseApi);
              break;
            case 'updateProjectMember':
              result = await projectMemberOperations.updateProjectMember(this, i, pulseApi);
              break;
            case 'deleteProjectMember':
              result = await projectMemberOperations.deleteProjectMember(this, i, pulseApi);
              break;
            case 'getProjectMemberList':
              result = await projectMemberOperations.getProjectMemberList(this, i, pulseApi);
              break;
            default:
              throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
          }
        }
        
        // Handle project documents operations
        else if (resource === 'projectDocuments') {
          switch (operation) {
            case 'createProjectDocument':
              result = await projectDocumentOperations.createProjectDocument(this, i, pulseApi);
              break;
            case 'updateProjectDocument':
              result = await projectDocumentOperations.updateProjectDocument(this, i, pulseApi);
              break;
            case 'deleteProjectDocument':
              result = await projectDocumentOperations.deleteProjectDocument(this, i, pulseApi);
              break;
            case 'getProjectDocumentList':
              result = await projectDocumentOperations.getProjectDocumentList(this, i, pulseApi);
              break;
            case 'getProjectDocumentUrl':
              result = await projectDocumentOperations.getProjectDocumentUrl(this, i, pulseApi);
              break;
            default:
              throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
          }
        }
        
        // Handle project data operations
        else if (resource === 'projectData') {
          switch (operation) {
            case 'createProjectData':
              result = await projectDataOperations.createProjectData(this, i, pulseApi);
              break;
            case 'updateProjectData':
              result = await projectDataOperations.updateProjectData(this, i, pulseApi);
              break;
            case 'getProjectDataList':
              result = await projectDataOperations.getProjectDataList(this, i, pulseApi);
              break;
            case 'updateProjectDataVisibility':
              result = await projectDataOperations.updateProjectDataVisibility(this, i, pulseApi);
              break;
            default:
              throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
          }
        }
        
        // Handle project work unit operations
        else if (resource === 'projectWorkUnits') {
          switch (operation) {
            case 'createProjectWorkUnit':
              result = await projectWorkUnitOperations.createProjectWorkUnit(this, i, pulseApi);
              break;
            case 'cancelProjectWorkUnit':
              result = await projectWorkUnitOperations.cancelProjectWorkUnit(this, i, pulseApi);
              break;
            case 'getProjectWorkUnitList':
              result = await projectWorkUnitOperations.getProjectWorkUnitList(this, i, pulseApi);
              break;
            default:
              throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
          }
        }
        
        // Handle activities operations
        else if (resource === 'activities') {
          switch (operation) {
            case 'assignMember':
              result = await activityOperations.assignActivityMember(this, i, pulseApi);
              break;
            case 'unassignMember':
              result = await activityOperations.unassignActivityMember(this, i, pulseApi);
              break;
            default:
              throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
          }
        }
        else {
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
