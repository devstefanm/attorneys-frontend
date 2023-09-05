import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  EPackagesActionType,
  IPackageRequestData,
} from '../../../types/packagesTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation } from '@tanstack/react-query';

const addNewPackage = async (
  packageRequestData: IPackageRequestData,
): Promise<IApiResponse<IPackageRequestData>> => {
  let response: IApiResponse<IPackageRequestData>;

  try {
    response = await setupAxios({
      method: 'post',
      url: 'api/packages',
      data: packageRequestData,
      withCredentials: true,
    });
  } catch {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

  return response;
};

const useAddNewPackageMutation = (
  onClose: () => void,
  updatePackagesState: React.Dispatch<any>,
) => {
  return useMutation(
    (packageRequestData: IPackageRequestData) =>
      addNewPackage(packageRequestData),
    {
      onSuccess: (response) => {
        updatePackagesState({
          type: EPackagesActionType.resetPackageFormData,
        });
        if (!response.data.error) {
          onClose();
        }
        return response.data.message;
      },
      onError: (error) => {
        return { error: error, message: 'Connection problem' };
      },
    },
  );
};

export default useAddNewPackageMutation;
