import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Avatar, Caption, DarkTheme as DarkDrawerTheme, DefaultTheme as LightDrawerTheme,
  Drawer as CustomDrawer, Provider, Snackbar, Title } from 'react-native-paper';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { DarkTheme, DefaultTheme as LightTheme, NavigationContainer } from '@react-navigation/native';

import NewsFeedPage from './components/NewsFeedPage';
import UpcomingEventsPage from './components/UpcomingEventsPage';
import MessagesPage from './components/MessagesPage';
import MediaContentPage from './components/MediaContentPage';
import InformationPage from './components/InformationPage';
import SettingsPage from './components/SettingsPage';
import FeedbackForm from './components/FeedbackForm';
import AuthenticationForm from './components/AuthenticationForm';

// Base URL for API wherever hosted (computer's IP for now)
// Reference: https://stackoverflow.com/a/56943681
const ip = Platform.OS === 'web' ? 'localhost' : Constants.manifest.debuggerHost.split(':').shift();
const baseURL = `http://${ip}:${process.env.MONGODB_PORT || 4000}`;
// Initialize drawer navigator
const Drawer = createDrawerNavigator();

// Custom light app/drawer theme, inherit defaults and modify few properties
// Reference: https://callstack.github.io/react-native-paper/theming.html
const lightTheme = {
  ...LightTheme,
  ...LightDrawerTheme,
  colors: {
    ...LightTheme.colors,
    ...LightDrawerTheme.colors,
    primary: 'green',
    accent: 'darkgreen',
    danger: 'darkred',
    dangerText: 'crimson',
    background: LightTheme.colors.background,
    statusBarText: 'dark',
    statusBarBackground: LightDrawerTheme.colors.background,
    text: 'black'
  }
};

// Custom dark app/drawer theme, similar to above
const darkTheme = {
  ...DarkTheme,
  ...DarkDrawerTheme,
  colors: {
    ...DarkTheme.colors,
    ...DarkDrawerTheme.colors,
    primary: 'green',
    accent: 'darkgreen',
    danger: 'darkred',
    dangerText: 'crimson',
    background: DarkTheme.colors.background,
    statusBarText: 'light',
    statusBarBackground: DarkTheme.colors.background,
    text: 'lightgrey'
  }
};

// Names of drawer items/pages
const pages = {
  newsFeed: 'News Feed',
  upcomingEvents: 'Upcoming Events',
  messages: 'Messages',
  mediaContent: 'Media Content',
  information: 'Information',
  settings: 'Settings',
  feedback: 'Feedback'
};

// Repeated logic for custom drawer items
const CustomDrawerItem = ({ action, icon, name, navigation, source, state, theme }) =>
  <CustomDrawer.Item label={name} active={name === state.routeNames[state.index]}
    // Icon names reference: https://oblador.github.io/react-native-vector-icons/
    icon={() => <Icon name={icon} type={source} color={theme.colors.primary} style={{ width: 25 }} />}
    onPress={() => action ? action() : navigation.navigate(name)} />;

// Custom drawer layout to override default drawer navigation screen list
// Documentation: https://callstack.github.io/react-native-paper/drawer-section.html
// Reference: https://github.com/itzpradip/react-navigation-v5-mix/blob/master/screens/DrawerContent.js
const CustomDrawerContent = (props) =>
  <DrawerContentScrollView {...props}
    contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
    <CustomDrawer.Section style={{ flexDirection: 'row', marginHorizontal: 15, marginVertical: 5 }}>
      <Avatar.Image source={{ // For local image: source={require('./assets/image.jpg')}
        uri: 'https://png.pngitem.com/pimgs/s/4-40070_user-staff-man-profile-user-account-icon-jpg.png'
      }} size={50} style={{ alignSelf: 'center' }} />
      <View style={{ flexDirection: 'column', marginHorizontal: 10, marginVertical: 0, width: 215 }}>
        <Title>{props.user.firstName} {props.user.lastName}</Title>
        <Caption>@{props.user.username}</Caption>
      </View>
    </CustomDrawer.Section>
    {/* Add divider above first section by creating empty section */}
    <CustomDrawer.Section />
    {/* Force section to take up remaining height to push rest to bottom */}
    <CustomDrawer.Section style={{ flex: 1 }}>
      <CustomDrawerItem {...props} name={pages.newsFeed}
        icon='newspaper-variant-outline' source='material-community' />
      <CustomDrawerItem {...props} name={pages.upcomingEvents}
        icon='calendar-star' source='material-community' />
      <CustomDrawerItem {...props} name={pages.messages}
        icon='message-text-outline' source='material-community' />
      <CustomDrawerItem {...props} name={pages.mediaContent}
        icon='photo-camera-back' source='material' />
      <CustomDrawerItem {...props} name={pages.information}
        icon='info-outline' source='material' />
    </CustomDrawer.Section>
    {/* Add divider above second section by creating empty section */}
    <CustomDrawer.Section />
    <CustomDrawer.Section style={{ marginBottom: 0 }}>
      <CustomDrawerItem {...props} name={pages.settings}
        icon='settings' source='material' />
      <CustomDrawerItem {...props} name={pages.feedback}
        icon='feedback' source='material' />
    </CustomDrawer.Section>
  </DrawerContentScrollView>;

