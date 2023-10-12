import moment from 'moment';
import {FormControl, Select} from 'native-base';
import React from 'react';
import {View} from 'react-native';

const CategoryInput: React.FC<CategoryInput> = ({options, onChange}) => {
  const [optionsLabel, setOptionLabel] = React.useState('');
  return (
    <React.Fragment>
      <View>
        <Select h={'12'} onValueChange={itemValue => setOptionLabel(itemValue)}>
          {Object.keys(options).map((options, key) => {
            return (
              <Select.Item
                color={'muted.600'}
                key={key}
                label={options}
                value={options}
              />
            );
          })}
        </Select>
        {[...(options[optionsLabel] || [])].length > 0 && (
          <FormControl mt={'3'}>
            <FormControl.Label>{optionsLabel}</FormControl.Label>
            <Select h={'12'} onValueChange={itemValue => onChange(itemValue)}>
              {[...(options[optionsLabel] || [])].map((options, key) => {
                return (
                  <Select.Item
                    color={'muted.600'}
                    key={key}
                    label={options}
                    value={options}
                  />
                );
              })}
            </Select>
          </FormControl>
        )}
      </View>
    </React.Fragment>
  );
};

export default CategoryInput;
