import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import SvgIcon from '@mui/material/SvgIcon';
import { styled } from '@mui/material/styles';

interface CustomCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  disabled?: boolean;
}

const boxSize = 24;
const borderColor = '#1c1c1c';
const tickColor = '#1c1c1c';

// Unchecked icon
const CustomIcon = (
  <SvgIcon sx={{ fontSize: boxSize }}>
    <rect
      x="0"
      y="0"
      width="24"
      height="24"
      fill="none"
      stroke={borderColor}
      strokeWidth="1"
      rx="0"
      ry="0"
    />
  </SvgIcon>
);

// Checked icon
const CustomCheckedIcon = (
  <SvgIcon sx={{ fontSize: boxSize }}>
    <rect
      x="0"
      y="0"
      width="24"
      height="24"
      fill="none"
      stroke={borderColor}
      strokeWidth="1"
      rx="0"
      ry="0"
    />
    <polyline
      points="5,12 10,17 19,6"
      fill="none"
      stroke={tickColor}
      strokeWidth="2"
    />
  </SvgIcon>
);

// Disabled icon
const CustomDisabledIcon = (
  <SvgIcon sx={{ fontSize: boxSize }}>
    <rect
      x="0"
      y="0"
      width="24"
      height="24"
      fill="#f5f5f5"
      stroke="#bdbdbd"
      strokeWidth="1"
      rx="0"
      ry="0"
    />
  </SvgIcon>
);

const StyledCheckbox = styled(Checkbox)(() => ({
  padding: 4,
  '&:hover': {
    backgroundColor: 'transparent',
  },
  '& .MuiTouchRipple-root': {
    display: 'none',
  },
}));

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <FormControlLabel
      control={
        <StyledCheckbox
          checked={checked}
          onChange={onChange}
          icon={disabled ? CustomDisabledIcon : CustomIcon}
          checkedIcon={disabled ? CustomDisabledIcon : CustomCheckedIcon}
          disableRipple
          disabled={disabled}
        />
      }
      label={label}
    />
  );
};

export default CustomCheckbox;
