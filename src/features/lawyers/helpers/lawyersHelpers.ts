import {
  IAddLawyerForm,
  ILawyerRequestData,
  ILawyerResponseObject,
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
