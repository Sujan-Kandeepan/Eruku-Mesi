import React from 'react';
import { Platform, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import AppPage from './AppPage';
import { login, signup } from './functions/AuthenticationFunctions';
import { Button, Header, SimpleInput, ToggleWithoutCard } from '../shared/SharedComponents';
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
  const [signupError, setSignupError] = React.useState('');
  return (
    // Tab navigation to switch between login and signup
    <NavigationContainer theme={props.theme} independent>
      <Text style={{ 
        backgroundColor: props.theme.colors.background,
        color: props.theme.colors.text,
        fontSize: 18, padding: 25, paddingTop: 75, textAlign: 'center' 
      }}>
        Welcome to Eruku Mesi North America!
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
              <Button {...props} {...localProps} color='accent' text='Log In'
                onPress={() => login(props, username, password, setLoginError)} />
            </View>} />} />
        {/* Signup form with complete form for new user */}
        <Tab.Screen name={'Sign Up'} children={(localProps) =>
          <AuthTab {...props} {...localProps} children={
            <View>
              <Header {...props} {...localProps} label text={'New Username'} />
              <SimpleInput {...props} {...localProps} left autoCompleteType='username' autoCapitalize='none'
                maxLength={50} maxLengthMessage='Username is too long'
                value={newUsername} onChangeText={value => setNewUsername(value)} />
              <Header {...props} {...localProps} label text={'New Password'} />
              <SimpleInput {...props} {...localProps} left autoCompleteType='password' password
                maxLength={50} maxLengthMessage='Password is too long'
                value={newPassword} onChangeText={value => setNewPassword(value)} />
              <Header {...props} {...localProps} label text={'Confirm Password'} />
              <SimpleInput {...props} {...localProps} left autoCompleteType='password' password
                maxLength={50} maxLengthMessage='Password is too long'
                value={confirmPassword} onChangeText={value => setConfirmPassword(value)} />
              <Header {...props} {...localProps} label text={'First Name'} />
              <SimpleInput {...props} {...localProps} left autoCompleteType='name'
                maxLength={50} maxLengthMessage='First name is too long'
                value={firstName} onChangeText={value => setFirstName(value)} />
              <Header {...props} {...localProps} label text={'Last Name'} />
              <SimpleInput {...props} {...localProps} left autoCompleteType='name'
                maxLength={50} maxLengthMessage='Last name is too long'
                value={lastName} onChangeText={value => setLastName(value)} />
              <Header {...props} {...localProps} label text={'Phone Number'} />
              <SimpleInput {...props} {...localProps} left autoCompleteType='tel' keyboardType='number-pad'
                maxLength={25} maxLengthMessage='Phone number is too long'
                value={phone} onChangeText={value => setPhone(value)} />
              <Header {...props} {...localProps} label text={'Email Address'} />
              <SimpleInput {...props} {...localProps} left autoCompleteType='email' autoCapitalize='none'
                maxLength={50} maxLengthMessage='Email address is too long'
                value={email} onChangeText={value => setEmail(value)} />
              <Text style={{ color: props.theme.colors.dangerText, paddingTop: 10, textAlign: 'center' }}>
                {signupError}
              </Text>
              <Button {...props} {...localProps} color='accent' text='Sign Up'
                onPress={() => signup(props, newUsername, newPassword, confirmPassword,
                  firstName, lastName, phone, email, setSignupError)} />
              <View style={{ height: 30 }} />
            </View>} />} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};