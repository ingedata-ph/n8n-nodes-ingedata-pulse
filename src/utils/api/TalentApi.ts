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
  async getTalentList(included?: string[]): Promise<any> {
    const queryParams: Record<string, string | string[]> = {};
    
    if (included && included.length > 0) {
      queryParams.included = included;
    }

    console.log('Fetching talent list');
    console.log('Query Params:', queryParams);
    
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
  async getTalentById(talentId: string, included?: string[]): Promise<any> {
    const queryParams: Record<string, string | string[]> = {};
    
    if (included && included.length > 0) {
      queryParams.included = included;
    }
    
    return this.request<any>('GET', `/api/v3/talent/talents/${talentId}`, undefined, queryParams);
  }

  // /**
  //  * Update a talent by ID
  //  */
  // async updateTalentById(talentId: string, talentData: object): Promise<any> {
  //   return this.request<any>('PATCH', `/api/v3/talent/talents/${talentId}`, talentData);
  // }

  // Skill methods

  /**
   * Get a list of skills for a talent
   * @param included Optional array of related resources to include
   */
  async getSkillsList(included?: string[]): Promise<any> {
    const queryParams: Record<string, string | string[]> = {};
    
    if (included && included.length > 0) {
      queryParams.included = included;
    }
    
    return this.request<any>('GET', '/api/v3/talent/skills', undefined, queryParams);
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
    const queryParams: Record<string, string | string[]> = {};
    
    if (included && included.length > 0) {
      queryParams.included = included;
    }
    
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
  async getLanguagesList(included?: string[]): Promise<any> {
    const queryParams: Record<string, string | string[]> = {};
    
    if (included && included.length > 0) {
      queryParams.included = included;
    }
    
    return this.request<any>('GET', '/api/v3/talent/languages', undefined, queryParams);
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
    const queryParams: Record<string, string | string[]> = {};
    
    if (included && included.length > 0) {
      queryParams.included = included;
    }
    
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
}
