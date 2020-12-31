import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

// Temporary flag for admin vs. standard user
const admin = true;

// Initialize drawer/stack navigators
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Display basic text in app app pages not yet implemented
const SimpleText = ({ text }) => <View style={styles.container}><Text>{text}</Text></View>;

// Common layout/logic for all app pages
const AppPage = ({ children, navigation, title }) => (
  // Workaround for displaying header within drawer nav (framework limitation):
  // https://github.com/react-navigation/react-navigation/issues/1632#issuecomment-305291994
  <NavigationContainer style={styles.container} independent>
    <Stack.Navigator>
      <Stack.Screen name={title} options={{
        headerLeft: () =>
          // Display hamburger icon with workaround for padding bug in library
          <View>
            <Text style={{ fontSize: 4 }}></Text>
            <Text>
              {'       '}
              <Icon name='menu' color='black' style={{ paddingTop: 5 }}
                onPress={() => navigation.openDrawer()} />
            </Text>
          </View>
      }}>
        {/* Display component children */}
        {() => children}
      </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
);

// Quickly define pages/forms, refactor into separate modules later
const NewsAndEventsPage = (props) =>
  <AppPage {...props} title='News and Events'>
    <SimpleText text='News and Events' />
  </AppPage>;
const EventsCalendar = (props) =>
  <AppPage {...props} title='Events Calendar'>
    <SimpleText text='Events Calendar' />
  </AppPage>;
const MessagesPage = (props) =>
  <AppPage {...props} title='Messages'>
    <SimpleText text='Messages' />
  </AppPage>;
const MediaContentPage = (props) =>
  <AppPage {...props} title='Media Content'>
    <SimpleText text='Media Content' />
  </AppPage>;
const EventForm = (props) =>
  <AppPage {...props} title='Manage Events'>
    <SimpleText text='Manage Events' />
  </AppPage>;
const NewsStoryForm = (props) =>
  <AppPage {...props} title='Manage News Stories'>
    <SimpleText text='Manage News Stories' />
  </AppPage>;
const MediaContentForm = (props) =>
  <AppPage {...props} title='Manage Media Content'>
    <SimpleText text='Manage Media Content' />
  </AppPage>;
const SettingsPage = (props) =>
  <AppPage {...props} title='Settings'>
    <SimpleText text='Settings' />
  </AppPage>;
const FeedbackForm = (props) =>
  <AppPage {...props} title='Feedback'>
    <SimpleText text='Feedback' />
  </AppPage>;
const EventNotificationFormat = (props) =>
  <AppPage {...props} title='Event Notification'>
    <SimpleText text='Event Notification' />
  </AppPage>;
const AuthenticationForm = (props) =>
  <AppPage {...props} title='Authentication'>
    <SimpleText text='Authentication' />
  </AppPage>;

export default function App() {
  return (
    // Reference: https://reactnavigation.org/docs/drawer-based-navigation/
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home'>
        {/* Section: Content and Communication */}
        <Drawer.Screen name='News and Events' component={NewsAndEventsPage} />
        <Drawer.Screen name='Events Calendar' component={EventsCalendar} />
        <Drawer.Screen name='Messages' component={MessagesPage} />
        <Drawer.Screen name='Media Content' component={MediaContentPage} />
        {/* Section: Manage Content */}
        {admin &&
          <>
            <Drawer.Screen name='Manage Events' component={EventForm} />
            <Drawer.Screen name='Manage News Stories' component={NewsStoryForm} />
            <Drawer.Screen name='Manage Media Content' component={MediaContentForm} />
          </>}
        {/* Section: Other Functions */}
        <Drawer.Screen name='Settings' component={SettingsPage} />
        <Drawer.Screen name='Feedback' component={FeedbackForm} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
