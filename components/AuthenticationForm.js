import React from 'react';
import { Platform, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import AppPage from './AppPage';
import { Button, Header, SimpleInput, ToggleWithoutCard } from '../shared/SharedComponents';
import { post, validEmail, validPassword, validPhone } from '../shared/SharedFunctions';
import SharedStyles from '../shared/SharedStyles';

// Initialize tab navigator
const Tab = createBottomTabNavigator();

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
  // Form validation and API call for login
  const login = () => {
    if (username.trim() == '') {
      setLoginError('Email or username required.');
    } else if (password.trim() == '') {
      setLoginError('Password required.');
    } else {
      post(`${props.baseURL}/accounts/login`,
        { ...(validEmail(username) ? { email: username } : { username }), password })
        .then(response => {
          setLoginError('');
          props.setUser(response.account);
          props.setAdmin(response.account.accountType == 'admin');
        })
        .catch(error => setLoginError(error.message));
    }
  };
  // Form validation and API call for signup
  const signup = () => {
    if (newUsername.trim() == '') {
      setSignupError('Please specify a username.');
    } else if (newPassword == '') {
      setSignupError('Please specify a password.');
    } else if (confirmPassword == '') {
      setSignupError('Please re-enter your password.');
    } else if (firstName.trim() == '' || lastName.trim() == '') {
      setSignupError('Please enter your first and last name.');
    } else if (phone.trim() == '') {
      setSignupError('Please enter your phone number.');
    } else if (email.trim() == '') {
      setSignupError('Please enter your email address.');
    } else if (newPassword !== confirmPassword) {
      setSignupError('Entered passwords do not match.');
    } else if (!validPhone(phone)) {
      setSignupError('Please enter a valid phone number.');
    } else if (!validEmail(email)) {
      setSignupError('Please enter a valid email address.');
    } else if (!validPassword(newPassword, setPasswordError)) {
      setSignupError(passwordError);
    } else {
      post(`${props.baseURL}/accounts/signup`,
        { username: newUsername, password: newPassword, firstName, lastName, phone, email })
        .then(() =>
          post(`${props.baseURL}/accounts/login`, { username: newUsername, password: newPassword })
            .then(response => {
              setSignupError('');
              props.setUser(response.account);
              props.setAdmin(response.account.accountType == 'admin');
            })
            .catch(() => setSignupError('Unable to log in')))
        .catch(error => setSignupError(error.message));
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
              <Header {...props} {...localProps} label text={'Email or Username'} />
              <SimpleInput {...props} {...localProps} left autoCompleteType='username' autoCapitalize='none'
                value={username} onChangeText={value => setUsername(value)} />
              <Header {...props} {...localProps} label text={'Password'} />
              <SimpleInput {...props} {...localProps} left autoCompleteType='password' password
                value={password} onChangeText={value => setPassword(value)} />
              <Text style={{ color: props.theme.colors.dangerText, paddingTop: 10, textAlign: 'center' }}>
                {loginError}
              </Text>
              <Button {...props} {...localProps} color='accent' text='Log In' onPress={login} />
            </View>} />} />
        {/* Signup form with complete form for new user */}
        <Tab.Screen name={'Sign Up'} children={(localProps) =>
          <AuthTab {...props} {...localProps} children={
            <View>
              <Header {...props} {...localProps} label text={'New Username'} />
              <SimpleInput {...props} {...localProps} left autoCompleteType='username' autoCapitalize='none'
                value={newUsername} onChangeText={value => setNewUsername(value)} />
              <Header {...props} {...localProps} label text={'New Password'} />
              <SimpleInput {...props} {...localProps} left autoCompleteType='password' password
                value={newPassword} onChangeText={value => setNewPassword(value)} />
              <Header {...props} {...localProps} label text={'Confirm Password'} />
              <SimpleInput {...props} {...localProps} left autoCompleteType='password' password
                value={confirmPassword} onChangeText={value => setConfirmPassword(value)} />
              <Header {...props} {...localProps} label text={'First Name'} />
              <SimpleInput {...props} {...localProps} left autoCompleteType='name'
                value={firstName} onChangeText={value => setFirstName(value)} />
              <Header {...props} {...localProps} label text={'Last Name'} />
              <SimpleInput {...props} {...localProps} left autoCompleteType='name'
                value={lastName} onChangeText={value => setLastName(value)} />
              <Header {...props} {...localProps} label text={'Phone Number'} />
              <SimpleInput {...props} {...localProps} left autoCompleteType='tel' keyboardType='number-pad'
                value={phone} onChangeText={value => setPhone(value)} />
              <Header {...props} {...localProps} label text={'Email Address'} />
              <SimpleInput {...props} {...localProps} left autoCompleteType='email' autoCapitalize='none'
                value={email} onChangeText={value => setEmail(value)} />
              <Text style={{ color: props.theme.colors.dangerText, paddingTop: 10, textAlign: 'center' }}>
                {signupError}
              </Text>
              <Button {...props} {...localProps} color='accent' text='Sign Up' onPress={signup} />
              <View style={{ height: 30 }} />
            </View>} />} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};