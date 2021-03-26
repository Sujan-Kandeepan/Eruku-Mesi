import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { Platform, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AppPage from './AppPage';
import PersonalInformationForm from './PersonalInformationForm';
import ChangePasswordForm from './ChangePasswordForm';
import { Button, Header, Toggle } from '../shared/SharedComponents';
import SharedStyles from '../shared/SharedStyles';

// Initialize stack navigator
const Stack = createStackNavigator();

// Page for updating user settings, account management, etc.
export default function SettingsPage(props) {
  // Central list of page names for consistency
  const pages = {
    personalInformation: 'Personal Information',
    changePassword: 'Change Password'
  };
  return (
    <AppPage {...props} scroll>
      <NavigationContainer style={SharedStyles.container} theme={props.theme} independent>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Main settings page */}
          <Stack.Screen name={props.route.name} children={(localProps) =>
            <View>
              {/* Most common logic here extracted into shared components */}
              <Header {...props} text={'Preferences'} />
              <Toggle {...props} text={'Receive Event Notifications'}
                value={props.receiveNotifications} onValueChange={props.toggleNotifications} />
              <Toggle {...props} text={`Application Theme (${props.theme.dark ? 'Dark' : 'Light'})`}
                value={props.theme.dark} onValueChange={props.toggleTheme} />
              <Header {...props} text={'Account'} />
              <Button {...props} textStyle={{ color: props.theme.colors.text }} text={pages.personalInformation}
                onPress={() => localProps.navigation.navigate(pages.personalInformation)} />
              <Button {...props} textStyle={{ color: props.theme.colors.text }} text={pages.changePassword}
                onPress={() => localProps.navigation.navigate(pages.changePassword)} />
              <Button {...props} textStyle={{ color: props.theme.colors.dangerText }} text={'Sign Out'}
                onPress={() => {
                  props.setUser(null);
                  props.setAdmin(false);
                  Platform.OS !== 'web' && SecureStore.deleteItemAsync('user');
                  props.snackbar('Signed out');
                }} />
            </View>} />
          {/* Form for editing user info */}
          <Stack.Screen name={pages.personalInformation} children={(localProps) =>
            <PersonalInformationForm {...props} {...localProps} />} />
          {/* Form for changing password */}
          <Stack.Screen name={pages.changePassword} children={(localProps) =>
            <ChangePasswordForm {...props} {...localProps} />} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppPage>
  );
};