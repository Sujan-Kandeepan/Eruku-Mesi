import React from 'react';
import { Text, View } from 'react-native';

import AppPage from './AppPage';
import { Button, Header, SimpleInput } from '../shared/SharedComponents';
import { validEmail, validPhone } from '../shared/SharedFunctions';

// Form for editing user info in separate component to reset state on exit
export default function PersonalInformationForm(props) {
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
      <View style={{ height: 15 }} />
    </AppPage>
  );
};