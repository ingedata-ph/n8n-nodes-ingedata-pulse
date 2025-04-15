import { ICredentialDataDecryptedObject } from 'n8n-workflow';

export class BasePulseApi {
  protected token = '';
  protected apiUrl: string;
  protected apiKey: string;
  protected apiSecret: string;
  protected headers: Record<string, string>;

  constructor(credentials: ICredentialDataDecryptedObject) {
    this.apiUrl = credentials.apiUrl as string;
    this.apiKey = credentials.apiKey as string;
    this.apiSecret = credentials.apiSecret as string;

    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  }

  /**
   * Authenticate with the Pulse API and get a token
   */
  async authenticate(): Promise<string> {
    try {
      const response = await fetch(`${this.apiUrl}/api/v3/iam/auth/api/login`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          key: this.apiKey,
          secret: this.apiSecret,
        }),
      });

      console.log('Response:', response);
      
      if (!response.ok) {
        const errorData = await response.json() as any;
        throw new Error(`Authentication failed: ${errorData.message || response.statusText}`);
      }

      const data = await response.json() as any;
      this.token = data.meta.token;
      return this.token;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Authentication failed: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Get the authentication token, authenticating if necessary
   */
  async getToken(): Promise<string> {
    if (this.token === '') {
      console.log('Token is empty, authenticating...', this.apiUrl);
      
      return this.authenticate();
    }
    return this.token;
  }

  /**
   * Make an authenticated request to the Pulse API
   */
  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    data?: object,
    queryParams?: Record<string, string | string[]>,
  ): Promise<T> {
    const token = await this.getToken();
    console.log('Token:', token);
    try {
      const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
      };

      if (data && method !== 'GET') {
        headers['Content-Type'] = 'application/json';
      }

      const options: RequestInit = {
        method,
        headers
      };

      if (data && method !== 'GET') {
        options.body = JSON.stringify(data);
      }

      // Build URL with query parameters if provided
      let url = `${this.apiUrl}${endpoint}`;
      if (queryParams && Object.keys(queryParams).length > 0) {
        const queryParts: string[] = [];
        
        for (const [key, value] of Object.entries(queryParams)) {
          if (Array.isArray(value)) {
            // Handle array values with array notation (e.g., included[]=account&included[]=role)
            value.forEach(v => queryParts.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(v)}`));
          } else {
            // Handle string values normally (e.g., sort=name)
            queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
          }
        }
        
        url += `?${queryParts.join('&')}`;
      }
      console.log('Request URL:', url);
      console.log('options:', options);
      
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json() as any;

        throw new Error(`API request failed: ${errorData.message || response.statusText}`);
      }

      // if method is DELETE return true
      if (method === 'DELETE') {
        return true as unknown as T;
      }

      return await response.json() as T;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`API request failed: ${error.message}`);
      }
      throw error;
    }
  }
}
