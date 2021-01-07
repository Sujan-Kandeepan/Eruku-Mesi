import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AppPage from './AppPage';
import EmptyPage from './EmptyPage';
import MediaContentForm from './MediaContentForm';
import { Button, Feed } from '../shared/SharedComponents';
import { get } from '../shared/SharedFunctions';
import SharedStyles from '../shared/SharedStyles';

// Initialize stack navigator
const Stack = createStackNavigator();

export default function MediaContentPage(props) {
  const pages = {
    postMediaContent: 'Post Media Content',
    viewMediaContent: id => `View Media Content Post ${id}`,
    editMediaContent: id => `Edit Media Content Post ${id}`,
    deleteMediaContent: id => `Delete Media Content Post ${id}`
  };
  const [posts, setPosts] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  // Initial load of posts by calling useEffect with [] as second param to run once
  React.useEffect(() => {
    // Wait for all posts and trigger update to list by setting flag
    const populate = async () => {
      // Using lorem ipsum data for now with 10 posts
      await Promise.all([...Array(10).keys()].map(index =>
        get('https://baconipsum.com/api/?type=all-meat&sentences=1').then(description => {
          let newPosts = posts;
          newPosts[index] = { id: index + 1, title: `Post ${index + 1}`, description };
          setPosts(newPosts);
        })));
      setFetched(true);
    };
    populate();
  }, []);
  return (
    <AppPage {...props}>
      <NavigationContainer style={SharedStyles.container} theme={props.theme} independent>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={props.route.name} children={(localProps) =>
            <>
              {props.admin &&
                <Button {...props} {...localProps} text={pages.postMediaContent}
                  onPress={() => localProps.navigation.push(pages.postMediaContent)} />}
              <Feed {...props} fetched={fetched} data={posts} loadingText='Loading media content...'
                onItemPress={item => localProps.navigation.push(pages.viewMediaContent(item && item.id))}
                keyExtractor={(item, index) => item ? item.title : index}
                cardContent={item =>
                  <>
                    <Text style={{ fontWeight: 'bold', color: props.theme.colors.text, marginBottom: 10 }}>
                      {item && item.title}
                    </Text>
                    <Text style={{ color: props.theme.colors.text }}>
                      {item && item.description}
                    </Text>
                  </>} />
            </>} />
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