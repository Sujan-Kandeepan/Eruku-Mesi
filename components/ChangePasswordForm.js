import React from 'react';
import { Text, View } from 'react-native';

import AppPage from './AppPage';
import { Button, Header, SimpleInput } from '../shared/SharedComponents';
import { validPassword } from '../shared/SharedFunctions';

// Form for changing password in separate component to reset state on exit
export default function ChangePasswordForm(props) {
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
      <View style={{ height: 15 }} />
    </AppPage>
  );
};