// Main interface enclosed by drawer navigation into different components
export default function App() {
  // Display snackbar with given message, define helper functions
  // Reference: https://callstack.github.io/react-native-paper/snackbar.html
  const [snackbarText, setSnackbarText] = React.useState('');
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const onDismissSnackbar = () => setSnackbarVisible(false);
  const snackbar = (text) => {
    setSnackbarVisible(false);
    setSnackbarText(text);
    setSnackbarVisible(true);
  }

  // User data as object and admin status
  let [user, setUser] = React.useState(null);
  let [admin, setAdmin] = React.useState(true);
  const updateUser = data => setUser({ ...user, ...data });

  // Toggle event notifications and display snackbar message on change
  let [receiveNotifications, setReceiveNotifications] = React.useState(true);
  const toggleNotifications = () => {
    snackbar(`${receiveNotifications ? 'No longer' : 'Now'} receiving event notifications`);
    setReceiveNotifications(!receiveNotifications);
  }

  // Set and toggle between light/dark themes defined globally using state
  // Reference: https://callstack.github.io/react-native-paper/theming-with-react-navigation.html
  let [theme, setTheme] = React.useState(lightTheme);
  const toggleTheme = () => setTheme(theme === darkTheme ? lightTheme : darkTheme);

  // Props to expose to nested child components, extra for settings
  const sharedProps = { admin, baseURL, setAdmin, snackbar, theme, user };
  const settingsProps = { receiveNotifications, setUser, toggleNotifications, toggleTheme, updateUser };

  // Refactored variable for duplicate code in platform-specific snackbar below
  const snackbarView =
    <Snackbar visible={snackbarVisible} duration={3000} onDismiss={onDismissSnackbar}
      style={Platform.OS !== 'ios' && { alignSelf: 'center', flexDirection: 'row', margin: 50 }}
      theme={{ colors: { onSurface: theme.colors.card, surface: theme.colors.text } }}>
      <Text>{snackbarText}</Text>
    </Snackbar>;

  return (
    // Reference: https://reactnavigation.org/docs/drawer-based-navigation/
    <Provider theme={theme}>
      <NavigationContainer theme={theme}>
        {user ? // Drawer nav containing all app pages if authenticated
          <Drawer.Navigator initialRouteName={pages.newsFeed}
            drawerContentOptions={{ labelStyle: { color: theme.colors.text } }}
            drawerContent={props => <CustomDrawerContent {...props} theme={theme} user={user} />}>
            <Drawer.Screen name={pages.newsFeed}
              children={(props) => <NewsFeedPage {...props} {...sharedProps} />} />
            <Drawer.Screen name={pages.upcomingEvents}
              children={(props) => <UpcomingEventsPage {...props} {...sharedProps} />} />
            <Drawer.Screen name={pages.messages}
              children={(props) => <MessagesPage {...props} {...sharedProps} />} />
            <Drawer.Screen name={pages.mediaContent}
              children={(props) => <MediaContentPage {...props} {...sharedProps} />} />
            <Drawer.Screen name={pages.information}
              children={(props) => <InformationPage {...props} {...sharedProps} />} />
            <Drawer.Screen name={pages.settings}
              children={(props) => <SettingsPage {...props} {...sharedProps} {...settingsProps} />} />
            <Drawer.Screen name={pages.feedback}
              children={(props) => <FeedbackForm {...props} {...sharedProps} />} />
          </Drawer.Navigator> : // Authentication form if not authenticated
          <AuthenticationForm {...sharedProps} {...settingsProps} />}
        </NavigationContainer>
      <StatusBar style={theme.colors.statusBarText}
        backgroundColor={theme.colors.statusBarBackground} />
      {Platform.OS === 'ios' ? snackbarView :
        <Text style={Platform.select({
          android: { alignSelf: 'center', bottom: 0, position: 'absolute', textAlign: 'center' } })}>
          {snackbarView}
        </Text>}
    </Provider>
  );
}