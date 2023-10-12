import {Checkbox} from 'native-base';
import React from 'react';

const CheckedInput: React.FC<CheckedInputProps> = ({options, onChange}) => {
  const [value, setValue] = React.useState('');
  const [selected, setSelected] = React.useState(new Set());

  return (
    <Checkbox.Group
      onChange={value => {
        onChange(value);
      }}>
      {options.map((option, key) => {
        return (
          <Checkbox my={key} key={key} value={option} colorScheme="green">
            {option}
          </Checkbox>
        );
      })}
    </Checkbox.Group>
  );
};
export default CheckedInput;
