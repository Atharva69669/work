import Radio from '@mui/material/Radio';
import { styled } from '@mui/material/styles';

const CustomRadio = styled(Radio)(({ theme }) => ({
  color: '#1c1c1c',
  '&.Mui-checked': {
    color: '#1c1c1c',
  },
  '&:hover': {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  }
}));

export default function Example() {
  return (
    <CustomRadio />
  );
}
