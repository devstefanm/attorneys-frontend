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
import {
  ELawyersActionType,
  ILawyerResponseObject,
} from '../../types/lawyersTypes';
import useGetLawyerQuery from '../../hooks/queries/lawyers/useGetLawyerQuery';
import { mapApiResponseToAutocompleteOptions } from './helpers/lawyersHelpers';
import debounce from 'lodash.debounce';
import useGetCitiesNamesQuery from '../../hooks/queries/cities/useGetCitiesNamesQuery';

const EditLawyerForm = () => {
  const { t } = useTranslation();
  const {
    state: { editLawyerForm, editLawyerId, editLawyerAutocompleteValues },
    dispatch: updateLawyersState,
  } = useLawyers();

  const { data: citiesOptions } = useGetCitiesNamesQuery({
    search: editLawyerAutocompleteValues.city,
  });

  const {
    data: editLawyerFormData,
    isLoading,
    isSuccess,
  } = useGetLawyerQuery(editLawyerId as number);

  React.useEffect(() => {
    if (isSuccess && editLawyerFormData?.firstName) {
      updateLawyersState({
        type: ELawyersActionType.setLawyerFormData,
        payload: editLawyerFormData,
      });
    }
  }, [editLawyerFormData?.firstName]);

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
          let fieldEditValue = value;
          if (format) {
            if (fieldEditValue.match(format)) {
              updateLawyersState({
                type: ELawyersActionType.editLawyerForm,
                payload: { editName: name, fieldEditValue },
              });
            }
          } else {
            updateLawyersState({
              type: ELawyersActionType.editLawyerForm,
              payload: { editName: name, fieldEditValue },
            });
          }
          break;
        case EFormFieldType.checkbox:
          updateLawyersState({
            type: ELawyersActionType.editLawyerForm,
            payload: { editName: name, fieldEditValue: checked },
          });
          break;
        case EFormFieldType.datepicker:
          updateLawyersState({
            type: ELawyersActionType.editLawyerForm,
            payload: { editName: name, fieldEditValue: event },
          });
          break;
        case EFormFieldType.dynamicInputs:
          updateLawyersState({
            type: ELawyersActionType.editLawyerForm,
            payload: { editName: name, fieldEditValue: event },
          });
          break;
        case EFormFieldType.autocomplete:
          updateLawyersState({
            type: ELawyersActionType.editLawyerForm,
            payload: {
              editName: name,
              fieldEditValue: checked
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
              editName: name,
              fieldEditValue: event.map((e: ILawyerResponseObject) =>
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
                  className={formFieldClassName}
                  name={name}
                  size={size ?? 'small'}
                  // @ts-ignore
                  checked={editLawyerForm[name] as boolean}
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
              value={editLawyerForm[name]}
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
              value={editLawyerForm[name]}
              onChange={handleChange(name, type)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required={required}
                  label={t(`entities.${name}`)}
                  onBlur={() =>
                    updateLawyersState({
                      type: ELawyersActionType.editLawyerAutocompleteValues,
                      payload: {
                        inputName: name,
                        inputValue: '',
                      },
                    })
                  }
                  onChange={debounce(
                    (event) =>
                      updateLawyersState({
                        type: ELawyersActionType.editLawyerAutocompleteValues,
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
                value={editLawyerForm[name]}
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
              label={t(`entities.${name}`)}
              inputProps={{
                label: t(`entities.${subfieldName}`),
                size: 'small',
                fullWidth: true,
              }}
              // @ts-ignore
              values={editLawyerForm[name]}
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
              citiesOptions,
            }).map((field) => renderFormField(field))}
          </Grid>
        </form>
      </Container>
    </ErrorBoundary>
  );
};

export default EditLawyerForm;
