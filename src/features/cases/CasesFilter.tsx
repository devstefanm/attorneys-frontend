import { ErrorBoundary } from '../../components/ErrorBoundary';
import { FilterComponent, IOption } from '../../components/FilterComponent';
import { useTranslation } from 'react-i18next';
import { EState } from '../../types/casesTypes';
import { useCases } from '../../store/contexts/CasesContext';
import { ETableActionType } from '../../types/universalTypes';

const CasesFilter = () => {
  const {
    state: { filterable, pageable },
    dispatch: updateCasesState,
  } = useCases();

  const { t } = useTranslation();

  const options: IOption[] = [
    { id: 1, label: t('all'), value: EState.all },
    { id: 2, label: t('active'), value: EState.active },
    { id: 3, label: t('closed'), value: EState.closed },
  ];

  const handleChange = (value: any) => {
    updateCasesState({
      type: ETableActionType.filterable,
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
        label={t('entities.stateOfCases')}
        size="small"
        options={options}
        value={filterable}
        onChange={handleChange}
      />
    </ErrorBoundary>
  );
};

export { CasesFilter };
