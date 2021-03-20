import React from 'react';
import { Text, View } from 'react-native';

import AppPage from './AppPage';
import { editInfo } from './functions/SettingsFunctions';
import { Button, Header, Media, MediaPicker, SimpleInput } from '../shared/SharedComponents';

// Form for editing user info in separate component to reset state on exit
export default function PersonalInformationForm(props) {
  // State variables for form fields (two-way data binding)
  const [profilePicture, setProfilePicture] = React.useState(props.user.profilePicture);
  const [username, setUsername] = React.useState(props.user.username);
  const [firstName, setFirstName] = React.useState(props.user.firstName);
  const [lastName, setLastName] = React.useState(props.user.lastName);
  const [phone, setPhone] = React.useState(props.user.phone);
  const [email, setEmail] = React.useState(props.user.email);
  const [editInfoError, setEditInfoError] = React.useState('');
  return (
    <AppPage {...props} nested cancel scroll>
      <Header {...props} label text={'Profile Picture'} />
      <Media image={profilePicture} scale={{ image: profilePicture, maxHeight: 300 }}
        style={{ alignSelf: 'center', marginTop: 15 }} />
      <View style={{ flexDirection: 'row', marginBottom: -15, marginTop: 15 }}>
        <View style={{ flex: 1, marginBottom: 15 }}>
          <MediaPicker {...props} handleResult={setProfilePicture}
            text={profilePicture ? 'Replace' : 'Upload'} />
        </View>
        {profilePicture &&
          <View style={{ flex: 1, marginLeft: -15, marginTop: -15 }}>
            <Button {...props} text='Delete' onPress={() => setProfilePicture(null)} />
          </View>}
      </View>
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
        onPress={() => editInfo(props, profilePicture, username,
          firstName, lastName, phone, email, setEditInfoError)} />
      <View style={{ height: 15 }} />
    </AppPage>
  );
};