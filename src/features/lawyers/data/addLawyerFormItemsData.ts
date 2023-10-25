import { EFormFieldType, IFormField } from '../../../types/universalTypes';

export const formFields = ({ citiesOptions }: any): IFormField[] => [
  {
    name: 'firstName',
    required: true,
    type: EFormFieldType.input,
    gridWidth: 6,
    condition: false,
  },
  {
    name: 'lastName',
    type: EFormFieldType.input,
    gridWidth: 6,
    condition: false,
  },
  {
    name: 'officeName',
    type: EFormFieldType.input,
    gridWidth: 6,
    condition: false,
  },
  {
    name: 'email',
    type: EFormFieldType.input,
    gridWidth: 6,
  },
  {
    name: 'address',
    type: EFormFieldType.input,
    gridWidth: 6,
    condition: false,
  },
  {
    name: 'city',
    type: EFormFieldType.autocomplete,
    gridWidth: 6,
    options: citiesOptions,
  },
  {
    name: 'phoneNumbers',
    subfieldName: 'phoneNumber',
    type: EFormFieldType.dynamicInputs,
    gridWidth: 12,
  },
];
