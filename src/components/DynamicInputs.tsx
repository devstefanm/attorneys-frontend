import { Add, Remove } from '@mui/icons-material';
import { Box, Divider, IconButton, TextField } from '@mui/material';
import * as React from 'react';

type Props = {
  label: string;
  values?: string[];
  inputProps?: {
    size?: any;
    label: string;
    fullWidth?: boolean;
  };
  onValuesChange?: (values: string[]) => void;
};

const DynamicInputs: React.FC<Props> = ({
  label,
  values,
  inputProps,
  onValuesChange,
}) => {
  const [inputFields, setInputFields] = React.useState<string[]>(
    values ?? [''],
  );

  React.useEffect(() => {
    if (values) setInputFields(values);
  }, [values]);

  const addInputField = () => {
    if (inputFields.length < 6) {
      const newInputFields = [...inputFields, ''];
      setInputFields(newInputFields);
      onValuesChange && onValuesChange(newInputFields);
    }
  };

  const removeInputField = (index: number) => {
    const newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    setInputFields(newInputFields);
    onValuesChange && onValuesChange(newInputFields);
  };

  const handleInputChange = (index: number, value: string) => {
    const newInputFields = [...inputFields];
    newInputFields[index] = value;
    setInputFields(newInputFields);
    onValuesChange && onValuesChange(newInputFields);
  };

  return (
    <Box className="my-3">
      <Divider textAlign="left">{label}</Divider>
      {inputFields.map((field, index) => (
        <Box className="flex my-3" key={index}>
          <TextField
            {...inputProps}
            label={`${inputProps?.label} ${index + 1}`}
            variant="outlined"
            value={field}
            onChange={(event) => handleInputChange(index, event.target.value)}
          />
          {index > 0 ? (
            <IconButton onClick={() => removeInputField(index)}>
              <Remove />
            </IconButton>
          ) : (
            <Box className="w-[42px]" />
          )}
        </Box>
      ))}

      {inputFields.length < 4 && (
        <Box className="flex justify-center">
          <IconButton onClick={addInputField}>
            <Add />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export { DynamicInputs };
