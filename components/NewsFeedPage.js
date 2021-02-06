import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AppPage from './AppPage';
import NewsStoryForm from './NewsStoryForm';
import { fetchNewsStories } from './functions/NewsStoryFunctions';
import { Button, Content, Feed } from '../shared/SharedComponents';
import { del, truncate } from '../shared/SharedFunctions';
import SharedStyles from '../shared/SharedStyles';

// Initialize stack navigator
const Stack = createStackNavigator();

// Page for displaying news stories in sequence
export default function NewsFeedPage(props) {
  // Central list of page names for consistency
  const pages = {
    createNewsStory: 'Create News Story',
    viewNewsStory: id => `View News Story ${id}`,
    editNewsStory: id => `Edit News Story ${id}`,
    deleteNewsStory: id => `Delete News Story ${id}`
  };
  // State variables for display data and state (two-way data binding)
  const [stories, setStories] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  // Initial load of new stories by calling useEffect with [] as second param to run once
  React.useEffect(() => fetchNewsStories(props, setStories, () => setFetched(true)), []);
  return (
    <AppPage {...props}>
      <NavigationContainer style={SharedStyles.container} theme={props.theme} independent>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={props.route.name} children={(localProps) =>
            <>
              {/* Post news story (navigate to form) */}
              {props.admin &&
                <Button {...props} {...localProps} text={pages.createNewsStory}
                  onPress={() => localProps.navigation.push(pages.createNewsStory)} />}
              {/* Display news stories as individual cards in scrolling feed */}
              <Feed {...props} fetched={fetched} data={stories} loadingText='Loading news stories...'
                onItemPress={item => localProps.navigation.push(pages.viewNewsStory(item && item.id))}
                keyExtractor={(item, index) => `${item ? item.id : index} ${index}`}
                cardContent={item =>
                  <>
                    {/* Display preview of news story */}
                    <Text style={{ fontWeight: 'bold', color: props.theme.colors.text, marginBottom: 10 }}>
                      {item && item.title}
                    </Text>
                    <Text style={{ color: props.theme.colors.text }}>
                      {item && truncate(item.content[0], 25)}
                    </Text>
                  </>} />
            </>} />
          {/* Static page route for creating news story */}
          {props.admin &&
            <Stack.Screen name={pages.createNewsStory} children={(localProps) =>
              // Separate form with no payload to indicate new record
              <NewsStoryForm {...props} {...localProps}
                stories={stories} setStories={setStories}
                update={() => fetchNewsStories(props, setStories, () => setFetched(true))} />} />}
          {/* Generated page routes for viewing news stories */}
          {stories.map(story =>
            <Stack.Screen key={story.id} name={pages.viewNewsStory(story.id)} children={(localProps) =>
              <AppPage {...props} {...localProps} nested>
                {/* Admin controls */}
                {props.admin &&
                  <Button {...props} {...localProps} text='Edit'
                    onPress={() => localProps.navigation.push(pages.editNewsStory(story.id))} />}
                {props.admin &&
                  <Button {...props} {...localProps} text='Delete'
                    onPress={() => localProps.navigation.push(pages.deleteNewsStory(story.id))} />}
                {/* Display for individual news story */}
                <Content {...props} {...localProps} title={story.title}
                  content={story.content} extraData={fetched} />
              </AppPage>} />)}
          {/* Generated page routes for editing news stories */}
          {props.admin && stories.map(story =>
            <Stack.Screen key={story.id} name={pages.editNewsStory(story.id)} children={(localProps) =>
              // Separate form with existing record as payload
              <NewsStoryForm {...props} {...localProps}
                stories={stories} setStories={setStories}
                update={() => fetchNewsStories(props, setStories, () => setFetched(true))} payload={story} />} />)}
          {/* Generated page routes for deleting news stories */}
          {props.admin && stories.map(story =>
            <Stack.Screen key={story.id} name={pages.deleteNewsStory(story.id)} children={(localProps) =>
              <AppPage {...props} {...localProps} nested cancel>
                {/* Confirm button with prompt, cancel button inherited */}
                <Button {...props} {...localProps} text='Confirm' color='danger'
                  onPress={() => del(`${props.baseURL}/newsStories/${story.id}`)
                    .then(() => fetchNewsStories(props, setStories, () => setFetched(true)))
                    .catch(() => props.snackbar('Failed to update database'))} />
                <Text style={{ color: props.theme.colors.text, margin: 15, textAlign: 'center' }}>
                  Are you sure you want to delete {story.title}?
                </Text>
              </AppPage>} />)}
        </Stack.Navigator>
      </NavigationContainer>
    </AppPage>
  );
};