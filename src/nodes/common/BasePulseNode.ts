import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { PulseApiFactory } from '../../utils/api/PulseApiFactory';

export abstract class BasePulseNode implements INodeType {
  description: INodeTypeDescription;

  constructor(description: INodeTypeDescription) {
    this.description = description;
  }

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    // For each item (though there will usually just be one)
    for (let i = 0; i < items.length; i++) {
      try {
        const resource = this.getNodeParameter('resource', i) as string;
        const operation = this.getNodeParameter('operation', i) as string;
        const pulseApi = await PulseApiFactory.getPulseApiHelper(this, resource);

        // We need to bind the correct context for processOperation
        const self = Object.getPrototypeOf(this).constructor.prototype;
        const result = await self.processOperation.call(
          this,
          resource,
          operation,
          i,
          pulseApi,
          this
        );
        
        returnData.push({
          json: result,
        });
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({
            json: {
              error: (error as Error).message,
            },
          });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }

  protected abstract processOperation(
    resource: string,
    operation: string,
    itemIndex: number,
    pulseApi: any,
    executeFunctions: IExecuteFunctions,
  ): Promise<any>;
}
