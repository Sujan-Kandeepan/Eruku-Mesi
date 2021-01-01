import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, Drawer as CustomDrawer, Provider } from 'react-native-paper';
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
const CustomDrawerItem = ({ action, navigation, state, text }) =>
  <CustomDrawer.Item label={text} active={text === state.routeNames[state.index]}
    onPress={() => action ? action() : navigation.navigate(text)} />;

// Custom drawer layout with sections and optional custom actions
// Library documentation: https://callstack.github.io/react-native-paper/drawer-section.html
// Additional reference: https://github.com/itzpradip/react-navigation-v5-mix/blob/master/screens/DrawerContent.js
const CustomDrawerContent = (props) =>
  <DrawerContentScrollView {...props}>
    <CustomDrawer.Section>
      <CustomDrawerItem {...props} text='News and Events' />
      <CustomDrawerItem {...props} text='Events Calendar' />
      <CustomDrawerItem {...props} text='Messages' />
      <CustomDrawerItem {...props} text='Media Content' />
    </CustomDrawer.Section>
    <CustomDrawer.Section>
      <CustomDrawerItem {...props} text='Settings' />
      <CustomDrawerItem {...props} text='Feedback' />
      <CustomDrawerItem {...props} text='Log Out'
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
