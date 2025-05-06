import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { OrganizationsApi } from '../../../utils/api/OrganizationsApi';

export async function createOrganization(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: OrganizationsApi,
): Promise<any> {
  const name = executeFunctions.getNodeParameter('name', itemIndex) as string;
  const enabled = executeFunctions.getNodeParameter('enabled', itemIndex, true) as boolean;
  
  const organizationData = {
    data: {
      type: "iam/organizations",
      attributes: {
        name: name,
        enabled: enabled
      }
    }
  };
  
  return pulseApi.createOrganization(organizationData);
}

export async function updateOrganization(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: OrganizationsApi,
): Promise<any> {
  const organizationId = executeFunctions.getNodeParameter('organizationId', itemIndex) as string;
  const name = executeFunctions.getNodeParameter('name', itemIndex) as string;
  
  const organizationData = {
    data: {
      type: "iam/organizations",
      id: organizationId,
      attributes: {
        name: name
      }
    }
  };
  
  return pulseApi.updateOrganization(organizationId, organizationData);
}

export async function updateOrganizationStatus(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: OrganizationsApi,
): Promise<any> {
  const organizationId = executeFunctions.getNodeParameter('organizationId', itemIndex) as string;
  const enabled = executeFunctions.getNodeParameter('enabled', itemIndex, true) as boolean;
  
  const organizationData = {
    data: {
      type: "iam/organizations",
      id: organizationId,
      attributes: {
        enabled: enabled
      }
    }
  };
  
  return pulseApi.updateOrganization(organizationId, organizationData);
}
