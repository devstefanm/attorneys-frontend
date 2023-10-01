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
import { formFields } from './data/addEmployerFormItemsData';
import { EFormFieldType, IFormField } from '../../types/universalTypes';
import { useTranslation } from 'react-i18next';
import { useEmployers } from '../../store/contexts/EmployersContext';
import {
  DateValidationError,
  LocalizationProvider,
  PickerChangeHandlerContext,
} from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DynamicInputs } from '../../components/DynamicInputs';
import {
  EEmployersActionType,
  IEmployerResponseObject,
} from '../../types/employersTypes';
import useGetEmployerQuery from '../../hooks/queries/employers/useGetEmployerQuery';

const EditEmployerForm = () => {
  const { t } = useTranslation();
  const {
    state: { editEmployerForm, editEmployerId },
    dispatch: updateEmployersState,
  } = useEmployers();

  const {
    data: editEmployerFormData,
    isLoading,
    isSuccess,
  } = useGetEmployerQuery(editEmployerId as number);

  React.useEffect(() => {
    if (isSuccess && editEmployerFormData?.name) {
      updateEmployersState({
        type: EEmployersActionType.setEmployerFormData,
        payload: editEmployerFormData,
      });
    }
  }, [editEmployerFormData?.name]);

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
        | IEmployerResponseObject,
    ) => {
      switch (type) {
        case EFormFieldType.input:
          const { value } = event?.target as HTMLTextAreaElement;
          let fieldEditValue = value;
          if (format) {
            if (fieldEditValue.match(format)) {
              updateEmployersState({
                type: EEmployersActionType.editEmployerForm,
                payload: { editName: name, fieldEditValue },
              });
            }
          } else {
            updateEmployersState({
              type: EEmployersActionType.editEmployerForm,
              payload: { editName: name, fieldEditValue },
            });
          }
          break;
        case EFormFieldType.checkbox:
          updateEmployersState({
            type: EEmployersActionType.editEmployerForm,
            payload: { editName: name, fieldEditValue: checked },
          });
          break;
        case EFormFieldType.datepicker:
          updateEmployersState({
            type: EEmployersActionType.editEmployerForm,
            payload: { editName: name, fieldEditValue: event },
          });
          break;
        case EFormFieldType.dynamicInputs:
          updateEmployersState({
            type: EEmployersActionType.editEmployerForm,
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
                  checked={editEmployerForm[name] as boolean}
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
              value={editEmployerForm[name]}
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
                value={editEmployerForm[name]}
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
              values={editEmployerForm[name]}
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

export default EditEmployerForm;
