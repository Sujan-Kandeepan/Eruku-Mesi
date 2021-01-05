import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AppPage from './AppPage';
import EmptyPage from './EmptyPage';
import NewsStoryForm from './NewsStoryForm';
import { Button } from '../shared/SharedComponents';
import SharedStyles from '../shared/SharedStyles';

// Initialize stack navigator
const Stack = createStackNavigator();

export default function NewsFeedPage(props) {
  const pages = {
    createNewsStory: 'Create News Story',
    viewNewsStory: id => `View News Story ${id}`,
    editNewsStory: id => `Edit News Story ${id}`,
    deleteNewsStory: id => `Delete News Story ${id}`
  };
  const stories = [...Array(10).keys()].map(n =>
    ({ id: n + 1, title: `Post ${n + 1}`, description: `Post ${n + 1} description` }));
  return (
    <AppPage {...props}>
      <NavigationContainer style={SharedStyles.container} theme={props.theme} independent>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={props.route.name} children={(localProps) =>
            <FlatList data={stories} renderItem={({ item }) =>
              <TouchableOpacity onPress={() => localProps.navigation.push(pages.viewNewsStory(item.id))}>
                <Card containerStyle={{
                  borderColor: props.theme.colors.border,
                  backgroundColor: props.theme.colors.card
                }}>
                  <Text style={{ fontWeight: 'bold', color: props.theme.colors.text, marginBottom: 10 }}>
                    {item.title}
                  </Text>
                  <Text style={{ color: props.theme.colors.text }}>
                    {item.description}
                  </Text>
                </Card>
              </TouchableOpacity>
            } keyExtractor={item => item.title}
              ListHeaderComponent={props.admin &&
                <Button {...props} {...localProps} text={pages.createNewsStory}
                  onPress={() => localProps.navigation.push(pages.createNewsStory)} />}
              ListFooterComponent={<View style={{ height: 15 }} />} />} />
          {props.admin &&
            <Stack.Screen name={pages.createNewsStory} children={(localProps) =>
              <NewsStoryForm {...props} {...localProps} />} />}
          {stories.map(story =>
            <Stack.Screen key={story.id} name={pages.viewNewsStory(story.id)} children={(localProps) =>
              <AppPage {...props} {...localProps} nested>
                {props.admin &&
                  <Button {...props} {...localProps} text='Edit'
                    onPress={() => localProps.navigation.push(pages.editNewsStory(story.id))} />}
                {props.admin &&
                  <Button {...props} {...localProps} text='Delete'
                    onPress={() => localProps.navigation.push(pages.deleteNewsStory(story.id))} />}
                <View style={SharedStyles.container}>
                  <Text style={{ color: props.theme.colors.text }}>{localProps.route.name}</Text>
                </View>
              </AppPage>} />)}
          {stories.map(story =>
            <Stack.Screen key={story.id} name={pages.editNewsStory(story.id)} children={(localProps) =>
              <NewsStoryForm {...props} {...localProps} />} />)}
          {stories.map(story =>
            <Stack.Screen key={story.id} name={pages.deleteNewsStory(story.id)} children={(localProps) =>
              <EmptyPage {...props} {...localProps} nested cancel />} />)}
        </Stack.Navigator>
      </NavigationContainer>
    </AppPage>
  );
};