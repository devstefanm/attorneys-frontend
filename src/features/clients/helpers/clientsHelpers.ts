import {
  IAddClientForm,
  IClientRequestData,
} from '../../../types/clientsTypes';

export const mapClientsToBorderColors = () => '#6b7280';

export const mapAddClientFormToRequestData = ({
  name,
}: IAddClientForm): IClientRequestData => {
  return {
    name,
  };
};
