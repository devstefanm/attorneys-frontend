import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useCases } from '../../store/contexts/CasesContext';
import { ECasesActionType } from '../../types/casesTypes';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
} from '@mui/material';
import { checklist } from './data/exportChecklistData';
import { EFormFieldType, IFormField } from '../../types/universalTypes';

const ExportCasesChecklist = () => {
  const { t } = useTranslation();
  const {
    state: { casesExportChecklistValues },
    dispatch: updateCasesState,
  } = useCases();

  const handleChange =
    (checkboxName: string) =>
    (_event: React.SyntheticEvent<Element, Event>, checkboxValue: boolean) => {
      updateCasesState({
        type: ECasesActionType.casesExportChecklistValues,
        payload: { checkboxName, checkboxValue },
      });
    };

  const renderFormField = (field: IFormField): JSX.Element | string => {
    const { name, type, gridWidth } = field;
    if (type === EFormFieldType.checkbox) {
      return (
        <Grid item xs={gridWidth || 4} key={name}>
          <FormControlLabel
            control={
              <Checkbox
                color="info"
                name={name}
                size="small"
                // @ts-ignore
                checked={casesExportChecklistValues[name] as boolean}
                onChange={handleChange(name)}
              />
            }
            label={t(`entities.${name}`)}
          />
        </Grid>
      );
    }
    return '';
  };

  const isCheckTrueAll = (): boolean => {
    const trueCount = Object.values(casesExportChecklistValues).reduce(
      (count, field) => {
        if (field) {
          return count + 1;
        }
        return count;
      },
      0,
    );

    return trueCount / checklist.length > 0.5;
  };

  return (
    <ErrorBoundary>
      <Container className="mx-4 my-6">
        <form>
          <Grid container spacing={1}>
            {checklist.map((field) => renderFormField(field))}
            <Grid item xs={12}>
              <Button
                color="info"
                onClick={() =>
                  updateCasesState({
                    type: ECasesActionType.casesCheckUncheckAll,
                    payload: !isCheckTrueAll(),
                  })
                }
                variant={isCheckTrueAll() ? 'outlined' : 'contained'}
                className="min-w-full mt-2"
              >
                {isCheckTrueAll() ? t('unselectAll') : t('selectAll')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </ErrorBoundary>
  );
};

export { ExportCasesChecklist };
