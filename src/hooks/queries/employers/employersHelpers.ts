import {
  IEmployersApiResponseData,
  IEmployersTableData,
} from '../../../types/employersTypes';

export const mapApiResponseToTableData = ({
  employees_count,
  employer,
}: IEmployersApiResponseData): IEmployersTableData => ({
  numberOfEmployees: employees_count,
  employer,
});
