import React from 'react';
import { Text, View } from 'react-native';

import AppPage from './AppPage';
import { changePassword } from './functions/SettingsFunctions';
import { Button, Header, SimpleInput } from '../shared/SharedComponents';

// Form for changing password in separate component to reset state on exit
export default function ChangePasswordForm(props) {
  // State variables for form fields (two-way data binding)
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  return (
    <AppPage {...props} nested cancel scroll>
      <Header {...props} label text={'Old Password'} />
      <SimpleInput {...props} left autoCompleteType='password' password
        value={oldPassword} onChangeText={value => setOldPassword(value)} />
      <Header {...props} label text={'New Password'} />
      <SimpleInput {...props} left autoCompleteType='password' password
        maxLength={50} maxLengthMessage='Password is too long'
        value={newPassword} onChangeText={value => setNewPassword(value)} />
      <Header {...props} label text={'Confirm Password'} />
      <SimpleInput {...props} left autoCompleteType='password' password
        maxLength={50} maxLengthMessage='Password is too long'
        value={confirmPassword} onChangeText={value => setConfirmPassword(value)} />
      <Text style={{ color: props.theme.colors.dangerText, paddingTop: 10, textAlign: 'center' }}>
        {passwordError}
      </Text>
      <Button {...props} color='accent' text='Submit'
        onPress={() => changePassword(props, oldPassword, newPassword, confirmPassword, setPasswordError)} />
      <View style={{ height: 15 }} />
    </AppPage>
  );
};