import {
  ICitiesApiResponseData,
  ICitiesTableData,
} from '../../../types/citiesTypes';

export const mapApiResponseToTableData = ({
  id,
  debtor_count,
  executor_count,
  lawyer_count,
  city,
}: ICitiesApiResponseData): ICitiesTableData => ({
  id,
  numberOfDebtors: debtor_count,
  numberOfExecutors: executor_count,
  numberOfLawyers: lawyer_count,
  city,
});
