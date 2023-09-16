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
      if (!response.data.error) {
        updateCasesState({ type: ECasesActionType.resetCaseFormData });
        onClose();
        queryClient.invalidateQueries({ queryKey: ['casesList'] });
      }
      return response.data.message;
    },
    onError: (error) => {
      return { error: error, message: 'Connection problem' };
    },
  });
};

export default useDeleteCaseMutation;
