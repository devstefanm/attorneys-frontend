import {
  ICourtsApiResponseData,
  ICourtsTableData,
} from '../../../types/courtsTypes';

export const mapApiResponseToTableData = ({
  case_count,
  court,
}: ICourtsApiResponseData): ICourtsTableData => ({
  numberOfCases: case_count,
  court,
});
