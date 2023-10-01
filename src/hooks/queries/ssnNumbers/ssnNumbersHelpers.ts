import {
  ISSNNumbersApiResponseData,
  ISSNNumbersTableData,
} from '../../../types/ssnNumbersTypes';

export const mapApiResponseToTableData = ({
  id,
  ssn,
  case_count,
}: ISSNNumbersApiResponseData): ISSNNumbersTableData => ({
  id,
  ssn,
  numberOfCases: case_count,
});
