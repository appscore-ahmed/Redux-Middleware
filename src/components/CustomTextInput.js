import React from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import { Colors } from '../styles/index';
import { PASSWORD } from '../types/types';
import { interpolate } from 'react-native-reanimated';

/* TODO:
convert to typescript
uncomment following:
interface props {
  text: string;
  type: string;
  hint: string;
  inputValue: (text: string) => void;
} */

const CustomTextInput = ({ text, type, hint, inputValue }) => {
  return (
    <View style={styles.viewStyle}>
      <TextInput
        style={styles.textInputStyle}
        placeholder={hint}
        value={text}
        onChangeText={(newText) => inputValue(newText)}
        secureTextEntry={type === PASSWORD}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    borderColor: Colors.BORDER_COLOR,
    borderRadius: 4,
    borderWidth: 1,
    height: 45,
  },
  textInputStyle: {
    flex: 1,
    textAlign: 'center',
  },
});

export default CustomTextInput;
