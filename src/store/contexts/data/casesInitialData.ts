import {
  IAddCaseAutocompleteValues,
  IAddCaseForm,
} from '../../../types/casesTypes';

export const addCasesInitialFormData: IAddCaseForm = {
  legalEntity: false,
  firstName: '',
  lastName: '',
  jmbg: '',
  name: '',
  pib: '',
  employed: false,
  employer: '',
  executors: [{ id: null, name: '' }],
  cession: false,
  phoneNumbers: [''],
  address: '',
  email: '',
  zipCode: '',
  city: '',
  caseNumber: '',
  contractNumber: '',
  closingDate: null,
  businessNumbers: [''],
  lawyer: '',
  client: '',
  court: '',
  ssnNumber: '',
  package: '',
  principal: '',
  interest: '',
};

export const addCaseAutocompleteInitialValues: IAddCaseAutocompleteValues = {
  employer: '',
  executors: '',
  lawyer: '',
  client: '',
  court: '',
  city: '',
  ssnNumber: '',
  package: '',
};
