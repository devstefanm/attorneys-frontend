import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  ECourtsActionType,
  ICourtRequestData,
} from '../../../types/courtsTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const editCourt = async (
  courtId: number,
  courtRequestData: ICourtRequestData,
): Promise<IApiResponse<ICourtRequestData>> => {
  let response: IApiResponse<ICourtRequestData>;

  response = await setupAxios({
    method: 'patch',
    url: `api/court/${courtId}`,
    data: courtRequestData,
    withCredentials: true,
  });

  return response;
};

const useEditCourtMutation = (
  onClose: () => void,
  updateCourtsState: React.Dispatch<any>,
  courtId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (courtRequestData: ICourtRequestData) =>
      editCourt(courtId, courtRequestData),
    {
      onSuccess: (response) => {
        if (!response.data.error) {
          updateCourtsState({ type: ECourtsActionType.resetCourtFormData });
          updateCourtsState({
            type: ECourtsActionType.openSuccessSnackbar,
            payload: true,
          });
          onClose();
          queryClient.invalidateQueries({ queryKey: ['courtsList'] });
          queryClient.invalidateQueries({ queryKey: ['court'] });
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
    },
  );
};

export default useEditCourtMutation;
