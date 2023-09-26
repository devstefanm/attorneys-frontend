import { setupAxios } from '../../../libs/axios/setupAxios';
import { ECasesActionType, ICaseRequestData } from '../../../types/casesTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const addNewCase = async (
  caseRequestData: ICaseRequestData,
): Promise<IApiResponse<ICaseRequestData>> => {
  let response: IApiResponse<ICaseRequestData>;

  response = await setupAxios({
    method: 'post',
    url: 'api/cases',
    data: caseRequestData,
    withCredentials: true,
  });

  return response;
};

const useAddNewCaseMutation = (
  onClose: () => void,
  updateCasesState: React.Dispatch<any>,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (caseRequestData: ICaseRequestData) => addNewCase(caseRequestData),
    {
      onSuccess: (response) => {
        if (!response.data.error) {
          updateCasesState({ type: ECasesActionType.resetCaseFormData });
          updateCasesState({
            type: ECasesActionType.openSuccessSnackbar,
            payload: true,
          });
          onClose();
          queryClient.invalidateQueries({ queryKey: ['casesList'] });
        }
        return response.data.message;
      },
      onError: (error: any) => {
        console.error(error);
        updateCasesState({
          type: ECasesActionType.openErrorSnackbar,
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

export default useAddNewCaseMutation;
