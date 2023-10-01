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
import { formFields } from './data/addLawyerFormItemsData';
import { EFormFieldType, IFormField } from '../../types/universalTypes';
import { useTranslation } from 'react-i18next';
import { useLawyers } from '../../store/contexts/LawyersContext';
import {
  DateValidationError,
  LocalizationProvider,
  PickerChangeHandlerContext,
} from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DynamicInputs } from '../../components/DynamicInputs';
import useGetCitiesNamesQuery from '../../hooks/queries/cities/useGetCitiesNamesQuery';
import { mapApiResponseToAutocompleteOptions } from './helpers/lawyersHelpers';
import {
  ELawyersActionType,
  ILawyerResponseObject,
} from '../../types/lawyersTypes';
import debounce from 'lodash.debounce';

const AddLawyerForm = () => {
  const { t } = useTranslation();
  const {
    state: { addLawyerForm, addLawyerAutocompleteValues },
    dispatch: updateLawyersState,
  } = useLawyers();

  const { data: citiesOptions } = useGetCitiesNamesQuery({
    search: addLawyerAutocompleteValues.city,
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
        | ILawyerResponseObject,
    ) => {
      switch (type) {
        case EFormFieldType.input:
          const { value } = event?.target as HTMLTextAreaElement;
          let fieldValue = value;
          if (format) {
            if (fieldValue.match(format)) {
              updateLawyersState({
                type: ELawyersActionType.addLawyerForm,
                payload: { name, fieldValue },
              });
            }
          } else {
            updateLawyersState({
              type: ELawyersActionType.addLawyerForm,
              payload: { name, fieldValue },
            });
          }
          break;
        case EFormFieldType.checkbox:
          updateLawyersState({
            type: ELawyersActionType.addLawyerForm,
            payload: { name, fieldValue: checked },
          });
          break;
        case EFormFieldType.datepicker:
          updateLawyersState({
            type: ELawyersActionType.addLawyerForm,
            payload: { name, fieldValue: event },
          });
          break;
        case EFormFieldType.dynamicInputs:
          updateLawyersState({
            type: ELawyersActionType.addLawyerForm,
            payload: { name, fieldValue: event },
          });
          break;
        case EFormFieldType.autocomplete:
          updateLawyersState({
            type: ELawyersActionType.addLawyerForm,
            payload: {
              name,
              fieldValue: checked
                ? mapApiResponseToAutocompleteOptions(
                    checked as ILawyerResponseObject,
                  )
                : '',
            },
          });
          break;
        case EFormFieldType.dynamicAutocompletes:
          updateLawyersState({
            type: ELawyersActionType.addLawyerForm,
            payload: {
              name,
              fieldValue: event.map((e: ILawyerResponseObject) =>
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
                  checked={addLawyerForm[name] as boolean}
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
              value={addLawyerForm[name]}
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
              value={addLawyerForm[name]}
              onChange={handleChange(name, type)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required={required}
                  label={t(`entities.${name}`)}
                  onBlur={() =>
                    updateLawyersState({
                      type: ELawyersActionType.addLawyerAutocompleteValues,
                      payload: {
                        inputName: name,
                        inputValue: '',
                      },
                    })
                  }
                  onChange={debounce(
                    (event) =>
                      updateLawyersState({
                        type: ELawyersActionType.addLawyerAutocompleteValues,
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
                value={addLawyerForm[name]}
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
              values={addLawyerForm[name]}
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

export default AddLawyerForm;
