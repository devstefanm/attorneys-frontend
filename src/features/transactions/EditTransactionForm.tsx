import * as React from 'react';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import {
  Autocomplete,
  Box,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import { formFields } from './data/addTransactionFormItemsData';
import { EFormFieldType, IFormField } from '../../types/universalTypes';
import { useTranslation } from 'react-i18next';
import { useTransactions } from '../../store/contexts/TransactionsContext';
import {
  DateValidationError,
  LocalizationProvider,
  PickerChangeHandlerContext,
} from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DynamicInputs } from '../../components/DynamicInputs';
import {
  ETransactionsActionType,
  ITransactionResponseObject,
} from '../../types/transactionsTypes';
import useGetTransactionQuery from '../../hooks/queries/transactions/useGetTransactionQuery';
import useGetCaseNumbersWithNamesQuery from '../../hooks/queries/cases/useGetCaseNumbersWithNamesQuery';
import { mapApiResponseToAutocompleteOptions } from './helpers/transactionsHelpers';
import debounce from 'lodash.debounce';
import useValidateUser from '../../hooks/utils/useValidateUser';

const EditTransactionForm = () => {
  const { t } = useTranslation();
  const { role } = useValidateUser();
  const {
    state: {
      editTransactionForm,
      editTransactionId,
      editTransactionAutocompleteValues,
    },
    dispatch: updateTransactionsState,
  } = useTransactions();

  const { data: caseNumberWithNameOptions, isFetching } =
    useGetCaseNumbersWithNamesQuery({
      search: editTransactionAutocompleteValues.caseNumber,
    });

  const transactionTypeOptions: ITransactionResponseObject[] = [
    { id: 1, type: 'fee' },
    { id: 2, type: 'legal_fee' },
    { id: 3, type: 'payment' },
    { id: 4, type: 'withdrawal' },
  ];

  const {
    data: editTransactionFormData,
    isLoading,
    isSuccess,
  } = useGetTransactionQuery(editTransactionId as number);

  React.useEffect(() => {
    if (isSuccess && editTransactionFormData?.caseNumber) {
      updateTransactionsState({
        type: ETransactionsActionType.setTransactionFormData,
        payload: editTransactionFormData,
      });
    }
  }, [editTransactionFormData?.caseNumber]);

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
        case EFormFieldType.input:
          const { value } = event?.target as HTMLTextAreaElement;
          let fieldEditValue = value;
          if (format) {
            if (fieldEditValue.match(format)) {
              updateTransactionsState({
                type: ETransactionsActionType.editTransactionForm,
                payload: { editName: name, fieldEditValue },
              });
            }
          } else {
            updateTransactionsState({
              type: ETransactionsActionType.editTransactionForm,
              payload: { editName: name, fieldEditValue },
            });
          }
          break;
        case EFormFieldType.checkbox:
          updateTransactionsState({
            type: ETransactionsActionType.editTransactionForm,
            payload: { editName: name, fieldEditValue: checked },
          });
          break;
        case EFormFieldType.datepicker:
          updateTransactionsState({
            type: ETransactionsActionType.editTransactionForm,
            payload: { editName: name, fieldEditValue: event },
          });
          break;
        case EFormFieldType.autocomplete:
          updateTransactionsState({
            type: ETransactionsActionType.editTransactionForm,
            payload: {
              editName: name,
              fieldEditValue: checked
                ? mapApiResponseToAutocompleteOptions(
                    checked as ITransactionResponseObject,
                  )
                : '',
            },
          });
          break;
        case EFormFieldType.dynamicInputs:
          updateTransactionsState({
            type: ETransactionsActionType.editTransactionForm,
            payload: { editName: name, fieldEditValue: event },
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
      size,
      subfieldName,
      format,
      options,
      required,
    } = field;
    switch (type) {
      case EFormFieldType.checkbox:
        return (
          <Grid className={gridClassName} item xs={gridWidth || 12} key={name}>
            <FormControlLabel
              required={required}
              control={
                <Checkbox
                  disabled={role?.toLowerCase() === 'visitor'}
                  className={formFieldClassName}
                  name={name}
                  size={size ?? 'small'}
                  // @ts-ignore
                  checked={editTransactionForm[name] as boolean}
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
              disabled={role?.toLowerCase() === 'visitor'}
              required={required}
              fullWidth
              className={formFieldClassName}
              size={size ?? 'small'}
              label={t(`entities.${name}`)}
              name={name}
              //  @ts-ignore
              value={editTransactionForm[name]}
              onChange={handleChange(name, type, format)}
            />
          </Grid>
        );
      case EFormFieldType.autocomplete:
        return (
          <Grid className={gridClassName} item xs={gridWidth || 12} key={name}>
            <Autocomplete
              disabled={role?.toLowerCase() === 'visitor'}
              fullWidth
              clearIcon={false}
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
              value={editTransactionForm[name]}
              onChange={handleChange(name, type)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required={required}
                  label={t(`entities.${name}`)}
                  onBlur={() =>
                    updateTransactionsState({
                      type: ETransactionsActionType.editTransactionAutocompleteValues,
                      payload: {
                        inputName: name,
                        inputValue: '',
                      },
                    })
                  }
                  onChange={debounce(
                    (event) =>
                      updateTransactionsState({
                        type: ETransactionsActionType.editTransactionAutocompleteValues,
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
                disabled={role?.toLowerCase() === 'visitor'}
                localeText={{ clearButtonLabel: t('clear') }}
                label={t(`entities.${name}`)}
                // @ts-ignore
                value={editTransactionForm[name]}
                className={formFieldClassName}
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true,
                    required: required,
                  },
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
      case EFormFieldType.dynamicInputs:
        return (
          <Grid className={gridClassName} item xs={gridWidth || 12} key={name}>
            <DynamicInputs
              limit={name === 'phoneNumbers' ? 4 : 2}
              label={t(`entities.${name}`)}
              inputProps={{
                label: t(`entities.${subfieldName}`),
                size: 'small',
                fullWidth: true,
              }}
              // @ts-ignore
              values={editTransactionForm[name]}
              onValuesChange={handleChange(name, type)}
            />
          </Grid>
        );
      default:
        return '';
    }
  };

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center h-[300px]">
        <CircularProgress />
      </Box>
    );
  }

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

export default EditTransactionForm;
