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
		method: 'GET' | 'POST' | 'PUT' | 'DELETE',
		endpoint: string,
		data?: object,
	): Promise<T> {
		const token = await this.getToken();
		console.log('Token:', token);
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
		return this.request<any>('GET', `/api/v3/iam/accounts/${userId}`);
	}

	/**
	 * Get current user account information
	 */
	async getCurrentAccount(): Promise<any> {
		console.log('Fetching current account information');
		return this.request<any>('GET', '/api/v3/iam/accounts/me');
	}

	/**
	 * Get a list of people
	 */
	async getPeopleList(): Promise<any> {
		return this.request<any>('GET', '/api/v3/iam/people');
	}
	/**
	 * Create a new person
	 */
	async createPerson(personData: object): Promise<any> {
		return this.request<any>('POST', '/api/v3/iam/people', personData);
	}
	/**
	 * Get a person by ID
	 */
	async getPersonById(personId: string): Promise<any> {
		return this.request<any>('GET', `/api/v3/iam/people/${personId}`);
	}
	/**
	 * Update a person by ID
	 */
	async updatePersonById(personId: string, personData: object): Promise<any> {
		return this.request<any>('PUT', `/api/v3/iam/people/${personId}`, personData);
	}

	/**
	 * Create a new account
	 */
	async createAccount(accountData: object): Promise<any> {
		return this.request<any>('POST', '/api/v3/iam/accounts', accountData);
	}

	/**
	 * Update an account
	 */
	async updateAccount(accountId: string, accountData: object): Promise<any> {
		return this.request<any>('PUT', `/api/v3/iam/accounts/${accountId}`, accountData);
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
