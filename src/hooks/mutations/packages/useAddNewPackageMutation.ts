import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  EPackagesActionType,
  IPackageRequestData,
} from '../../../types/packagesTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const addNewPackage = async (
  packageRequestData: IPackageRequestData,
): Promise<IApiResponse<IPackageRequestData>> => {
  let response: IApiResponse<IPackageRequestData>;

  response = await setupAxios({
    method: 'post',
    url: 'api/packages',
    data: packageRequestData,
    withCredentials: true,
  });

  return response;
};

const useAddNewPackageMutation = (
  onClose: () => void,
  updatePackagesState: React.Dispatch<any>,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (packageRequestData: IPackageRequestData) =>
      addNewPackage(packageRequestData),
    {
      onSuccess: (response) => {
        if (!response.data.error) {
          updatePackagesState({
            type: EPackagesActionType.resetPackageFormData,
          });
          updatePackagesState({
            type: EPackagesActionType.openSuccessSnackbar,
            payload: true,
          });
          onClose();
          queryClient.invalidateQueries({ queryKey: ['packagesList'] });
        }
        return response.data.message;
      },
      onError: (error: any) => {
        console.error(error);
        updatePackagesState({
          type: EPackagesActionType.openErrorSnackbar,
          payload: true,
        });
        return {
          error,
          message: error?.response?.data?.message || 'Error has occured',
        };
      },
    },
  );
};

export default useAddNewPackageMutation;
