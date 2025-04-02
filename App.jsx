import { Select, MenuItem, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';

// Create a styled version of the Select
const LeftAlignedSelect = styled(Select)({
  '& .MuiSelect-select': {
    paddingRight: '32px', // Make room for the dropdown icon
    textAlign: 'left',    // Align text to the left
  },
});

// In your component
function MyComponent() {
  const [value, setValue] = React.useState('');
  
  return (
    <FormControl fullWidth>
      <LeftAlignedSelect
        value={value}
        onChange={(e) => setValue(e.target.value)}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </LeftAlignedSelect>
    </FormControl>
  );
}

const LeftAlignedSelect = styled(Select)({
  '& .MuiSelect-select': {
    paddingRight: '32px',
    textAlign: 'left',
    minWidth: '120px', // Set a consistent minimum width
  },
});
