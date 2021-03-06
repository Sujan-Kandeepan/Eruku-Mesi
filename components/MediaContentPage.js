import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AppPage from './AppPage';
import MediaContentForm from './MediaContentForm';
import { deleteMediaContent, fetchMediaContent } from './functions/MediaContentFunctions';
import { Button, Content, Feed, FileDownload, Media } from '../shared/SharedComponents';
import { filenameOrDefault, periodic, truncate } from '../shared/SharedFunctions';
import SharedStyles from '../shared/SharedStyles';

// Initialize stack navigator
const Stack = createStackNavigator();

// Page for managing/displaying media content (photos, files, etc.)
export default function MediaContentPage(props) {
  // Central list of page names for consistency
  const pages = {
    postMediaContent: 'Post Media Content',
    viewMediaContent: id => `View Media Content Post ${id}`,
    editMediaContent: id => `Edit Media Content Post ${id}`,
    deleteMediaContent: id => `Delete Media Content Post ${id}`
  };
  // State variables for display data and state (two-way data binding)
  const [posts, setPosts] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  periodic(() => {
    // Refresh only if drawer nav currently on media content page
    if (!props.drawerState || !props.pages || !props.drawerVisited
      || (props.drawerState.current === props.pages.mediaContent)
      || (!fetched && !props.drawerVisited.current.includes(props.pages.mediaContent)))
    fetchMediaContent(props, setPosts, () => setFetched(true));
  });
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
                keyExtractor={(item, index) => `${item ? item.id : index} ${index}`}
                cardContent={item =>
                  <>
                    {/* Display post title, truncated description, and image or video thumbnail */}
                    <Text style={{ fontWeight: 'bold', color: props.theme.colors.text, marginBottom: 10 }}>
                      {item && item.title}
                    </Text>
                    <Text style={{ color: props.theme.colors.text }}>
                      {item && truncate(item.description.length ? item.description[0] : "", 10)}
                    </Text>
                    {item.type === 'photo' ?
                      <Media {...props} image={{ ...item.metadata, uri: item.url }} thumbnail
                        scale={{ image: { ...item.metadata, uri: item.url }, marginHorizontal: 30, maxHeight: 200 }}
                        style={{ alignSelf: 'center', marginTop: 15 }} /> :
                      <Text style={{ color: props.theme.colors.text, marginTop: 7.5 }}>
                        {filenameOrDefault({ ...item.metadata, uri: item.url })}
                      </Text>}
                  </>} />
            </>} />
          {/* Static page route for posting media content */}
          {props.admin &&
            <Stack.Screen name={pages.postMediaContent} children={(localProps) =>
              // Separate form with no payload to indicate new record
              <MediaContentForm {...props} {...localProps} posts={posts} setPosts={setPosts}
              update={() => fetchMediaContent(props, setPosts, () => setFetched(true))} />} />}
          {/* Generated page routes for viewing media content */}
          {posts.map(post => 
            <Stack.Screen key={post.id} name={pages.viewMediaContent(post.id)} children={(localProps) =>
              <AppPage {...props} {...localProps} nested>
                {/* Admin controls */}
                {props.admin &&
                  <Button {...props} {...localProps} text='Edit'
                    onPress={() => localProps.navigation.push(pages.editMediaContent(post.id))} />}
                {props.admin &&
                  <Button {...props} {...localProps} text='Delete'
                    onPress={() => localProps.navigation.push(pages.deleteMediaContent(post.id))} />}
                {/* Display for individual post */}
                <Content {...props} {...localProps} title={post.title}
                  imageBottom={post.type === 'photo' && { ...post.metadata, uri: post.url, type: post.type }}
                  extraContent={post.type === 'file' &&
                    <FileDownload {...props} text={`Download ${filenameOrDefault({ ...post.metadata, uri: post.url })}`}
                      source={post.url} destination={filenameOrDefault({ ...post.metadata, uri: post.url })} />}
                  content={post.description} extraData={fetched} />
              </AppPage>} />)}
          {/* Generated page routes for editing media content */}
          {props.admin && posts.map(post =>
            <Stack.Screen key={post.id} name={pages.editMediaContent(post.id)} children={(localProps) =>
              // Separate form with existing record as payload
              <MediaContentForm {...props} {...localProps}
                posts={posts} setPosts={setPosts}
                update={() => fetchMediaContent(props, setPosts, () => setFetched(true))} payload={post} />} />)}
          {/* Generated page routes for deleting media content */}
          {props.admin && posts.map(post =>
            <Stack.Screen key={post.id} name={pages.deleteMediaContent(post.id)} children={(localProps) =>
              <AppPage {...props} {...localProps} nested cancel>
                {/* Confirm button with prompt, cancel button inherited */}
                <Button {...props} {...localProps} text='Confirm' color='danger'
                  onPress={() => deleteMediaContent(props, post, setPosts, setFetched, localProps.navigation.popToTop)} />
                <Text style={{ color: props.theme.colors.text, margin: 15, textAlign: 'center' }}>
                  Are you sure you want to delete {post.title}?
                </Text>
              </AppPage>} />)}
        </Stack.Navigator>
      </NavigationContainer>
    </AppPage>
  );
};