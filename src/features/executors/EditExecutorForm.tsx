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
import {
  EExecutorsActionType,
  IExecutorResponseObject,
} from '../../types/executorsTypes';
import useGetExecutorQuery from '../../hooks/queries/executors/useGetExecutorQuery';
import { mapApiResponseToAutocompleteOptions } from './helpers/executorsHelpers';
import debounce from 'lodash.debounce';
import useGetCitiesNamesQuery from '../../hooks/queries/cities/useGetCitiesNamesQuery';

const EditExecutorForm = () => {
  const { t } = useTranslation();
  const {
    state: { editExecutorForm, editExecutorId, editExecutorAutocompleteValues },
    dispatch: updateExecutorsState,
  } = useExecutors();

  const { data: citiesOptions } = useGetCitiesNamesQuery({
    search: editExecutorAutocompleteValues.city,
  });

  const {
    data: editExecutorFormData,
    isLoading,
    isSuccess,
  } = useGetExecutorQuery(editExecutorId as number);

  React.useEffect(() => {
    if (isSuccess && editExecutorFormData?.firstName) {
      updateExecutorsState({
        type: EExecutorsActionType.setExecutorFormData,
        payload: editExecutorFormData,
      });
    }
  }, [editExecutorFormData?.firstName]);

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
          let fieldEditValue = value;
          if (format) {
            if (fieldEditValue.match(format)) {
              updateExecutorsState({
                type: EExecutorsActionType.editExecutorForm,
                payload: { editName: name, fieldEditValue },
              });
            }
          } else {
            updateExecutorsState({
              type: EExecutorsActionType.editExecutorForm,
              payload: { editName: name, fieldEditValue },
            });
          }
          break;
        case EFormFieldType.checkbox:
          updateExecutorsState({
            type: EExecutorsActionType.editExecutorForm,
            payload: { editName: name, fieldEditValue: checked },
          });
          break;
        case EFormFieldType.datepicker:
          updateExecutorsState({
            type: EExecutorsActionType.editExecutorForm,
            payload: { editName: name, fieldEditValue: event },
          });
          break;
        case EFormFieldType.dynamicInputs:
          updateExecutorsState({
            type: EExecutorsActionType.editExecutorForm,
            payload: { editName: name, fieldEditValue: event },
          });
          break;
        case EFormFieldType.autocomplete:
          updateExecutorsState({
            type: EExecutorsActionType.editExecutorForm,
            payload: {
              editName: name,
              fieldEditValue: checked
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
              editName: name,
              fieldEditValue: event.map((e: IExecutorResponseObject) =>
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
                  checked={editExecutorForm[name] as boolean}
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
              value={editExecutorForm[name]}
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
              value={editExecutorForm[name]}
              onChange={handleChange(name, type)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required={required}
                  label={t(`entities.${name}`)}
                  onBlur={() =>
                    updateExecutorsState({
                      type: EExecutorsActionType.editExecutorAutocompleteValues,
                      payload: {
                        inputName: name,
                        inputValue: '',
                      },
                    })
                  }
                  onChange={debounce(
                    (event) =>
                      updateExecutorsState({
                        type: EExecutorsActionType.editExecutorAutocompleteValues,
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
                value={editExecutorForm[name]}
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
              values={editExecutorForm[name]}
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

export default EditExecutorForm;
