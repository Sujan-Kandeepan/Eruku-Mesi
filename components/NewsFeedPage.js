import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AppPage from './AppPage';
import NewsStoryForm from './NewsStoryForm';
import EventForm from './EventForm';
import { Button } from '../shared/SharedComponents';
import SharedStyles from '../shared/SharedStyles';

// Initialize stack navigator
const Stack = createStackNavigator();

export default function NewsFeedPage(props) {
  const pages = {
    createNewsStory: 'Create News Story'
  };
  return (
    <AppPage {...props}>
      <NavigationContainer style={SharedStyles.container} theme={props.theme} independent>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={props.route.name} children={(localProps) =>
            <>
              {props.admin &&
                <Button {...props} {...localProps} text={pages.createNewsStory}
                  onPress={() => localProps.navigation.push(pages.createNewsStory)} />}
              <View style={SharedStyles.container}>
                <Text style={{ color: props.theme.colors.text }}>{props.route.name}</Text>
              </View>
            </>} />
          {props.admin &&
            <Stack.Screen name={pages.createNewsStory} children={(localProps) =>
              <NewsStoryForm {...props} {...localProps} />} />}
        </Stack.Navigator>
      </NavigationContainer>
    </AppPage>
  );
};