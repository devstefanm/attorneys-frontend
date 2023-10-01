import * as React from 'react';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import {
  Box,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import { formFields } from './data/addCityFormItemsData';
import { EFormFieldType, IFormField } from '../../types/universalTypes';
import { useTranslation } from 'react-i18next';
import { useCities } from '../../store/contexts/CitiesContext';
import {
  DateValidationError,
  LocalizationProvider,
  PickerChangeHandlerContext,
} from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DynamicInputs } from '../../components/DynamicInputs';
import {
  ECitiesActionType,
  ICityResponseObject,
} from '../../types/citiesTypes';
import useGetCityQuery from '../../hooks/queries/cities/useGetCityQuery';

const EditCityForm = () => {
  const { t } = useTranslation();
  const {
    state: { editCityForm, editCityId },
    dispatch: updateCitiesState,
  } = useCities();

  const {
    data: editCityFormData,
    isLoading,
    isSuccess,
  } = useGetCityQuery(editCityId as number);

  React.useEffect(() => {
    if (isSuccess && editCityFormData?.name) {
      updateCitiesState({
        type: ECitiesActionType.setCityFormData,
        payload: editCityFormData,
      });
    }
  }, [editCityFormData?.name]);

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
        | ICityResponseObject,
    ) => {
      switch (type) {
        case EFormFieldType.input:
          const { value } = event?.target as HTMLTextAreaElement;
          let fieldEditValue = value;
          if (format) {
            if (fieldEditValue.match(format)) {
              updateCitiesState({
                type: ECitiesActionType.editCityForm,
                payload: { editName: name, fieldEditValue },
              });
            }
          } else {
            updateCitiesState({
              type: ECitiesActionType.editCityForm,
              payload: { editName: name, fieldEditValue },
            });
          }
          break;
        case EFormFieldType.checkbox:
          updateCitiesState({
            type: ECitiesActionType.editCityForm,
            payload: { editName: name, fieldEditValue: checked },
          });
          break;
        case EFormFieldType.datepicker:
          updateCitiesState({
            type: ECitiesActionType.editCityForm,
            payload: { editName: name, fieldEditValue: event },
          });
          break;
        case EFormFieldType.dynamicInputs:
          updateCitiesState({
            type: ECitiesActionType.editCityForm,
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
                  checked={editCityForm[name] as boolean}
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
              value={editCityForm[name]}
              onChange={handleChange(name, type, format)}
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
                value={editCityForm[name]}
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
              values={editCityForm[name]}
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
            {formFields.map((field) => renderFormField(field))}
          </Grid>
        </form>
      </Container>
    </ErrorBoundary>
  );
};

export default EditCityForm;
