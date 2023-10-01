import {
  IAddTransactionForm,
  IEditedTransactionFormData,
  ITransactionRequestData,
  IViewTransactionApiResponseData,
} from './../../../types/transactionsTypes';
import {
  ETransactionType,
  ITransactionResponseObject,
} from '../../../types/transactionsTypes';
import { IAutocompleteOption } from '../../../types/universalTypes';
import {
  reverseDateFormat,
  transformDateFormat,
} from '../../../utils/transformData';

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

export const mapTransactionApiResponseToEditTransactionForm = ({
  amount,
  case: { id, case_number, first_name, last_name, name },
  payment_date,
  posting_method,
  type,
}: IViewTransactionApiResponseData): IAddTransactionForm => {
  const transactionTypeOptions: ITransactionResponseObject[] = [
    { id: 1, type: 'fee' },
    { id: 2, type: 'legal_fee' },
    { id: 3, type: 'payment' },
    { id: 4, type: 'withdrawal' },
  ];

  const typeObject = transactionTypeOptions.find(
    (option) => option.type === type,
  );

  return {
    amount: String(amount),
    caseNumber: {
      id,
      name: `${case_number} ${
        first_name
          ? `- (${first_name} ${last_name})`
          : name
          ? `- (${name})`
          : ''
      }`,
    },
    type: typeObject as IAutocompleteOption<ETransactionType>,
    paymentDate: payment_date ? reverseDateFormat(payment_date) : null,
    postingMethod: posting_method,
  };
};

export const mapEditTransactionFormToRequestData = ({
  amount,
  caseNumber,
  paymentDate,
  postingMethod,
  type,
}: IEditedTransactionFormData): Partial<ITransactionRequestData> => {
  const requestData: Partial<ITransactionRequestData> = {};

  if (amount !== undefined) requestData.amount = Number(amount) || null;

  if (caseNumber !== undefined) {
    if (typeof caseNumber !== 'string') {
      requestData.case_id = caseNumber.id || null;
    } else if (caseNumber === '') {
      requestData.case_id = null;
    }
  }

  if (paymentDate !== undefined) {
    requestData.payment_date = paymentDate
      ? transformDateFormat(paymentDate)
      : null;
  }

  if (postingMethod !== undefined) {
    requestData.posting_method = postingMethod || null;
  }

  if (type !== undefined) {
    if (typeof type !== 'string') {
      requestData.type = type.name || null;
    } else if (type === '') {
      requestData.type = null;
    }
  }

  return requestData;
};
