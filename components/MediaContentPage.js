import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AppPage from './AppPage';
import MediaContentForm from './MediaContentForm';
import { Button } from '../shared/SharedComponents';
import SharedStyles from '../shared/SharedStyles';
import EmptyPage from './EmptyPage';

// Initialize stack navigator
const Stack = createStackNavigator();

export default function MediaContentPage(props) {
  const pages = {
    postMediaContent: 'Post Media Content',
    viewMediaContent: id => `View Media Content Post ${id}`,
    editMediaContent: id => `Edit Media Content Post ${id}`,
    deleteMediaContent: id => `Delete Media Content Post ${id}`
  };
  const posts = [...Array(10).keys()].map(n =>
    ({ id: n + 1, title: `Post ${n + 1}`, description: `Post ${n + 1} description` }));
  return (
    <AppPage {...props}>
      <NavigationContainer style={SharedStyles.container} theme={props.theme} independent>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={props.route.name} children={(localProps) =>
            <FlatList data={posts} renderItem={({ item }) =>
              <TouchableOpacity onPress={() => localProps.navigation.push(pages.viewMediaContent(item.id))}>
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
                <Button {...props} {...localProps} text={pages.postMediaContent}
                  onPress={() => localProps.navigation.push(pages.postMediaContent)} />}
              ListFooterComponent={<View style={{ height: 15 }} />} />} />
          {props.admin &&
            <Stack.Screen name={pages.postMediaContent} children={(localProps) =>
              <MediaContentForm {...props} {...localProps} />} />}
          {posts.map(post => 
            <Stack.Screen key={post.id} name={pages.viewMediaContent(post.id)} children={(localProps) =>
              <AppPage {...props} {...localProps} nested>
                {props.admin &&
                  <Button {...props} {...localProps} text='Edit'
                    onPress={() => localProps.navigation.push(pages.editMediaContent(post.id))} />}
                {props.admin &&
                  <Button {...props} {...localProps} text='Delete'
                    onPress={() => localProps.navigation.push(pages.deleteMediaContent(post.id))} />}
                <View style={SharedStyles.container}>
                  <Text style={{ color: props.theme.colors.text }}>{localProps.route.name}</Text>
                </View>
              </AppPage>} />)}
          {posts.map(post =>
            <Stack.Screen key={post.id} name={pages.editMediaContent(post.id)} children={(localProps) =>
              <MediaContentForm {...props} {...localProps} />} />)}
          {posts.map(post =>
            <Stack.Screen key={post.id} name={pages.deleteMediaContent(post.id)} children={(localProps) =>
              <EmptyPage {...props} {...localProps} nested cancel />} />)}
        </Stack.Navigator>
      </NavigationContainer>
    </AppPage>
  );
};