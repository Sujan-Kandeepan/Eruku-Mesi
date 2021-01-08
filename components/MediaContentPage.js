import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AppPage from './AppPage';
import EmptyPage from './EmptyPage';
import MediaContentForm from './MediaContentForm';
import { Button, Content, Feed } from '../shared/SharedComponents';
import { get, truncate } from '../shared/SharedFunctions';
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
        get('https://baconipsum.com/api/?type=all-meat&sentences=3').then(description => {
          let newPosts = posts;
          if (!newPosts[index])
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
              {/* Post media content (navigate to form) */}
              {props.admin &&
                <Button {...props} {...localProps} text={pages.postMediaContent}
                  onPress={() => localProps.navigation.push(pages.postMediaContent)} />}
              {/* Display posts as individual cards in scrolling feed */}
              <Feed {...props} fetched={fetched} data={posts} loadingText='Loading media content...'
                onItemPress={item => localProps.navigation.push(pages.viewMediaContent(item && item.id))}
                keyExtractor={(item, index) => (item ? item.id : index).toString()}
                cardContent={item =>
                  <>
                    <Text style={{ fontWeight: 'bold', color: props.theme.colors.text, marginBottom: 10 }}>
                      {item && item.title}
                    </Text>
                    <Text style={{ color: props.theme.colors.text }}>
                      {item && truncate(item.description[0], 10)}
                    </Text>
                  </>} />
            </>} />
          {/* Static page route for posting media content */}
          {props.admin &&
            <Stack.Screen name={pages.postMediaContent} children={(localProps) =>
              <MediaContentForm {...props} {...localProps} posts={posts} setPosts={setPosts} />} />}
          {/* Generated page routes for viewing media content */}
          {posts.map(post => 
            <Stack.Screen key={post.id} name={pages.viewMediaContent(post.id)} children={(localProps) =>
              <AppPage {...props} {...localProps} nested>
                {props.admin &&
                  <Button {...props} {...localProps} text='Edit'
                    onPress={() => localProps.navigation.push(pages.editMediaContent(post.id))} />}
                {props.admin &&
                  <Button {...props} {...localProps} text='Delete'
                    onPress={() => localProps.navigation.push(pages.deleteMediaContent(post.id))} />}
                <Content {...props} {...localProps} title={post.title}
                  content={post.description} extraData={fetched} />
              </AppPage>} />)}
          {/* Generated page routes for editing media content */}
          {props.admin && posts.map(post =>
            <Stack.Screen key={post.id} name={pages.editMediaContent(post.id)} children={(localProps) =>
              <MediaContentForm {...props} {...localProps}
                posts={posts} setPosts={setPosts} payload={post} />} />)}
          {/* Generated page routes for deleting media content */}
          {props.admin && posts.map(post =>
            <Stack.Screen key={post.id} name={pages.deleteMediaContent(post.id)} children={(localProps) =>
              <AppPage {...props} {...localProps} nested cancel>
                <Button {...props} {...localProps} text='Confirm' accent
                  onPress={() => setPosts(posts.filter(p => p.id !== post.id))} />
                <Text style={{ color: props.theme.colors.text, margin: 15, textAlign: 'center' }}>
                  Are you sure you want to delete {post.title}?
                </Text>
              </AppPage>} />)}
        </Stack.Navigator>
      </NavigationContainer>
    </AppPage>
  );
};