import React, {useImperativeHandle, useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {Container, Input, Label, ReadonlyInput} from './style';

interface CustomTextInputProps {
  readonly?: boolean;
  label: string;
  value: string;
  percentageWidth?: number;
  onChange?: (text: string) => void;
  onPress?: () => void;
  onSubmit?: () => void;
}

export interface CustomTextInputRef {
  select: () => void;
}

export const CustomTextInput = React.forwardRef<
  CustomTextInputRef,
  CustomTextInputProps
>((props, ref) => {
  const {percentageWidth, readonly, label, value, onChange, onPress, onSubmit} =
    props;
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const select = () => {
    if (readonly) {
      if (onPress) {
        onPress();
      }
    } else {
      inputRef.current?.focus();
    }
  };

  useImperativeHandle(ref, () => {
    return {select} as CustomTextInputRef;
  });

  return (
    <Container percentageWidth={percentageWidth}>
      <Label focused={focused}>{label}</Label>
      {readonly ? (
        <ReadonlyInput onPress={onPress}>{value}</ReadonlyInput>
      ) : (
        <Input
          ref={inputRef}
          focused={focused}
          value={value}
          onChangeText={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onSubmitEditing={onSubmit}
          returnKeyType="next"
        />
      )}
    </Container>
  );
});
