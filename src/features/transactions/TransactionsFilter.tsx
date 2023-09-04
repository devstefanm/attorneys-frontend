import { ErrorBoundary } from '../../components/ErrorBoundary';
import { FilterComponent, IOption } from '../../components/FilterComponent';
import { useTranslation } from 'react-i18next';
import { ETransactionTypeFilter } from '../../types/transactionsTypes';
import { useTransactions } from '../../store/contexts/TransactionsContext';

const TransactionsFilter = () => {
  const {
    state: { filterable },
    dispatch: updateTransactionsState,
  } = useTransactions();

  const { t } = useTranslation();

  const options: IOption[] = [
    { id: 1, label: t('all'), value: ETransactionTypeFilter.all },
    {
      id: 2,
      label: t('entities.payments'),
      value: ETransactionTypeFilter.payment,
    },
    { id: 3, label: t('entities.fees'), value: ETransactionTypeFilter.fee },
    {
      id: 4,
      label: t('entities.legal_fees'),
      value: ETransactionTypeFilter.legal_fee,
    },
    {
      id: 5,
      label: t('entities.withdrawals'),
      value: ETransactionTypeFilter.withdrawal,
    },
  ];

  return (
    <ErrorBoundary>
      <FilterComponent
        label={t('entities.transactionType')}
        size="small"
        options={options}
        value={filterable}
        onChange={updateTransactionsState}
      />
    </ErrorBoundary>
  );
};

export { TransactionsFilter };
