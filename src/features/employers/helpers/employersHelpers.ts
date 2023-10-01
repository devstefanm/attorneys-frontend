import {
  IAddEmployerForm,
  IEditedEmployerFormData,
  IEmployerRequestData,
  IViewEmployerApiResponseData,
} from '../../../types/employersTypes';

export const mapEmployersToBorderColors = () => '#6b7280';

export const mapAddEmployerFormToRequestData = ({
  name,
}: IAddEmployerForm): IEmployerRequestData => {
  return {
    name,
  };
};

export const mapEmployerApiResponseToEditEmployerForm = ({
  name,
}: IViewEmployerApiResponseData): IAddEmployerForm => {
  return {
    name,
  };
};

export const mapEditEmployerFormToRequestData = ({
  name,
}: IEditedEmployerFormData): Partial<IEmployerRequestData> => {
  if (name !== undefined) {
    return {
      name: name || null,
    };
  }
  return { name: null };
};
