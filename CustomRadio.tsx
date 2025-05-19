import * as React from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import SvgIcon from '@mui/material/SvgIcon';
import { styled } from '@mui/material/styles';

type CustomRadioProps = {
  label: string;
  value: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// Outer circle (unselected)
const CustomIcon = (
  <SvgIcon sx={{ fontSize: 24 }}>
    <circle cx="12" cy="12" r="11" stroke="#1c1c1c" strokeWidth="2" fill="none" />
  </SvgIcon>
);

// Outer circle + inner 14px circle (selected)
const CustomCheckedIcon = (
  <SvgIcon sx={{ fontSize: 24 }}>
    <circle cx="12" cy="12" r="11" stroke="#1c1c1c" strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="7" fill="#1c1c1c" />
  </SvgIcon>
);

// Styled radio with no ripple and no hover shadow
const StyledRadio = styled(Radio)(() => ({
  padding: 4,
  '&:hover': {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  '& .MuiTouchRipple-root': {
    display: 'none',
  },
}));

const CustomRadio: React.FC<CustomRadioProps> = ({ label, value, checked, onChange }) => {
  return (
    <FormControlLabel
      value={value}
      control={
        <StyledRadio
          checked={checked}
          onChange={onChange}
          icon={CustomIcon}
          checkedIcon={CustomCheckedIcon}
          disableRipple
        />
      }
      label={label}
    />
  );
};

export default CustomRadio;
