import { PulseApiHelper } from '../../utils/PulseApiHelper';
import { ICredentialDataDecryptedObject } from 'n8n-workflow';

// Mock fetch globally
global.fetch = jest.fn() as jest.Mock;

describe('PulseApiHelper', () => {
  let pulseApi: PulseApiHelper;
  const mockCredentials: ICredentialDataDecryptedObject = {
    apiKey: 'test-key',
    apiSecret: 'test-secret',
    apiUrl: 'https://pulse.ingedata.ai',
  };

  beforeEach(() => {
    pulseApi = new PulseApiHelper(mockCredentials);
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
        'https://pulse.ingedata.ai/accounts/auth/api/login',
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
    it('should make an authenticated request', async () => {
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

  describe('getAccount', () => {
    it('should call request with the correct endpoint', async () => {
      const userId = '123';
      const mockResponse = { id: userId, name: 'Test User' };

      // Spy on the request method
      jest.spyOn(pulseApi, 'request').mockResolvedValueOnce(mockResponse);

      const result = await pulseApi.getAccount(userId);

      expect(pulseApi.request).toHaveBeenCalledWith('GET', `/accounts/users/${userId}`);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCurrentAccount', () => {
    it('should call request with the correct endpoint', async () => {
      const mockResponse = { id: '123', name: 'Current User' };

      // Spy on the request method
      jest.spyOn(pulseApi, 'request').mockResolvedValueOnce(mockResponse);

      const result = await pulseApi.getCurrentAccount();

      expect(pulseApi.request).toHaveBeenCalledWith('GET', '/accounts/me');
      expect(result).toEqual(mockResponse);
    });
  });
});
