import moment from 'moment';
import {FormControl, Select, Text} from 'native-base';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

const TimeInput: React.FC<DateInputProps> = ({onChange}) => {
  const [time, setTime] = React.useState(new Date());
  const [showTime, setShowTime] = React.useState(false);
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
          setShowTime(!showTime);
        }}>
        <Text fontSize={'md'} mt={'3'} ml={'3'} color={'muted.600'}>
          {moment(time).format('MM:HH') || 'Select time'}
        </Text>
      </TouchableOpacity>
      <DatePicker
        testID="dateTimePicker"
        modal
        open={showTime}
        mode={'time'}
        onConfirm={time => {
          onChange(moment(time).format('MM:HH'));
          setTime(time);
        }}
        onCancel={() => setShowTime(false)}
        date={time}
      />
    </React.Fragment>
  );
};

export default TimeInput;
