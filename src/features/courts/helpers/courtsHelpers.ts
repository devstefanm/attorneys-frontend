import {
  IAddCourtForm,
  ICourtRequestData,
  IEditedCourtFormData,
  IViewCourtApiResponseData,
} from '../../../types/courtsTypes';

export const mapCourtsToBorderColors = () => '#6b7280';

export const mapAddCourtFormToRequestData = ({
  name,
}: IAddCourtForm): ICourtRequestData => {
  return {
    name,
  };
};

export const mapCourtApiResponseToEditCourtForm = ({
  name,
}: IViewCourtApiResponseData): IAddCourtForm => {
  return {
    name,
  };
};

export const mapEditCourtFormToRequestData = ({
  name,
}: IEditedCourtFormData): Partial<ICourtRequestData> => {
  if (name !== undefined) {
    return {
      name: name || null,
    };
  }
  return { name: null };
};
