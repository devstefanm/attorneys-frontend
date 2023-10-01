import {
  IAddPackageForm,
  IEditedPackageFormData,
  IPackageRequestData,
  IViewPackageApiResponseData,
} from '../../../types/packagesTypes';

export const mapPackagesToBorderColors = () => '#6b7280';

export const mapAddPackageFormToRequestData = ({
  packageName: package_name,
}: IAddPackageForm): IPackageRequestData => {
  return {
    package_name,
  };
};

export const mapPackageApiResponseToEditPackageForm = ({
  package_name,
}: IViewPackageApiResponseData): IAddPackageForm => {
  return {
    packageName: package_name,
  };
};

export const mapEditPackageFormToRequestData = ({
  packageName,
}: IEditedPackageFormData): Partial<IPackageRequestData> => {
  if (packageName !== undefined) {
    return {
      package_name: packageName || null,
    };
  }
  return { package_name: null };
};
