import {
  IAddClientForm,
  IClientRequestData,
  IEditedClientFormData,
  IViewClientApiResponseData,
} from '../../../types/clientsTypes';

export const mapClientsToBorderColors = () => '#6b7280';

export const mapAddClientFormToRequestData = ({
  name,
}: IAddClientForm): IClientRequestData => {
  return {
    name,
  };
};

export const mapClientApiResponseToEditClientForm = ({
  name,
}: IViewClientApiResponseData): IAddClientForm => {
  return {
    name,
  };
};

export const mapEditClientFormToRequestData = ({
  name,
}: IEditedClientFormData): Partial<IClientRequestData> => {
  if (name !== undefined) {
    return {
      name: name || null,
    };
  }
  return { name: null };
};
