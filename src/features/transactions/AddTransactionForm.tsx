import * as React from 'react';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import {
  Autocomplete,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import { EFormFieldType, IFormField } from '../../types/universalTypes';
import { useTranslation } from 'react-i18next';
import {
  DateValidationError,
  LocalizationProvider,
  PickerChangeHandlerContext,
} from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ITransactionResponseObject } from '../../types/transactionsTypes';
import { useTransactions } from '../../store/contexts/TransactionsContext';
import { ETransactionsActionType } from '../../types/transactionsTypes';
import { mapApiResponseToAutocompleteOptions } from './helpers/transactionsHelpers';
import debounce from 'lodash.debounce';
import { formFields } from './data/addTransactionFormItemsData';
import useGetCaseNumbersWithNamesQuery from '../../hooks/queries/cases/useGetCaseNumbersWithNamesQuery';

const AddTransactionForm = () => {
  const { t } = useTranslation();
  const {
    state: { addTransactionForm, addTransactionAutocompleteValues },
    dispatch: updateTransactionsState,
  } = useTransactions();

  const { data: caseNumberWithNameOptions, isFetching } =
    useGetCaseNumbersWithNamesQuery({
      search: addTransactionAutocompleteValues.caseNumber,
    });

  const transactionTypeOptions: ITransactionResponseObject[] = [
    { id: 1, type: 'fee' },
    { id: 2, type: 'legal_fee' },
    { id: 3, type: 'payment' },
    { id: 4, type: 'withdrawal' },
  ];

  const handleChange =
    (name: string, type: EFormFieldType, format?: RegExp) =>
    (
      event:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | React.SyntheticEvent<Element, Event>
        | null
        | any,
      checked?:
        | boolean
        | PickerChangeHandlerContext<DateValidationError>
        | ITransactionResponseObject,
    ) => {
      switch (type) {
        case EFormFieldType.toggle:
          updateTransactionsState({
            type: ETransactionsActionType.addTransactionForm,
            payload: { name, fieldValue: checked },
          });
          break;
        case EFormFieldType.input:
          const { value } = event?.target as HTMLTextAreaElement;
          let fieldValue = value;
          if (format) {
            fieldValue = value.replace(format, '');
            updateTransactionsState({
              type: ETransactionsActionType.addTransactionForm,
              payload: { name, fieldValue },
            });
          } else {
            updateTransactionsState({
              type: ETransactionsActionType.addTransactionForm,
              payload: { name, fieldValue },
            });
          }
          break;
        case EFormFieldType.checkbox:
          updateTransactionsState({
            type: ETransactionsActionType.addTransactionForm,
            payload: { name, fieldValue: checked },
          });
          break;
        case EFormFieldType.datepicker:
          updateTransactionsState({
            type: ETransactionsActionType.addTransactionForm,
            payload: { name, fieldValue: event },
          });
          break;
        case EFormFieldType.autocomplete:
          updateTransactionsState({
            type: ETransactionsActionType.addTransactionForm,
            payload: {
              name,
              fieldValue: checked
                ? mapApiResponseToAutocompleteOptions(
                    checked as ITransactionResponseObject,
                  )
                : '',
            },
          });
          break;
        default:
          break;
      }
    };

  const handleSubmit = () => console.log('Submitted');

  const renderFormField = (field: IFormField): JSX.Element | string => {
    const {
      name,
      type,
      gridClassName,
      formFieldClassName,
      gridWidth,
      options,
      size,
      format,
    } = field;
    switch (type) {
      case EFormFieldType.checkbox:
        return (
          <Grid className={gridClassName} item xs={gridWidth || 12} key={name}>
            <FormControlLabel
              control={
                <Checkbox
                  className={formFieldClassName}
                  name={name}
                  size={size ?? 'small'}
                  // @ts-ignore
                  checked={addTransactionForm[name] as boolean}
                  onChange={handleChange(name, type)}
                />
              }
              label={t(`entities.${name}`)}
            />
          </Grid>
        );
      case EFormFieldType.input:
        return (
          <Grid className={gridClassName} item xs={gridWidth || 12} key={name}>
            <TextField
              fullWidth
              className={formFieldClassName}
              size={size ?? 'small'}
              label={t(`entities.${name}`)}
              name={name}
              //  @ts-ignore
              value={addTransactionForm[name]}
              onChange={handleChange(name, type, format)}
            />
          </Grid>
        );
      case EFormFieldType.autocomplete:
        return (
          <Grid className={gridClassName} item xs={gridWidth || 12} key={name}>
            <Autocomplete
              fullWidth
              className={formFieldClassName}
              options={isFetching ? [] : options || []}
              getOptionLabel={(option) => {
                if (name === 'type' && option) {
                  return t(
                    `entities.${
                      mapApiResponseToAutocompleteOptions(option).name
                    }`,
                  );
                }
                return mapApiResponseToAutocompleteOptions(option).name;
              }}
              size={size ?? 'small'}
              //  @ts-ignore
              value={addTransactionForm[name]}
              onChange={handleChange(name, type)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t(`entities.${name}`)}
                  onChange={debounce(
                    (event) =>
                      updateTransactionsState({
                        type: ETransactionsActionType.addTransactionAutocompleteValues,
                        payload: {
                          inputName: name,
                          inputValue: event.target.value,
                        },
                      }),
                    300,
                  )}
                />
              )}
            />
          </Grid>
        );
      case EFormFieldType.datepicker:
        return (
          <Grid className={gridClassName} item xs={gridWidth || 12} key={name}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label={t(`entities.${name}`)}
                // @ts-ignore
                value={addTransactionForm[name]}
                className={formFieldClassName}
                slotProps={{
                  textField: { size: 'small', fullWidth: true },
                  actionBar: {
                    actions: ['clear'],
                  },
                }}
                format="DD. MM. YYYY"
                onChange={handleChange(name, type)}
              />
            </LocalizationProvider>
          </Grid>
        );
      default:
        return '';
    }
  };

  return (
    <ErrorBoundary>
      <Container>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {formFields({
              caseNumberWithNameOptions,
              transactionTypeOptions,
            }).map((field) => renderFormField(field))}
          </Grid>
        </form>
      </Container>
    </ErrorBoundary>
  );
};

export default AddTransactionForm;
