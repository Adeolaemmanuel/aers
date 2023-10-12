import moment from 'moment';
import {FormControl, Select, Text} from 'native-base';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

const DateInput: React.FC<DateInputProps> = ({onChange}) => {
  const [date, setDate] = React.useState(new Date());
  const [showDate, setShowDate] = React.useState(false);
  return (
    <React.Fragment>
      <TouchableOpacity
        style={{
          height: 50,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: '#d4d4d4',
        }}
        onPress={() => {
          setShowDate(!showDate);
        }}>
        <Text fontSize={'md'} mt={'3'} ml={'3'} color={'muted.600'}>
          {moment(date).format('DD/MM/YYYY') || 'Select date'}
        </Text>
      </TouchableOpacity>
      <DatePicker
        testID="dateTimePicker"
        modal
        open={showDate}
        mode={'date'}
        onConfirm={date => {
          onChange(moment(date).format('DD/MM/YYYY'));
          setDate(date);
        }}
        onCancel={() => setShowDate(false)}
        date={date}
      />
    </React.Fragment>
  );
};

export default DateInput;
