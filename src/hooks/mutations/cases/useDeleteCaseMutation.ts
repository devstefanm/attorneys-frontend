import { setupAxios } from '../../../libs/axios/setupAxios';
import { ECasesActionType, ICaseRequestData } from '../../../types/casesTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteCase = async (
  caseId: number,
): Promise<IApiResponse<ICaseRequestData>> => {
  let response: IApiResponse<ICaseRequestData>;

  try {
    response = await setupAxios({
      method: 'delete',
      url: `api/case/${caseId}`,
      withCredentials: true,
    });
  } catch {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

  return response;
};

const useDeleteCaseMutation = (
  onClose: () => void,
  updateCasesState: React.Dispatch<any>,
  caseId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation(() => deleteCase(caseId), {
    onSuccess: (response) => {
      console.log('response', response.data);
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
      if (error?.response?.data?.message) {
        updateCasesState({
          type: ECasesActionType.openErrorSnackbar,
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

export default useDeleteCaseMutation;
