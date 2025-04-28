import { IExecuteFunctions } from 'n8n-workflow';
import { TalentApi } from '../../../utils/api/TalentApi';

export async function getSkillsList(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: TalentApi,
): Promise<any> {
  const included = executeFunctions.getNodeParameter('included', itemIndex, []) as string[];
  const additionalFields = executeFunctions.getNodeParameter('additionalFields', itemIndex, {}) as object;

  return pulseApi.getSkillsList(additionalFields, included);
}

export async function createSkill(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: TalentApi,
): Promise<any> {
  const talentId = executeFunctions.getNodeParameter('talentId', itemIndex) as string;
  const skillName = executeFunctions.getNodeParameter('skillName', itemIndex) as string;
  const level = executeFunctions.getNodeParameter('level', itemIndex) as number;
  
  const skillData = {
    data: {
      type: "talent/skills",
      attributes: {
        name: skillName,
        level: level,
      },
      relationships: {
        talent: {
          data: {
            type: "talent/talents",
            id: talentId
          }
        }
      }
    }
  };
  
  return pulseApi.createSkill(skillData);
}

export async function updateSkill(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: TalentApi,
): Promise<any> {
  const skillId = executeFunctions.getNodeParameter('skillId', itemIndex) as string;
  const talentId = executeFunctions.getNodeParameter('talentId', itemIndex) as string;
  const skillName = executeFunctions.getNodeParameter('skillName', itemIndex) as string;
  const level = executeFunctions.getNodeParameter('level', itemIndex) as number;
  
  const skillData = {
    data: {
      type: "talent/skills",
      id: skillId,
      attributes: {
        name: skillName,
        level: level,
      }
    }
  };
  
  return pulseApi.updateSkillById(skillId, skillData);
}

export async function deleteSkill(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: TalentApi,
): Promise<any> {
  const skillId = executeFunctions.getNodeParameter('skillId', itemIndex) as string;
  return pulseApi.deleteSkillById(skillId);
}
