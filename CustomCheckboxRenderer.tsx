import React from 'react';
import { withJsonFormsControlProps, ControlProps } from '@jsonforms/react';
import CustomCheckbox from './CustomCheckbox';

const CustomCheckboxRenderer: React.FC<ControlProps> = ({
  data,
  handleChange,
  path,
  label,
  visible,
  enabled
}) => {
  if (!visible) {
    return null;
  }

  return (
    <CustomCheckbox
      label={label ?? ''}
      checked={!!data}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        handleChange(path, e.target.checked)
      }
      disabled={!enabled}
    />
  );
};

export default withJsonFormsControlProps(CustomCheckboxRenderer);
