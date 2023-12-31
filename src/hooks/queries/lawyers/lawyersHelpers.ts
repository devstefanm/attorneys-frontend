import {
  ILawyersApiResponseData,
  ILawyersTableData,
} from '../../../types/lawyersTypes';
import { uppercaseFirstLetter } from '../../../utils/transformData';

export const mapApiResponseToTableData = ({
  id,
  address,
  case_count,
  city,
  display_phone_numbers,
  email,
  first_name,
  last_name,
  office_name,
  phone_numbers,
}: ILawyersApiResponseData): ILawyersTableData => ({
  id,
  address,
  numberOfCases: case_count,
  city,
  displayPhoneNumbers: display_phone_numbers,
  email,
  name: `${uppercaseFirstLetter(first_name)} ${
    last_name ? uppercaseFirstLetter(last_name) : ''
  }`,
  officeName: office_name,
  phoneNumbers: phone_numbers,
});
