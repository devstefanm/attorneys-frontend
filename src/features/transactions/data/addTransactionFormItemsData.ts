import { EFormFieldType, IFormField } from './../../../types/universalTypes';

export const formFields = ({
  caseNumberWithNameOptions,
  transactionTypeOptions,
}: any): IFormField[] => [
  {
    name: 'caseNumber',
    type: EFormFieldType.autocomplete,
    gridWidth: 6,
    options: caseNumberWithNameOptions,
  },
  {
    name: 'type',
    type: EFormFieldType.autocomplete,
    gridWidth: 6,
    options: transactionTypeOptions,
  },
  {
    name: 'amount',
    type: EFormFieldType.input,
    gridWidth: 6,
    condition: false,
  },
  {
    name: 'postingMethod',
    type: EFormFieldType.input,
    gridWidth: 6,
    condition: false,
  },
  {
    name: 'paymentDate',
    type: EFormFieldType.datepicker,
    gridWidth: 12,
    condition: false,
  },
];
