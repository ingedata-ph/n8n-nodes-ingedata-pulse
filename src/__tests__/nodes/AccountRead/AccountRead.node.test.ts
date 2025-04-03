import { AccountRead } from '../../../nodes/AccountRead/AccountRead.node';
import { getPulseApiHelper } from '../../../utils/PulseApiHelper';
import { NodeConnectionType } from 'n8n-workflow';

// Mock the PulseApiHelper
jest.mock('../../utils/PulseApiHelper');

describe('AccountReadNode', () => {
  let accountReadNode: AccountRead;
  let mockExecuteFunctions: any;
  let mockPulseApi: any;

  beforeEach(() => {
    // Create a new instance of the node
    accountReadNode = new AccountRead();

    // Create mock for the execute functions
    mockExecuteFunctions = {
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-key',
        apiSecret: 'test-secret',
        apiUrl: 'https://pulse.ingedata.ai',
      }),
      prepareOutputData: jest.fn(data => data),
      continueOnFail: jest.fn().mockReturnValue(false),
    };

    // Create mock for the PulseApiHelper
    mockPulseApi = {
      getCurrentAccount: jest.fn(),
      getAccount: jest.fn(),
    };

    // Mock the getPulseApiHelper function
    (getPulseApiHelper as jest.Mock).mockImplementation(function(this: any) {
      return Promise.resolve(mockPulseApi);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('description', () => {
    it('should have the correct properties', () => {
      expect(accountReadNode.description).toHaveProperty('displayName', 'Pulse Account Read');
      expect(accountReadNode.description).toHaveProperty('name', 'accountRead');
      expect(accountReadNode.description).toHaveProperty('group', ['input']);
      expect(accountReadNode.description).toHaveProperty('version', 1);
      expect(accountReadNode.description).toHaveProperty('inputs', [NodeConnectionType.Main]);
      expect(accountReadNode.description).toHaveProperty('outputs', [NodeConnectionType.Main]);
      expect(accountReadNode.description.credentials).toEqual([
        {
          name: 'pulseApi',
          required: true,
        },
      ]);
    });

    it('should have the correct operations', () => {
      const operations = accountReadNode.description.properties.find(
        (prop: any) => prop.name === 'operation'
      );
      expect(operations).toBeDefined();
      if (operations) {
        expect(operations.options).toHaveLength(2);
        const options = operations.options as any[];
        expect(options[0].value).toBe('getCurrentUser');
        expect(options[1].value).toBe('getUserById');
      }
    });
  });

  describe('execute', () => {
    it('should get current user account when operation is getCurrentUser', async () => {
      const mockUserData = { id: '123', name: 'Test User' };
      mockExecuteFunctions.getNodeParameter.mockReturnValue('getCurrentUser');
      mockPulseApi.getCurrentAccount.mockResolvedValue(mockUserData);

      const result = await accountReadNode.execute.call(mockExecuteFunctions);

      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('operation', 0);
      expect(getPulseApiHelper).toHaveBeenCalled();
      expect(mockPulseApi.getCurrentAccount).toHaveBeenCalled();
      expect(mockExecuteFunctions.prepareOutputData).toHaveBeenCalledWith([
        { json: mockUserData },
      ]);
      expect(result).toEqual([{ json: mockUserData }]);
    });

    it('should get user account by ID when operation is getUserById', async () => {
      const userId = '456';
      const mockUserData = { id: userId, name: 'Another User' };
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getUserById')
        .mockReturnValueOnce(userId);
      mockPulseApi.getAccount.mockResolvedValue(mockUserData);

      const result = await accountReadNode.execute.call(mockExecuteFunctions);

      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('operation', 0);
      expect(mockExecuteFunctions.getNodeParameter).toHaveBeenCalledWith('userId', 0);
      expect(getPulseApiHelper).toHaveBeenCalled();
      expect(mockPulseApi.getAccount).toHaveBeenCalledWith(userId);
      expect(mockExecuteFunctions.prepareOutputData).toHaveBeenCalledWith([
        { json: mockUserData },
      ]);
      expect(result).toEqual([{ json: mockUserData }]);
    });

    it('should throw an error for unsupported operations', async () => {
      mockExecuteFunctions.getNodeParameter.mockReturnValue('unsupportedOperation');

      await expect(accountReadNode.execute.call(mockExecuteFunctions)).rejects.toThrow(
        'The operation "unsupportedOperation" is not supported!'
      );
    });

    it('should handle errors and continue if continueOnFail is true', async () => {
      mockExecuteFunctions.getNodeParameter.mockReturnValue('getCurrentUser');
      mockPulseApi.getCurrentAccount.mockRejectedValue(new Error('API Error'));
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);

      const result = await accountReadNode.execute.call(mockExecuteFunctions);

      expect(mockExecuteFunctions.continueOnFail).toHaveBeenCalled();
      expect(mockExecuteFunctions.prepareOutputData).toHaveBeenCalledWith([
        { json: { error: 'API Error' } },
      ]);
      expect(result).toEqual([{ json: { error: 'API Error' } }]);
    });

    it('should throw errors if continueOnFail is false', async () => {
      mockExecuteFunctions.getNodeParameter.mockReturnValue('getCurrentUser');
      const error = new Error('API Error');
      mockPulseApi.getCurrentAccount.mockRejectedValue(error);
      mockExecuteFunctions.continueOnFail.mockReturnValue(false);

      await expect(accountReadNode.execute.call(mockExecuteFunctions)).rejects.toThrow('API Error');
    });
  });
});
