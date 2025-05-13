import { ICredentialDataDecryptedObject } from 'n8n-workflow';
import { BasePulseApi } from './BasePulseApi';

export class QuizzApi extends BasePulseApi {
  constructor(credentials: ICredentialDataDecryptedObject) {
    super(credentials);
  }

  /**
   * Get a list of quizz sessions
   */
  async getQuizzSessionsList(
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
    
    return this.request<any>('GET', '/api/v3/quiz/sessions', undefined, queryParams);
  }

  /**
   * Create a new quizz session
   */
  async createQuizzSession(sessionData: any): Promise<any> {
    return this.request<any>('POST', '/api/v3/quiz/sessions', sessionData);
  }

  /**
   * Get a quizz session by ID
   */
  async getQuizzSessionById(sessionId: string, included?: string[]): Promise<any> {
    const queryParams: Record<string, string | string[]> = {};
    if (included && included.length > 0) {
      queryParams.included = included;
    }
    return this.request<any>('GET', `/api/v3/quiz/sessions/${sessionId}`, undefined, queryParams);
  }

  /**
   * Update a quizz session by ID
   */
  async updateQuizzSession(sessionId: string, sessionData: any): Promise<any> {
    return this.request<any>('PATCH', `/api/v3/quiz/sessions/${sessionId}`, sessionData);
  }

  /**
   * Cancel a quizz session by ID (updates status to cancel)
   */
  async cancelQuizzSession(sessionId: string): Promise<any> {
    return this.request<any>('PATCH', `/api/v3/quiz/sessions/${sessionId}/cancel`);
  }

  /**
   * Assign a quizz to a session
   */
  async assignQuizz(quizId: string, sessionId: string): Promise<any> {
    const assignData = {
      data: {
        type: 'quiz/instances',
        attributes: {
          quiz_id: quizId,
          session_id: sessionId,
        }
      }
    };
    return this.request<any>('POST', '/api/v3/quiz/instances', assignData);
  }
}
