import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

// Temporary flag for admin vs. standard user
const admin = true;

// Initialize drawer navigator
const Drawer = createDrawerNavigator();

// Basic text on all pages for now
const SimpleText = ({ text }) => (
  <View style={styles.container}>
    <Text>{text}</Text>
  </View>
);

// Quickly define pages/forms, refactor into separate modules later
const NewsAndEventsPage = () => <SimpleText text="News and Events" />;
const EventsCalendar = () => <SimpleText text="Events Calendar" />;
const MessagesPage = () => <SimpleText text="Messages" />;
const MediaContentPage = () => <SimpleText text="Media Content" />;
const EventForm = () => <SimpleText text="Event Form" />;
const NewsStoryForm = () => <SimpleText text="News Story Form" />;
const MediaContentForm = () => <SimpleText text="Media Content Form" />;
const SettingsPage = () => <SimpleText text="Settings" />;
const FeedbackForm = () => <SimpleText text="Feedback" />;
const EventNotificationFormat = () => <SimpleText text="Event Notification" />;
const AuthenticationForm = () => <SimpleText text="Authentication" />;

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
