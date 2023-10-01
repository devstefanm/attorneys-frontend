import {
  IAddLawyerForm,
  IEditedLawyerFormData,
  ILawyerRequestData,
  ILawyerResponseObject,
  IViewLawyerApiResponseData,
} from '../../../types/lawyersTypes';
import { IAutocompleteOption } from '../../../types/universalTypes';

export const mapLawyersToBorderColors = () => '#6b7280';

export const mapApiResponseToAutocompleteOptions = (
  responseObject: ILawyerResponseObject,
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

export const mapAddLawyerFormToRequestData = ({
  city,
  email,
  firstName: first_name,
  lastName: last_name,
  officeName: office_name,
  phoneNumbers,
  address,
}: IAddLawyerForm): ILawyerRequestData => {
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
    office_name,
    address,
    phone_numbers,
  };
};

export const mapLawyerApiResponseToEditLawyerForm = ({
  city,
  email,
  first_name,
  last_name,
  phone_numbers,
  address,
  office_name,
}: IViewLawyerApiResponseData): IAddLawyerForm => {
  return {
    city: city?.id ? { id: city.id, name: city.name } : '',
    email: email || '',
    firstName: first_name,
    lastName: last_name,
    address: address || '',
    officeName: office_name,
    phoneNumbers:
      phone_numbers && phone_numbers.length > 0 ? phone_numbers : [''],
  };
};

export const mapEditLawyerFormToRequestData = ({
  city,
  email,
  firstName: first_name,
  lastName: last_name,
  phoneNumbers,
  address,
  officeName: office_name,
}: IEditedLawyerFormData): Partial<ILawyerRequestData> => {
  const requestData: Partial<ILawyerRequestData> = {};

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
  if (address !== undefined) requestData.address = address || null;
  if (office_name !== undefined) requestData.office_name = office_name || null;

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
