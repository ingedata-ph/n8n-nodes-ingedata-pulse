import { ICredentialDataDecryptedObject } from 'n8n-workflow';
import { BasePulseApi } from './BasePulseApi';
export class TalentApi extends BasePulseApi {
  constructor(credentials: ICredentialDataDecryptedObject) {
    super(credentials);
  }

  // Talent methods

  /**
   * Get a list of talents
   * @param included Optional array of related resources to include (e.g., ['person'])
   */
  async getTalentList(
    additionalFields: {
      sort?: string;
      pageNumber?: number;
      pageSize?: number;
      filters?: { filter: Array<{ key: string; values: string }> };
      fields?: { field: Array<{ key: string; fields: string }> };
    },
    included?: string[],
  ): Promise<any> {
    const queryParams = this.buildQueryParams(additionalFields, included);

    return this.request<any>('GET', '/api/v3/talent/talents', undefined, queryParams);
  }

  /**
   * Create a new talent
   */
  async createTalent(talentData: object): Promise<any> {
    return this.request<any>('POST', '/api/v3/talent/talents', talentData);
  }

  /**
   * Get a talent by ID
   * @param talentId ID of the talent to retrieve
   * @param included Optional array of related resources to include (e.g., ['person'])
   */
  async getTalentById(
    talentId: string,
    included?: string[],
  ): Promise<any> {
    const queryParams = this.buildQueryParams({}, included);

    return this.request<any>('GET', `/api/v3/talent/talents/${talentId}`, undefined, queryParams);
  }

  /**
   * Upload a resume to create a talent
   * @param fileUrl The URL of the resume file
   * @param organizationalUnit The organizational unit to associate with the talent
   * @param mimeType The MIME type of the resume file
   */
  async createTalentFromResume(fileUrl: string, organizationalUnit: string, mimeType: string): Promise<any> {
    const queryParams: Record<string, string | string[]> = {
      file_url: fileUrl,
      organizational_unit: organizationalUnit,
      mime_type: mimeType
    };
    
    return this.request<any>('POST', '/api/v3/talent/talents/upload_resume', undefined, queryParams);
  }

  /**
   * Query talent using a prompt
   * @param queryPrompt The prompt to query talent
   * returns the relevant talent data
   */
  async queryTalent(queryData: object): Promise<any> {
    const query_data = await this.request<any>('POST', '/api/v3/talent/queries', queryData);

    const query_id = query_data.data.id;

    const queryParams: Record<string, string | string[]> = {
      sort: '-relevance',
      'page[number]': '1',
      'page[size]': '10',
    };

    const relevant_data = await this.request<any>('GET', `/api/v3/talent/queries/${query_id}/results`, undefined, queryParams);

    const relevant_talent_id = relevant_data.data.map((item: any) => item.id);

    // Return the relevant talent IDs
    const talentQueryParams: Record<string, string | string[]> = {
      'filter[id]': relevant_talent_id,
    }
    return  await this.request<any>('GET', `/api/v3/talent/talents`, undefined, talentQueryParams);
  }

  // Skill methods
  /**
   * Get a list of skills for a talent
   * @param included Optional array of related resources to include
   */
  async getSkillsList(
    additionalFields: {
      sort?: string;
      pageNumber?: number;
      pageSize?: number;
      filters?: { filter: Array<{ key: string; values: string }> };
      fields?: { field: Array<{ key: string; fields: string }> };
    },
    included?: string[],
  ): Promise<any> {
    const queryParams = this.buildQueryParams(additionalFields, included);

    return await this.request<any>('GET', '/api/v3/talent/skills', undefined, queryParams);
  }

  /**
   * Create a new skill
   */
  async createSkill(skillData: object): Promise<any> {
    return this.request<any>('POST', '/api/v3/talent/skills', skillData);
  }

  /**
   * Get a skill by ID
   * @param skillId ID of the skill to retrieve
   * @param included Optional array of related resources to include
   */
  async getSkillById(skillId: string, included?: string[]): Promise<any> {
    const queryParams = this.buildQueryParams({}, included);

    return this.request<any>('GET', `/api/v3/talent/skills/${skillId}`, undefined, queryParams);
  }

  /**
   * Update a skill by ID
   */
  async updateSkillById(skillId: string, skillData: object): Promise<any> {
    return this.request<any>('PATCH', `/api/v3/talent/skills/${skillId}`, skillData);
  }

  /**
   * Delete a skill by ID
   */
  async deleteSkillById(skillId: string): Promise<any> {
    return this.request<any>('DELETE', `/api/v3/talent/skills/${skillId}`);
  }

  // Language methods

  /**
   * Get a list of languages for a talent
   * @param included Optional array of related resources to include
   */
  async getLanguagesList(
    additionalFields: {
      sort?: string;
      pageNumber?: number;
      pageSize?: number;
      filters?: { filter: Array<{ key: string; values: string }> };
      fields?: { field: Array<{ key: string; fields: string }> };
    },
    included?: string[],
  ): Promise<any> {
    const queryParams = this.buildQueryParams(additionalFields, included);

    return await this.request<any>('GET', '/api/v3/talent/languages', undefined, queryParams);

  }

  /**
   * Create a new language
   */
  async createLanguage(languageData: object): Promise<any> {
    return this.request<any>('POST', '/api/v3/talent/languages', languageData);
  }

