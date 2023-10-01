import {
  IEmployersApiResponseData,
  IEmployersTableData,
} from '../../../types/employersTypes';

export const mapApiResponseToTableData = ({
  id,
  employees_count,
  employer,
}: IEmployersApiResponseData): IEmployersTableData => ({
  id,
  numberOfEmployees: employees_count,
  employer,
});
