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
  Switch,
  TextField,
} from '@mui/material';
import { formFields } from './data/editCaseFormItemsData';
import { EFormFieldType, IFormField } from '../../types/universalTypes';
import { useTranslation } from 'react-i18next';
import { useCases } from '../../store/contexts/CasesContext';
import {
  DateValidationError,
  LocalizationProvider,
  PickerChangeHandlerContext,
} from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DynamicInputs } from '../../components/DynamicInputs';
import useGetCitiesNamesQuery from '../../hooks/queries/cities/useGetCitiesNamesQuery';
import useGetClientsNamesQuery from '../../hooks/queries/clients/useGetClientsNamesQuery';
import useGetCourtsNamesQuery from '../../hooks/queries/courts/useCourtsNamesQuery';
import useGetExecutorsNamesQuery from '../../hooks/queries/executors/useGetExecutorsNamesQuery';
import useGetLawyersNamesQuery from '../../hooks/queries/lawyers/useGetLawyersNamesQuery';
import useGetPackagesNamesQuery from '../../hooks/queries/packages/useGetPackagesNamesQuery';
import useGetSSNNumbersQuery from '../../hooks/queries/ssnNumbers/useGetSSNNumbersQuery';
import {
  calculateCurrentDebt,
  mapApiResponseToAutocompleteOptions,
} from './helpers/casesHelpers';
import {
  ECaseCategory,
  ECasesActionType,
  IAddCaseForm,
  ICaseResponseObject,
} from '../../types/casesTypes';
import debounce from 'lodash.debounce';
import useGetEmployersNamesQuery from '../../hooks/queries/employers/useGetEmployersNamesQuery';
import { DynamicAutocompletes } from '../../components/DynamicAutocompletes';
import useGetCaseByCaseIdQuery from '../../hooks/queries/cases/useGetCaseByCaseIdQuery';

