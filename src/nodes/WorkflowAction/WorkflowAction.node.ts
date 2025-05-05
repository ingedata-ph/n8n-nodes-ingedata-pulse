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
import {
  activityOperationsFields, activityFields,
  projectOperationsFields, projectFields,
  projectMemberOperationsFields, projectMemberFields,
  projectDocumentOperationsFields, projectDocumentFields,
  projectDataOperationsFields, projectDataFields,
  projectWorkUnitOperationsFields, projectWorkUnitFields,
  commonFields
} from './descriptions';

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
        ...activityOperationsFields,
        ...activityFields,
        ...projectOperationsFields,
        ...projectFields,
        ...projectMemberOperationsFields,
        ...projectMemberFields,
        ...projectDocumentOperationsFields,
        ...projectDocumentFields,
        ...projectDataOperationsFields,
        ...projectDataFields,
        ...projectWorkUnitOperationsFields,
        ...projectWorkUnitFields,
        ...commonFields
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
              result = { 
								json: await  projectOperations.createProject(this, i, pulseApi)
							};
							break;
            case 'updateProject':
              result = { 
								json: await  projectOperations.updateProject(this, i, pulseApi)
							};
							break;
            case 'updateProjectStatus':
              result = { 
								json: await  projectOperations.updateProjectStatus(this, i, pulseApi)
							};
							break;
            case 'getProjectList':
              result = { 
								json: await  projectOperations.getProjectList(this, i, pulseApi)
							};
							break;
            default:
              throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
          }
        }
        
        // Handle project members operations
        else if (resource === 'projectMembers') {
          switch (operation) {
            case 'createProjectMember':
              result = { 
								json: await  projectMemberOperations.createProjectMember(this, i, pulseApi)
							};
							break;
            case 'updateProjectMember':
              result = { 
								json: await  projectMemberOperations.updateProjectMember(this, i, pulseApi)
							};
							break;
            case 'deleteProjectMember':
              result = { 
								json: await  projectMemberOperations.deleteProjectMember(this, i, pulseApi)
							};
							break;
            case 'getProjectMemberList':
              result = { 
								json: await  projectMemberOperations.getProjectMemberList(this, i, pulseApi)
							};
							break;
            default:
              throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
          }
        }
        
        // Handle project documents operations
        else if (resource === 'projectDocuments') {
          switch (operation) {
            case 'createProjectDocument':
              result = { 
								json: await  projectDocumentOperations.createProjectDocument(this, i, pulseApi)
							};
							break;
            case 'updateProjectDocument':
              result = { 
								json: await  projectDocumentOperations.updateProjectDocument(this, i, pulseApi)
							};
							break;
            case 'deleteProjectDocument':
              result = { 
								json: await  projectDocumentOperations.deleteProjectDocument(this, i, pulseApi)
							};
							break;
            case 'getProjectDocumentList':
              result = { 
								json: await  projectDocumentOperations.getProjectDocumentList(this, i, pulseApi)
							};
							break;
            case 'getProjectDocumentUrl':
              result = { 
								json: await  projectDocumentOperations.getProjectDocumentUrl(this, i, pulseApi)
							};
							break;
            default:
              throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
          }
        }
        
        // Handle project data operations
        else if (resource === 'projectData') {
          switch (operation) {
            case 'createProjectData':
              result = { 
								json: await  projectDataOperations.createProjectData(this, i, pulseApi)
							};
							break;
            case 'updateProjectData':
              result = { 
								json: await  projectDataOperations.updateProjectData(this, i, pulseApi)
							};
							break;
            case 'getProjectDataList':
              result = { 
								json: await  projectDataOperations.getProjectDataList(this, i, pulseApi)
							};
							break;
            case 'updateProjectDataVisibility':
              result = { 
								json: await  projectDataOperations.updateProjectDataVisibility(this, i, pulseApi)
							};
							break;
            default:
              throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
          }
        }
        
        // Handle project work unit operations
        else if (resource === 'projectWorkUnits') {
          switch (operation) {
            case 'createProjectWorkUnit':
              result = { 
								json: await  projectWorkUnitOperations.createProjectWorkUnit(this, i, pulseApi)
							};
							break;
            case 'cancelProjectWorkUnit':
              result = { 
								json: await  projectWorkUnitOperations.cancelProjectWorkUnit(this, i, pulseApi)
							};
							break;
            case 'getProjectWorkUnitList':
              result = { 
								json: await  projectWorkUnitOperations.getProjectWorkUnitList(this, i, pulseApi)
							};
							break;
            default:
              throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
          }
        }
        
        // Handle activities operations
        else if (resource === 'activities') {
          switch (operation) {
            case 'assignMember':
              result = { 
								json: await  activityOperations.assignActivityMember(this, i, pulseApi)
							};
							break;
            case 'unassignMember':
              result = { 
								json: await  activityOperations.unassignActivityMember(this, i, pulseApi)
							};
							break;
            default:
              throw new Error(`The operation "${operation}" is not supported for resource "${resource}"!`);
          }
        }
        else {
          throw new Error(`The resource "${resource}" is not supported!`);
        }
        
				returnData.push(result);
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
