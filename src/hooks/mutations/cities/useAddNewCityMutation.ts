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

  try {
    response = await setupAxios({
      method: 'post',
      url: 'api/cities',
      data: cityRequestData,
      withCredentials: true,
    });
  } catch {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

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
          onClose();
          queryClient.invalidateQueries({ queryKey: ['citiesList'] });
        }
        return response.data.message;
      },
      onError: (error) => {
        return { error: error, message: 'Connection problem' };
      },
    },
  );
};

export default useAddNewCityMutation;
