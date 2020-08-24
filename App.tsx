import React from 'react';
import AgeScreen from './src/screens/AgeScreen';
import LoginScreen from './src/screens/LoginScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ageReducer from './src/store/reducer/reducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { watchAgeUp } from './src/sagas/saga';

const sagaMiddleware = createSagaMiddleware();

const logger = createLogger();

/* To combine middlewares together, create an array of them */
const middlewares = [sagaMiddleware, thunk, logger];

/* when middlewares are combine, passing them to store needs
 to be done through "compose" with "..." prefix*/
const store = createStore(ageReducer, compose(applyMiddleware(...middlewares)));

/* sagas need to be run after store is mounted */
sagaMiddleware.run(watchAgeUp);

const navigator = createStackNavigator(
  {
    Age: {
      screen: AgeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      title: 'Redux-Middleware',
    },
    headerMode: 'none',
  }
);

const App = createAppContainer(navigator);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
