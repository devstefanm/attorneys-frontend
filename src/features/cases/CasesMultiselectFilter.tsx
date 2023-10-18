import { ErrorBoundary } from '../../components/ErrorBoundary';
import { FilterComponent, IOption } from '../../components/FilterComponent';
import { useTranslation } from 'react-i18next';
import { useCases } from '../../store/contexts/CasesContext';
import { ETableActionType } from '../../types/universalTypes';
import { ECasesActionType } from '../../types/casesTypes';

const CasesMultiselectFilter = () => {
  const {
    state: { filterableMultiselect, pageable },
    dispatch: updateCasesState,
  } = useCases();

  const { t } = useTranslation();

  const options: IOption[] = [
    { id: 1, label: t('all'), value: '', disabled: true },
    { id: 2, label: t('entities.hasObjection'), value: 'hasObjection' },
    { id: 3, label: t('entities.hasPayments'), value: 'hasPayments' },
  ];

  const handleChange = (value: any) => {
    if (value.length === 0) {
      updateCasesState({
        type: ECasesActionType.filterableMultiselect,
        payload: [''],
      });
    } else {
      if (value.length > 1 && value.some((item: string) => item === '')) {
        value = value.filter((item: string) => item !== '');
      }
      updateCasesState({
        type: ECasesActionType.filterableMultiselect,
        payload: value,
      });
    }
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
        className="w-96"
        label={t('entities.hasObjectionPayments')}
        size="small"
        options={options}
        value={filterableMultiselect}
        onChange={handleChange}
        multiple={true}
      />
    </ErrorBoundary>
  );
};

export { CasesMultiselectFilter };
