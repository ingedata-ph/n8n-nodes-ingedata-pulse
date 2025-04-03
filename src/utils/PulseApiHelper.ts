import { IExecuteFunctions, ICredentialDataDecryptedObject } from 'n8n-workflow';

export class PulseApiHelper {
	private token = '';
	private apiUrl: string;
	private apiKey: string;
	private apiSecret: string;
	private headers: Record<string, string>;

	constructor(
		credentials: ICredentialDataDecryptedObject,
	) {
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
			const response = await fetch(`${this.apiUrl}/iam/auth/api/login`, {
				method: 'POST',
				headers: this.headers,
				body: JSON.stringify({
					key: this.apiKey,
					secret: this.apiSecret,
				}),
			});

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
			return this.authenticate();
		}
		return this.token;
	}

	/**
	 * Make an authenticated request to the Pulse API
	 */
	async request<T>(
		method: 'GET' | 'POST' | 'PUT' | 'DELETE',
		endpoint: string,
		data?: object,
	): Promise<T> {
		const token = await this.getToken();

		try {
			const options: RequestInit = {
				method,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			if (data && method !== 'GET') {
				options.body = JSON.stringify(data);
			}

			const response = await fetch(`${this.apiUrl}${endpoint}`, options);

			if (!response.ok) {
				const errorData = await response.json() as any;
				throw new Error(`API request failed: ${errorData.message || response.statusText}`);
			}

			return await response.json() as T;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`API request failed: ${error.message}`);
			}
			throw error;
		}
	}

	/**
	 * Get account information for a user
	 */
	async getAccount(userId: string): Promise<any> {
		return this.request<any>('GET', `/office/employees/${userId}`);
	}

	/**
	 * Get current user account information
	 */
	async getCurrentAccount(): Promise<any> {
		return this.request<any>('GET', '/iam/accounts/me');
	}
}

/**
 * Helper function to create a PulseApiHelper instance from n8n credentials
 */
export async function getPulseApiHelper(
	this: IExecuteFunctions,
): Promise<PulseApiHelper> {
	const credentials = await this.getCredentials('pulseApi');

	if (!credentials) {
		throw new Error('No credentials provided for Pulse API');
	}

	return new PulseApiHelper(credentials);
}
