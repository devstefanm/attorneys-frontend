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
import { ETableActionType } from '../types/universalTypes';

export interface IOption {
  id: number;
  value: string | number;
  label: string;
}

type Props = SelectProps & {
  options: IOption[];
  onChange: React.Dispatch<any>;
  actionType?: string;
};

const FilterComponent = (props: Props) => {
  const {
    label,
    value,
    onChange,
    options,
    size = 'small',
    actionType = ETableActionType.filterable,
  } = props;

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const { value } = event.target;
    onChange &&
      onChange({
        type: actionType,
        payload: value,
      });
  };

  return (
    <ErrorBoundary>
      <FormControl>
        <InputLabel>{label}</InputLabel>
        <Select
          className="w-36 text-[15px]"
          size={size}
          label={label}
          value={value}
          onChange={(event) => handleChange(event)}
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ErrorBoundary>
  );
};

export { FilterComponent };
