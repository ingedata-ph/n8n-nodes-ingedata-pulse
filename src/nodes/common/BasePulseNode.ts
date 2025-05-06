import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export abstract class BasePulseNode implements INodeType {
  description: INodeTypeDescription;

  constructor(description: INodeTypeDescription) {
    this.description = description;
  }
}
