import React from 'react';
import { Platform, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import AppPage from './AppPage';
import { Button, Header, SimpleInput, ToggleWithoutCard } from '../shared/SharedComponents';
import SharedStyles from '../shared/SharedStyles';

// Initialize tab navigator
const Tab = createBottomTabNavigator();

// Info for temporary fake user
const fakeUser = {
  "phoneVerified": false,
  "passwordResetToken": null,
  "resetTokenExpiredAt": null,
  "accountType": "admin",
  "_id": "603dcf2497c3c4522cfba1c0",
  "username": "testuser",
  "firstName": "Test",
  "lastName": "User",
  "phone": "1234567890",
  "email": "testuser@domain.com",
  "hash": "1234567890",
  "salt": "1234567890",
  "createdAt": "2021-03-02T05:37:40.838Z",
  "__v": 0
};

// Phone number validation logic
const validPhone = (phone) => phone.length >= 10;

// Email validation logic
const validEmail = (email) => email.match(/[A-Za-z0-9\.\-]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9]+/g);

// Password validation logic
const validPassword = (password, setError) => {
  let valid = false;
  if (password.length < 8)
    setError('Password must be at least 8 characters long.');
  else if (!password.split('').some(c => c.match(/[A-Z]/g)))
    setError('Password must contain at least one uppercase letter.');
  else if (!password.split('').some(c => c.match(/[a-z]/g)))
    setError('Password must contain at least one lowercase letter.');
  else if (!password.split('').some(c => c.match(/[0-9]/g)))
    setError('Password must contain at least one digit.');
  else if (!password.split('').some(c => !c.match(/[A-Za-z0-9\s]/g)))
    setError('Password must contain at least one special character.');
  else valid = true
  return valid;
};

// Shared logic for both tabs on authentication form
const AuthTab = (props) =>
  <AppPage {...props} nested tab scroll>
    <ToggleWithoutCard {...props} text={`Application Theme (${props.theme.dark ? 'Dark' : 'Light'})`}
      style={{ alignSelf: 'center', marginVertical: 30, width: Platform.select({ web: 500, default: '70%' }) }}
      value={props.theme.dark} onValueChange={props.toggleTheme} />
    <View style={SharedStyles.container}>
      <View style={{ justifyContent: 'center', width: Platform.select({ web: 500, default: '70%' }) }}>
        {props.children}
      </View>
    </View>
  </AppPage>;

