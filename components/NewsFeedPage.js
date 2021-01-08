import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AppPage from './AppPage';
import EmptyPage from './EmptyPage';
import NewsStoryForm from './NewsStoryForm';
import { Button, Content, Feed } from '../shared/SharedComponents';
import { get, truncate } from '../shared/SharedFunctions';
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
  const [stories, setStories] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  // Initial load of new stories by calling useEffect with [] as second param to run once
  React.useEffect(() => {
    // Wait for all new stories and trigger update to list by setting flag
    const populate = async () => {
      // Using lorem ipsum data for now with 10 new stories
      await Promise.all([...Array(10).keys()].map(index =>
        get('https://baconipsum.com/api/?type=meat-and-filler&paras=7').then(content => {
          let newStories = stories;
          newStories[index] = { id: index + 1, title: `News Story ${index + 1}`, content };
          setStories(newStories);
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
                <Button {...props} {...localProps} text={pages.createNewsStory}
                  onPress={() => localProps.navigation.push(pages.createNewsStory)} />}
              <Feed {...props} fetched={fetched} data={stories} loadingText='Loading news stories...'
                onItemPress={item => localProps.navigation.push(pages.viewNewsStory(item && item.id))}
                keyExtractor={(item, index) => item ? item.title : index.toString()}
                cardContent={item =>
                  <>
                    <Text style={{ fontWeight: 'bold', color: props.theme.colors.text, marginBottom: 10 }}>
                      {item && item.title}
                    </Text>
                    <Text style={{ color: props.theme.colors.text }}>
                      {item && truncate(item.content[0], 25)}
                    </Text>
                  </>} />
            </>} />
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
                <Content {...props} {...localProps} title={story.title}
                  content={story.content} extraData={fetched} />
              </AppPage>} />)}
          {stories.map(story =>
            <Stack.Screen key={story.id} name={pages.editNewsStory(story.id)} children={(localProps) =>
              <NewsStoryForm {...props} {...localProps} />} />)}
          {stories.map(story =>
            <Stack.Screen key={story.id} name={pages.deleteNewsStory(story.id)} children={(localProps) =>
              <AppPage {...props} {...localProps} nested cancel>
                <Button {...props} {...localProps} text='Confirm' accent
                  onPress={() => setStories(stories.filter(s => s.id !== story.id))} />
                <Text style={{ color: props.theme.colors.text, margin: 15, textAlign: 'center' }}>
                  Are you sure you want to delete {story.title}?
                </Text>
              </AppPage>} />)}
        </Stack.Navigator>
      </NavigationContainer>
    </AppPage>
  );
};