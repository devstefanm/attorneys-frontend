import {
  IAddPackageForm,
  IPackageRequestData,
} from '../../../types/packagesTypes';

export const mapPackagesToBorderColors = () => '#6b7280';

export const mapAddPackageFormToRequestData = ({
  packageName: package_name,
}: IAddPackageForm): IPackageRequestData => {
  return {
    package_name,
  };
};
