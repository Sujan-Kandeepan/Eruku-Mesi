import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { Avatar, Caption, DarkTheme as DarkDrawerTheme, DefaultTheme as LightDrawerTheme,
  Drawer as CustomDrawer, Provider, Title, useTheme } from 'react-native-paper';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { DarkTheme, DefaultTheme as LightTheme, NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

import EmptyPage from './components/EmptyPage';
import SettingsPage from './components/SettingsPage';

// Initialize drawer/stack navigators
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

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
    drawer: LightTheme.colors.surface,
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
    drawer: DarkTheme.colors.background,
    statusBarText: 'light',
    statusBarBackground: DarkTheme.colors.background,
    text: 'lightgrey'
  }
};

// Quickly define pages/forms, refactor into separate modules later
const NewsAndEventsPage = EmptyPage;
const EventsCalendar = EmptyPage;
const MessagesPage = EmptyPage;
const MediaContentPage = EmptyPage;
const FeedbackForm = EmptyPage;
const NewsStoryForm = EmptyPage;
const EventForm = EmptyPage;
const MediaContentForm = EmptyPage;
const AuthenticationForm = EmptyPage;
const EventNotificationFormat = EmptyPage;

// Repeated logic for custom drawer items
const CustomDrawerItem = ({ action, icon, name, navigation, source, state }) =>
  <CustomDrawer.Item label={name} active={name === state.routeNames[state.index]}
    // Icon names reference: https://oblador.github.io/react-native-vector-icons/
    icon={() => <Icon name={icon} type={source} color='green' style={{ width: 25 }} />}
    onPress={() => action ? action() : navigation.navigate(name)} />;

// Custom drawer layout to override default drawer navigation screen list
// Documentation: https://callstack.github.io/react-native-paper/drawer-section.html
// Reference: https://github.com/itzpradip/react-navigation-v5-mix/blob/master/screens/DrawerContent.js
const CustomDrawerContent = (props) =>
  <DrawerContentScrollView {...props}
    contentContainerStyle={{ backgroundColor: props.theme.colors.drawer,
      flex: 1, justifyContent: 'space-between' }}>
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
      <CustomDrawerItem {...props} name='News and Events'
        icon='newspaper-variant-outline' source='material-community' />
      <CustomDrawerItem {...props} name='Events Calendar'
        icon='calendar-star' source='material-community' />
      <CustomDrawerItem {...props} name='Messages'
        icon='message-text-outline' source='material-community' />
      <CustomDrawerItem {...props} name='Media Content'
        icon='photo-camera-back' source='material' />
    </CustomDrawer.Section>
    {/* Add divider above second section by creating empty section */}
    <CustomDrawer.Section />
    <CustomDrawer.Section style={{ marginBottom: 0 }}>
      <CustomDrawerItem {...props} name='Settings'
        icon='settings' source='material' />
      <CustomDrawerItem {...props} name='Feedback'
        icon='feedback' source='material' />
    </CustomDrawer.Section>
  </DrawerContentScrollView>;

// Main interface enclosed by drawer navigation into different components
export default function App() {
  // Temporary flag for admin vs. standard user
  let [admin, setAdmin] = React.useState(true);

  let [receiveNotifications, setReceiveNotifications] = React.useState(true);
  const toggleNotifications = () => console.log('Receiving notifications:', !receiveNotifications)
    || setReceiveNotifications(!receiveNotifications);

  // Set and toggle between light/dark themes defined globally using state
  // Reference: https://callstack.github.io/react-native-paper/theming-with-react-navigation.html
  let [theme, setTheme] = React.useState(lightTheme);
  const toggleTheme = () => setTheme(theme === darkTheme ? lightTheme : darkTheme);

  return (
    // Reference: https://reactnavigation.org/docs/drawer-based-navigation/
    <Provider theme={theme}>
      <NavigationContainer theme={theme}>
        <Drawer.Navigator initialRouteName='News and Events'
          drawerContentOptions={{ labelStyle: { color: theme.colors.text } }}
          drawerContent={props => <CustomDrawerContent {...props} theme={theme} />}>
          <Drawer.Screen name='News and Events'
            children={(props) => <NewsAndEventsPage {...props} theme={theme} />} />
          <Drawer.Screen name='Events Calendar'
            children={(props) => <EventsCalendar {...props} theme={theme} />} />
          <Drawer.Screen name='Messages'
            children={(props) => <MessagesPage {...props} theme={theme} />} />
          <Drawer.Screen name='Media Content'
            children={(props) => <MediaContentPage {...props} theme={theme} />} />
          <Drawer.Screen name='Settings'
            children={(props) => <SettingsPage {...props} theme={theme} toggleTheme={toggleTheme}
            receiveNotifications={receiveNotifications} toggleNotifications={toggleNotifications} />} />
          <Drawer.Screen name='Feedback'
            children={(props) => <FeedbackForm {...props} theme={theme} />} />
        </Drawer.Navigator>
      </NavigationContainer>
      <StatusBar style={theme.colors.statusBarText}
        backgroundColor={theme.colors.statusBarBackground} />
    </Provider>
  );
}