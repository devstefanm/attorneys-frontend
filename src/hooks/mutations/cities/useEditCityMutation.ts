import { setupAxios } from '../../../libs/axios/setupAxios';
import {
  ECitiesActionType,
  ICityRequestData,
} from '../../../types/citiesTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const editCity = async (
  cityId: number,
  cityRequestData: ICityRequestData,
): Promise<IApiResponse<ICityRequestData>> => {
  let response: IApiResponse<ICityRequestData>;

  response = await setupAxios({
    method: 'patch',
    url: `api/city/${cityId}`,
    data: cityRequestData,
    withCredentials: true,
  });

  return response;
};

const useEditCityMutation = (
  onClose: () => void,
  updateCitiesState: React.Dispatch<any>,
  cityId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (cityRequestData: ICityRequestData) => editCity(cityId, cityRequestData),
    {
      onSuccess: (response) => {
        if (!response.data.error) {
          updateCitiesState({ type: ECitiesActionType.resetCityFormData });
          updateCitiesState({
            type: ECitiesActionType.openSuccessSnackbar,
            payload: true,
          });
          onClose();
          queryClient.invalidateQueries({ queryKey: ['citiesList'] });
          queryClient.invalidateQueries({ queryKey: ['city'] });
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
    },
  );
};

export default useEditCityMutation;
