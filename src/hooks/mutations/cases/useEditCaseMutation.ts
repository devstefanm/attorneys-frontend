import { setupAxios } from '../../../libs/axios/setupAxios';
import { ECasesActionType, ICaseRequestData } from '../../../types/casesTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const editCase = async (
  caseId: number,
  caseRequestData: ICaseRequestData,
): Promise<IApiResponse<ICaseRequestData>> => {
  let response: IApiResponse<ICaseRequestData>;

  try {
    response = await setupAxios({
      method: 'patch',
      url: `api/case/${caseId}`,
      data: caseRequestData,
      withCredentials: true,
    });
  } catch {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

  return response;
};

const useEditCaseMutation = (
  onClose: () => void,
  updateCasesState: React.Dispatch<any>,
  caseId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (caseRequestData: ICaseRequestData) => editCase(caseId, caseRequestData),
    {
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
    },
  );
};

export default useEditCaseMutation;
