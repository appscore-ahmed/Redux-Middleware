import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import { USER_NAME, PASSWORD } from '../types/types';
import firebase from 'firebase';

interface IProps {
  signIn: (username: string, password: string) => void;
}

const LoginFormComponent = ({ signIn, ...props }: IProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <View style={styles.viewStyle}>
        <Text>Username</Text>
        <CustomTextInput
          inputValue={setUsername}
          type={USER_NAME}
          text={username}
          hint='Username'
        />
      </View>
      <View style={styles.viewStyle}>
        <Text>Password</Text>
        <CustomTextInput
          inputValue={setPassword}
          type={PASSWORD}
          text={password}
          hint='Password'
        />
      </View>
      <View style={styles.viewStyle}>
        <Button
          title='Sign in'
          onPress={() => {
            signIn(username, password);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    marginVertical: 10,
  },
});

export default LoginFormComponent;
