import { ErrorBoundary } from '../../components/ErrorBoundary';
import { FilterComponent, IOption } from '../../components/FilterComponent';
import { useTranslation } from 'react-i18next';
import { useCases } from '../../store/contexts/CasesContext';
import useGetClientsNamesQuery from '../../hooks/queries/clients/useGetClientsNamesQuery';
import { mapClientToFilterOption } from './helpers/casesHelpers';
import { ECasesActionType } from '../../types/casesTypes';
import { ETableActionType } from '../../types/universalTypes';

const CasesFilterByClient = () => {
  const {
    state: { filterableByClient, pageable },
    dispatch: updateCasesState,
  } = useCases();

  const { t } = useTranslation();

  const { data: clients, isSuccess } = useGetClientsNamesQuery({});
  let clientsOptions: IOption[] = [];
  if (isSuccess && clients) {
    clientsOptions = clients.map((option) => mapClientToFilterOption(option));
  }

  const options: IOption[] = [
    { id: 9999, label: t('all'), value: 9999 },
    ...clientsOptions,
  ];

  const handleChange = (value: any) => {
    updateCasesState({
      type: ECasesActionType.filterableByClient,
      payload: value,
    });
    updateCasesState({
      type: ETableActionType.pageable,
      payload: {
        ...pageable,
        page: 1,
      },
    });
  };

  return (
    <ErrorBoundary>
      <FilterComponent
        label={t('entities.client')}
        size="small"
        options={options}
        value={filterableByClient}
        onChange={handleChange}
      />
    </ErrorBoundary>
  );
};

export { CasesFilterByClient };
