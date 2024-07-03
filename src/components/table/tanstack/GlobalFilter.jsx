import React, { useState } from 'react';
import { debounce } from 'lodash';

export const GlobalFilter = ({ filter, setFilter, columns }) => {
  const [value, setValue] = useState(filter);

  const onChange = debounce(value => {
    setFilter(value || undefined);
  }, 1000);

  return (
    <span>
      Search:{' '}
      <input
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </span>
  );
};
