import {
  IClientsApiResponseData,
  IClientsTableData,
} from '../../../types/clientsTypes';

export const mapApiResponseToTableData = ({
  id,
  case_count,
  client,
}: IClientsApiResponseData): IClientsTableData => ({
  id,
  numberOfCases: case_count,
  client,
});
