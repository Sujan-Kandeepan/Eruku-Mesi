import React from 'react';
import { FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AppPage from './AppPage';
import EmptyPage from './EmptyPage';
import { Button } from '../shared/SharedComponents';
import SharedStyles from '../shared/SharedStyles';

// Initialize stack navigator
const Stack = createStackNavigator();

export default function InformationPage(props) {
  const pages = ['General', 'About Us', 'History', 'Contact'];
  return (
    <AppPage {...props}>
      <NavigationContainer style={SharedStyles.container} theme={props.theme} independent>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Home Page' children={(localProps) =>
            <FlatList data={pages} renderItem={({ item }) =>
              <Button {...props} text={item}
                onPress={() => localProps.navigation.push(item)} />}
              keyExtractor={item => item} />} />
          {pages.map(page =>
            <Stack.Screen key={page} name={page} children={(localProps) =>
              <EmptyPage {...props} {...localProps} nested />} />)}
        </Stack.Navigator>
      </NavigationContainer>
    </AppPage>
  );
};