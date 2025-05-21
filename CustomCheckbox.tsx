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

const BOX_SIZE = 24;
const BORDER_COLOR = '#1c1c1c';
const TICK_COLOR = '#1c1c1c';
const DISABLED_FILL = '#f5f5f5';
const DISABLED_STROKE = '#bdbdbd';

// Custom SVG icon for checkbox
const getCheckboxIcon = (type: 'unchecked' | 'checked' | 'disabled') => (
  <SvgIcon
    viewBox="0 0 24 24"
    sx={{ fontSize: BOX_SIZE }}
  >
    <rect
      x="0.5"
      y="0.5"
      width="23"
      height="23"
      rx="4"
      fill={type === 'disabled' ? DISABLED_FILL : '#ffffff'} // white background
      stroke={type === 'disabled' ? DISABLED_STROKE : BORDER_COLOR}
      strokeWidth="1"
    />
    {type === 'checked' && (
      <polyline
        points="5,12 10,17 19,6"
        fill="none"
        stroke={TICK_COLOR}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </SvgIcon>
);

// Styled checkbox to control ripple and background
const StyledCheckbox = styled(Checkbox)(() => ({
  padding: 4,
  backgroundColor: '#fff',
  boxSizing: 'border-box',
  display: 'inline-flex',
  '&:hover': {
    backgroundColor: '#fff',
  },
  '&.Mui-checked': {
    backgroundColor: '#fff',
  },
  '&.Mui-disabled': {
    backgroundColor: DISABLED_FILL,
  },
  '& .MuiSvgIcon-root': {
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  '& .MuiTouchRipple-root': {
    display: 'none',
  },
}));

// Final component
const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
}) => {
  const iconType = disabled ? 'disabled' : 'unchecked';
  const checkedIconType = disabled ? 'disabled' : 'checked';

  return (
    <FormControlLabel
      control={
        <StyledCheckbox
          checked={checked}
          onChange={onChange}
          icon={getCheckboxIcon(iconType)}
          checkedIcon={getCheckboxIcon(checkedIconType)}
          disableRipple
          disabled={disabled}
        />
      }
      label={label}
    />
  );
};

export default CustomCheckbox;
