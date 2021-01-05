import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import AppPage from './AppPage';
import EmptyPage from './EmptyPage';
import EventForm from './EventForm';
import { Button } from '../shared/SharedComponents';
import SharedStyles from '../shared/SharedStyles';

// Initialize stack/tab navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function UpcomingEventsPage(props) {
  const pages = {
    createEvent: 'Create Event',
    listView: 'List View',
    calendarView: 'Calendar View'
  };
  return (
    <AppPage {...props}>
      <NavigationContainer style={SharedStyles.container} theme={props.theme} independent>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={props.route.name} children={(localProps) =>
            <>
              {props.admin &&
                <Button {...props} {...localProps} text={pages.createEvent}
                  onPress={() => localProps.navigation.push(pages.createEvent)} />}
              <NavigationContainer style={SharedStyles.container} theme={props.theme} independent>
                {/* Reference: https://reactnavigation.org/docs/bottom-tab-navigator */}
                <Tab.Navigator tabBarOptions={{
                  // Reference: https://stackoverflow.com/a/63913237
                  labelStyle: {
                    fontSize: 14, position: 'absolute',
                    top: 0, bottom: 0, left: 0, right: 0,
                    textAlignVertical: 'center'
                  },
                }}>
                  <Tab.Screen name={pages.listView} children={(localProps) =>
                    <EmptyPage {...props} {...localProps} nested tab />} />
                  <Tab.Screen name={pages.calendarView} children={(localProps) =>
                    <EmptyPage {...props} {...localProps} nested tab />} />
                </Tab.Navigator>
              </NavigationContainer>
            </>} />
          {props.admin &&
            <Stack.Screen name={pages.createEvent} children={(localProps) =>
              <EventForm {...props} {...localProps} />} />}
        </Stack.Navigator>
      </NavigationContainer>
    </AppPage>
  );
};