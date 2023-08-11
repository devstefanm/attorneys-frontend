import { ITransactionsApiResponseData } from '../../../types/transactionsTypes';
import i18n from '../../../libs/i18next/i18n';

export const mapApiResponseToTableData = ({
  amount,
  case_number,
  excerpt_number,
  payment_date,
  posting_method,
  type,
}: ITransactionsApiResponseData) => ({
  amount,
  caseNumber: case_number,
  excerptNumber: excerpt_number,
  paymentDate: payment_date,
  postingMethod: posting_method,
  displayType: i18n.t(`entities.${type}`),
  type,
});
