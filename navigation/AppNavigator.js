import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';

import ViewAllPlayerScreen from '../screens/ViewAllPlayerScreen';

import EditPlayerScreen from '../screens/EditPlayerScreen';

import AddPlayerScreen from '../screens/AddPlayerScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="ViewAllPlayers">
        <Stack.Screen name="ViewAllPlayers" component={ViewAllPlayerScreen} options={{ title: 'Player Score Management System' }} />

        <Stack.Screen name="AddPlayer" component={AddPlayerScreen} options={{ title: 'Add Player Screen' }} />
        
        <Stack.Screen name="EditPlayer" component={EditPlayerScreen} options={{ title: 'Edit Player' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
