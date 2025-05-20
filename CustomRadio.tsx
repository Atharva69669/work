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

const ICON_SIZE = 24;
const OUTER_RADIUS = 11;
const INNER_RADIUS = 7;
const STROKE_COLOR = '#1c1c1c';
const FILL_COLOR = '#1c1c1c';

const getRadioIcon = (checked: boolean) => (
  <SvgIcon sx={{ fontSize: ICON_SIZE }}>
    <circle cx="12" cy="12" r={OUTER_RADIUS} stroke={STROKE_COLOR} strokeWidth="2" fill="none" />
    {checked && <circle cx="12" cy="12" r={INNER_RADIUS} fill={FILL_COLOR} />}
  </SvgIcon>
);

const StyledRadio = styled(Radio)({
  padding: 4,
  '&:hover': {
    backgroundColor: 'transparent',
  },
  '& .MuiTouchRipple-root': {
    display: 'none',
  },
});

const CustomRadio: React.FC<CustomRadioProps> = ({ label, value, checked = false, onChange }) => {
  return (
    <FormControlLabel
      value={value}
      control={
        <StyledRadio
          checked={checked}
          onChange={onChange}
          icon={getRadioIcon(false)}
          checkedIcon={getRadioIcon(true)}
          disableRipple
        />
      }
      label={label}
    />
  );
};

export default CustomRadio;
