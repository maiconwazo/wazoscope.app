import React from 'react';
import {Label} from '../textInput/style';
import {
  Container,
  CustomRadioButton,
  OptionLabel,
  OptionContainer,
  OptionsContainer,
} from './style';

interface RadioButtonGroupProps {
  label: string;
  options: {label: string; value: string}[];
  value?: string;
  onValueChange?: (value: string) => void;
}

const RadioButtonGroup = (props: RadioButtonGroupProps) => {
  const {label, options, value, onValueChange} = props;

  return (
    <Container>
      <Label>{label}</Label>
      <OptionsContainer>
        {options.map(o => {
          return (
            <OptionContainer key={o.value}>
              <CustomRadioButton
                value={o.value}
                status={o.value === value ? 'checked' : 'unchecked'}
                onPress={onValueChange && (() => onValueChange(o.value))}
                color="lightblue"
                uncheckedColor="gray"
              />
              <OptionLabel
                onPress={onValueChange && (() => onValueChange(o.value))}>
                {o.label}
              </OptionLabel>
            </OptionContainer>
          );
        })}
      </OptionsContainer>
    </Container>
  );
};

export default RadioButtonGroup;
