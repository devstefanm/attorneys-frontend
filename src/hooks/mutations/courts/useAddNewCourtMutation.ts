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

  try {
    response = await setupAxios({
      method: 'post',
      url: 'api/courts',
      data: courtRequestData,
      withCredentials: true,
    });
  } catch {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

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
          onClose();
          queryClient.invalidateQueries({ queryKey: ['courtsList'] });
        }
        return response.data.message;
      },
      onError: (error) => {
        return { error: error, message: 'Connection problem' };
      },
    },
  );
};

export default useAddNewCourtMutation;
