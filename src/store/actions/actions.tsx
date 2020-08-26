import { actionTypes } from '../actiontypes/actiontypes';
import { SIGN_IN, SIGN_IN_FAILED } from '../../types/types';
import firebase from 'firebase';

export const ageUpAsync = (value: number) => {
  console.log('ageUpAsync');
  return { type: actionTypes.INCREMENT, payload: value };
};

export const ageUp = (value: number) => {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(ageUpAsync(value));
    }, 1000);
  };
};

export const ageDown = (value: number) => {
  return { type: actionTypes.DECREMENT, payload: value };
};

export const fetchRandomUsers = () => {
  //for thunk
  const page = 1;
  return (dispatch: any) => {
    fetch(`https://randomuser.me/api/?results=10&page=${page}`)
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({
          type: actionTypes.FETCH_RANDOM_USERS,
          payload: responseJson.results,
        });
      })
      .catch((error) => {
        console.log('Error selecting random data: ' + error);
      });
  };
};

export const addToFirebaseDatabase = () => {
  const firebaseObject = firebase.database().ref('/');
  var key: string = firebaseObject.push().key;
  console.log(key);
  firebaseObject.child(key).set({ name: 'test' });
};

export const signInUser = (username: string, password: string) => {
  return (dispatch: any) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then((response) => response.user?.uid)
      .then((uid) => {
        console.log(uid);
        dispatch({ type: SIGN_IN, payload: uid });
        // addToFirebaseDatabase();
      })
      .catch((error) => dispatch({ type: SIGN_IN_FAILED, payload: error }));
  };
};
