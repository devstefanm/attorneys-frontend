import {
  IAddSSNNumberForm,
  ISSNNumberRequestData,
} from '../../../types/ssnNumbersTypes';

export const mapSSNNumbersToBorderColors = () => '#6b7280';

export const mapAddSSNNumberFormToRequestData = ({
  ssnNumber: ssn,
}: IAddSSNNumberForm): ISSNNumberRequestData => {
  return {
    ssn,
  };
};
