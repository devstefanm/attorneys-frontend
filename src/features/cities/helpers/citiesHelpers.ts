import {
  IAddCityForm,
  ICityRequestData,
  IEditedCityFormData,
  IViewCityApiResponseData,
} from '../../../types/citiesTypes';

export const mapCitiesToBorderColors = () => '#6b7280';

export const mapAddCityFormToRequestData = ({
  name,
}: IAddCityForm): ICityRequestData => {
  return {
    name,
  };
};

export const mapCityApiResponseToEditCityForm = ({
  name,
}: IViewCityApiResponseData): IAddCityForm => {
  return {
    name,
  };
};

export const mapEditCityFormToRequestData = ({
  name,
}: IEditedCityFormData): Partial<ICityRequestData> => {
  if (name !== undefined) {
    return {
      name: name || null,
    };
  }
  return { name: null };
};
