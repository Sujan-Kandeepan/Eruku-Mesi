import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AppPage from './AppPage';
import EventForm from './EventForm';
import { Button } from '../shared/SharedComponents';
import SharedStyles from '../shared/SharedStyles';

// Initialize stack navigator
const Stack = createStackNavigator();

export default function EventsCalendar(props) {
  const pages = {
    createEvent: 'Create Event'
  };
  return (
    <AppPage {...props}>
      <NavigationContainer style={SharedStyles.container} theme={props.theme} independent>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Events Calendar' children={(localProps) =>
            <>
              {props.admin &&
                <Button {...props} {...localProps} text={pages.createEvent}
                  onPress={() => localProps.navigation.push(pages.createEvent)} />}
              <View style={SharedStyles.container}>
                <Text style={{ color: props.theme.colors.text }}>{props.route.name}</Text>
              </View>
            </>} />
          {props.admin &&
            <Stack.Screen name={pages.createEvent} children={(localProps) =>
              <EventForm {...props} {...localProps} />} />}
        </Stack.Navigator>
      </NavigationContainer>
    </AppPage>
  );
};