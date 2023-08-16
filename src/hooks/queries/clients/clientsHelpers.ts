import {
  IClientsApiResponseData,
  IClientsTableData,
} from '../../../types/clientsTypes';

export const mapApiResponseToTableData = ({
  case_count,
  client,
}: IClientsApiResponseData): IClientsTableData => ({
  numberOfCases: case_count,
  client,
});
