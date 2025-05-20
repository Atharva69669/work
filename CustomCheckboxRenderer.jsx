import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import CustomCheckbox from './CustomCheckbox';

const CustomCheckboxRenderer = ({ data, handleChange, path, label, visible, enabled }) => {
  if (!visible) {
    return null;
  }

  return (
    <CustomCheckbox
      label={label}
      checked={!!data}
      onChange={(e) => handleChange(path, e.target.checked)}
      disabled={!enabled}
    />
  );
};

export default withJsonFormsControlProps(CustomCheckboxRenderer);
