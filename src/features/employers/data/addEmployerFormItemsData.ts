import { EFormFieldType, IFormField } from '../../../types/universalTypes';

export const formFields: IFormField[] = [
  {
    name: 'name',
    required: true,
    type: EFormFieldType.input,
    gridWidth: 12,
    condition: false,
  },
];
