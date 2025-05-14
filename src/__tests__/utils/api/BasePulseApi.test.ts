import { BasePulseApi } from '../../../utils/api/BasePulseApi';
import { ICredentialDataDecryptedObject } from 'n8n-workflow';

// Mock fetch globally
global.fetch = jest.fn() as jest.Mock;

// Create a testable subclass of BasePulseApi since BasePulseApi is not meant to be instantiated directly
class TestableBasePulseApi extends BasePulseApi {
  constructor(credentials: ICredentialDataDecryptedObject) {
    super(credentials);
  }
  
  // Expose protected methods for testing
  public exposedBuildQueryParams(additionalFields: any, included?: string[]) {
    return this.buildQueryParams(additionalFields, included);
  }
}

describe('BasePulseApi', () => {
  let pulseApi: TestableBasePulseApi;
  const mockCredentials: ICredentialDataDecryptedObject = {
    apiKey: 'test-key',
    apiUrl: 'https://pulse.ingedata.ai',
  };

  beforeEach(() => {
    pulseApi = new TestableBasePulseApi(mockCredentials);
    jest.clearAllMocks();
  });

  describe('authenticate', () => {
    it('should authenticate successfully and return a token', async () => {
      const mockResponse = {
        meta: {
          token: 'test-token',
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const token = await pulseApi.authenticate();

      expect(global.fetch).toHaveBeenCalledWith(
        'https://pulse.ingedata.ai/api/v3/iam/auth/api/login',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            key: 'test-key',
            secret: 'test-secret',
          }),
        })
      );
      expect(token).toBe('test-token');
    });

    it('should throw an error when authentication fails', async () => {
      const mockErrorResponse = {
        message: 'Invalid credentials',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Unauthorized',
        json: jest.fn().mockResolvedValueOnce(mockErrorResponse),
      });

      await expect(pulseApi.authenticate()).rejects.toThrow(
        'Authentication failed: Invalid credentials'
      );
    });
  });

  describe('getToken', () => {
    it('should call authenticate if no token exists', async () => {
      const mockResponse = {
        meta: {
          token: 'test-token',
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const token = await pulseApi.getToken();

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(token).toBe('test-token');
    });

    it('should return existing token if it exists', async () => {
      // First authenticate to set the token
      const mockResponse = {
        meta: {
          token: 'test-token',
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      await pulseApi.authenticate();

      // Clear mocks to verify getToken doesn't call fetch again
      jest.clearAllMocks();

      const token = await pulseApi.getToken();

      expect(global.fetch).not.toHaveBeenCalled();
      expect(token).toBe('test-token');
    });
  });

  describe('request', () => {
    it('should make an authenticated GET request', async () => {
      // Mock the token
      const mockAuthResponse = {
        meta: {
          token: 'test-token',
        },
      };

      const mockDataResponse = {
        id: '123',
        name: 'Test User',
      };

      // Mock the authentication call
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockAuthResponse),
      });

      // Mock the data request
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockDataResponse),
      });

      const result = await pulseApi.request('GET', '/test-endpoint');

      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch).toHaveBeenLastCalledWith(
        'https://pulse.ingedata.ai/test-endpoint',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token',
          }),
        })
      );
      expect(result).toEqual(mockDataResponse);
    });

    it('should make a POST request with data', async () => {
      // Mock the token
      const mockAuthResponse = {
        meta: {
          token: 'test-token',
        },
      };

      const mockDataResponse = {
        id: '123',
        success: true,
      };

      const postData = {
        name: 'Test Data',
        value: 42
      };

      // Mock the authentication call
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockAuthResponse),
      });

      // Mock the data request
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockDataResponse),
      });

      const result = await pulseApi.request('POST', '/test-endpoint', postData);

      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch).toHaveBeenLastCalledWith(
        'https://pulse.ingedata.ai/test-endpoint',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(postData),
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-token',
          }),
        })
      );
      expect(result).toEqual(mockDataResponse);
    });

    it('should return true for successful DELETE requests', async () => {
      // Mock the token
      const mockAuthResponse = {
        meta: {
          token: 'test-token',
        },
      };

      // Mock the authentication call
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockAuthResponse),
      });

      // Mock the delete request (no response body expected)
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({}),
      });

      const result = await pulseApi.request('DELETE', '/test-endpoint/123');

      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch).toHaveBeenLastCalledWith(
        'https://pulse.ingedata.ai/test-endpoint/123',
        expect.objectContaining({
          method: 'DELETE',
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token',
          }),
        })
      );
      expect(result).toBe(true);
    });

    it('should add query parameters to the URL', async () => {
      // Mock the token
      const mockAuthResponse = {
        meta: {
          token: 'test-token',
        },
      };

      const mockDataResponse = {
        id: '123',
        name: 'Test User',
      };

      const queryParams = {
        sort: 'name',
        'page[number]': '1',
        'page[size]': '10',
        included: ['person', 'roles'],
      };

      // Mock the authentication call
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockAuthResponse),
      });

      // Mock the data request
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockDataResponse),
      });

      const result = await pulseApi.request('GET', '/test-endpoint', undefined, queryParams);

      expect(global.fetch).toHaveBeenCalledTimes(2);
      // Check that correct URL was called - checking for encoded versions of the parameters
      const lastCallUrl = (global.fetch as jest.Mock).mock.calls[1][0];
      expect(lastCallUrl).toContain('https://pulse.ingedata.ai/test-endpoint?');
      expect(lastCallUrl).toContain('sort=name');
      
      // These need to account for URL encoding of brackets
      expect(lastCallUrl).toMatch(/page(\[|%5B)number(\]|%5D)=1/);
      expect(lastCallUrl).toMatch(/page(\[|%5B)size(\]|%5D)=10/);
      expect(lastCallUrl).toMatch(/included(\[|%5B)(\]|%5D)=person/);
      expect(lastCallUrl).toMatch(/included(\[|%5B)(\]|%5D)=roles/);
      expect(result).toEqual(mockDataResponse);
    });

    it('should throw an error when the request fails', async () => {
      // Mock the token
      const mockAuthResponse = {
        meta: {
          token: 'test-token',
        },
      };

      const mockErrorResponse = {
        message: 'Resource not found',
      };

      // Mock the authentication call
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockAuthResponse),
      });

      // Mock the failed request
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
        json: jest.fn().mockResolvedValueOnce(mockErrorResponse),
      });

      await expect(pulseApi.request('GET', '/test-endpoint')).rejects.toThrow(
        'API request failed: Resource not found'
      );
    });
  });

  describe('buildQueryParams', () => {
    it('should build query params with included fields', () => {
      const included = ['person', 'roles'];
      const queryParams = pulseApi.exposedBuildQueryParams({}, included);
      
      expect(queryParams).toEqual({
        included: ['person', 'roles']
      });
    });

    it('should build query params with sort field', () => {
      const additionalFields = {
        sort: 'name'
      };
      
      const queryParams = pulseApi.exposedBuildQueryParams(additionalFields);
      
      expect(queryParams).toEqual({
        sort: 'name'
      });
    });

    it('should build query params with pagination', () => {
      const additionalFields = {
        pageNumber: 2,
        pageSize: 25
      };
      
      const queryParams = pulseApi.exposedBuildQueryParams(additionalFields);
      
      expect(queryParams).toEqual({
        'page[number]': '2',
        'page[size]': '25'
      });
    });

    it('should build query params with filters', () => {
      const additionalFields = {
        filters: {
          filter: [
            { key: 'status', values: 'active' },
            { key: 'role', values: 'admin,user' }
          ]
        }
      };
      
      const queryParams = pulseApi.exposedBuildQueryParams(additionalFields);
      
      expect(queryParams).toEqual({
        'filter[status]': ['active'],
        'filter[role]': ['admin', 'user']
      });
    });

    it('should build query params with fields', () => {
      const additionalFields = {
        fields: {
          field: [
            { key: 'accounts', fields: 'id,email' },
            { key: 'people', fields: 'id,name,role' }
          ]
        }
      };
      
      const queryParams = pulseApi.exposedBuildQueryParams(additionalFields);
      
      expect(queryParams).toEqual({
        'fields[accounts]': ['id', 'email'],
        'fields[people]': ['id', 'name', 'role']
      });
    });

    it('should build complex query params with all options', () => {
      const included = ['person', 'roles'];
      const additionalFields = {
        sort: '-created_at',
        pageNumber: 3,
        pageSize: 15,
        filters: {
          filter: [
            { key: 'status', values: 'active,pending' },
          ]
        },
        fields: {
          field: [
            { key: 'accounts', fields: 'id,email' },
          ]
        }
      };
      
      const queryParams = pulseApi.exposedBuildQueryParams(additionalFields, included);
      
      expect(queryParams).toEqual({
        included: ['person', 'roles'],
        sort: '-created_at',
        'page[number]': '3',
        'page[size]': '15',
        'filter[status]': ['active', 'pending'],
        'fields[accounts]': ['id', 'email']
      });
    });
  });
});
