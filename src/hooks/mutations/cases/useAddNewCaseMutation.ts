import { setupAxios } from '../../../libs/axios/setupAxios';
import { ICaseRequestData } from '../../../types/casesTypes';
import { ETableActionType, IApiResponse } from '../../../types/universalTypes';
import { useMutation } from '@tanstack/react-query';

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
  return useMutation(
    (caseRequestData: ICaseRequestData) => addNewCase(caseRequestData),
    {
      onSuccess: (response) => {
        updateCasesState({ type: ETableActionType.resetCaseFormData });
        if (!response.data.error) {
          onClose();
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
