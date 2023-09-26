import { setupAxios } from '../../../libs/axios/setupAxios';
import { ECasesActionType, ICaseRequestData } from '../../../types/casesTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const editCase = async (
  caseId: number,
  caseRequestData: ICaseRequestData,
): Promise<IApiResponse<ICaseRequestData>> => {
  let response: IApiResponse<ICaseRequestData>;

  response = await setupAxios({
    method: 'patch',
    url: `api/case/${caseId}`,
    data: caseRequestData,
    withCredentials: true,
  });

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
          updateCasesState({
            type: ECasesActionType.openSuccessSnackbar,
            payload: true,
          });
          onClose();
          queryClient.invalidateQueries({ queryKey: ['casesList'] });
          queryClient.invalidateQueries({ queryKey: ['case'] });
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
    },
  );
};

export default useEditCaseMutation;
