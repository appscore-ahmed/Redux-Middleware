import React from 'react';
import AgeScreen from './src/screens/AgeScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ageReducer from './src/store/reducer/reducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { watchAgeUp } from './src/sagas/saga';

const sagaMiddleware = createSagaMiddleware();

/* To combine middlewares together, create an array of them */
const middlewares = [sagaMiddleware, thunk];

/* when middlewares are combine, passing them to store needs
 to be done through "compose" with "..." prefix*/
const store = createStore(ageReducer, compose(applyMiddleware(...middlewares)));

sagaMiddleware.run(watchAgeUp);

const navigator = createStackNavigator(
  {
    Age: {
      screen: AgeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Age',
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
