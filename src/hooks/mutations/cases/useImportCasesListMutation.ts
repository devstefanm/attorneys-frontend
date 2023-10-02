import { setupAxios } from '../../../libs/axios/setupAxios';
import { ECasesActionType } from '../../../types/casesTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const importCasesList = async (
  file: File,
): Promise<IApiResponse<number[] | undefined>> => {
  let response: IApiResponse<number[]>;

  const formData = new FormData();
  formData.append('file', file);

  response = await setupAxios({
    method: 'post',
    url: 'api/import-cases-list',
    data: formData,
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

const useImportCasesListMutation = (
  onClose: () => void,
  updateCasesState: React.Dispatch<any>,
) => {
  const queryClient = useQueryClient();

  return useMutation((file: File) => importCasesList(file), {
    onSuccess: (response) => {
      if (!response.data.error) {
        updateCasesState({
          type: ECasesActionType.openSuccessSnackbar,
          payload: true,
        });
        updateCasesState({ type: ECasesActionType.resetCaseFormData });
        queryClient.invalidateQueries({ queryKey: ['casesList'] });

        setTimeout(() => {
          onClose();
        }, 1500);
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

export default useImportCasesListMutation;
