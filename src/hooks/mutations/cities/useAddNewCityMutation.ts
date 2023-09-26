import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  ECitiesActionType,
  ICityRequestData,
} from '../../../types/citiesTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const addNewCity = async (
  cityRequestData: ICityRequestData,
): Promise<IApiResponse<ICityRequestData>> => {
  let response: IApiResponse<ICityRequestData>;

  response = await setupAxios({
    method: 'post',
    url: 'api/cities',
    data: cityRequestData,
    withCredentials: true,
  });

  return response;
};

const useAddNewCityMutation = (
  onClose: () => void,
  updateCitiesState: React.Dispatch<any>,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (cityRequestData: ICityRequestData) => addNewCity(cityRequestData),
    {
      onSuccess: (response) => {
        if (!response.data.error) {
          updateCitiesState({
            type: ECitiesActionType.resetCityFormData,
          });
          updateCitiesState({
            type: ECitiesActionType.openSuccessSnackbar,
            payload: true,
          });
          onClose();
          queryClient.invalidateQueries({ queryKey: ['citiesList'] });
        }
        return response.data.message;
      },
      onError: (error: any) => {
        console.error(error);
        updateCitiesState({
          type: ECitiesActionType.openErrorSnackbar,
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

export default useAddNewCityMutation;
