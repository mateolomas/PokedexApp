import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import PokemonDetailsScreen from '../screens/PokemonDetailsScreen';

const Stack = createNativeStackNavigator();

const NativeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={MainScreen} />
      <Stack.Screen name="Details" component={PokemonDetailsScreen} />
    </Stack.Navigator>
  );
};

export default NativeStack;
