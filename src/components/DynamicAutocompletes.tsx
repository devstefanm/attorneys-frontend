import { Add, Remove } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Divider,
  IconButton,
  TextField,
} from '@mui/material';
import * as React from 'react';
import { mapApiResponseToAutocompleteOptions } from '../features/cases/helpers/casesHelpers';
import { IAutocompleteOption } from '../types/universalTypes';
import debounce from 'lodash.debounce';
import { ECasesActionType } from '../types/casesTypes';

type Props = {
  label: string;
  values?: IAutocompleteOption<string>[];
  options?: any[];
  autocompleteProps?: {
    size?: any;
    fullWidth?: boolean;
  };
  inputProps?: {
    label: string;
  };
  limit?: number;
  name?: string;
  actionType?: ECasesActionType;
  onValuesChange?: (values: IAutocompleteOption<string>[]) => void;
  updateState?: React.Dispatch<any>;
};

const DynamicAutocompletes: React.FC<Props> = ({
  label,
  values,
  autocompleteProps,
  inputProps,
  options,
  name,
  actionType,
  limit,
  onValuesChange,
  updateState,
}) => {
  const [autocompleteFields, setAutocompleteFields] = React.useState<
    IAutocompleteOption<string>[]
  >(values ?? [{ id: null, name: '' }]);

  React.useEffect(() => {
    if (values) setAutocompleteFields(values);
  }, [values]);

  const addAutocompleteField = () => {
    if (autocompleteFields.length < 6) {
      const newAutocompleteFields = [
        ...autocompleteFields,
        { id: null, name: '' },
      ];
      setAutocompleteFields(newAutocompleteFields);
      onValuesChange && onValuesChange(newAutocompleteFields);
    }
  };

  const removeAutocompleteField = (index: number) => {
    const newAutocompleteFields = [...autocompleteFields];
    newAutocompleteFields.splice(index, 1);
    setAutocompleteFields(newAutocompleteFields);
    onValuesChange && onValuesChange(newAutocompleteFields);
  };

  const handleAutocompleteChange = (
    index: number,
    value: IAutocompleteOption<string>,
  ) => {
    const newAutocompleteFields = [...autocompleteFields];
    newAutocompleteFields[index] = value;
    setAutocompleteFields(newAutocompleteFields);
    onValuesChange && onValuesChange(newAutocompleteFields);
  };

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const { value: inputValue } = event.target;
    const deboundedUpdateState = debounce(
      (inputValue) =>
        updateState &&
        updateState({
          type: actionType,
          payload: {
            inputName: name,
            inputValue: inputValue,
          },
        }),
      300,
    );
    deboundedUpdateState(inputValue);

    if (inputValue === '') {
      handleAutocompleteChange(index, { id: 0, name: inputValue });
    }
  };

  const handleInputChange = (
    event:
      | React.SyntheticEvent<Element, Event>
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    if (event?.currentTarget?.ariaLabel === 'Clear') {
      return handleAutocompleteChange(index, { id: 0, name: '' });
    }

    if (event?.target && 'value' in event.target) {
      const { value: inputValue } = event.target;

      if (inputValue === '') {
        return handleAutocompleteChange(index, { id: 0, name: '' });
      }
    }
  };

  return (
    <Box className="my-3">
      <Divider textAlign="left">{label}</Divider>
      {autocompleteFields.map((field, index) => (
        <Box className="flex my-3" key={index}>
          <Autocomplete
            {...autocompleteProps}
            clearIcon={false}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            options={options ?? []}
            getOptionLabel={(option) =>
              mapApiResponseToAutocompleteOptions(option).name
            }
            onBlur={() =>
              updateState &&
              updateState({
                type: actionType,
                payload: {
                  inputName: name,
                  inputValue: '',
                },
              })
            }
            value={field?.id ? field : null}
            onChange={(_, value) => handleAutocompleteChange(index, value)}
            onInputChange={(event) => handleInputChange(event, index)}
            renderInput={(params) => (
              <TextField
                {...params}
                {...inputProps}
                label={`${inputProps?.label} ${index + 1}`}
                onBlur={() =>
                  updateState &&
                  updateState({
                    type: actionType,
                    payload: {
                      inputName: name,
                      inputValue: '',
                    },
                  })
                }
                onChange={(event) => handleTextFieldChange(event, index)}
              />
            )}
          />
          {index > 0 ? (
            <IconButton onClick={() => removeAutocompleteField(index)}>
              <Remove />
            </IconButton>
          ) : (
            <Box className="w-[42px]" />
          )}
        </Box>
      ))}

      {autocompleteFields.length < (limit || 4) && (
        <Box className="flex justify-center">
          <IconButton onClick={addAutocompleteField}>
            <Add />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export { DynamicAutocompletes };
