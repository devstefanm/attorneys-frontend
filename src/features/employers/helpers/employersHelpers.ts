import {
  IAddEmployerForm,
  IEmployerRequestData,
} from '../../../types/employersTypes';

export const mapEmployersToBorderColors = () => '#6b7280';

export const mapAddEmployerFormToRequestData = ({
  name,
}: IAddEmployerForm): IEmployerRequestData => {
  return {
    name,
  };
};
