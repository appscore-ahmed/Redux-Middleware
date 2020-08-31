import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LoginFormComponent from '../components/LoginFormComponent';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actionCreator from '../store/actions/actions';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import { useNavigation } from '../hooks/useNavigation';

interface Age {
  age: number;
  sign_status: string;
  signInUser: (username: string, password: string) => void;
}

type navigation = NavigationScreenProp<NavigationState, NavigationParams>;

const navigateTo = (navigation: navigation, route: string) => {
  navigation.navigate(route);
};

const LoginScreen = (props: Age, navi: navigation) => {
  const navigation = useNavigation();
   
  return (
    <View style={styles.viewStyle}>
      <LoginFormComponent
        signIn={(username: string, password: string) => {
          props.signInUser(username, password);
          console.log('signIn clicked ' + username + ' ' + password);
        }}
      />
      <Text>{`test ${props.sign_status}`}</Text>
      {props.sign_status ? navigateTo(navigation, 'Age') : null}
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    marginHorizontal: 20,
    marginVertical: 50,
  },
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    signInUser: (username: string, password: string) => {
      dispatch(actionCreator.signInUser(username, password));
    },
  };
};

const mapStateToProps = (state: Age) => {
  return {
    sign_status: state.sign_status,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
