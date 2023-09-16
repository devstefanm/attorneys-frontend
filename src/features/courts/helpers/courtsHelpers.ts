import { IAddCourtForm, ICourtRequestData } from '../../../types/courtsTypes';

export const mapCourtsToBorderColors = () => '#6b7280';

export const mapAddCourtFormToRequestData = ({
  name,
}: IAddCourtForm): ICourtRequestData => {
  return {
    name,
  };
};
