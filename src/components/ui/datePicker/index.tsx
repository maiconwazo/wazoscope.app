import {format} from 'date-fns';
import React, {useState} from 'react';
import {View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {CustomTextInput, CustomTextInputRef} from '../textInput';

interface CustomDatePickerProps {
  date: Date;
  label: string;
  onDateChange(date: Date): void;
}

const DatePicker = React.forwardRef<CustomTextInputRef, CustomDatePickerProps>(
  (props, ref) => {
    const {label, date, onDateChange} = props;
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const handleConfirm = (d: Date) => {
      hideDatePicker();
      onDateChange(d);
    };

    return (
      <View>
        <CustomTextInput
          readonly
          ref={ref}
          label={label}
          value={format(date, 'dd/MM/yyyy')}
          onPress={showDatePicker}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={date}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    );
  },
);

export default DatePicker;
