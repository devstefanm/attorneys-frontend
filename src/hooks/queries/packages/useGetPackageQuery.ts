import { useQuery } from '@tanstack/react-query';
import { setupAxios } from '../../../libs/axios/setupAxios';
import { IApiResponse } from '../../../types/universalTypes';
import { IViewPackageApiResponseData } from '../../../types/packagesTypes';
import { mapPackageApiResponseToEditPackageForm } from '../../../features/packages/helpers/packagesHelpers';

const getPackage = async (
  packageId: number,
): Promise<IApiResponse<IViewPackageApiResponseData>> => {
  let response: IApiResponse<IViewPackageApiResponseData>;
  if (packageId) {
    try {
      response = await setupAxios({
        method: 'get',
        url: `api/package/${packageId}`,
        withCredentials: true,
      });
    } catch (error) {
      response = { data: { error: 500, message: 'errors.serverError' } };
    }

    return response;
  }
  return { data: { error: 400, message: 'errors.notFound' } };
};

const useGetPackageQuery = (packageId: number) => {
  return useQuery(['package', packageId], () => getPackage(packageId), {
    keepPreviousData: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    select(data) {
      if (data.data.data) {
        return mapPackageApiResponseToEditPackageForm(data.data.data);
      }
    },
  });
};

export default useGetPackageQuery;
