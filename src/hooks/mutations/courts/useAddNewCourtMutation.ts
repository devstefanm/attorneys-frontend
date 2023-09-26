import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  ECourtsActionType,
  ICourtRequestData,
} from '../../../types/courtsTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const addNewCourt = async (
  courtRequestData: ICourtRequestData,
): Promise<IApiResponse<ICourtRequestData>> => {
  let response: IApiResponse<ICourtRequestData>;

  response = await setupAxios({
    method: 'post',
    url: 'api/courts',
    data: courtRequestData,
    withCredentials: true,
  });

  return response;
};

const useAddNewCourtMutation = (
  onClose: () => void,
  updateCourtsState: React.Dispatch<any>,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (courtRequestData: ICourtRequestData) => addNewCourt(courtRequestData),
    {
      onSuccess: (response) => {
        if (!response.data.error) {
          updateCourtsState({
            type: ECourtsActionType.resetCourtFormData,
          });
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
        updateCourtsState({
          type: ECourtsActionType.openErrorSnackbar,
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

export default useAddNewCourtMutation;
