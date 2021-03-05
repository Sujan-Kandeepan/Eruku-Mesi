import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AppPage from './AppPage';
import { Button, Header, SimpleInput, Toggle } from '../shared/SharedComponents';
import { validEmail, validPassword, validPhone } from '../shared/SharedFunctions';
import SharedStyles from '../shared/SharedStyles';

// Initialize stack navigator
const Stack = createStackNavigator();

// Form for editing user info in separate component to reset state on exit
function PersonalInformationForm(props) {
  // State variables for form fields (two-way data binding)
  const [username, setUsername] = React.useState(props.user.username);
  const [firstName, setFirstName] = React.useState(props.user.firstName);
  const [lastName, setLastName] = React.useState(props.user.lastName);
  const [phone, setPhone] = React.useState(props.user.phone);
  const [email, setEmail] = React.useState(props.user.email);
  const [editInfoError, setEditInfoError] = React.useState('');
  // Form validation and fake availability checks for editing personal info
  const fakeEditInfo = (navigation) => {
    if (username.trim() == '') {
      setEditInfoError('Please specify a username.');
    } else if (firstName.trim() == '' || lastName.trim() == '') {
      setEditInfoError('Please enter your first and last name.');
    } else if (phone.trim() == '') {
      setEditInfoError('Please enter your phone number.');
    } else if (email.trim() == '') {
      setEditInfoError('Please enter your email address.');
    } else if (!validPhone(phone)) {
      setEditInfoError('Please enter a valid phone number.');
    } else if (!validEmail(email)) {
      setEditInfoError('Please enter a valid email address.');
    } else {
      setEditInfoError('');
      props.setUser({ ...props.user, username, firstName, lastName, phone, email });
      navigation.pop();
    }
  };
  return (
    <AppPage {...props} nested cancel scroll>
      <Header {...props} label text={'Username'} />
      <SimpleInput {...props} left autoCompleteType='username' autoCapitalize='none'
        value={username} onChangeText={value => setUsername(value)} />
      <Header {...props} label text={'First Name'} />
      <SimpleInput {...props} left autoCompleteType='name'
        value={firstName} onChangeText={value => setFirstName(value)} />
      <Header {...props} label text={'Last Name'} />
      <SimpleInput {...props} left autoCompleteType='name'
        value={lastName} onChangeText={value => setLastName(value)} />
      <Header {...props} label text={'Phone Number'} />
      <SimpleInput {...props} left autoCompleteType='tel' keyboardType='number-pad'
        value={phone} onChangeText={value => setPhone(value)} />
      <Header {...props} label text={'Email Address'} />
      <SimpleInput {...props} left autoCompleteType='email' autoCapitalize='none'
        value={email} onChangeText={value => setEmail(value)} />
      <Text style={{ color: props.theme.colors.dangerText, paddingTop: 10, textAlign: 'center' }}>
        {editInfoError}
      </Text>
      <Button {...props} color='accent' text='Submit'
        onPress={() => fakeEditInfo(props.navigation)} />
    </AppPage>
  );
}

// Form for changing password in separate component to reset state on exit
function ChangePasswordForm(props) {
  // State variables for form fields (two-way data binding)
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  // Form validation checks for password change
  const fakePasswordChange = (navigation) => {
    if (oldPassword.trim() == '') {
      setPasswordError('Please enter your old password.');
    } else if (newPassword.trim() == '') {
      setPasswordError('Please specify a new password.');
    } else if (confirmPassword.trim() == '') {
      setPasswordError('Please re-enter your new password.');
    } else if (oldPassword !== 'Test123!') {
      setPasswordError('Old password entered is incorrect.');
      console.log(oldPassword);
    } else if (newPassword !== confirmPassword) {
      setPasswordError('Entered passwords do not match.');
    } else if (validPassword(newPassword, setPasswordError)) {
      setPasswordError('');
      navigation.pop();
    }
  };
  return (
    <AppPage {...props} nested cancel scroll>
      <Header {...props} label text={'Old Password'} />
      <SimpleInput {...props} left autoCompleteType='password' password
        value={oldPassword} onChangeText={value => setOldPassword(value)} />
      <Header {...props} label text={'New Password'} />
      <SimpleInput {...props} left autoCompleteType='password' password
        value={newPassword} onChangeText={value => setNewPassword(value)} />
      <Header {...props} label text={'Confirm Password'} />
      <SimpleInput {...props} left autoCompleteType='password' password
        value={confirmPassword} onChangeText={value => setConfirmPassword(value)} />
      <Text style={{ color: props.theme.colors.dangerText, paddingTop: 10, textAlign: 'center' }}>
        {passwordError}
      </Text>
      <Button {...props} color='accent' text='Submit'
        onPress={() => fakePasswordChange(props.navigation)} />
    </AppPage>
  );
}

// Page for updating user settings, account management, etc.
export default function SettingsPage(props) {
  // Central list of page names for consistency
  const pages = {
    personalInformation: 'Personal Information',
    changePassword: 'Change Password'
  };
  return (
    <AppPage {...props} scroll>
      {/* Most common logic here extracted into shared components */}
      <NavigationContainer style={SharedStyles.container} theme={props.theme} independent>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={props.route.name} children={(localProps) =>
            <View>
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
                  props.snackbar('Signed out');
                }} />
            </View>} />
          <Stack.Screen name={pages.personalInformation} children={(localProps) =>
            <PersonalInformationForm {...props} {...localProps} />} />
          <Stack.Screen name={pages.changePassword} children={(localProps) =>
            <ChangePasswordForm {...props} {...localProps} />} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppPage>
  );
};