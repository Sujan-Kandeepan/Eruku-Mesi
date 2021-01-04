import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AppPage from './AppPage';
import MediaContentForm from './MediaContentForm';
import { Button } from '../shared/SharedComponents';
import SharedStyles from '../shared/SharedStyles';

// Initialize stack navigator
const Stack = createStackNavigator();

export default function MediaContentPage(props) {
  const pages = {
    postMediaContent: 'Post Media Content'
  };
  return (
    <AppPage {...props}>
      <NavigationContainer style={SharedStyles.container} theme={props.theme} independent>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Media Content Feed' children={(localProps) =>
            <>
              {props.admin &&
                <Button {...props} {...localProps} text={pages.postMediaContent}
                  onPress={() => localProps.navigation.push(pages.postMediaContent)} />}
              <View style={SharedStyles.container}>
                <Text style={{ color: props.theme.colors.text }}>{props.route.name}</Text>
              </View>
            </>} />
          {props.admin &&
            <Stack.Screen name={pages.postMediaContent} children={(localProps) =>
              <MediaContentForm {...props} {...localProps} />} />}
        </Stack.Navigator>
      </NavigationContainer>
    </AppPage>
  );
};