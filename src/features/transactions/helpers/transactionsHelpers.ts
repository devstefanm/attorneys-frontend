import {
  IAddTransactionForm,
  ITransactionRequestData,
} from './../../../types/transactionsTypes';
import {
  ETransactionType,
  ITransactionResponseObject,
} from '../../../types/transactionsTypes';
import { IAutocompleteOption } from '../../../types/universalTypes';
import { transformDateFormat } from '../../../utils/transformData';

export const mapTypeToBorderColor = (type: string) => {
  switch (type) {
    case ETransactionType.payment:
      return '#93c5fd';
    case ETransactionType.fee:
      return '#fde047';
    case ETransactionType.legal_fee:
      return '#f97316';
    case ETransactionType.withdrawal:
      return '#22C55E';
    default:
      return '#6b7280';
  }
};

export const mapApiResponseToAutocompleteOptions = (
  responseObject: ITransactionResponseObject,
): IAutocompleteOption<string> => {
  const {
    id,
    case_number,
    type,
    first_name,
    last_name,
    name: responseName,
  } = responseObject;
  let name = '';

  if (responseName) name = responseName;

  if (case_number) {
    name = `${case_number} ${
      first_name
        ? `- (${first_name} ${last_name})`
        : responseName
        ? `- (${responseName})`
        : ''
    }`;
  }

  if (type) {
    name = type;
  }

  return {
    id,
    name,
  };
};

export const mapAddTransactionFormToRequestData = ({
  amount,
  caseNumber,
  type,
  paymentDate,
  postingMethod,
}: IAddTransactionForm): ITransactionRequestData => {
  let case_number = '',
    payment_date = null,
    transactionType = '';

  if (typeof caseNumber !== 'string')
    case_number = caseNumber.name.split(' ')[0];
  if (paymentDate) payment_date = transformDateFormat(paymentDate);
  if (typeof type !== 'string') transactionType = type.name;

  return {
    amount: Number(amount),
    case_number,
    payment_date,
    posting_method: postingMethod || null,
    type: transactionType,
  };
};
