import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  ECitiesActionType,
  ICityRequestData,
} from '../../../types/citiesTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteCity = async (
  cityId: number,
): Promise<IApiResponse<ICityRequestData>> => {
  let response: IApiResponse<ICityRequestData>;

  response = await setupAxios({
    method: 'delete',
    url: `api/city/${cityId}`,
    withCredentials: true,
  });

  return response;
};

const useDeleteCityMutation = (
  onClose: () => void,
  updateCitiesState: React.Dispatch<any>,
  cityId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation(() => deleteCity(cityId), {
    onSuccess: (response) => {
      console.log('response', response.data);
      if (!response.data.error) {
        updateCitiesState({ type: ECitiesActionType.resetCityFormData });
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
      if (error?.response?.data?.message) {
        updateCitiesState({
          type: ECitiesActionType.openErrorSnackbar,
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

export default useDeleteCityMutation;
