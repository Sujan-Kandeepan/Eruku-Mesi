import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Temporary flag for admin vs. standard user
const admin = true;

// Initialize drawer/stack navigators
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Common layout/logic for all app pages
const AppPage = ({ title }) => (
  // Workaround for displaying header within drawer nav (framework limitation):
  // https://github.com/react-navigation/react-navigation/issues/1632#issuecomment-305291994
  <NavigationContainer style={styles.container} independent>
    <Stack.Navigator>
      <Stack.Screen name={title}>
        {/* Display title centered on page for now */}
        {() => <View style={styles.container}><Text>{title}</Text></View>}
      </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
);

// Quickly define pages/forms, refactor into separate modules later
const NewsAndEventsPage = () => <AppPage title="News and Events" />;
const EventsCalendar = () => <AppPage title="Events Calendar" />;
const MessagesPage = () => <AppPage title="Messages" />;
const MediaContentPage = () => <AppPage title="Media Content" />;
const EventForm = () => <AppPage title="Event Form" />;
const NewsStoryForm = () => <AppPage title="News Story Form" />;
const MediaContentForm = () => <AppPage title="Media Content Form" />;
const SettingsPage = () => <AppPage title="Settings" />;
const FeedbackForm = () => <AppPage title="Feedback" />;
const EventNotificationFormat = () => <AppPage title="Event Notification" />;
const AuthenticationForm = () => <AppPage title="Authentication" />;

export default function App() {
  return (
    // Reference: https://reactnavigation.org/docs/drawer-based-navigation/
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        {/* Section: Content and Communication */}
        <Drawer.Screen name="News and Events" component={NewsAndEventsPage} />
        <Drawer.Screen name="Events Calendar" component={EventsCalendar} />
        <Drawer.Screen name="Messages" component={MessagesPage} />
        <Drawer.Screen name="Media Content" component={MediaContentPage} />
        {/* Section: Manage Content */}
        {admin &&
          <>
            <Drawer.Screen name="Event Form" component={EventForm} />
            <Drawer.Screen name="News Story Form" component={NewsStoryForm} />
            <Drawer.Screen name="Media Content Form" component={MediaContentForm} />
          </>}
        {/* Section: Other Functions */}
        <Drawer.Screen name="Settings" component={SettingsPage} />
        <Drawer.Screen name="Feedback" component={FeedbackForm} />
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
