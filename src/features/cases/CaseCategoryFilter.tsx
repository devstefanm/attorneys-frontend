import { ErrorBoundary } from '../../components/ErrorBoundary';
import { FilterComponent, IOption } from '../../components/FilterComponent';
import { useTranslation } from 'react-i18next';
import { ECaseCategory, ECasesActionType } from '../../types/casesTypes';
import { useCases } from '../../store/contexts/CasesContext';
import { ETableActionType } from '../../types/universalTypes';

const CaseCategoryFilter = () => {
  const {
    state: { caseCategory, pageable },
    dispatch: updateCasesState,
  } = useCases();

  const { t } = useTranslation();

  const options: IOption[] = [
    { id: 1, label: t('all'), value: ECaseCategory.all },
    { id: 2, label: t('entities.withdrawn'), value: ECaseCategory.withdrawn },
    { id: 3, label: t('entities.combined'), value: ECaseCategory.combined },
    { id: 4, label: t('entities.obsolete'), value: ECaseCategory.obsolete },
    {
      id: 5,
      label: t('entities.withPayment'),
      value: ECaseCategory.with_payment,
    },
  ];

  const handleChange = (value: any) => {
    updateCasesState({
      type: ECasesActionType.caseCategory,
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
        className="w-44"
        label={t('entities.caseCategory')}
        size="small"
        options={options}
        value={caseCategory}
        onChange={handleChange}
      />
    </ErrorBoundary>
  );
};

export { CaseCategoryFilter };
