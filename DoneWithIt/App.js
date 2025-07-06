import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './app/screen/WelcomeScreen';
import ViewImageScreen from './app/screen/ViewImageScreen';
import LocationScreen from './app/screen/LocationScreen';
import MymusicScreen from './app/screen/MymusicScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="View"
          component={ViewImageScreen}
          options={{ title: 'Your Gallery' }}
        />
        <Stack.Screen
          name="Location"
          component={LocationScreen}
          options={{ title: 'Your GPS' }}
        />
        <Stack.Screen
          name="MyMusic"
          component={MymusicScreen}
          options={{
            title: 'Now Playing',
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}