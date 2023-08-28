import { EFormFieldType, IFormField } from '../../../types/universalTypes';

export const formFields = ({
  employersOptions,
  lawyersOptions,
  clientsOptions,
  courtsOptions,
  ssnNumbersOptions,
  packagesOptions,
  citiesOptions,
  executorsOptions,
}: any): IFormField[] => [
  {
    name: 'legalEntity',
    type: EFormFieldType.toggle,
    options: [true, false],
    gridClassName: 'flex justify-center',
    labelPlacement: 'top',
  },
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
    name: 'jmbg',
    type: EFormFieldType.input,
    gridWidth: 12,
    condition: false,
  },
  {
    name: 'name',
    type: EFormFieldType.input,
    gridWidth: 6,
    condition: true,
  },
  {
    name: 'pib',
    type: EFormFieldType.input,
    gridWidth: 6,
    condition: true,
  },
  {
    name: 'employed',
    type: EFormFieldType.checkbox,
    gridWidth: 6,
    condition: false,
  },
  {
    name: 'employer',
    type: EFormFieldType.autocomplete,
    gridWidth: 12,
    condition: false,
    secondCondition: true,
    options: employersOptions,
  },
  {
    name: 'cession',
    type: EFormFieldType.checkbox,
    gridWidth: 6,
  },
  {
    name: 'phoneNumbers',
    subfieldName: 'phoneNumber',
    type: EFormFieldType.dynamicForm,
    gridWidth: 12,
  },
  {
    name: 'address',
    type: EFormFieldType.input,
    gridWidth: 6,
  },
  {
    name: 'email',
    type: EFormFieldType.input,
    gridWidth: 6,
  },
  {
    name: 'zipCode',
    type: EFormFieldType.input,
    gridWidth: 6,
    format: /^\d{6}$/, // Regular expression for 5-digit ZIP code
  },
  {
    name: 'city',
    type: EFormFieldType.autocomplete,
    gridWidth: 6,
    options: citiesOptions,
  },
  {
    name: 'caseNumber',
    type: EFormFieldType.input,
    gridWidth: 6,
  },
  {
    name: 'contractNumber',
    type: EFormFieldType.input,
    gridWidth: 6,
  },
  {
    name: 'closingDate',
    type: EFormFieldType.datepicker,
    gridWidth: 12,
  },
  {
    name: 'businessNumbers',
    subfieldName: 'businessNumber',
    type: EFormFieldType.dynamicForm,
    gridWidth: 12,
  },
  {
    name: 'lawyer',
    type: EFormFieldType.autocomplete,
    gridWidth: 6,
    options: lawyersOptions,
  },
  {
    name: 'executor',
    type: EFormFieldType.autocomplete,
    gridWidth: 6,
    options: executorsOptions,
  },
  {
    name: 'client',
    type: EFormFieldType.autocomplete,
    gridWidth: 6,
    options: clientsOptions,
  },
  {
    name: 'court',
    type: EFormFieldType.autocomplete,
    gridWidth: 6,
    options: courtsOptions,
  },
  {
    name: 'ssnNumber',
    type: EFormFieldType.autocomplete,
    gridWidth: 6,
    options: ssnNumbersOptions,
  },
  {
    name: 'package',
    type: EFormFieldType.autocomplete,
    gridWidth: 6,
    options: packagesOptions,
  },
  {
    name: 'principal',
    type: EFormFieldType.input,
    gridWidth: 6,
    format: /[^0-9.]/g,
  },
  {
    name: 'interest',
    type: EFormFieldType.input,
    gridWidth: 6,
    format: /[^0-9.]/g,
  },
];
