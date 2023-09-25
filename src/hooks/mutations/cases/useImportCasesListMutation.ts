import { setupAxios } from '../../../libs/axios/setupAxios';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const importCasesList = async (
  file: File,
): Promise<IApiResponse<number[] | undefined>> => {
  let response: IApiResponse<number[]>;

  const formData = new FormData();
  formData.append('file', file);

  try {
    response = await setupAxios({
      method: 'post',
      url: 'api/import-cases-list',
      data: formData,
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

  return response;
};

const useImportCasesListMutation = (onClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation((file: File) => importCasesList(file), {
    onSuccess: (response) => {
      if (!response.data.error) {
        onClose();
        queryClient.invalidateQueries({ queryKey: ['casesList'] });
      }
      return response.data.message;
    },
    onError: (error) => {
      return { error, message: 'Connection problem' };
    },
  });
};

export default useImportCasesListMutation;
