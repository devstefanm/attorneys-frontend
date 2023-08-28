import * as React from 'react';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import {
  Autocomplete,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from '@mui/material';
import { formFields } from './data/addCaseFormItemsData';
import {
  EFormFieldType,
  ETableActionType,
  IFormField,
} from '../../types/universalTypes';
import { useTranslation } from 'react-i18next';
import { useCases } from '../../store/contexts/CasesContext';
import {
  DateValidationError,
  LocalizationProvider,
  PickerChangeHandlerContext,
} from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DynamicForm } from '../../components/DynamicForm';
import useGetCitiesNamesQuery from '../../hooks/queries/cities/useGetCitiesNamesQuery';
import useGetClientsNamesQuery from '../../hooks/queries/clients/useGetClientsNamesQuery';
import useGetCourtsNamesQuery from '../../hooks/queries/courts/useCourtsNamesQuery';
import useGetExecutorsNamesQuery from '../../hooks/queries/executors/useGetExecutorsNamesQuery';
import useGetLawyersNamesQuery from '../../hooks/queries/lawyers/useGetLawyersNamesQuery';
import useGetPackagesNamesQuery from '../../hooks/queries/packages/useGetPackagesNamesQuery';
import useGetSSNNumbersQuery from '../../hooks/queries/ssnNumbers/useGetSSNNumbersQuery';
import { mapApiResponseToAutocompleteOptions } from './helpers/casesHelpers';
import { IResponseObject } from '../../types/casesTypes';
import debounce from 'lodash.debounce';
import useGetEmployersNamesQuery from '../../hooks/queries/employers/useGetEmployersNamesQuery';

// type Props = {};

const AddCaseForm = () => {
  const { t } = useTranslation();
  const {
    state: { isLegalEntity, addCaseForm, addCaseAutocompleteValues },
    dispatch: updateCasesState,
  } = useCases();

  const { data: citiesOptions } = useGetCitiesNamesQuery({
    search: addCaseAutocompleteValues.city,
  });

  const { data: clientsOptions } = useGetClientsNamesQuery({
    search: addCaseAutocompleteValues.client,
  });

  const { data: courtsOptions } = useGetCourtsNamesQuery({
    search: addCaseAutocompleteValues.court,
  });

  const { data: executorsOptions } = useGetExecutorsNamesQuery({
    search: addCaseAutocompleteValues.executor,
  });

  const { data: lawyersOptions } = useGetLawyersNamesQuery({
    search: addCaseAutocompleteValues.lawyer,
  });

  const { data: packagesOptions } = useGetPackagesNamesQuery({
    search: addCaseAutocompleteValues.package,
  });

  const { data: ssnNumbersOptions } = useGetSSNNumbersQuery({
    search: addCaseAutocompleteValues.ssnNumber,
  });

  const { data: employersOptions } = useGetEmployersNamesQuery({
    search: addCaseAutocompleteValues.employer,
  });

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
        | IResponseObject,
    ) => {
      // @ts-ignore
      switch (type) {
        case EFormFieldType.toggle:
          if (name === 'legalEntity') {
            updateCasesState({
              type: ETableActionType.isLegalEntity,
              payload: !isLegalEntity,
            });
            updateCasesState({
              type: ETableActionType.addCaseForm,
              payload: { name, fieldValue: checked },
            });
          } else {
            updateCasesState({
              type: ETableActionType.addCaseForm,
              payload: { name, fieldValue: checked },
            });
          }
          break;
        case EFormFieldType.input:
          const { value } = event?.target as HTMLTextAreaElement;
          let fieldValue = value;
          if (format) {
            fieldValue = value.replace(format, '');
            updateCasesState({
              type: ETableActionType.addCaseForm,
              payload: { name, fieldValue },
            });
          } else {
            updateCasesState({
              type: ETableActionType.addCaseForm,
              payload: { name, fieldValue },
            });
          }
          break;
        case EFormFieldType.checkbox:
          updateCasesState({
            type: ETableActionType.addCaseForm,
            payload: { name, fieldValue: checked },
          });
          break;
        case EFormFieldType.datepicker:
          updateCasesState({
            type: ETableActionType.addCaseForm,
            payload: { name, fieldValue: event },
          });
          break;
        case EFormFieldType.dynamicForm:
          updateCasesState({
            type: ETableActionType.addCaseForm,
            payload: { name, fieldValue: event },
          });
          break;
        case EFormFieldType.autocomplete:
          updateCasesState({
            type: ETableActionType.addCaseForm,
            payload: {
              name,
              fieldValue: checked
                ? mapApiResponseToAutocompleteOptions(
                    checked as IResponseObject,
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
      labelPlacement,
      options,
      size,
      subfieldName,
      format,
    } = field;
    switch (type) {
      case EFormFieldType.toggle:
        return (
          <Grid className={gridClassName} item xs={gridWidth || 12} key={name}>
            <FormControlLabel
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
              control={
                <Checkbox
                  className={formFieldClassName}
                  name={name}
                  size={size ?? 'small'}
                  // @ts-ignore
                  checked={addCaseForm[name] as boolean}
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
              value={addCaseForm[name]}
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
              options={options ?? []}
              getOptionLabel={(option) =>
                mapApiResponseToAutocompleteOptions(option).name
              }
              size={size ?? 'small'}
              //  @ts-ignore
              value={addCaseForm[name]}
              onChange={handleChange(name, type)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t(`entities.${name}`)}
                  onChange={debounce(
                    (event) =>
                      updateCasesState({
                        type: ETableActionType.addCaseAutocompleteValues,
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
                value={addCaseForm[name]}
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
      case EFormFieldType.dynamicForm:
        return (
          <Grid className={gridClassName} item xs={gridWidth || 12} key={name}>
            <DynamicForm
              label={t(`entities.${name}`)}
              inputProps={{
                label: t(`entities.${subfieldName}`),
                size: 'small',
                fullWidth: true,
              }}
              // @ts-ignore
              values={addCaseForm[name]}
              onValuesChange={handleChange(name, type)}
            />
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
              citiesOptions,
              clientsOptions,
              courtsOptions,
              executorsOptions,
              lawyersOptions,
              packagesOptions,
              ssnNumbersOptions,
              employersOptions,
            }).map(
              (field) =>
                (typeof field.condition !== 'boolean' ||
                  field.condition === isLegalEntity) &&
                (typeof field.secondCondition !== 'boolean' ||
                  field.secondCondition === addCaseForm.employed) &&
                renderFormField(field),
            )}
          </Grid>
        </form>
      </Container>
    </ErrorBoundary>
  );
};

export default AddCaseForm;