import { IExecuteFunctions } from 'n8n-workflow';
import { QuizzApi } from '../../../utils/api/QuizzApi';

export async function getQuizzSessionsList(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: QuizzApi,
): Promise<any> {
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  const additionalFields = executeFunctions.getNodeParameter('additionalFields', itemIndex, {}) as {
    sort?: string;
    pageNumber?: number;
    pageSize?: number;
    filters?: { filter: Array<{ key: string; values: string }> };
    fields?: { field: Array<{ key: string; fields: string }> };
  };

  return pulseApi.getQuizzSessionsList(additionalFields, included);
}

export async function createQuizzSession(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: QuizzApi,
): Promise<any> {
  const personId = executeFunctions.getNodeParameter('personId', itemIndex) as string;
  const expiresAt = executeFunctions.getNodeParameter('expiresAt', itemIndex, '') as string;

  const sessionData = {
    data: {
      type: 'quiz/sessions',
      attributes: {
        person_id: personId,
        expires_at: expiresAt ? new Date(expiresAt).toISOString() : undefined,
      },
    },
  };

  return pulseApi.createQuizzSession(sessionData);
}

export async function updateQuizzSession(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: QuizzApi,
): Promise<any> {
  const sessionId = executeFunctions.getNodeParameter('sessionId', itemIndex) as string;
  const name = executeFunctions.getNodeParameter('name', itemIndex) as string;
  const expiresAt = executeFunctions.getNodeParameter('expiresAt', itemIndex, '') as string;

  const attributes : {
    name: string;
    expires_at?: string;
  } = {
    name,
  };

  if (name) {
    attributes.name = name;
  }

  if (expiresAt) {
    attributes.expires_at = new Date(expiresAt).toISOString();
  }

  const sessionData = {
    data: {
      type: 'quiz/sessions',
      id: sessionId,
      attributes: attributes,
    },
  };

  return pulseApi.updateQuizzSession(sessionId, sessionData);
}

export async function cancelQuizzSession(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: QuizzApi,
): Promise<any> {
  const sessionId = executeFunctions.getNodeParameter('sessionId', itemIndex) as string;
  return pulseApi.cancelQuizzSession(sessionId);
}

export async function assignQuizz(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: QuizzApi,
): Promise<any> {
  const quizId = executeFunctions.getNodeParameter('quizId', itemIndex) as string;
  const sessionId = executeFunctions.getNodeParameter('sessionId', itemIndex) as string;
  
  return pulseApi.assignQuizz(quizId, sessionId);
}

export async function getQuizzSessionById(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: QuizzApi,
): Promise<any> {
  const sessionId = executeFunctions.getNodeParameter('sessionId', itemIndex) as string;
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  
  return pulseApi.getQuizzSessionById(sessionId, included);
}

export async function shareTestLink(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: QuizzApi,
): Promise<any> {
  const sessionId = executeFunctions.getNodeParameter('sessionId', itemIndex) as string;


    // Get the API URL and token from the pulseApi instance
    const apiUrl = (pulseApi as any).apiUrl;
  
    // Construct the URL for the report
    // https://pulse.localhost/quiz/sessions/f151fcf0-c5c8-433d-bb41-5797a9539f8e

    if (apiUrl.includes('localhost')) {
      apiUrl.replace('http://pulse.localhost:3000', 'https://pulse.localhost');
    }

    const testLink = `${apiUrl}/quiz/sessions/${sessionId}`;
    
    return {
      data: {
        testLink,
      },
    }
}
