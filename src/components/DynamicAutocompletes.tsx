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
import { IAutocompleteOption } from '../types/casesTypes';
import debounce from 'lodash.debounce';
import { ETableActionType } from '../types/universalTypes';

type Props = {
  label: string;
  values?: IAutocompleteOption[];
  options?: any[];
  autocompleteProps?: {
    size?: any;
    fullWidth?: boolean;
  };
  inputProps?: {
    label: string;
  };
  name?: string;
  actionType?: ETableActionType;
  onValuesChange?: (values: IAutocompleteOption[]) => void;
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
  onValuesChange,
  updateState,
}) => {
  const [autocompleteFields, setAutocompleteFields] = React.useState<
    IAutocompleteOption[]
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
    value: IAutocompleteOption,
  ) => {
    const newAutocompleteFields = [...autocompleteFields];
    newAutocompleteFields[index] = value;
    setAutocompleteFields(newAutocompleteFields);
    onValuesChange && onValuesChange(newAutocompleteFields);
  };

  return (
    <Box className="my-3">
      <Divider textAlign="left">{label}</Divider>
      {autocompleteFields.map((field, index) => (
        <Box className="flex my-3" key={index}>
          <Autocomplete
            {...autocompleteProps}
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
            value={field}
            onChange={(_, value) => handleAutocompleteChange(index, value)}
            renderInput={(params) => (
              <TextField
                {...params}
                {...inputProps}
                label={`${inputProps?.label} ${index + 1}`}
                onChange={debounce(
                  (event) =>
                    updateState &&
                    updateState({
                      type: actionType,
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
          {index > 0 ? (
            <IconButton onClick={() => removeAutocompleteField(index)}>
              <Remove />
            </IconButton>
          ) : (
            <Box className="w-[42px]" />
          )}
        </Box>
      ))}

      {autocompleteFields.length < 4 && (
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