  /**
   * Get a language by ID
   * @param languageId ID of the language to retrieve
   * @param included Optional array of related resources to include
   */
  async getLanguageById(languageId: string, included?: string[]): Promise<any> {
    const queryParams = this.buildQueryParams({}, included);

    return this.request<any>('GET', `/api/v3/talent/languages/${languageId}`, undefined, queryParams);
  }

  /**
   * Update a language by ID
   */
  async updateLanguageById(languageId: string, languageData: object): Promise<any> {
    return this.request<any>('PATCH', `/api/v3/talent/languages/${languageId}`, languageData);
  }

  /**
   * Delete a language by ID
   */
  async deleteLanguageById(languageId: string): Promise<any> {
    return this.request<any>('DELETE', `/api/v3/talent/languages/${languageId}`);
  }

  // Education methods

  /**
   * Get a list of education entries for a talent
   * @param included Optional array of related resources to include
   */
  async getEducationList(
    additionalFields: {
      sort?: string;
      pageNumber?: number;
      pageSize?: number;
      filters?: { filter: Array<{ key: string; values: string }> };
      fields?: { field: Array<{ key: string; fields: string }> };
    },
    included?: string[],
  ): Promise<any> {
    const queryParams = this.buildQueryParams(additionalFields, included);

    return await this.request<any>('GET', '/api/v3/talent/educations', undefined, queryParams);
  }

  /**
   * Create a new education entry
   */
  async createEducation(educationData: object): Promise<any> {
    return this.request<any>('POST', '/api/v3/talent/educations', educationData);
  }

  /**
   * Get an education entry by ID
   * @param educationId ID of the education entry to retrieve
   * @param included Optional array of related resources to include
   */
  async getEducationById(educationId: string, included?: string[]): Promise<any> {
    const queryParams = this.buildQueryParams({}, included);

    return this.request<any>('GET', `/api/v3/talent/educations/${educationId}`, undefined, queryParams);
  }

  /**
   * Update an education entry by ID
   */
  async updateEducationById(educationId: string, educationData: object): Promise<any> {
    return this.request<any>('PATCH', `/api/v3/talent/educations/${educationId}`, educationData);
  }

  /**
   * Delete an education entry by ID
   */
  async deleteEducationById(educationId: string): Promise<any> {
    return this.request<any>('DELETE', `/api/v3/talent/educations/${educationId}`);
  }

  // Certification methods

  /**
   * Get a list of certification entries for a talent
   * @param included Optional array of related resources to include
   */
  async getCertificationList(
    additionalFields: {
      sort?: string;
      pageNumber?: number;
      pageSize?: number;
      filters?: { filter: Array<{ key: string; values: string }> };
      fields?: { field: Array<{ key: string; fields: string }> };
    },
    included?: string[],
  ): Promise<any> {
    const queryParams = this.buildQueryParams(additionalFields, included);
    return await this.request<any>('GET', '/api/v3/talent/certifications', undefined, queryParams);
  }

  /**
   * Create a new certification entry
   */
  async createCertification(certificationData: object): Promise<any> {
    return this.request<any>('POST', '/api/v3/talent/certifications', certificationData);
  }

  /**
   * Get a certification entry by ID
   * @param certificationId ID of the certification entry to retrieve
   * @param included Optional array of related resources to include
   */
  async getCertificationById(certificationId: string, included?: string[]): Promise<any> {
    const queryParams = this.buildQueryParams({}, included);

    return this.request<any>('GET', `/api/v3/talent/certifications/${certificationId}`, undefined, queryParams);
  }

  /**
   * Update a certification entry by ID
   */
  async updateCertificationById(certificationId: string, certificationData: object): Promise<any> {
    return this.request<any>('PATCH', `/api/v3/talent/certifications/${certificationId}`, certificationData);
  }

  /**
   * Delete a certification entry by ID
   */
  async deleteCertificationById(certificationId: string): Promise<any> {
    return this.request<any>('DELETE', `/api/v3/talent/certifications/${certificationId}`);
  }

  // Experience methods

  /**
   * Get a list of experience entries for a talent
   * @param included Optional array of related resources to include
   */
  async getExperienceList(
    additionalFields: {
      sort?: string;
      pageNumber?: number;
      pageSize?: number;
      filters?: { filter: Array<{ key: string; values: string }> };
      fields?: { field: Array<{ key: string; fields: string }> };
    },
    included?: string[]
  ): Promise<any> {
    const queryParams = this.buildQueryParams(additionalFields, included);

    return await this.request<any>('GET', '/api/v3/talent/experiences', undefined, queryParams);
  }

  /**
   * Create a new experience entry
   */
  async createExperience(experienceData: object): Promise<any> {
    return this.request<any>('POST', '/api/v3/talent/experiences', experienceData);
  }

  /**
   * Get an experience entry by ID
   * @param experienceId ID of the experience entry to retrieve
   * @param included Optional array of related resources to include
   */
  async getExperienceById(experienceId: string, included?: string[]): Promise<any> {
    const queryParams = this.buildQueryParams({}, included);

    return this.request<any>('GET', `/api/v3/talent/experiences/${experienceId}`, undefined, queryParams);
  }

  /**
   * Update an experience entry by ID
   */
  async updateExperienceById(experienceId: string, experienceData: object): Promise<any> {
    return this.request<any>('PATCH', `/api/v3/talent/experiences/${experienceId}`, experienceData);
  }

  /**
   * Delete an experience entry by ID
   */
  async deleteExperienceById(experienceId: string): Promise<any> {
    return this.request<any>('DELETE', `/api/v3/talent/experiences/${experienceId}`);
  }
}
