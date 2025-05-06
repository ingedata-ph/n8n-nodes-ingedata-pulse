import { IExecuteFunctions } from 'n8n-workflow';
import { OfficeApi } from '../../../utils/api/OfficeApi';

export async function getAnnouncementList(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: OfficeApi,
): Promise<any> {
  const additionalFields = executeFunctions.getNodeParameter('additionalFields', itemIndex, {}) as {
    sort?: string;
    pageNumber?: number;
    pageSize?: number;
    filters?: { filter: Array<{ key: string; values: string }> };
    fields?: { field: Array<{ key: string; fields: string }> };
  };
  return pulseApi.getAnnouncementList(additionalFields);
}

export async function createAnnouncement(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: OfficeApi,
): Promise<any> {
  const content_md = executeFunctions.getNodeParameter('contentMd', itemIndex) as string;
  const title = executeFunctions.getNodeParameter('title', itemIndex) as string;
  const publishing_at = executeFunctions.getNodeParameter('publishingAt', itemIndex) as string;
  const organizational_units = executeFunctions.getNodeParameter('organizationalUnits', itemIndex) as string;
  
  // Convert comma-separated organizational_units to array if it's a string
  let organizationalUnitsArray: string[];
  if (typeof organizational_units === 'string') {
    organizationalUnitsArray = organizational_units.split(',').map(unit => unit.trim());
  } else {
    organizationalUnitsArray = Array.isArray(organizational_units) ? organizational_units : [organizational_units];
  }
  
  const announcementData = {
    data: {
      type: 'notification/announcements',
      attributes: {
        content_md,
        title,
        starts_at: publishing_at,
        ends_at: publishing_at,
        organizational_units: organizationalUnitsArray,
      }
    }
  };

  try {
    return await pulseApi.createAnnouncement(announcementData);
  } catch (error) {
    throw new Error('Error creating announcement: ' + (error as Error).message);
  }
}

export async function updateAnnouncement(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: OfficeApi,
): Promise<any> {
  const announcementId = executeFunctions.getNodeParameter('announcementId', itemIndex) as string;
  
  // Build data object only with provided fields
  const attributes: Record<string, any> = {};
  
  // Get fields to update
  const fieldsToUpdate = executeFunctions.getNodeParameter('fieldsToUpdate', itemIndex, {}) as {
    title?: string;
    contentMd?: string;
    publishingAt?: string;
    organizationalUnits?: string;
  };
  
  // Handle fields to update
  if (fieldsToUpdate.title) {
    attributes.title = fieldsToUpdate.title;
  }
  
  if (fieldsToUpdate.contentMd) {
    attributes.content_md = fieldsToUpdate.contentMd;
  }
  
  if (fieldsToUpdate.publishingAt) {
    attributes.starts_at = fieldsToUpdate.publishingAt;
    attributes.ends_at = fieldsToUpdate.publishingAt; 
  }
  
  if (fieldsToUpdate.organizationalUnits) {
    // Convert comma-separated organizational_units to array
    const organizationalUnitsArray = fieldsToUpdate.organizationalUnits.split(',').map(unit => unit.trim());
    attributes.organizational_units = organizationalUnitsArray;
  }
  
  // Only proceed if there are attributes to update
  if (Object.keys(attributes).length === 0) {
    throw new Error('At least one field must be provided for update');
  }

  console.log("attributes :0", attributes);
  
  
  const announcementData = {
    data: {
      type: 'notification/announcements',
      attributes
    }
  };

  try {
    return await pulseApi.updateAnnouncement(announcementId, announcementData);
  } catch (error) {
    throw new Error('Error updating announcement: ' + (error as Error).message);
  }
}

export async function deleteAnnouncement(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: OfficeApi,
): Promise<any> {
  const announcementId = executeFunctions.getNodeParameter('announcementId', itemIndex) as string;

  try {
    return await pulseApi.deleteAnnouncement(announcementId);
  } catch (error) {
    throw new Error('Error deleting announcement: ' + (error as Error).message);
  }
}
