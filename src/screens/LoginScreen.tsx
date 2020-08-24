import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LoginFormComponent from '../components/LoginFormComponent';
import firebase from 'firebase';
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
  useEffect(() => {
    firebase.initializeApp({
      apiKey: 'AIzaSyAX4uPmSuKrevRUX3giXmcwxDaleJANSII',
      authDomain: 'authentication-36258.firebaseapp.com',
      databaseURL: 'https://authentication-36258.firebaseio.com',
      projectId: 'authentication-36258',
      storageBucket: 'authentication-36258.appspot.com',
      messagingSenderId: '879618070231',
      appId: '1:879618070231:web:d9347bab650129f3038292',
      measurementId: 'G-2WVRZQCVEY',
    });
  }, [true]);

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
