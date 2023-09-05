import {
  IAddExecutorAutocompleteValues,
  IAddExecutorForm,
} from '../../../types/executorsTypes';

export const addExecutorsInitialFormData: IAddExecutorForm = {
  city: '',
  email: '',
  firstName: '',
  lastName: '',
  phoneNumbers: [''],
};

export const addExecutorAutocompleteInitialValues: IAddExecutorAutocompleteValues =
  {
    city: '',
  };
