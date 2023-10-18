import { ErrorBoundary } from '../../components/ErrorBoundary';
import { useTranslation } from 'react-i18next';
import { useTransactions } from '../../store/contexts/TransactionsContext';
import { ETableActionType } from '../../types/universalTypes';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ETransactionsActionType } from '../../types/transactionsTypes';

const TransactionsDateFilter = () => {
  const {
    state: { filterableDate, pageable },
    dispatch: updateTransactionsState,
  } = useTransactions();

  const { t } = useTranslation();

  const handleChange = (value: any) => {
    updateTransactionsState({
      type: ETransactionsActionType.filterableDate,
      payload: value,
    });
    updateTransactionsState({
      type: ETableActionType.pageable,
      payload: {
        ...pageable,
        page: 1,
      },
    });
  };

  return (
    <ErrorBoundary>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          localeText={{ clearButtonLabel: t('clear') }}
          label={t('entities.transactionsYoungerThan')}
          value={filterableDate}
          slotProps={{
            textField: {
              size: 'small',
              fullWidth: true,
            },
            actionBar: {
              actions: ['clear'],
            },
          }}
          format="DD. MM. YYYY"
          onChange={handleChange}
        />
      </LocalizationProvider>
    </ErrorBoundary>
  );
};

export { TransactionsDateFilter };
