// Import this before mocking because it'll be used in the import statements
import { NodeConnectionType } from 'n8n-workflow';

// Setup mock for PulseApiFactory
jest.mock('../../../utils/api/PulseApiFactory');

// Import the module after mocking
import { PulseApiFactory } from '../../../utils/api/PulseApiFactory';
import { AccountAction } from '../../../nodes/AccountAction/AccountAction.node';

// Define our mock API in the test scope
const mockApi = {
  getCurrentAccount: jest.fn(),
  getAccount: jest.fn(),
  createAccount: jest.fn(),
  updateAccount: jest.fn(),
  createAccountRole: jest.fn(),
  updateAccountRole: jest.fn(),
  getAccountRoleById: jest.fn(),
  deleteAccountRole: jest.fn(),
};

describe('AccountActionNode', () => {
  let accountActionNode: AccountAction;
  let mockExecuteFunctions: any;
  let mockPulseApi: any;

  beforeEach(() => {
    // Create a new instance of the node
    accountActionNode = new AccountAction();

    // Create mock for the execute functions
    mockExecuteFunctions = {
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-key',
        apiUrl: 'http://pulse.localhost:3000',
      }),
      prepareOutputData: jest.fn(data => data),
      continueOnFail: jest.fn().mockReturnValue(false),
    };

    // Assign the mock implementation before each test
    (PulseApiFactory.getPulseApiHelper as jest.Mock).mockResolvedValue(mockApi);
    
    // Save a reference to the mock API
    mockPulseApi = mockApi;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('description', () => {
    it('should have the correct properties', () => {
      expect(accountActionNode.description).toHaveProperty('displayName', 'Pulse Account Read');
      expect(accountActionNode.description).toHaveProperty('name', 'accountAction');
      expect(accountActionNode.description).toHaveProperty('group', ['input']);
      expect(accountActionNode.description).toHaveProperty('version', 1);
      expect(accountActionNode.description).toHaveProperty('inputs', [NodeConnectionType.Main]);
      expect(accountActionNode.description).toHaveProperty('outputs', [NodeConnectionType.Main]);
      expect(accountActionNode.description.credentials).toEqual([
        {
          name: 'pulseApi',
          required: true,
        },
      ]);
    });

    it('should have the correct resources', () => {
      const resources = accountActionNode.description.properties.find(
        (prop: any) => prop.name === 'resource'
      );
      expect(resources).toBeDefined();
      if (resources) {
        expect(resources.options).toHaveLength(2);
        const options = resources.options as any[];
        expect(options[0].value).toBe('account');
        expect(options[1].value).toBe('accountRole');
      }
    });

    it('should have the correct operations for account resource', () => {
      const operations = accountActionNode.description.properties.find(
        (prop: any) => prop.name === 'operation' && 
        prop.displayOptions && 
        prop.displayOptions.show && 
        prop.displayOptions.show.resource && 
        prop.displayOptions.show.resource.includes('account')
      );
      expect(operations).toBeDefined();
      if (operations) {
        expect(operations.options).toHaveLength(5);
        const options = operations.options as any[];
        expect(options[0].value).toBe('getCurrentUser');
        expect(options[1].value).toBe('getUserById');
        expect(options[2].value).toBe('createAccount');
        expect(options[3].value).toBe('updateAccountStatus');
        expect(options[4].value).toBe('updateAccount');
      }
    });

    it('should have the correct operations for accountRole resource', () => {
      const operations = accountActionNode.description.properties.find(
        (prop: any) => prop.name === 'operation' && 
        prop.displayOptions && 
        prop.displayOptions.show && 
        prop.displayOptions.show.resource && 
        prop.displayOptions.show.resource.includes('accountRole')
      );
      expect(operations).toBeDefined();
      if (operations) {
        expect(operations.options).toHaveLength(4);
        const options = operations.options as any[];
        expect(options[0].value).toBe('addAccountRole');
        expect(options[1].value).toBe('updateAccountRole');
        expect(options[2].value).toBe('getAccountRoleById');
        expect(options[3].value).toBe('deleteAccountRole');
      }
    });
  });

  describe('execute', () => {
    it('should get current user account when resource is account and operation is getCurrentUser', async () => {
      const mockUserData = { id: '123', name: 'Test User' };
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('account') // For resource
        .mockReturnValueOnce('getCurrentUser') // For operation
        .mockReturnValueOnce([]); // For included
      mockPulseApi.getCurrentAccount.mockResolvedValue(mockUserData);

      const result = await accountActionNode.execute.call(mockExecuteFunctions);

      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('resource', 0);
      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('operation', 0);
      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('included', 0, []);
      expect(PulseApiFactory.getPulseApiHelper).toHaveBeenCalled();
      expect(mockPulseApi.getCurrentAccount).toHaveBeenCalledWith([]);
      expect(result[0][0]).toEqual({ json: mockUserData });
    });

    it('should get user account by ID when resource is account and operation is getUserById', async () => {
      const accountId = '456';
      const mockUserData = { id: accountId, name: 'Another User' };
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('account') // For resource
        .mockReturnValueOnce('getUserById') // For operation
        .mockReturnValueOnce([]) // For included
        .mockReturnValueOnce(accountId); // For accountId
      mockPulseApi.getAccount.mockResolvedValue(mockUserData);

      const result = await accountActionNode.execute.call(mockExecuteFunctions);

      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('resource', 0);
      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('operation', 0);
      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('included', 0, []);
      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('accountId', 0);
      expect(PulseApiFactory.getPulseApiHelper).toHaveBeenCalled();
      expect(mockPulseApi.getAccount).toHaveBeenCalled();
      expect(result[0][0]).toEqual({ json: mockUserData });
    });

    it('should create account when resource is account and operation is createAccount', async () => {
      const mockAccountData = { id: '789', email: 'test@example.com' };
      const email = 'test@example.com';
      const accountType = 'personal_account';
      const personId = '123';
      
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('account') // For resource
        .mockReturnValueOnce('createAccount') // For operation
        .mockReturnValueOnce(email) // For email
        .mockReturnValueOnce(accountType) // For accountType
        .mockReturnValueOnce(personId) // For personId
        .mockReturnValueOnce(''); // For expiresAt
        
      mockPulseApi.createAccount.mockResolvedValue(mockAccountData);

      const result = await accountActionNode.execute.call(mockExecuteFunctions);

      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('resource', 0);
      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('operation', 0);
      expect(mockPulseApi.createAccount).toHaveBeenCalled();
      expect(result[0]).toEqual([{ json: mockAccountData }]);
    });

    it('should update account status when resource is account and operation is updateAccountStatus', async () => {
      const accountId = '456';
      const enabled = true;
      const mockAccountData = { id: accountId, enabled };
      
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('account') // For resource
        .mockReturnValueOnce('updateAccountStatus') // For operation
        .mockReturnValueOnce(accountId) // For accountId
        .mockReturnValueOnce(enabled); // For enabled
        
      mockPulseApi.updateAccount.mockResolvedValue(mockAccountData);

      const result = await accountActionNode.execute.call(mockExecuteFunctions);

      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('resource', 0);
      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('operation', 0);
      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('accountId', 0);
      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('enabled', 0);
      expect(mockPulseApi.updateAccount).toHaveBeenCalledWith(accountId, expect.any(Object));
      expect(result[0]).toEqual([{ json: mockAccountData }]);
    });

    it('should update account when resource is account and operation is updateAccount', async () => {
      const accountId = '456';
      const email = 'updated@example.com';
      const accountType = 'service_account';
      const mockAccountData = { id: accountId, email, account_type: accountType };
      
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('account') // For resource
        .mockReturnValueOnce('updateAccount') // For operation
        .mockReturnValueOnce(accountId) // For accountId
        .mockReturnValueOnce(email) // For email
        .mockReturnValueOnce(accountType) // For accountType
        .mockReturnValueOnce(''); // For expiresAt
        
      mockPulseApi.updateAccount.mockResolvedValue(mockAccountData);

      const result = await accountActionNode.execute.call(mockExecuteFunctions);

      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('resource', 0);
      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('operation', 0);
      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('accountId', 0);
      expect(mockPulseApi.updateAccount).toHaveBeenCalledWith(accountId, expect.any(Object));
      expect(result[0]).toEqual([{ json: mockAccountData }]);
    });

    it('should add account role when resource is accountRole and operation is addAccountRole', async () => {
      const account_id = '123';
      const role_name = 'admin';
      const mockRoleData = { id: '789', account_id, role_name };
      
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('accountRole') // For resource
        .mockReturnValueOnce('addAccountRole') // For operation
        .mockReturnValueOnce(account_id) // For account_id
        .mockReturnValueOnce(role_name); // For role_name
        
      mockPulseApi.createAccountRole.mockResolvedValue(mockRoleData);

      const result = await accountActionNode.execute.call(mockExecuteFunctions);

      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('resource', 0);
      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('operation', 0);
      expect(mockPulseApi.createAccountRole).toHaveBeenCalled();
      expect(result[0]).toEqual([{ json: mockRoleData }]);
    });

    it('should get account role by ID when resource is accountRole and operation is getAccountRoleById', async () => {
      const account_role_id = '789';
      const included: string[] = [];
      const mockRoleData = { id: account_role_id, role_name: 'admin' };
      
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('accountRole') // For resource
        .mockReturnValueOnce('getAccountRoleById') // For operation
        .mockReturnValueOnce(account_role_id) // For account_role_id
        .mockReturnValueOnce(included); // For included
        
      mockPulseApi.getAccountRoleById.mockResolvedValue(mockRoleData);

      const result = await accountActionNode.execute.call(mockExecuteFunctions);

      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('resource', 0);
      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('operation', 0);
      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('account_role_id', 0);
      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('included', 0, []);
      expect(mockPulseApi.getAccountRoleById).toHaveBeenCalledWith(account_role_id, included);
      expect(result[0]).toEqual([{ json: mockRoleData }]);
    });

    it('should update account role when resource is accountRole and operation is updateAccountRole', async () => {
      const account_role_id = '789';
      const role_name = 'staff';
      const mockRoleData = { id: account_role_id, role_name };
      const scopesJson = '{"project": ["project-123"]}';
      
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('accountRole') // For resource
        .mockReturnValueOnce('updateAccountRole') // For operation
        .mockReturnValueOnce(account_role_id) // For account_role_id
        .mockReturnValueOnce(role_name) // For role_name
        .mockReturnValueOnce({ scopes: scopesJson }); // For additionalFields with valid scopes
        
      mockPulseApi.updateAccountRole.mockResolvedValue(mockRoleData);

      const result = await accountActionNode.execute.call(mockExecuteFunctions);

      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('resource', 0);
      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('operation', 0);
      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('account_role_id', 0);
      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('role_name', 0);
      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('additionalFields', 0, {});
      expect(mockPulseApi.updateAccountRole).toHaveBeenCalled();
      expect(result[0]).toEqual([{ json: mockRoleData }]);
    });

    it('should delete account role when resource is accountRole and operation is deleteAccountRole', async () => {
      const account_role_id = '789';
      const mockResponse = { success: true };
      
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('accountRole') // For resource
        .mockReturnValueOnce('deleteAccountRole') // For operation
        .mockReturnValueOnce(account_role_id); // For account_role_id
        
      mockPulseApi.deleteAccountRole.mockResolvedValue(mockResponse);

      const result = await accountActionNode.execute.call(mockExecuteFunctions);

      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('resource', 0);
      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('operation', 0);
      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('account_role_id', 0);
      expect(mockPulseApi.deleteAccountRole).toHaveBeenCalledWith(account_role_id);
      expect(result[0]).toEqual([{ json: mockResponse }]);
    });

    it('should throw an error for unsupported operations', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('account') // For resource
        .mockReturnValueOnce('unsupportedOperation'); // For operation

      await expect(accountActionNode.execute.call(mockExecuteFunctions)).rejects.toThrow(
        'The operation "unsupportedOperation" is not supported for resource "account"!'
      );
    });

    it('should handle errors and continue if continueOnFail is true', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('account') // For resource
        .mockReturnValueOnce('getCurrentUser') // For operation
        .mockReturnValueOnce([]); // For included
      
      const errorMessage = 'API Error';
      mockPulseApi.getCurrentAccount.mockRejectedValue(new Error(errorMessage));
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);

      const result = await accountActionNode.execute.call(mockExecuteFunctions);

      expect(mockExecuteFunctions.continueOnFail).toHaveBeenCalled();
      
      expect(result[0]).toEqual([{ json: { error: errorMessage } }]);
    });

    it('should throw errors if continueOnFail is false', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('account') // For resource
        .mockReturnValueOnce('getCurrentUser') // For operation
        .mockReturnValueOnce([]); // For included
      
      const errorMessage = 'API Error';
      const error = new Error(errorMessage);
      mockPulseApi.getCurrentAccount.mockRejectedValue(error);
      mockExecuteFunctions.continueOnFail.mockReturnValue(false);

      await expect(accountActionNode.execute.call(mockExecuteFunctions)).rejects.toThrowError();
    });

    it('should throw an error for unsupported resources', async () => {
      mockExecuteFunctions.getNodeParameter.mockReturnValue('unsupportedResource');

      await expect(accountActionNode.execute.call(mockExecuteFunctions)).rejects.toThrow(
        'The resource "unsupportedResource" is not supported!'
      );
    });
  });
});
