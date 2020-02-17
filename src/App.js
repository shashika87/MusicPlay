import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import Home from './Screens/Home'
import Details from './Screens/Details'
import thunk from "redux-thunk";
import rootReducer from "./reducer/rootReducer";
const Stack = createStackNavigator();


const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);


 class App extends Component {
  render() {
    return (
<Provider store={ store }>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}  />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    );
  }
}
export default App
