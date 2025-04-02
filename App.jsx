import { Select, MenuItem, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';

// Custom styled Select component to match the simpler dropdown
const CustomSelect = styled(Select)({
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
  },
});

// In your component:
function YourComponent() {
  const [value, setValue] = React.useState('');
  
  return (
    <FormControl fullWidth>
      <CustomSelect
        value={value}
        onChange={(e) => setValue(e.target.value)}
        displayEmpty
      >
        <MenuItem value="" disabled>
          None
        </MenuItem>
        <MenuItem value="option1">Option 1</MenuItem>
        <MenuItem value="option2">Option 2</MenuItem>
        {/* Add more options as needed */}
      </CustomSelect>
    </FormControl>
  );
}
