import { ILawyersApiResponseData } from '../../../types/lawyersTypes';
import { uppercaseFirstLetter } from '../../../utils/transformData';

export const mapApiResponseToTableData = ({
  address,
  case_count,
  city,
  display_phone_number,
  email,
  first_name,
  last_name,
  office_name,
  phone_number,
}: ILawyersApiResponseData) => ({
  address,
  numberOfCases: case_count,
  city,
  displayPhoneNumber: display_phone_number,
  email,
  name: `${uppercaseFirstLetter(first_name)} ${uppercaseFirstLetter(
    last_name,
  )}`,
  officeName: office_name,
  phoneNumber: phone_number,
});
