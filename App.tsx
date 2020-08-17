import React from 'react';
import AgeScreen from './src/screens/AgeScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ageReducer from './src/store/reducer/reducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(ageReducer, applyMiddleware(thunk));

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
