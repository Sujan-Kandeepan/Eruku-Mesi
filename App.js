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

// Display basic text for route name in app pages not yet implemented
const SimpleText = ({ route }) => <View style={styles.container}><Text>{route.name}</Text></View>;

// Common layout/logic for all app pages
const AppPage = ({ children, navigation, route }) => (
  // Workaround for displaying header within drawer nav (framework limitation):
  // https://github.com/react-navigation/react-navigation/issues/1632#issuecomment-305291994
  <NavigationContainer style={styles.container} independent>
    <Stack.Navigator>
      <Stack.Screen name={route.name} options={{
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
  <AppPage {...props}>
    <SimpleText {...props} />
  </AppPage>;
const EventsCalendar = (props) =>
  <AppPage {...props}>
    <SimpleText {...props} />
  </AppPage>;
const MessagesPage = (props) =>
  <AppPage {...props}>
    <SimpleText {...props} />
  </AppPage>;
const MediaContentPage = (props) =>
  <AppPage {...props}>
    <SimpleText {...props} />
  </AppPage>;
const EventForm = (props) =>
  <AppPage {...props}>
    <SimpleText {...props} />
  </AppPage>;
const NewsStoryForm = (props) =>
  <AppPage {...props}>
    <SimpleText {...props} />
  </AppPage>;
const MediaContentForm = (props) =>
  <AppPage {...props}>
    <SimpleText {...props} />
  </AppPage>;
const SettingsPage = (props) =>
  <AppPage {...props}>
    <SimpleText {...props} />
  </AppPage>;
const FeedbackForm = (props) =>
  <AppPage {...props}>
    <SimpleText {...props} />
  </AppPage>;
const EventNotificationFormat = (props) =>
  <AppPage {...props}>
    <SimpleText {...props} />
  </AppPage>;
const AuthenticationForm = (props) =>
  <AppPage {...props}>
    <SimpleText {...props} />
  </AppPage>;

export default function App() {
  return (
    // Reference: https://reactnavigation.org/docs/drawer-based-navigation/
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='News and Events'>
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
