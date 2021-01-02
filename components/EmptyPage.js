import React from 'react';
import { Text, View } from 'react-native';

import AppPage from './AppPage';
import styles from '../shared/styles';

// Display basic text for route name in app pages not yet implemented
export default function EmptyPage(props) {
  return (
    <AppPage {...props}>
      <View style={styles.container}>
        <Text style={{ color: props.theme.colors.text }}>{props.route.name}</Text>
      </View>
    </AppPage>
  );
}