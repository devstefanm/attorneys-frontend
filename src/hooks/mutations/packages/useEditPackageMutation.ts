import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  EPackagesActionType,
  IPackageRequestData,
} from '../../../types/packagesTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const editPackage = async (
  packageId: number,
  packageRequestData: IPackageRequestData,
): Promise<IApiResponse<IPackageRequestData>> => {
  let response: IApiResponse<IPackageRequestData>;

  response = await setupAxios({
    method: 'patch',
    url: `api/package/${packageId}`,
    data: packageRequestData,
    withCredentials: true,
  });

  return response;
};

const useEditPackageMutation = (
  onClose: () => void,
  updatePackagesState: React.Dispatch<any>,
  packageId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (packageRequestData: IPackageRequestData) =>
      editPackage(packageId, packageRequestData),
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
          queryClient.invalidateQueries({ queryKey: ['package'] });
        }
        return response.data.message;
      },
      onError: (error: any) => {
        console.error(error);
        if (error?.response?.data?.message) {
          updatePackagesState({
            type: EPackagesActionType.openErrorSnackbar,
            payload: true,
          });
        }
        return {
          error,
          message: error?.response?.data?.message || 'Error has occured',
        };
      },
    },
  );
};

export default useEditPackageMutation;
