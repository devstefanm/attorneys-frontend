import * as React from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material';

export interface IOption {
  id: number;
  value: string | number;
  label: string;
  disabled?: boolean;
}

type Props = SelectProps & {
  options: IOption[];
  onChange: React.Dispatch<any>;
  multiple?: boolean;
};

const FilterComponent = (props: Props) => {
  const {
    label,
    value,
    onChange,
    options,
    size = 'small',
    multiple = false,
    className = '',
  } = props;

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const { value } = event.target;
    onChange && onChange(value);
  };

  return (
    <ErrorBoundary>
      <FormControl>
        <InputLabel>{label}</InputLabel>
        <Select
          className={`w-36 text-[15px] ${className}`}
          size={size}
          label={label}
          value={value}
          multiple={multiple}
          onChange={(event) => handleChange(event)}
        >
          {options.map((option) => (
            <MenuItem
              key={option.id}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ErrorBoundary>
  );
};

export { FilterComponent };
