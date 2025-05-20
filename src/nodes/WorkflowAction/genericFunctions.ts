import { ILoadOptionsFunctions } from 'n8n-workflow';
import { PulseApiFactory } from '../../utils/api/PulseApiFactory';

export const resourceLoaders = {
  async loadProjectIndicatorKeysList(this: ILoadOptionsFunctions) {
    const projectId = this.getCurrentNodeParameter('projectId') as string;

    if (!projectId) {
      return [
        {
          name: 'Please select a Project first',
          value: '',
          disabled: true,
        },
      ];
    }

    const pulseApi = await PulseApiFactory.getPulseApiHelper(this, 'projectIndicators') as any;

    const indicatorKeys = await pulseApi.getProjectIndicatorKeys(projectId)

    return indicatorKeys || [];
  },

  async loadProjectIndicatorSelectorList(this: ILoadOptionsFunctions) {
    const projectId = this.getCurrentNodeParameter('projectId') as string;
    const indicatorName = this.getCurrentNodeParameter('indicatorName') as string | string[];

    if (!projectId) {
      return [
        {
          name: 'Please select a Project first',
          value: '',
          disabled: true,
        },
      ];
    }

    if (!indicatorName || indicatorName.length === 0) {
      return [
        {
          name: 'Please select an Indicator first',
          value: '',
          disabled: true,
        },
      ];
    }

    const pulseApi = await PulseApiFactory.getPulseApiHelper(this, 'projectIndicators') as any;

    const indicatorSelector = await pulseApi.getProjectIndicatorOptions(projectId, indicatorName)

    if (indicatorSelector.data.length === 0) {
      return [
        {
          name: 'No options available',
          value: '',
          disabled: true,
        },
      ];
    }

    // Map the options to the format required by n8n
    const selectorOptions = indicatorSelector.data.map((selector: {
      attributes: {
        indicator_name: string;
        value: string;
      }
    }) => {
      return {
        name: selector.attributes.value,
        value: selector.attributes.value,
      };
    });

    return selectorOptions;
  }
}
