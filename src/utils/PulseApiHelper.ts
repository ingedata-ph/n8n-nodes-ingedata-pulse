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
	 * @param userId ID of the user account to retrieve
	 * @param included Optional array of related resources to include
	 */
	async getAccount(userId: string, included?: string[]): Promise<any> {
		const queryParams: Record<string, string | string[]> = {};
		
		if (included && included.length > 0) {
			queryParams.included = included;
		}
		
		return this.request<any>('GET', `/api/v3/iam/accounts/${userId}`, undefined, queryParams);
	}

	/**
	 * Get current user account information
	 * @param included Optional array of related resources to include
	 */
	async getCurrentAccount(included?: string[]): Promise<any> {
		console.log('Fetching current account information');
		const queryParams: Record<string, string | string[]> = {};
		
		if (included && included.length > 0) {
			queryParams.included = included;
		}
		
		return this.request<any>('GET', '/api/v3/iam/accounts/me', undefined, queryParams);
	}

	/**
	 * Get a list of people
	 * @param included Optional array of related resources to include (e.g., ['account'])
	 */
	async getPeopleList(included?: string[]): Promise<any> {
		const queryParams: Record<string, string | string[]> = {};
		
		if (included && included.length > 0) {
			queryParams.included = included;
		}

		console.log('Fetching people list');
		console.log('Query Params:', queryParams);
		
		return this.request<any>('GET', '/api/v3/iam/people', undefined, queryParams);
	}
	/**
	 * Create a new person
	 */
	async createPerson(personData: object): Promise<any> {
		return this.request<any>('POST', '/api/v3/iam/people', personData);
	}
	/**
	 * Get a person by ID
	 * @param personId ID of the person to retrieve
	 * @param included Optional array of related resources to include (e.g., ['account'])
	 */
	async getPersonById(personId: string, included?: string[]): Promise<any> {
		const queryParams: Record<string, string | string[]> = {};
		
		if (included && included.length > 0) {
			queryParams.included = included;
		}
		
		return this.request<any>('GET', `/api/v3/iam/people/${personId}`, undefined, queryParams);
	}
	/**
	 * Update a person by ID
	 */
	async updatePersonById(personId: string, personData: object): Promise<any> {
		return this.request<any>('PATCH', `/api/v3/iam/people/${personId}`, personData);
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
		return this.request<any>('PATCH', `/api/v3/iam/accounts/${accountId}`, accountData);
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
