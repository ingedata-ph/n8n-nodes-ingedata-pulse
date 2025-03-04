import { PulseApi } from '../../credentials/PulseApi.credentials';

describe('PulseApi Credentials', () => {
  let pulseApiCredentials: PulseApi;

  beforeEach(() => {
    pulseApiCredentials = new PulseApi();
  });

  it('should have the correct name and displayName', () => {
    expect(pulseApiCredentials.name).toBe('pulseApi');
    expect(pulseApiCredentials.displayName).toBe('Pulse API');
  });

  it('should have a documentation URL', () => {
    expect(pulseApiCredentials.documentationUrl).toBe('https://pulse.ingedata.ai/documentation');
  });

  it('should have the required properties', () => {
    expect(pulseApiCredentials.properties).toHaveLength(3);

    // API Key property
    const apiKeyProperty = pulseApiCredentials.properties.find(prop => prop.name === 'apiKey');
    expect(apiKeyProperty).toBeDefined();
    expect(apiKeyProperty?.displayName).toBe('API Key');
    expect(apiKeyProperty?.type).toBe('string');
    expect(apiKeyProperty?.default).toBe('');

    // API Secret property
    const apiSecretProperty = pulseApiCredentials.properties.find(prop => prop.name === 'apiSecret');
    expect(apiSecretProperty).toBeDefined();
    expect(apiSecretProperty?.displayName).toBe('API Secret');
    expect(apiSecretProperty?.type).toBe('string');
    expect(apiSecretProperty?.typeOptions?.password).toBe(true);
    expect(apiSecretProperty?.default).toBe('');

    // API URL property
    const apiUrlProperty = pulseApiCredentials.properties.find(prop => prop.name === 'apiUrl');
    expect(apiUrlProperty).toBeDefined();
    expect(apiUrlProperty?.displayName).toBe('API URL');
    expect(apiUrlProperty?.type).toBe('string');
    expect(apiUrlProperty?.default).toBe('https://pulse.ingedata.ai');
    expect(apiUrlProperty?.description).toBe('The URL of the Pulse API');
  });
});
