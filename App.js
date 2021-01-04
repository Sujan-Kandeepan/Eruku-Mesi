import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Avatar, Caption, DarkTheme as DarkDrawerTheme, DefaultTheme as LightDrawerTheme,
  Drawer as CustomDrawer, Provider, Snackbar, Title } from 'react-native-paper';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { DarkTheme, DefaultTheme as LightTheme, NavigationContainer } from '@react-navigation/native';

import EmptyPage from './components/EmptyPage';
import NewsAndEventsPage from './components/NewsAndEventsPage';
import EventsCalendar from './components/EventsCalendar';
import MediaContentPage from './components/MediaContentPage';
import InformationPage from './components/InformationPage';
import SettingsPage from './components/SettingsPage';

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
    background: DarkTheme.colors.background,
    statusBarText: 'light',
    statusBarBackground: DarkTheme.colors.background,
    text: 'lightgrey'
  }
};

// Quickly define pages/forms, refactor into separate modules later
const MessagesPage = EmptyPage;
const FeedbackForm = EmptyPage;
const AuthenticationForm = EmptyPage;
const EventNotificationFormat = EmptyPage;

// Names of drawer items/pages
const pages = {
  newsAndEvents: 'News and Events',
  eventsCalendar: 'Events Calendar',
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
          uri: 'https://pbs.twimg.com/profile_images/3378852260/ea07b725a6331c3255c6283ae7ad97d0_400x400.jpeg'
        }} size={50} style={{ alignSelf: 'center' }} />
      <View style={{ flexDirection: 'column', marginHorizontal: 10, marginVertical: 0, width: 215 }}>
        <Title>DoodleBob</Title>
        <Caption>@mehoyminoy</Caption>
      </View>
    </CustomDrawer.Section>
    {/* Add divider above first section by creating empty section */}
    <CustomDrawer.Section />
    {/* Force section to take up remaining height to push rest to bottom */}
    <CustomDrawer.Section style={{ flex: 1 }}>
      <CustomDrawerItem {...props} name={pages.newsAndEvents}
        icon='newspaper-variant-outline' source='material-community' />
      <CustomDrawerItem {...props} name={pages.eventsCalendar}
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
  const [snackbarWidth, setSnackbarWidth] = React.useState(0);
  const onDismissSnackbar = () => setSnackbarVisible(false);
  const snackbar = (text, width) => {
    setSnackbarVisible(false);
    setSnackbarText(text);
    setSnackbarWidth(width);
    setSnackbarVisible(true);
  }

  // Temporary flag for admin vs. standard user
  let [admin, setAdmin] = React.useState(true);

  // Toggle event notifications and display snackbar message on change
  let [receiveNotifications, setReceiveNotifications] = React.useState(true);
  const toggleNotifications = () => {
    snackbar(`${receiveNotifications ? 'No longer' : 'Now'} receiving event notifications`,
      receiveNotifications ? 272 : 240);
    setReceiveNotifications(!receiveNotifications);
  }

  // Set and toggle between light/dark themes defined globally using state
  // Reference: https://callstack.github.io/react-native-paper/theming-with-react-navigation.html
  let [theme, setTheme] = React.useState(lightTheme);
  const toggleTheme = () => setTheme(theme === darkTheme ? lightTheme : darkTheme);

  return (
    // Reference: https://reactnavigation.org/docs/drawer-based-navigation/
    <Provider theme={theme}>
      <NavigationContainer theme={theme}>
        <Drawer.Navigator initialRouteName={pages.newsAndEvents}
          drawerContentOptions={{ labelStyle: { color: theme.colors.text } }}
          drawerContent={props => <CustomDrawerContent {...props} theme={theme} />}>
          <Drawer.Screen name={pages.newsAndEvents}
            children={(props) => <NewsAndEventsPage {...props} theme={theme} admin={admin} />} />
          <Drawer.Screen name={pages.eventsCalendar}
            children={(props) => <EventsCalendar {...props} theme={theme} admin={admin} />} />
          <Drawer.Screen name={pages.messages}
            children={(props) => <MessagesPage {...props} theme={theme} />} />
          <Drawer.Screen name={pages.mediaContent}
            children={(props) => <MediaContentPage {...props} theme={theme} admin={admin} />} />
          <Drawer.Screen name={pages.information}
            children={(props) => <InformationPage {...props} theme={theme} admin={admin} />} />
          <Drawer.Screen name={pages.settings} children={(props) =>
            <SettingsPage {...props} theme={theme} toggleTheme={toggleTheme} snackbar={snackbar}
              receiveNotifications={receiveNotifications} toggleNotifications={toggleNotifications} />} />
          <Drawer.Screen name={pages.feedback}
            children={(props) => <FeedbackForm {...props} theme={theme} />} />
        </Drawer.Navigator>
      </NavigationContainer>
      <StatusBar style={theme.colors.statusBarText}
        backgroundColor={theme.colors.statusBarBackground} />
      <Snackbar visible={snackbarVisible} duration={3000} onDismiss={onDismissSnackbar}
        style={{ alignSelf: 'center', flexDirection: 'row', margin: 50, width: snackbarWidth || 'auto' }}
        theme={{ colors: { onSurface: theme.colors.card, surface: theme.colors.text } }}>
        <Text adjustsFontSizeToFit={true}>{snackbarText}</Text>
      </Snackbar>
    </Provider>
  );
}