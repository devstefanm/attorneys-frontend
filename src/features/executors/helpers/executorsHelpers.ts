import {
  IAddExecutorForm,
  IEditedExecutorFormData,
  IExecutorRequestData,
  IViewExecutorApiResponseData,
} from './../../../types/executorsTypes';
import { IExecutorResponseObject } from '../../../types/executorsTypes';
import { IAutocompleteOption } from '../../../types/universalTypes';

export const mapExecutorsToBorderColors = () => '#6b7280';

export const mapApiResponseToAutocompleteOptions = (
  responseObject: IExecutorResponseObject,
): IAutocompleteOption<string> => {
  const {
    id,
    first_name,
    last_name,
    city,
    email,
    name: responseName,
  } = responseObject;
  let name = '';
  if (responseName) {
    name = responseName;
  }
  if (first_name) {
    name = `${first_name} ${last_name ?? ''}`;
  }

  if (city) {
    name = city as string;
  }

  if (email) {
    name = email;
  }

  return {
    id,
    name,
  };
};

export const mapAddExecutorFormToRequestData = ({
  city,
  email,
  firstName: first_name,
  lastName: last_name,
  phoneNumbers,
}: IAddExecutorForm): IExecutorRequestData => {
  let city_id = null;

  if (typeof city !== 'string') city_id = city.id;

  const phone_numbers = phoneNumbers.filter(
    (phoneNumber) => phoneNumber.length > 5,
  );

  return {
    city_id,
    email,
    first_name,
    last_name,
    phone_numbers,
  };
};

export const mapExecutorApiResponseToEditExecutorForm = ({
  city,
  email,
  first_name,
  last_name,
  phone_numbers,
}: IViewExecutorApiResponseData): IAddExecutorForm => {
  return {
    city: city?.id ? { id: city.id, name: city.name } : '',
    email: email || '',
    firstName: first_name,
    lastName: last_name,
    phoneNumbers:
      phone_numbers && phone_numbers.length > 0 ? phone_numbers : [''],
  };
};

export const mapEditExecutorFormToRequestData = ({
  city,
  email,
  firstName: first_name,
  lastName: last_name,
  phoneNumbers,
}: IEditedExecutorFormData): Partial<IExecutorRequestData> => {
  const requestData: Partial<IExecutorRequestData> = {};

  if (city !== undefined) {
    if (typeof city !== 'string') {
      requestData.city_id = city.id || null;
    } else if (city === '') {
      requestData.city_id = null;
    }
  }

  if (email !== undefined) requestData.email = email || null;
  if (first_name !== undefined) requestData.first_name = first_name || null;
  if (last_name !== undefined) requestData.last_name = last_name || null;

  if (phoneNumbers !== undefined) {
    if (phoneNumbers.length > 0) {
      requestData.phone_numbers = phoneNumbers?.filter(
        (phoneNumber) => phoneNumber.length > 5,
      );
    } else {
      requestData.phone_numbers = [''];
    }
  }

  return requestData;
};
