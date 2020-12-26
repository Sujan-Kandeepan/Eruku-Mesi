/**
 * Please note that the code here was auto generated from react native expo
 * For more information: https://reactnative.dev/docs/environment-setup
 */

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import About from './about.js';
import Chatbox from './chatbox.js';
import Events from './events.js';
import News from './News.js';

/**
 * Navigation template based off of: https://reactnative.dev/docs/navigation
 */

const Stack = createStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen 
          name="About" 
          component={About} 
        />
        <Stack.Screen 
          name="Chatbox" 
          component={Chatbox} 
        />
        <Stack.Screen 
          name="Events" 
          component={Events} 
        />
        <Stack.Screen 
          name="News" 
          component={News} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Home = ({ navigation }) => {
  return (
    <React.Fragment>
    <Button
      title="About page"
      onPress={() => navigation.navigate('About')}
    />
    <Button
      title="Chatbox page"
      onPress={() => navigation.navigate('Chatbox')}
    />
    <Button
      title="Events page"
      onPress={() => navigation.navigate('Events')}
    />
    <Button
      title="News page"
      onPress={() => navigation.navigate('News')}
    />
    </React.Fragment>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
