import { EFormFieldType, IFormField } from './../../../types/universalTypes';

export const formFields = ({
  caseNumberWithNameOptions,
  transactionTypeOptions,
}: any): IFormField[] => [
  {
    name: 'caseNumber',
    required: true,
    type: EFormFieldType.autocomplete,
    gridWidth: 6,
    options: caseNumberWithNameOptions,
  },
  {
    name: 'type',
    required: true,
    type: EFormFieldType.autocomplete,
    gridWidth: 6,
    options: transactionTypeOptions,
  },
  {
    name: 'amount',
    required: true,
    type: EFormFieldType.input,
    gridWidth: 6,
    condition: false,
    format: /^[\d 0-9.]{0,24}$/,
  },
  {
    name: 'postingMethod',
    type: EFormFieldType.input,
    gridWidth: 6,
    condition: false,
  },
  {
    name: 'paymentDate',
    required: true,
    type: EFormFieldType.datepicker,
    gridWidth: 12,
    condition: false,
  },
];
