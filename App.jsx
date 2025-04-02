import React, { useState } from 'react';
import { Select, MenuItem, FormControl, SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Custom styled Select component to match the simpler dropdown
const StyledSelect = styled(Select)({
  height: '38px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  backgroundColor: 'white',
  boxShadow: 'none',
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiSelect-select': {
    padding: '8px 14px',
  },
  '& .MuiSvgIcon-root': {
    right: '8px',
    color: '#666', // Making the arrow darker to match the image
  },
});

// TypeScript interface for component props
interface CustomDropDownProps {
  // Add any props your component needs
}

const CustomDropDown: React.FC<CustomDropDownProps> = () => {
  const [value, setValue] = useState<string>('');
  
  const handleChange = (event: SelectChangeEvent<string>) => {
    setValue(event.target.value);
  };
  
  return (
    <FormControl fullWidth>
      <StyledSelect
        value={value}
        onChange={handleChange}
        displayEmpty
        IconComponent={KeyboardArrowDownIcon} // Custom arrow icon
      >
        <MenuItem value="" disabled>
          None
        </MenuItem>
        <MenuItem value="option1">Option 1</MenuItem>
        <MenuItem value="option2">Option 2</MenuItem>
        {/* Add more options as needed */}
      </StyledSelect>
    </FormControl>
  );
};

export default CustomDropDown;
