import { EFormFieldType, IFormField } from '../../../types/universalTypes';

export const formFields = ({ citiesOptions }: any): IFormField[] => [
  {
    name: 'firstName',
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
    name: 'email',
    type: EFormFieldType.input,
    gridWidth: 6,
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
