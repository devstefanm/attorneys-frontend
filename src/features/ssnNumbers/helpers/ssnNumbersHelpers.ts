import {
  IAddSSNNumberForm,
  IEditedSSNNumberFormData,
  ISSNNumberRequestData,
  IViewSSNNumberApiResponseData,
} from '../../../types/ssnNumbersTypes';

export const mapSSNNumbersToBorderColors = () => '#6b7280';

export const mapAddSSNNumberFormToRequestData = ({
  ssnNumber: ssn,
}: IAddSSNNumberForm): ISSNNumberRequestData => {
  return {
    ssn,
  };
};

export const mapSSNNumberApiResponseToEditSSNNumberForm = ({
  ssn,
}: IViewSSNNumberApiResponseData): IAddSSNNumberForm => {
  return {
    ssnNumber: ssn,
  };
};

export const mapEditSSNNumberFormToRequestData = ({
  ssnNumber,
}: IEditedSSNNumberFormData): Partial<ISSNNumberRequestData> => {
  if (ssnNumber !== undefined) {
    return {
      ssn: ssnNumber || null,
    };
  }
  return { ssn: null };
};
