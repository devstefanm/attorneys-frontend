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
import { formFields } from './data/addExecutorFormItemsData';
import { EFormFieldType, IFormField } from '../../types/universalTypes';
import { useTranslation } from 'react-i18next';
import { useExecutors } from '../../store/contexts/ExecutorsContext';
import {
  DateValidationError,
  LocalizationProvider,
  PickerChangeHandlerContext,
} from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DynamicInputs } from '../../components/DynamicInputs';
import useGetCitiesNamesQuery from '../../hooks/queries/cities/useGetCitiesNamesQuery';
import { mapApiResponseToAutocompleteOptions } from './helpers/executorsHelpers';
import {
  EExecutorsActionType,
  IExecutorResponseObject,
} from '../../types/executorsTypes';
import debounce from 'lodash.debounce';

const AddExecutorForm = () => {
  const { t } = useTranslation();
  const {
    state: { addExecutorForm, addExecutorAutocompleteValues },
    dispatch: updateExecutorsState,
  } = useExecutors();

  const { data: citiesOptions } = useGetCitiesNamesQuery({
    search: addExecutorAutocompleteValues.city,
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
        | IExecutorResponseObject,
    ) => {
      switch (type) {
        case EFormFieldType.input:
          const { value } = event?.target as HTMLTextAreaElement;
          let fieldValue = value;
          if (format) {
            if (fieldValue.match(format)) {
              updateExecutorsState({
                type: EExecutorsActionType.addExecutorForm,
                payload: { name, fieldValue },
              });
            }
          } else {
            updateExecutorsState({
              type: EExecutorsActionType.addExecutorForm,
              payload: { name, fieldValue },
            });
          }
          break;
        case EFormFieldType.checkbox:
          updateExecutorsState({
            type: EExecutorsActionType.addExecutorForm,
            payload: { name, fieldValue: checked },
          });
          break;
        case EFormFieldType.datepicker:
          updateExecutorsState({
            type: EExecutorsActionType.addExecutorForm,
            payload: { name, fieldValue: event },
          });
          break;
        case EFormFieldType.dynamicInputs:
          updateExecutorsState({
            type: EExecutorsActionType.addExecutorForm,
            payload: { name, fieldValue: event },
          });
          break;
        case EFormFieldType.autocomplete:
          updateExecutorsState({
            type: EExecutorsActionType.addExecutorForm,
            payload: {
              name,
              fieldValue: checked
                ? mapApiResponseToAutocompleteOptions(
                    checked as IExecutorResponseObject,
                  )
                : '',
            },
          });
          break;
        case EFormFieldType.dynamicAutocompletes:
          updateExecutorsState({
            type: EExecutorsActionType.addExecutorForm,
            payload: {
              name,
              fieldValue: event.map((e: IExecutorResponseObject) =>
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
      options,
      size,
      subfieldName,
      format,
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
                  className={formFieldClassName}
                  name={name}
                  size={size ?? 'small'}
                  // @ts-ignore
                  checked={addExecutorForm[name] as boolean}
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
              value={addExecutorForm[name]}
              onChange={handleChange(name, type, format)}
            />
          </Grid>
        );
      case EFormFieldType.autocomplete:
        return (
          <Grid className={gridClassName} item xs={gridWidth || 12} key={name}>
            <Autocomplete
              fullWidth
              clearIcon={false}
              className={formFieldClassName}
              options={options ?? []}
              getOptionLabel={(option) =>
                mapApiResponseToAutocompleteOptions(option).name
              }
              size={size ?? 'small'}
              //  @ts-ignore
              value={addExecutorForm[name]}
              onChange={handleChange(name, type)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required={required}
                  label={t(`entities.${name}`)}
                  onBlur={() =>
                    updateExecutorsState({
                      type: EExecutorsActionType.addExecutorAutocompleteValues,
                      payload: {
                        inputName: name,
                        inputValue: '',
                      },
                    })
                  }
                  onChange={debounce(
                    (event) =>
                      updateExecutorsState({
                        type: EExecutorsActionType.addExecutorAutocompleteValues,
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
                value={addExecutorForm[name]}
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
              values={addExecutorForm[name]}
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
            }).map((field) => renderFormField(field))}
          </Grid>
        </form>
      </Container>
    </ErrorBoundary>
  );
};

export default AddExecutorForm;
