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
import { formFields } from './data/addCourtFormItemsData';
import { EFormFieldType, IFormField } from '../../types/universalTypes';
import { useTranslation } from 'react-i18next';
import { useCourts } from '../../store/contexts/CourtsContext';
import {
  DateValidationError,
  LocalizationProvider,
  PickerChangeHandlerContext,
} from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DynamicInputs } from '../../components/DynamicInputs';
import {
  ECourtsActionType,
  ICourtResponseObject,
} from '../../types/courtsTypes';
import useGetCourtQuery from '../../hooks/queries/courts/useGetCourtQuery';

const EditCourtForm = () => {
  const { t } = useTranslation();
  const {
    state: { editCourtForm, editCourtId },
    dispatch: updateCourtsState,
  } = useCourts();

  const {
    data: editCourtFormData,
    isLoading,
    isSuccess,
  } = useGetCourtQuery(editCourtId as number);

  React.useEffect(() => {
    if (isSuccess && editCourtFormData?.name) {
      updateCourtsState({
        type: ECourtsActionType.setCourtFormData,
        payload: editCourtFormData,
      });
    }
  }, [editCourtFormData?.name]);

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
        | ICourtResponseObject,
    ) => {
      switch (type) {
        case EFormFieldType.input:
          const { value } = event?.target as HTMLTextAreaElement;
          let fieldEditValue = value;
          if (format) {
            if (fieldEditValue.match(format)) {
              updateCourtsState({
                type: ECourtsActionType.editCourtForm,
                payload: { editName: name, fieldEditValue },
              });
            }
          } else {
            updateCourtsState({
              type: ECourtsActionType.editCourtForm,
              payload: { editName: name, fieldEditValue },
            });
          }
          break;
        case EFormFieldType.checkbox:
          updateCourtsState({
            type: ECourtsActionType.editCourtForm,
            payload: { editName: name, fieldEditValue: checked },
          });
          break;
        case EFormFieldType.datepicker:
          updateCourtsState({
            type: ECourtsActionType.editCourtForm,
            payload: { editName: name, fieldEditValue: event },
          });
          break;
        case EFormFieldType.dynamicInputs:
          updateCourtsState({
            type: ECourtsActionType.editCourtForm,
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
                  checked={editCourtForm[name] as boolean}
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
              value={editCourtForm[name]}
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
                value={editCourtForm[name]}
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
              values={editCourtForm[name]}
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

export default EditCourtForm;
