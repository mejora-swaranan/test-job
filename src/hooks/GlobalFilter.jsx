import React, { useState } from 'react';
import { debounce } from 'lodash';

export const GlobalFilter = ({ filter, setFilter, titleText, placeholder }) => {
  const [value, setValue] = useState(filter);

  const onChange = debounce(value => {
    setFilter(value || undefined);
  }, 1000);

  return (
    <span>
      {titleText}{' '}
      <input
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={placeholder}
      />
    </span>
  );
};
