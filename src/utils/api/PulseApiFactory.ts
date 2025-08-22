import { IExecuteFunctions, ICredentialDataDecryptedObject, ILoadOptionsFunctions } from 'n8n-workflow';
import { AccountApi } from './AccountApi';
import { PeopleApi } from './PeopleApi';
import { TalentApi } from './TalentApi';
import { BasePulseApi } from './BasePulseApi';
import { OfficeApi } from './OfficeApi';
import { OrganizationsApi } from './OrganizationsApi';
import { RecruitmentApi } from './RecruitmentApi';
import { QuizzApi } from './QuizzApi';
import { WorkflowApi } from './WorkflowApi';

export class PulseApiFactory {
  /**
   * Create an API helper instance based on the resource type
   * @param credentials The credentials to use for the API
   * @param resource The resource type (account, people, talent, etc.)
   * @returns The appropriate API helper instance
   */
  static createApiHelper(credentials: ICredentialDataDecryptedObject, resource?: string): BasePulseApi | AccountApi | PeopleApi | TalentApi | OrganizationsApi | OfficeApi | RecruitmentApi | QuizzApi | WorkflowApi {
    switch (resource) {
      case 'account':
      case 'accountRole':
        return new AccountApi(credentials);

      case 'people':
      case 'personDocument':
        return new PeopleApi(credentials);

      case 'talent':
      case 'skill':
      case 'language':
      case 'education':
      case 'certification':
      case 'experience':
        return new TalentApi(credentials);
      case 'employee':
      case 'planning':
      case 'announcement':
      case 'holiday':
      case 'leaveRequest':
        return new OfficeApi(credentials);

      case 'organizations':
      case 'peopleDirectories':
        return new OrganizationsApi(credentials);

      case 'candidates':
      case 'pipelineTemplate':
      case 'stageTemplate':
      case 'recruitmentCampaign':
        return new RecruitmentApi(credentials);

      case 'quizzSessions':
        return new QuizzApi(credentials);

      case 'projects':
      case 'projectMembers':
      case 'projectDocuments':
      case 'projectData':
      case 'projectWorkUnits':
      case 'activities':
      case 'projectIndicators':
        return new WorkflowApi(credentials);

      case undefined:
        return new AccountApi(credentials);

      default:
        // Default to base API if resource type is not recognized
        return new BasePulseApi(credentials);
    }
  }

  /**
   * Helper function to create a PulseApi instance from n8n credentials
   */
  static async getPulseApiHelper(
    executeFunctions: IExecuteFunctions | ILoadOptionsFunctions,
    resource?: string,
  ): Promise<BasePulseApi | AccountApi | PeopleApi | TalentApi | OfficeApi | OrganizationsApi | RecruitmentApi | QuizzApi | WorkflowApi> {
    const credentials = await executeFunctions.getCredentials('pulseApi');

    if (!credentials) {
      throw new Error('No credentials provided for Pulse API');
    }

    return PulseApiFactory.createApiHelper(credentials, resource);
  }
}
