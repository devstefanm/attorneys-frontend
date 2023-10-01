import {
  IExecutorsApiResponseData,
  IExecutorsTableData,
} from '../../../types/executorsTypes';
import { uppercaseFirstLetter } from '../../../utils/transformData';

export const mapApiResponseToTableData = ({
  id,
  case_count,
  city,
  display_phone_numbers,
  first_name,
  last_name,
  phone_numbers,
  email,
}: IExecutorsApiResponseData): IExecutorsTableData => ({
  id,
  numberOfCases: case_count,
  city,
  email,
  displayPhoneNumbers: display_phone_numbers,
  name: `${uppercaseFirstLetter(first_name)} ${uppercaseFirstLetter(
    last_name,
  )}`,
  phoneNumbers: phone_numbers,
});
