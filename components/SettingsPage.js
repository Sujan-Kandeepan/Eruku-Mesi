import React from 'react';

import AppPage from './AppPage';
import { Button, Header, Toggle } from '../shared/SharedComponents';

export default function SettingsPage(props) {
  return (
    <AppPage {...props}>
      <Header {...props} text={'Preferences'} />
      <Toggle {...props} text={'Receive Event Notifications'}
        value={props.receiveNotifications} onValueChange={props.toggleNotifications} />
      <Toggle {...props} text={`Application Theme (${props.theme.dark ? 'Dark' : 'Light'})`}
        value={props.theme.dark} onValueChange={props.toggleTheme} />
      <Header {...props} text={'Account'} />
      <Button {...props} textStyle={{ color: 'crimson' }} text={'Sign Out'}
        onPress={() => props.snackbar('Signed out', 100)} />
    </AppPage>
  );
};