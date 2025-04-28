import { IExecuteFunctions } from 'n8n-workflow';
import { OfficeApi } from '../../../utils/api/OfficeApi';
import { PulseApiFactory } from '../../../utils/api/PulseApiFactory';

export async function getEmployeeList(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: OfficeApi,
): Promise<any> {
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  const additionalFields = executeFunctions.getNodeParameter('additionalFields', 0, {}) as {
    sort?: string;
    pageNumber?: number;
    pageSize?: number;
    filters?: { filter: Array<{ key: string; values: string }> };
    fields?: { field: Array<{ key: string; fields: string }> };
  };
  return pulseApi.getEmployeeList(additionalFields, included);
}

export async function createEmployee(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: OfficeApi,
): Promise<any> {
  // Implement the createEmployee function here
  // This function should handle the creation of a new employee
  // using the OfficeApi class.
  // You can use the executeFunctions parameter to get input data
  // and call the appropriate method from the OfficeApi class.
  const withPerson = executeFunctions.getNodeParameter('withPerson', itemIndex) as boolean;
  const organizational_unit = executeFunctions.getNodeParameter('organizationalUnit', itemIndex) as string;
  let personId;
  let first_name;
  let last_name;
  let middle_name;
  let person;
  const PeopleApi = await PulseApiFactory.getPulseApiHelper(executeFunctions, 'people') as any;
  const AccountApi = await PulseApiFactory.getPulseApiHelper(executeFunctions, 'account') as any;

  if (withPerson) {
    first_name = executeFunctions.getNodeParameter('firstName', itemIndex) as string;
    last_name = executeFunctions.getNodeParameter('lastName', itemIndex) as string;
    middle_name = executeFunctions.getNodeParameter('middleName', itemIndex) as string;
    const gender = executeFunctions.getNodeParameter('gender', itemIndex) as string;
    const birthday = executeFunctions.getNodeParameter('birthday', itemIndex) as string;
    const relationship_status = executeFunctions.getNodeParameter('relationshipStatus', itemIndex) as string;
    const number_of_kids = executeFunctions.getNodeParameter('numberOfKids', itemIndex) as number;
    const secondary_email = executeFunctions.getNodeParameter('secondaryEmail', itemIndex) as string;
    const contact_number = executeFunctions.getNodeParameter('contactNumber', itemIndex) as string;
    const physical_address = executeFunctions.getNodeParameter('address', itemIndex) as string;
  
    const personData = {
      data: {
        type: 'iam/people',
        attributes: {
          first_name,
          last_name,
          middle_name,
          gender,
          birthday,
          relationship_status,
          number_of_kids,
          secondary_email,
          contact_number,
          physical_address,
          organizational_unit,
        }
      }
    };

    try {
      person = await PeopleApi.createPerson(personData);
      personId = person.data.id;
    } catch (error) {
      throw new Error('Error creating person: ' + (error as Error).message);
    }

  } else {
    personId = executeFunctions.getNodeParameter('personId', itemIndex) as string;
    person = await PeopleApi.getPersonById(personId);
    if (!person) {
      throw new Error(`Person with ID ${personId} not found`);
    }
    first_name = person.data.attributes.first_name;
    last_name = person.data.attributes.last_name;
    middle_name = person.data.attributes.middle_name;
  }

  const planning_id = executeFunctions.getNodeParameter('planningId', itemIndex) as string;
  const manager_ids = executeFunctions.getNodeParameter('managerIds', itemIndex) as string;
  const teams = executeFunctions.getNodeParameter('teamsNames', itemIndex) as string;

  const position = executeFunctions.getNodeParameter('positionName', itemIndex) as string;
  const employment_type = executeFunctions.getNodeParameter('employmentType', itemIndex) as string;
  const service_number = executeFunctions.getNodeParameter('serviceNumber', itemIndex) as string;

  const hired_at = executeFunctions.getNodeParameter('hiredAt', itemIndex) as string;
  const is_manager = executeFunctions.getNodeParameter('isManager', itemIndex) as boolean;
  const is_hr = executeFunctions.getNodeParameter('isHR', itemIndex) as boolean;

  const terminated = executeFunctions.getNodeParameter('terminated', itemIndex) as boolean;

  let terminated_at = undefined;
  let terminated_temporary = undefined;
  if (terminated) {
    terminated_at = executeFunctions.getNodeParameter('terminatedAt', itemIndex) as string;
    terminated_temporary = executeFunctions.getNodeParameter('onHold', itemIndex) as boolean;
  }

  const emergency_name = executeFunctions.getNodeParameter('emergencyContactName', itemIndex) as string;
  const emergency_phone = executeFunctions.getNodeParameter('emergencyContactPhone', itemIndex) as string;
  const emergency_relationship = executeFunctions.getNodeParameter('emergencyContactRelationship', itemIndex) as string;
  
  const manager_ids_array = manager_ids.split(',').map((id: string) => parseInt(id.trim(), 10));
  const teams_array = teams.split(',').map((team: string) => team.trim());
  
  const createAccount = executeFunctions.getNodeParameter('createAccount', itemIndex) as boolean;

  if (createAccount) {
    const accountEmail = executeFunctions.getNodeParameter('accountEmail', itemIndex) as string;
    const accountType = executeFunctions.getNodeParameter('accountType', itemIndex) as string;
    const expiredAt = executeFunctions.getNodeParameter('expiredAt', itemIndex) as string;

    const accountData = {
      data: {
        type: 'iam/accounts',
        attributes: {
          email: accountEmail,
          account_type: accountType,
          enabled: true,
          expires_at: expiredAt ? new Date(expiredAt).toISOString() : undefined,
        },
        relationships: {
          person: {
            data: {
              type: 'iam/people',
              id: personId
            }
          }
        }
      }
    };

    try {
      await AccountApi.createAccount(accountData);
    } catch (error) {
      throw new Error('Error creating account: ' + (error as Error).message);
    }
  }

  const employeeData = {
    data: {
      type: 'office/employees',
      attributes: {
        id: personId,
        first_name,
        last_name,
        middle_name,
        manager_ids: manager_ids_array,
        teams: teams_array,
        organizational_unit,
        position,
        employment_type,
        service_number,
        terminated_at,
        terminated_temporary,
        hired_at,
        is_manager,
        is_hr,
        emergency_name,
        emergency_phone,
        emergency_relationship
      },
      relationships: {
        planning: {
          data: {
            id: planning_id,
            type: 'office/plannings'
          }
        }
      }
    }
  };

  try {
    return await pulseApi.createEmployee(employeeData);
  } catch (error) {
    throw new Error('Error creating employee: ' + (error as Error).message);
  }
}

