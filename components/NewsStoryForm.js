import React from 'react';
import { View } from 'react-native';

import AppPage from './AppPage';
import { BodyInput, Button, TitleInput } from '../shared/SharedComponents';
import { paragraphs } from '../shared/SharedFunctions';

// Form for creating or updating a news story record
export default function NewsStoryForm(props) {
  // State variables for form fields (two-way data binding)
  const [title, setTitle] = React.useState(props.payload ? props.payload.title : '');
  const [content, setContent] =
    React.useState(props.payload ? props.payload.content.join('\n\n') : '');
  // Reference: https://stackoverflow.com/a/59875773
  const [width, setWidth] = React.useState('99%');
  React.useEffect(() => setWidth('auto'));
  return (
    <AppPage {...props} nested cancel scroll>
      <View style={{ flex: 1 }}>
        {/* Simple bold input field for news story title */}
        {/* Reference: https://reactnative.dev/docs/textinput */}
        <TitleInput {...props} placeholder='News Story Title' value={title}
          onChangeText={value => setTitle(value)} />
        {/* Large input field for news story content */}
        <BodyInput {...props} placeholder='News Story Content' value={content}
          onChangeText={(value) => setContent(value)} width={width} />
        {/* Submit button with form validation */}
        <View style={{ marginBottom: 15, marginTop: -15 }}>
          <Button {...props} color='accent' text='Save' onPress={() => {
              // Check for required fields
              if (title.trim() === '') {
                props.snackbar('News story title is required');
                return;
              }
              if (content.trim() === '') {
                props.snackbar('News story content is required');
                return;
              }
              // Create or update record depending on whether an existing record was given as payload
              props.setStories(
                props.payload
                  // Find and update existing record
                  ? props.stories.map(story =>
                    story.id === props.payload.id
                      ? { ...story, title, content: paragraphs(content) }
                      : story)
                  // Append new record
                  : [
                    ...props.stories,
                    { id: props.stories.length + 1, title, content: paragraphs(content) }
                  ]);
              // Exit page, return to previous
              props.navigation.pop();
            }} />
        </View>
      </View>
    </AppPage>
  );
};