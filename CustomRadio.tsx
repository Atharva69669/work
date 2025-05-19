import * as React from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';

const StyledRadio = styled(Radio)(({ theme }) => ({
  color: '#1c1c1c',
  '&.Mui-checked': {
    color: '#1c1c1c',
  },
  '&:hover': {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
}));

type CustomRadioProps = {
  label: string;
  value: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomRadio: React.FC<CustomRadioProps> = ({ label, value, checked, onChange }) => {
  return (
    <FormControlLabel
      value={value}
      control={<StyledRadio checked={checked} onChange={onChange} />}
      label={label}
    />
  );
};

export default CustomRadio;