// Page for updating user settings, account management, etc.
export default function AuthenticationForm(props) {
  // State variables for form fields (two-way data binding)
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  const [newUsername, setNewUsername] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [signupError, setSignupError] = React.useState('');
  // Form validation and fake authentication for login
  const fakeLogin = () => {
    if ([fakeUser.username, fakeUser.email].includes(username) && password == 'Test123!') {
      setLoginError('');
      props.setUser(fakeUser);
      props.setAdmin(fakeUser.accountType == 'admin');
    } else if (username.trim() == '') {
      setLoginError('Email or username required.');
    } else if (password.trim() == '') {
      setLoginError('Password required.');
    } else if (username == fakeUser.username) {
      setLoginError('Incorrect password.');
    } else {
      setLoginError('Email or username not found.');
    }
  };
  // Form validation and fake availability checks for signup
  const fakeSignup = () => {
    if (newUsername.trim() == '') {
      setSignupError('Please specify a username.');
    } else if (newPassword.trim() == '') {
      setSignupError('Please specify a password.');
    } else if (confirmPassword.trim() == '') {
      setSignupError('Please re-enter your password.');
    } else if (firstName.trim() == '' || lastName.trim() == '') {
      setSignupError('Please enter your first and last name.');
    } else if (phone.trim() == '') {
      setSignupError('Please enter your phone number.');
    } else if (email.trim() == '') {
      setSignupError('Please enter your email address.');
    } else if (newPassword.trim() !== confirmPassword.trim()) {
      setSignupError('Entered passwords do not match.');
    } else if (!validPhone(phone)) {
      setSignupError('Please enter a valid phone number.');
    } else if (!validEmail(email)) {
      setSignupError('Please enter a valid email address.');
    } else if (!validPassword(newPassword, setPasswordError)) {
      setSignupError(passwordError);
    } else if (newUsername.trim() == fakeUser.username.trim()) {
      setSignupError('A user with this username already exists.');
    } else if (phone.trim() == fakeUser.phone.trim()) {
      setSignupError('A user with this phone number already exists.');
    } else if (email.trim() == fakeUser.email.trim()) {
      setSignupError('A user with this email address already exists.');
    } else {
      setSignupError('');
      props.setUser({ ...fakeUser, username: newUsername, firstName, lastName, phone, email });
      props.setAdmin(fakeUser.accountType == 'admin');
    }
  };
  return (
    // Tab navigation to switch between login and signup
    <NavigationContainer theme={props.theme} independent>
      <Text style={{ 
        backgroundColor: props.theme.colors.background,
        color: props.theme.colors.text,
        fontSize: 18, padding: 25, paddingTop: 75, textAlign: 'center' 
      }}>
        Welcome to Erukumesi North America!
      </Text>
      {/* Reference: https://reactnavigation.org/docs/bottom-tab-navigator */}
      <Tab.Navigator tabBarOptions={{ labelStyle: { fontSize: 14, margin: 15, textAlignVertical: 'center' } }}>
        {/* Login page with simple form for existing user */}
        <Tab.Screen name={'Log In'} children={(localProps) =>
          <AuthTab {...props} {...localProps} children={
            <View style={{ marginBottom: Platform.select({ web: '10%', default: '30%' }) }}>
              <Header {...props} {...localProps} text={'Email or Username'} />
              <SimpleInput {...props} {...localProps} left autoCompleteType='username' autoCapitalize='none'
                value={username} onChangeText={value => setUsername(value)} />
              <Header {...props} {...localProps} text={'Password'} />
              <SimpleInput {...props} {...localProps} left autoCompleteType='password' password
                value={password} onChangeText={value => setPassword(value)} />
              <Text style={{ color: props.theme.colors.dangerText, paddingTop: 10, textAlign: 'center' }}>
                {loginError}
              </Text>
              <Button {...props} {...localProps} color='accent' text='Log In' onPress={fakeLogin} />
            </View>} />} />
        {/* Signup form with complete form for new user */}
        <Tab.Screen name={'Sign Up'} children={(localProps) =>
          <AuthTab {...props} {...localProps} children={
            <View>
              <Header {...props} {...localProps} text={'New Username'} />
              <SimpleInput {...props} {...localProps} left autoCompleteType='username' autoCapitalize='none'
                value={newUsername} onChangeText={value => setNewUsername(value)} />
              <Header {...props} {...localProps} text={'New Password'} />
              <SimpleInput {...props} {...localProps} left autoCompleteType='password' password
                value={newPassword} onChangeText={value => setNewPassword(value)} />
              <Header {...props} {...localProps} text={'Confirm Password'} />
              <SimpleInput {...props} {...localProps} left autoCompleteType='password' password
                value={confirmPassword} onChangeText={value => setConfirmPassword(value)} />
              <Header {...props} {...localProps} text={'First Name'} />
              <SimpleInput {...props} {...localProps} left autoCompleteType='name'
                value={firstName} onChangeText={value => setFirstName(value)} />
              <Header {...props} {...localProps} text={'Last Name'} />
              <SimpleInput {...props} {...localProps} left autoCompleteType='name'
                value={lastName} onChangeText={value => setLastName(value)} />
              <Header {...props} {...localProps} text={'Phone Number'} />
              <SimpleInput {...props} {...localProps} left autoCompleteType='tel' keyboardType='number-pad'
                value={phone} onChangeText={value => setPhone(value)} />
              <Header {...props} {...localProps} text={'Email Address'} />
              <SimpleInput {...props} {...localProps} left autoCompleteType='email' autoCapitalize='none'
                value={email} onChangeText={value => setEmail(value)} />
              <Text style={{ color: props.theme.colors.dangerText, paddingTop: 10, textAlign: 'center' }}>
                {signupError}
              </Text>
              <Button {...props} {...localProps} color='accent' text='Sign Up' onPress={fakeSignup} />
              <View style={{ height: 30 }} />
            </View>} />} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};