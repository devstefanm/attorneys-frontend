import {
  IPackagesApiResponseData,
  IPackagesTableData,
} from '../../../types/packagesTypes';

export const mapApiResponseToTableData = ({
  id,
  case_count,
  package_name,
}: IPackagesApiResponseData): IPackagesTableData => ({
  id,
  numberOfCases: case_count,
  packageName: package_name,
});
