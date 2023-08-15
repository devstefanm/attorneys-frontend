import {
  IPackagesApiResponseData,
  IPackagesTableData,
} from '../../../types/packagesTypes';

export const mapApiResponseToTableData = ({
  case_count,
  package_name,
}: IPackagesApiResponseData): IPackagesTableData => ({
  numberOfCases: case_count,
  packageName: package_name,
});
