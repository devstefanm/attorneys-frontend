import { IAddCityForm, ICityRequestData } from '../../../types/citiesTypes';

export const mapCitiesToBorderColors = () => '#6b7280';

export const mapAddCityFormToRequestData = ({
  name,
}: IAddCityForm): ICityRequestData => {
  return {
    name,
  };
};
