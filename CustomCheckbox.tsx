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

const getCheckboxIcon = (type: 'unchecked' | 'checked' | 'disabled') => (
  <SvgIcon sx={{ fontSize: BOX_SIZE }}>
    <rect
      width="24"
      height="24"
      fill={type === 'disabled' ? DISABLED_FILL : '#ffffff'} // White background
      stroke={type === 'disabled' ? DISABLED_STROKE : BORDER_COLOR}
      strokeWidth="1"
    />
    {type === 'checked' && (
      <polyline
        points="5,12 10,17 19,6"
        fill="none"
        stroke={TICK_COLOR}
        strokeWidth="2"
      />
    )}
  </SvgIcon>
);

// Override all background styling to keep it white
const StyledCheckbox = styled(Checkbox)(() => ({
  padding: 4,
  backgroundColor: '#fff',
  '&:hover': {
    backgroundColor: '#fff', // ensure hover does not override
  },
  '&.Mui-checked': {
    backgroundColor: '#fff',
  },
  '&.Mui-disabled': {
    backgroundColor: DISABLED_FILL,
  },
  '& .MuiSvgIcon-root': {
    backgroundColor: '#fff',
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
