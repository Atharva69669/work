import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';

import schema from './schema.json';
import uischema from './uischema.json';

import CustomCheckboxRenderer from './CustomCheckboxRenderer.tsx';
import { CustomCheckboxTester } from './CustomCheckboxTester.ts';

const customRenderers = [
  ...materialRenderers,
  { tester: CustomCheckboxTester, renderer: CustomCheckboxRenderer },
];

export default function CustomRender(): JSX.Element {
  const [data, setData] = useState<Record<string, any>>({});

  return (
    <JsonForms
      schema={schema}
      uischema={uischema}
      data={data}
      onChange={({ data }) => setData(data)}
      renderers={customRenderers}
      cells={materialCells}
    />
  );
}
