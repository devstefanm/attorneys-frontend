import {
  ITransactionsApiResponseData,
  ITransactionsTableData,
} from '../../../types/transactionsTypes';
import i18n from '../../../libs/i18next/i18n';
import { uppercaseFirstLetter } from '../../../utils/transformData';

export const mapApiResponseToTableData = ({
  first_name,
  last_name,
  name,
  amount,
  case_number,
  excerpt_number,
  payment_date,
  posting_method,
  type,
}: ITransactionsApiResponseData): ITransactionsTableData => ({
  debtorsName: name
    ? uppercaseFirstLetter(name)
    : `${first_name ? uppercaseFirstLetter(first_name) : ''} ${
        last_name ? uppercaseFirstLetter(last_name) : ''
      }`,
  amount,
  caseNumber: case_number,
  excerptNumber: excerpt_number,
  paymentDate: payment_date,
  postingMethod: posting_method,
  displayType: i18n.t(`entities.${type}`),
  type,
});
