import {
  ICitiesApiResponseData,
  ICitiesTableData,
} from '../../../types/citiesTypes';

export const mapApiResponseToTableData = ({
  debtor_count,
  executor_count,
  lawyer_count,
  city,
}: ICitiesApiResponseData): ICitiesTableData => ({
  numberOfDebtors: debtor_count,
  numberOfExecutors: executor_count,
  numberOfLawyers: lawyer_count,
  city,
});
