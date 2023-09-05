import {
  IAddLawyerAutocompleteValues,
  IAddLawyerForm,
} from '../../../types/lawyersTypes';

export const addLawyersInitialFormData: IAddLawyerForm = {
  city: '',
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  officeName: '',
  phoneNumbers: [''],
};

export const addLawyerAutocompleteInitialValues: IAddLawyerAutocompleteValues =
  {
    city: '',
  };
