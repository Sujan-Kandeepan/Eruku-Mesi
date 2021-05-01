import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox, Platform, Text, View } from 'react-native';
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
import { registerForPushNotifications } from './components/functions/PushNotificationFunctions';
import { get, post } from './shared/SharedFunctions';

// Uncomment this line to disable all popups for errors/warnings (eg. for demo)
// LogBox && LogBox.ignoreAllLogs();

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

// Set up notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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
      <Avatar.Text size={50} style={{ alignSelf: 'center', backgroundColor: props.theme.colors.accent }}
        label={`${props.user.firstName[0]}${props.user.lastName[0]}`.toUpperCase()} />
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
  let [admin, setAdmin] = React.useState(false);

  // Update user in app state and reflect changes into database
  const updateUser = (data, thenCallback, catchCallback, finallyCallback) => {
    if (!user) return;
    setUser({ ...user, ...data, oldPassword: undefined, newPassword: undefined });
    post(`${baseURL}/accounts/edit/${user._id}`, data)
      .then(thenCallback)
      .catch(catchCallback)
      .finally(finallyCallback);
  }

  // Monitor updates to user and update dependent state variables
  React.useEffect(() => {
    if (user) {
      setAdmin(user.accountType === 'admin');
      setReceiveNotifications(user.receiveNotifications);
      setTheme(user.theme === 'dark' ? darkTheme : lightTheme);
      if (!user.theme) updateUser({ theme: theme.dark ? 'dark' : 'light' })
      if (Platform.OS !== 'web')
        SecureStore.setItemAsync('user', user._id);
    }
  }, [user]);

  // Toggle event notifications and display snackbar message on change
  let [receiveNotifications, setReceiveNotifications] = React.useState(false);
  const toggleNotifications = async () => {
    snackbar(`${receiveNotifications ? 'No longer' : 'Now'} receiving event notifications`);
    setReceiveNotifications(!receiveNotifications);
    const expoToken = receiveNotifications
      ? null
      : await registerForPushNotifications({ ...sharedProps, ...settingsProps });
    updateUser({ receiveNotifications: !receiveNotifications, expoToken }, () => {},
      () => snackbar('Failed to save changes'));
  }

  // Set and toggle between light/dark themes defined globally using state
  // Reference: https://callstack.github.io/react-native-paper/theming-with-react-navigation.html
  let [theme, setTheme] = React.useState(lightTheme);
  const toggleTheme = () => {
    setTheme(theme === darkTheme ? lightTheme : darkTheme);
    updateUser({ theme: theme === darkTheme ? 'light' : 'dark' },
      () => { }, () => snackbar('Failed to save changes'));
  }

  // Keep reference of drawer nav component, current state, and pages visited
  // Reference: https://reactnavigation.org/docs/screen-tracking/
  const drawerNav = React.useRef();
  const drawerState = React.useRef();
  const drawerVisited = React.useRef();
  drawerVisited.current = [];

  // Navigate to events page when notification opened
  // Reference: https://reactnavigation.org/docs/navigating-without-navigation-prop/
  React.useEffect(() => {
    Notifications.addNotificationResponseReceivedListener(() =>
      drawerNav.current && drawerNav.current.navigate(pages.upcomingEvents));
  }, []);

  // Props to expose to nested child components, extra for settings
  const sharedProps = { admin, baseURL, drawerState, drawerVisited, pages, setAdmin, snackbar, theme, user };
  const settingsProps = { receiveNotifications, setUser, toggleNotifications, toggleTheme, updateUser };

  // Refactored variable for duplicate code in platform-specific snackbar below
  const snackbarView =
    <Snackbar visible={snackbarVisible} duration={3000} onDismiss={onDismissSnackbar}
      style={Platform.OS !== 'ios' && { alignSelf: 'center', flexDirection: 'row', margin: 50 }}
      theme={{ colors: { onSurface: theme.colors.card, surface: theme.colors.text } }}>
      <Text>{snackbarText}</Text>
    </Snackbar>;

  // Check for secure store 'user' key containing user data to authenticate
  React.useEffect(() => {
    // Not supported on web
    if (Platform.OS !== 'web') {
      // Stay on splash screen until finished
      SplashScreen.preventAutoHideAsync();
      SecureStore.getItemAsync('user')
        .then(item => item
          ? get(`${baseURL}/accounts/${item}`)
              .then(res => {
                setUser(res.user);
                setReceiveNotifications(res.user.receiveNotifications);
                setTheme(res.user.theme === 'dark' ? darkTheme : lightTheme);
              })
              .finally(SplashScreen.hideAsync)
          : SplashScreen.hideAsync());
    }
  }, []);

  return (
    // Reference: https://reactnavigation.org/docs/drawer-based-navigation/
    <Provider theme={theme}>
      {user ? // Drawer nav containing all app pages if authenticated
        <NavigationContainer ref={drawerNav} theme={theme}
          onStateChange={() => {
            const currentRoute = drawerNav.current.getCurrentRoute().name
            drawerState.current = currentRoute;
            if (drawerVisited.current instanceof Array) {
              if (!drawerVisited.current.includes(currentRoute))
                drawerVisited.current.push(currentRoute);
            } else {
              drawerVisited.current = [];
            }
          }}>
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
          </Drawer.Navigator>
        </NavigationContainer> : // Authentication form if not authenticated
        <AuthenticationForm {...sharedProps} {...settingsProps} />}
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