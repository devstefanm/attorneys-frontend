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
  caseCategoryOptions,
}: any): IFormField[] => [
  {
    name: 'firstName',
    required: true,
    type: EFormFieldType.input,
    gridWidth: 6,
    condition: false,
  },
  {
    name: 'lastName',
    required: true,
    type: EFormFieldType.input,
    gridWidth: 6,
    condition: false,
  },
  {
    name: 'jmbg',
    required: true,
    type: EFormFieldType.input,
    gridWidth: 12,
    condition: false,
  },
  {
    name: 'name',
    required: true,
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
    name: 'executors',
    subfieldName: 'executor',
    type: EFormFieldType.dynamicAutocompletes,
    gridWidth: 12,
    options: executorsOptions,
  },
  {
    name: 'principal',
    type: EFormFieldType.input,
    gridWidth: 6,
    format: /^[\d 0-9.]{0,24}$/,
  },
  {
    name: 'interest',
    type: EFormFieldType.input,
    gridWidth: 6,
    format: /^[\d 0-9.]{0,24}$/,
  },
  {
    name: 'businessNumbers',
    subfieldName: 'businessNumber',
    type: EFormFieldType.dynamicInputs,
    gridWidth: 12,
  },
  {
    name: 'caseNumber',
    required: true,
    type: EFormFieldType.input,
    gridWidth: 6,
  },
  {
    name: 'contractNumber',
    required: true,
    type: EFormFieldType.input,
    gridWidth: 6,
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
    name: 'phoneNumbers',
    subfieldName: 'phoneNumber',
    type: EFormFieldType.dynamicInputs,
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
    name: 'lawyer',
    type: EFormFieldType.autocomplete,
    gridWidth: 6,
    options: lawyersOptions,
  },
  {
    name: 'court',
    type: EFormFieldType.autocomplete,
    gridWidth: 6,
    options: courtsOptions,
  },
  {
    name: 'client',
    required: true,
    type: EFormFieldType.autocomplete,
    gridWidth: 6,
    options: clientsOptions,
  },
  {
    name: 'enteringDate',
    type: EFormFieldType.datepicker,
    gridWidth: 6,
  },
  {
    name: 'lawyerHandOverDate',
    type: EFormFieldType.datepicker,
    gridWidth: 6,
  },
  {
    name: 'closingDate',
    type: EFormFieldType.datepicker,
    gridWidth: 6,
  },
  {
    name: 'status',
    type: EFormFieldType.input,
    gridWidth: 6,
  },
  {
    name: 'caseCategory',
    required: false,
    type: EFormFieldType.autocomplete,
    gridWidth: 6,
    options: caseCategoryOptions,
  },
  {
    name: 'oldPayment',
    type: EFormFieldType.input,
    gridWidth: 6,
    format: /^[\d 0-9.]{0,24}$/,
  },
  {
    name: 'ourTaxes',
    type: EFormFieldType.input,
    gridWidth: 6,
    format: /^[\d 0-9.]{0,24}$/,
  },
  {
    name: 'warningPrice',
    type: EFormFieldType.input,
    gridWidth: 6,
    format: /^[\d 0-9.]{0,24}$/,
  },
  {
    name: 'opposingPartyExpense',
    type: EFormFieldType.input,
    gridWidth: 6,
    format: /^[\d 0-9.]{0,24}$/,
  },
  {
    name: 'comment',
    type: EFormFieldType.textArea,
    gridWidth: 6,
  },
  {
    name: 'limitationObjection',
    type: EFormFieldType.checkbox,
    gridWidth: 6,
  },
];
