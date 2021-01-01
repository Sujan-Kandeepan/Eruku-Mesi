import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Caption, DefaultTheme, Drawer as CustomDrawer, Provider, Title } from 'react-native-paper';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

// Temporary flag for admin vs. standard user
const admin = true;

// Initialize drawer/stack navigators
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Custom drawer theme, just a few properties modified from default
// Reference: https://callstack.github.io/react-native-paper/theming.html
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'green',
    accent: 'darkgreen',
  },
};

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

// Display basic text for route name in app pages not yet implemented
const EmptyPage = (props) =>
  <AppPage {...props}>
    <View style={styles.container}>
      <Text>{props.route.name}</Text>
    </View>
  </AppPage>;

// Quickly define pages/forms, refactor into separate modules later
const NewsAndEventsPage = EmptyPage;
const EventsCalendar = EmptyPage;
const MessagesPage = EmptyPage;
const MediaContentPage = EmptyPage;
const SettingsPage = EmptyPage;
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
    contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
    <CustomDrawer.Section style={{ flexDirection: 'row', margin: 15 }}>
      <Avatar.Image source={{ // For local image: source={require('./assets/image.jpg')}
          uri: 'https://pbs.twimg.com/profile_images/3378852260/ea07b725a6331c3255c6283ae7ad97d0_400x400.jpeg'
        }} size={50} style={{ alignSelf: 'center' }} />
      <View style={{ flexDirection: 'column', marginHorizontal: 10, marginVertical: 0, width: 215 }}>
        <Title style={styles.title}>DoodleBob</Title>
        <Caption style={styles.caption}>@mehoyminoy</Caption>
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
      <CustomDrawerItem {...props} name='Log Out'
        icon='logout' source='material'
        action={() => props.navigation.closeDrawer()} />
    </CustomDrawer.Section>
  </DrawerContentScrollView>;

// Main interface enclosed by drawer navigation into different components
export default function App() {
  return (
    // Reference: https://reactnavigation.org/docs/drawer-based-navigation/
    <Provider theme={theme}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='News and Events'
          drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name='News and Events' component={NewsAndEventsPage} />
          <Drawer.Screen name='Events Calendar' component={EventsCalendar} />
          <Drawer.Screen name='Messages' component={MessagesPage} />
          <Drawer.Screen name='Media Content' component={MediaContentPage} />
          <Drawer.Screen name='Settings' component={SettingsPage} />
          <Drawer.Screen name='Feedback' component={FeedbackForm} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// Repeated-use style declarations
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
