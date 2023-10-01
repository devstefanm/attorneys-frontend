import {
  ICourtsApiResponseData,
  ICourtsTableData,
} from '../../../types/courtsTypes';

export const mapApiResponseToTableData = ({
  id,
  case_count,
  court,
}: ICourtsApiResponseData): ICourtsTableData => ({
  id,
  numberOfCases: case_count,
  court,
});
