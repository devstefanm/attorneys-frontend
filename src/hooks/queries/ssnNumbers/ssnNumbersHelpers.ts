import {
  ISSNNumbersApiResponseData,
  ISSNNumbersTableData,
} from '../../../types/ssnNumbersTypes';

export const mapApiResponseToTableData = ({
  ssn,
  case_count,
}: ISSNNumbersApiResponseData): ISSNNumbersTableData => ({
  ssn,
  numberOfCases: case_count,
});
