import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  EPackagesActionType,
  IPackageRequestData,
} from '../../../types/packagesTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deletePackage = async (
  packageId: number,
): Promise<IApiResponse<IPackageRequestData>> => {
  let response: IApiResponse<IPackageRequestData>;

  response = await setupAxios({
    method: 'delete',
    url: `api/package/${packageId}`,
    withCredentials: true,
  });

  return response;
};

const useDeletePackageMutation = (
  onClose: () => void,
  updatePackagesState: React.Dispatch<any>,
  packageId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation(() => deletePackage(packageId), {
    onSuccess: (response) => {
      if (!response.data.error) {
        updatePackagesState({ type: EPackagesActionType.resetPackageFormData });
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
  });
};

export default useDeletePackageMutation;
