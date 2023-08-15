import {
  IExecutorsApiResponseData,
  IExecutorsTableData,
} from '../../../types/executorsTypes';
import { uppercaseFirstLetter } from '../../../utils/transformData';

export const mapApiResponseToTableData = ({
  case_count,
  city,
  display_phone_number,
  first_name,
  last_name,
  phone_number,
}: IExecutorsApiResponseData): IExecutorsTableData => ({
  numberOfCases: case_count,
  city,
  displayPhoneNumber: display_phone_number,
  name: `${uppercaseFirstLetter(first_name)} ${uppercaseFirstLetter(
    last_name,
  )}`,
  phoneNumber: phone_number,
});
