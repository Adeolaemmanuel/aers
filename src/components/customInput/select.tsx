import {Select} from 'native-base';
import React from 'react';

const SelectInput: React.FC<SelectInputProps> = ({options, onChange}) => {
  return (
    <React.Fragment>
      <Select h={'12'} onValueChange={itemValue => onChange(itemValue)}>
        {options.map((option, key) => {
          return (
            <Select.Item
              color={'muted.600'}
              key={key}
              label={option}
              value={option}
            />
          );
        })}
      </Select>
    </React.Fragment>
  );
};

export default SelectInput;
