import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import AppPage from './AppPage';
import EmptyPage from './EmptyPage';
import EventForm from './EventForm';
import { Button, Content, Feed } from '../shared/SharedComponents';
import { get, truncate } from '../shared/SharedFunctions';
import SharedStyles from '../shared/SharedStyles';

// Initialize stack/tab navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function UpcomingEventsPage(props) {
  const pages = {
    createEvent: 'Create Event',
    viewEvent: id => `View Event ${id}`,
    editEvent: id => `Edit Event ${id}`,
    deleteEvent: id => `Delete Event ${id}`,
    listView: 'List View',
    calendarView: 'Calendar View'
  };
  const [events, setEvents] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  // Initial load of events by calling useEffect with [] as second param to run once
  React.useEffect(() => {
    // Wait for all events and trigger update to list by setting flag
    const populate = async () => {
      // Using lorem ipsum data for now with 10 events
      await Promise.all([...Array(10).keys()].map(index =>
        get('https://baconipsum.com/api/?type=all-meat&paras=2').then(description => {
          let newEvents = events;
          newEvents[index] = { id: index + 1, title: `Event ${index + 1}`, description };
          setEvents(newEvents);
        })));
      setFetched(true);
    };
    populate();
  }, []);
  return (
    <AppPage {...props}>
      <NavigationContainer style={SharedStyles.container} theme={props.theme} independent>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={props.route.name} children={(localProps) =>
            <>
              {/* Post event (navigate to form) */}
              {props.admin &&
                <Button {...props} {...localProps} text={pages.createEvent}
                  onPress={() => localProps.navigation.push(pages.createEvent)} />}
              {/* Display events as individual cards in scrolling feed */}
              <NavigationContainer style={SharedStyles.container} theme={props.theme} independent>
                {/* Reference: https://reactnavigation.org/docs/bottom-tab-navigator */}
                <Tab.Navigator tabBarOptions={{ labelStyle: {
                  fontSize: 14, margin: 15, textAlignVertical: 'center'
                }}}>
                  <Tab.Screen name={pages.listView} children={() =>
                    <Feed {...props} fetched={fetched} data={events} loadingText='Loading events...'
                      onItemPress={item => localProps.navigation.push(pages.viewEvent(item && item.id))}
                      keyExtractor={(item, index) => (item ? item.id : index).toString()}
                      cardContent={item =>
                        <>
                          <Text style={{ fontWeight: 'bold', color: props.theme.colors.text, marginBottom: 10 }}>
                            {item && item.title}
                          </Text>
                          <Text style={{ color: props.theme.colors.text }}>
                            {item && truncate(item.description[0], 10)}
                          </Text>
                        </>} />} />
                  <Tab.Screen name={pages.calendarView} children={(localProps) =>
                    <EmptyPage {...props} {...localProps} nested tab />} />
                </Tab.Navigator>
              </NavigationContainer>
            </>} />
          {/* Static page route for creating event */}
          {props.admin &&
            <Stack.Screen name={pages.createEvent} children={(localProps) =>
              <EventForm {...props} {...localProps} events={events} setEvents={setEvents} />} />}
          {/* Generated page routes for viewing events */}
          {events.map(event =>
            <Stack.Screen key={event.id} name={pages.viewEvent(event.id)} children={(localProps) =>
              <AppPage {...props} {...localProps} nested>
                {props.admin &&
                  <Button {...props} {...localProps} text='Edit'
                    onPress={() => localProps.navigation.push(pages.editEvent(event.id))} />}
                {props.admin &&
                  <Button {...props} {...localProps} text='Delete'
                    onPress={() => localProps.navigation.push(pages.deleteEvent(event.id))} />}
                <Content {...props} {...localProps} title={event.title}
                  content={event.description} extraData={fetched} />
              </AppPage>} />)}
          {/* Generated page routes for editing events */}
          {props.admin && events.map(event =>
            <Stack.Screen key={event.id} name={pages.editEvent(event.id)} children={(localProps) =>
              <EventForm {...props} {...localProps}
                events={events} setEvents={setEvents} payload={event} />} />)}
          {/* Generated page routes for deleting events */}
          {props.admin && events.map(event =>
            <Stack.Screen key={event.id} name={pages.deleteEvent(event.id)} children={(localProps) =>
              <AppPage {...props} {...localProps} nested cancel>
                <Button {...props} {...localProps} text='Confirm' accent
                  onPress={() => setEvents(events.filter(e => e.id !== event.id))} />
                <Text style={{ color: props.theme.colors.text, margin: 15, textAlign: 'center' }}>
                  Are you sure you want to delete {event.title}?
                </Text>
              </AppPage>} />)}
        </Stack.Navigator>
      </NavigationContainer>
    </AppPage>
  );
};