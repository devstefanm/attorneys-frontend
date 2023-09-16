import { setupAxios } from '../../../libs/axios/setupAxios';
import { ECasesActionType, ICaseRequestData } from '../../../types/casesTypes';
import { IApiResponse } from '../../../types/universalTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const addNewCase = async (
  caseRequestData: ICaseRequestData,
): Promise<IApiResponse<ICaseRequestData>> => {
  let response: IApiResponse<ICaseRequestData>;

  try {
    response = await setupAxios({
      method: 'post',
      url: 'api/cases',
      data: caseRequestData,
      withCredentials: true,
    });
  } catch {
    response = { data: { error: 500, message: 'Connection problem' } };
  }

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

export default useAddNewCaseMutation;
