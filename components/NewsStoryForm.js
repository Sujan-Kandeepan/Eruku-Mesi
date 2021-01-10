import React from 'react';
import { TextInput, View } from 'react-native';

import AppPage from './AppPage';
import { Button } from '../shared/SharedComponents';
import { paragraphs } from '../shared/SharedFunctions';

// Form for creating or updating a news story record
// Duplicated code for now as layout will soon change
export default function NewsStoryForm(props) {
  // State variables for form fields (two-way data binding)
  const [title, setTitle] = React.useState(props.payload ? props.payload.title : '');
  const [content, setContent] = React.useState(props.payload ? props.payload.content.join('\n\n') : '');
  // Reference: https://stackoverflow.com/a/59875773
  const [width, setWidth] = React.useState('99%');
  React.useEffect(() => setWidth('auto'));
  return (
    <AppPage {...props} nested cancel onReturn={() => setContent('')}>
      <View style={{ flex: 1 }}>
        {/* Simple bold input field for news story title */}
        {/* Reference: https://reactnative.dev/docs/textinput */}
        <TextInput placeholder='News Story Title' placeholderTextColor={props.theme.colors.placeholder}
          autoFocus autoCapitalize='words' style={{
            backgroundColor: props.theme.colors.card,
            color: props.theme.colors.text, fontSize: 16, fontWeight: 'bold',
            margin: 15, marginBottom: 0, padding: 5, textAlign: 'center'
          }} value={title} onChangeText={value => setTitle(value)} />
        {/* Large input field for news story content */}
        <TextInput placeholder='News Story Content' placeholderTextColor={props.theme.colors.placeholder}
          autoFocus multiline editable spellCheck style={{
            backgroundColor: props.theme.colors.card,
            color: props.theme.colors.text, flex: 1, margin: 15,
            padding: 20, textAlignVertical: 'top', width
          }} value={content} onChangeText={(value) => setContent(value)} />
        {/* Submit button with form validation */}
        <View style={{ marginBottom: 15, marginTop: -15 }}>
          <Button {...props} accent style={{ backgroundColor: props.theme.colors.primary }}
            text='Save' onPress={() => {
              // Check for required fields
              if (title.trim() === '') {
                props.snackbar('News story title is required', 198);
                return;
              }
              if (content.trim() === '') {
                props.snackbar('News story content is required', 222);
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