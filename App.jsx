import React, { useState } from 'react';
import { Select, MenuItem, FormControl, SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/material/styles';

// Create a styled version of the Select with TypeScript
const LeftAlignedSelect = styled(Select)({
  '& .MuiSelect-select': {
    paddingRight: '32px', // Make room for the dropdown icon
    textAlign: 'left',    // Align text to the left
  },
});

// In your component
const MyComponent: React.FC = () => {
  const [value, setValue] = useState<string>('');
  
  const handleChange = (event: SelectChangeEvent<string>) => {
    setValue(event.target.value as string);
  };
  
  return (
    <FormControl fullWidth>
      <LeftAlignedSelect
        value={value}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="10">Ten</MenuItem>
        <MenuItem value="20">Twenty</MenuItem>
        <MenuItem value="30">Thirty</MenuItem>
      </LeftAlignedSelect>
    </FormControl>
  );
};

export default MyComponent;