export async function updateEmployee(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: OfficeApi,
): Promise<any> {
  // Get the employee ID to update
  const employeeId = executeFunctions.getNodeParameter('employeeId', itemIndex) as string;
  
  // Get all the parameters from the node properties
  const organizational_unit = executeFunctions.getNodeParameter('organizationalUnit', itemIndex) as string;
  const planning_id = executeFunctions.getNodeParameter('planningId', itemIndex) as string;
  const manager_ids = executeFunctions.getNodeParameter('managerIds', itemIndex) as string;
  const teams = executeFunctions.getNodeParameter('teamsNames', itemIndex) as string;

  const position = executeFunctions.getNodeParameter('positionName', itemIndex) as string;
  const employment_type = executeFunctions.getNodeParameter('employmentType', itemIndex) as string;
  const service_number = executeFunctions.getNodeParameter('serviceNumber', itemIndex) as string;

  const hired_at = executeFunctions.getNodeParameter('hiredAt', itemIndex) as string;
  const is_manager = executeFunctions.getNodeParameter('isManager', itemIndex) as boolean;
  const is_hr = executeFunctions.getNodeParameter('isHR', itemIndex) as boolean;

  const terminated = executeFunctions.getNodeParameter('terminated', itemIndex) as boolean;

  let terminated_at = undefined;
  let terminated_temporary = undefined;
  if (terminated) {
    terminated_at = executeFunctions.getNodeParameter('terminatedAt', itemIndex) as string;
    terminated_temporary = executeFunctions.getNodeParameter('onHold', itemIndex) as boolean;
  }

  const emergency_name = executeFunctions.getNodeParameter('emergencyContactName', itemIndex) as string;
  const emergency_phone = executeFunctions.getNodeParameter('emergencyContactPhone', itemIndex) as string;
  const emergency_relationship = executeFunctions.getNodeParameter('emergencyContactRelationship', itemIndex) as string;
  
  const manager_ids_array = manager_ids.split(',').map((id: string) => parseInt(id.trim(), 10));
  const teams_array = teams.split(',').map((team: string) => team.trim());

  // Create the employee data object
  const employeeData = {
    data: {
      type: 'office/employees',
      attributes: {
        organizational_unit,
        manager_ids: manager_ids_array,
        teams: teams_array,
        position,
        employment_type,
        service_number,
        terminated_at,
        terminated_temporary,
        hired_at,
        is_manager,
        is_hr,
        emergency_name,
        emergency_phone,
        emergency_relationship
      },
      relationships: {
        planning: {
          data: {
            id: planning_id,
            type: 'office/plannings'
          }
        }
      }
    }
  };

  // Call the updateEmployee method on the pulseApi with error handling
  try {
    return await pulseApi.updateEmployee(employeeId, employeeData);
  } catch (error) {
    throw new Error('Error updating employee: ' + (error as Error).message);
  }
}
