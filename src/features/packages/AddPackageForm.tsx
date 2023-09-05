import * as React from 'react';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import {
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import { formFields } from './data/addPackageFormItemsData';
import { EFormFieldType, IFormField } from '../../types/universalTypes';
import { useTranslation } from 'react-i18next';
import { usePackages } from '../../store/contexts/PackagesContext';
import {
  DateValidationError,
  LocalizationProvider,
  PickerChangeHandlerContext,
} from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DynamicInputs } from '../../components/DynamicInputs';
import {
  EPackagesActionType,
  IPackageResponseObject,
} from '../../types/packagesTypes';

const AddPackageForm = () => {
  const { t } = useTranslation();
  const {
    state: { addPackageForm },
    dispatch: updatePackagesState,
  } = usePackages();

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
        | IPackageResponseObject,
    ) => {
      switch (type) {
        case EFormFieldType.input:
          const { value } = event?.target as HTMLTextAreaElement;
          let fieldValue = value;
          if (format) {
            fieldValue = value.replace(format, '');
            updatePackagesState({
              type: EPackagesActionType.addPackageForm,
              payload: { name, fieldValue },
            });
          } else {
            updatePackagesState({
              type: EPackagesActionType.addPackageForm,
              payload: { name, fieldValue },
            });
          }
          break;
        case EFormFieldType.checkbox:
          updatePackagesState({
            type: EPackagesActionType.addPackageForm,
            payload: { name, fieldValue: checked },
          });
          break;
        case EFormFieldType.datepicker:
          updatePackagesState({
            type: EPackagesActionType.addPackageForm,
            payload: { name, fieldValue: event },
          });
          break;
        case EFormFieldType.dynamicInputs:
          updatePackagesState({
            type: EPackagesActionType.addPackageForm,
            payload: { name, fieldValue: event },
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
    } = field;
    switch (type) {
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
                  checked={addPackageForm[name] as boolean}
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
              value={addPackageForm[name]}
              onChange={handleChange(name, type, format)}
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
                value={addPackageForm[name]}
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
              values={addPackageForm[name]}
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
            {formFields.map((field) => renderFormField(field))}
          </Grid>
        </form>
      </Container>
    </ErrorBoundary>
  );
};

export default AddPackageForm;
