import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  ECourtsActionType,
  ICourtRequestData,
} from '../../../types/courtsTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteCourt = async (
  courtId: number,
): Promise<IApiResponse<ICourtRequestData>> => {
  let response: IApiResponse<ICourtRequestData>;

  response = await setupAxios({
    method: 'delete',
    url: `api/court/${courtId}`,
    withCredentials: true,
  });

  return response;
};

const useDeleteCourtMutation = (
  onClose: () => void,
  updateCourtsState: React.Dispatch<any>,
  courtId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation(() => deleteCourt(courtId), {
    onSuccess: (response) => {
      if (!response.data.error) {
        updateCourtsState({ type: ECourtsActionType.resetCourtFormData });
        updateCourtsState({
          type: ECourtsActionType.openSuccessSnackbar,
          payload: true,
        });
        onClose();
        queryClient.invalidateQueries({ queryKey: ['courtsList'] });
      }
      return response.data.message;
    },
    onError: (error: any) => {
      console.error(error);
      if (error?.response?.data?.message) {
        updateCourtsState({
          type: ECourtsActionType.openErrorSnackbar,
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

export default useDeleteCourtMutation;