const EditCaseForm = () => {
  const { t } = useTranslation();
  const {
    state: {
      isLegalEntity,
      editCaseForm,
      editCaseAutocompleteValues,
      editCaseId,
    },
    dispatch: updateCasesState,
  } = useCases();

  const {
    data: editCaseFormData,
    isLoading,
    isSuccess,
  } = useGetCaseByCaseIdQuery(editCaseId as number);

  React.useEffect(() => {
    if (isSuccess && editCaseFormData?.caseNumber) {
      updateCasesState({
        type: ECasesActionType.setCaseFormData,
        payload: editCaseFormData,
      });
    }
  }, [editCaseFormData?.caseNumber]);

  const { data: citiesOptions } = useGetCitiesNamesQuery({
    search: editCaseAutocompleteValues.city,
  });
  const { data: clientsOptions } = useGetClientsNamesQuery({
    search: editCaseAutocompleteValues.client,
  });

  const { data: courtsOptions } = useGetCourtsNamesQuery({
    search: editCaseAutocompleteValues.court,
  });

  const { data: executorsOptions } = useGetExecutorsNamesQuery({
    search: editCaseAutocompleteValues.executors,
  });

  const { data: lawyersOptions } = useGetLawyersNamesQuery({
    search: editCaseAutocompleteValues.lawyer,
  });

  const { data: packagesOptions } = useGetPackagesNamesQuery({
    search: editCaseAutocompleteValues.package,
  });

  const { data: ssnNumbersOptions } = useGetSSNNumbersQuery({
    search: editCaseAutocompleteValues.ssnNumber,
  });

  const { data: employersOptions } = useGetEmployersNamesQuery({
    search: editCaseAutocompleteValues.employer,
  });

  const caseCategoryOptions = [
    { id: ECaseCategory.withdrawn, name: t('entities.withdrawn') },
    { id: ECaseCategory.combined, name: t('entities.combined') },
    { id: ECaseCategory.obsolete, name: t('entities.obsolete') },
    { id: ECaseCategory.with_payment, name: t('entities.withPayment') },
  ];

  const handleChange =
    (editName: string, type: EFormFieldType, format?: RegExp) =>
    (
      event:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | React.SyntheticEvent<Element, Event>
        | null
        | any,
      checked?:
        | boolean
        | PickerChangeHandlerContext<DateValidationError>
        | ICaseResponseObject,
    ) => {
      switch (type) {
        case EFormFieldType.toggle:
          updateCasesState({
            type: ECasesActionType.editCaseForm,
            payload: { editName, fieldEditValue: checked },
          });
          break;
        case EFormFieldType.input:
        case EFormFieldType.textArea:
          const { value } = event?.target as HTMLTextAreaElement;
          let fieldEditValue = value;
          if (format) {
            if (fieldEditValue.match(format)) {
              updateCasesState({
                type: ECasesActionType.editCaseForm,
                payload: { editName, fieldEditValue },
              });
            }
          } else {
            updateCasesState({
              type: ECasesActionType.editCaseForm,
              payload: { editName, fieldEditValue },
            });
          }
          break;
        case EFormFieldType.checkbox:
          updateCasesState({
            type: ECasesActionType.editCaseForm,
            payload: { editName, fieldEditValue: checked },
          });
          break;
        case EFormFieldType.datepicker:
          updateCasesState({
            type: ECasesActionType.editCaseForm,
            payload: { editName, fieldEditValue: event },
          });
          break;
        case EFormFieldType.dynamicInputs:
          updateCasesState({
            type: ECasesActionType.editCaseForm,
            payload: { editName, fieldEditValue: event },
          });
          break;
        case EFormFieldType.autocomplete:
          updateCasesState({
            type: ECasesActionType.editCaseForm,
            payload: {
              editName,
              fieldEditValue: checked
                ? mapApiResponseToAutocompleteOptions(
                    checked as ICaseResponseObject,
                  )
                : '',
            },
          });
          break;
        case EFormFieldType.dynamicAutocompletes:
          updateCasesState({
            type: ECasesActionType.editCaseForm,
            payload: {
              editName,
              fieldEditValue: event.map((e: ICaseResponseObject) =>
                mapApiResponseToAutocompleteOptions(e),
              ),
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
      labelPlacement,
      options,
      size,
      subfieldName,
      format,
      required,
    } = field;
    switch (type) {
      case EFormFieldType.toggle:
        return (
          <Grid className={gridClassName} item xs={gridWidth || 12} key={name}>
            <FormControlLabel
              required={required}
              className={formFieldClassName}
              value={isLegalEntity}
              onChange={handleChange(name, type)}
              control={<Switch color="primary" />}
              label={t(`entities.${name}`)}
              labelPlacement={labelPlacement}
            />
          </Grid>
        );
      case EFormFieldType.checkbox:
        return (
          <Grid className={gridClassName} item xs={gridWidth || 12} key={name}>
            <FormControlLabel
              required={required}
              control={
                <Checkbox
                  className={formFieldClassName}
                  name={name}
                  size={size ?? 'small'}
                  // @ts-ignore
                  checked={editCaseForm[name] as boolean}
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
              required={required}
              fullWidth
              className={formFieldClassName}
              size={size ?? 'small'}
              label={t(`entities.${name}`)}
              name={name}
              //  @ts-ignore
              value={editCaseForm[name]}
              onChange={handleChange(name, type, format)}
            />
          </Grid>
        );
      case EFormFieldType.autocomplete:
        return (
          <Grid className={gridClassName} item xs={gridWidth || 12} key={name}>
            <Autocomplete
              isOptionEqualToValue={(option, value) => option.id === value.id}
              fullWidth
              clearIcon={false}
              className={formFieldClassName}
              options={options ?? []}
              getOptionLabel={(option) =>
                mapApiResponseToAutocompleteOptions(option).name
              }
              size={size ?? 'small'}
              //  @ts-ignore
              value={editCaseForm[name]?.id ? editCaseForm[name] : null}
              onChange={handleChange(name, type)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required={required}
                  label={t(`entities.${name}`)}
                  onBlur={() =>
                    updateCasesState({
                      type: ECasesActionType.editCaseAutocompleteValues,
                      payload: {
                        inputName: name,
                        inputValue: '',
                      },
                    })
                  }
                  onChange={debounce(
                    (event) =>
                      updateCasesState({
                        type: ECasesActionType.editCaseAutocompleteValues,
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
                localeText={{ clearButtonLabel: t('clear') }}
                label={t(`entities.${name}`)}
                // @ts-ignore
                value={editCaseForm[name]}
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
              values={editCaseForm[name]}
              onValuesChange={handleChange(name, type)}
            />
          </Grid>
        );
      case EFormFieldType.dynamicAutocompletes:
        return (
          <Grid className={gridClassName} item xs={gridWidth || 12} key={name}>
            <DynamicAutocompletes
              limit={name === 'phoneNumbers' ? 4 : 2}
              options={options}
              label={t(`entities.${name}`)}
              autocompleteProps={{
                size: 'small',
                fullWidth: true,
              }}
              inputProps={{
                label: t(`entities.${subfieldName}`),
              }}
              // @ts-ignore
              values={editCaseForm[name]}
              onValuesChange={handleChange(name, type)}
              actionType={ECasesActionType.editCaseAutocompleteValues}
              name={name}
              updateState={updateCasesState}
            />
          </Grid>
        );
      case EFormFieldType.textArea:
        return (
          <Grid className={gridClassName} item xs={gridWidth || 12} key={name}>
            <TextField
              required={required}
              fullWidth
              multiline
              className={formFieldClassName}
              size={size ?? 'small'}
              label={t(`entities.${name}`)}
              name={name}
              rows={2}
              //  @ts-ignore
              value={editCaseForm[name]}
              onChange={handleChange(name, type, format)}
            />
          </Grid>
        );
      default:
        return '';
    }
  };

  const renderCaseTransactions = (
    transactions: IAddCaseForm['transactions'],
  ) => {
    if (transactions) {
      const keyValueArray = Object.entries(transactions);

      return (
        <Container className="flex justify-between mb-10">
          <span className="text-xs">
            {t(`entities.current_debt`)}:{' '}
            {calculateCurrentDebt(editCaseForm, transactions)}
          </span>
          {keyValueArray.map(([key, value]) =>
            value ? (
              <span className="text-xs" key={key}>
                {t(`entities.${key}`)}: {value}
              </span>
            ) : (
              ''
            ),
          )}
        </Container>
      );
    }
    return '';
  };

  if (isLoading || !editCaseForm.caseNumber) {
    return (
      <Box className="flex justify-center items-center h-[1300px]">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ErrorBoundary>
      {isSuccess && editCaseFormData?.transactions
        ? renderCaseTransactions(editCaseFormData.transactions)
        : ''}
      <Container>
        {isSuccess && editCaseForm ? (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {formFields({
                citiesOptions,
                clientsOptions,
                courtsOptions,
                executorsOptions,
                lawyersOptions,
                packagesOptions,
                ssnNumbersOptions,
                employersOptions,
                caseCategoryOptions,
              }).map(
                (field) =>
                  (typeof field.condition !== 'boolean' ||
                    field.condition === editCaseForm.legalEntity) &&
                  (typeof field.secondCondition !== 'boolean' ||
                    field.secondCondition === editCaseForm.employed) &&
                  renderFormField(field),
              )}
            </Grid>
          </form>
        ) : (
          ''
        )}
      </Container>
    </ErrorBoundary>
  );
};

export default EditCaseForm;
