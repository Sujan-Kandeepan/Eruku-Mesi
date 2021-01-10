import React from 'react';
import { TextInput, View } from 'react-native';

import AppPage from './AppPage';
import { Button } from '../shared/SharedComponents';
import { paragraphs } from '../shared/SharedFunctions';

// Form for creating or updating a media content record
// Duplicated code for now as layout will soon change
export default function MediaContentForm(props) {
  // State variables for form fields (two-way data binding)
  const [title, setTitle] = React.useState(props.payload ? props.payload.title : '');
  const [description, setDescription] = React.useState(props.payload ? props.payload.description.join('\n\n') : '');
  // Reference: https://stackoverflow.com/a/59875773
  const [width, setWidth] = React.useState('99%');
  React.useEffect(() => setWidth('auto'));
  return (
    <AppPage {...props} nested cancel onReturn={() => setDescription('')}>
      <View style={{ flex: 1 }}>
        {/* Simple bold input field for post title */}
        {/* Reference: https://reactnative.dev/docs/textinput */}
        <TextInput placeholder='Post Title' placeholderTextColor={props.theme.colors.placeholder}
          autoFocus autoCapitalize='words' style={{
            backgroundColor: props.theme.colors.card,
            color: props.theme.colors.text, fontSize: 16, fontWeight: 'bold',
            margin: 15, marginBottom: 0, padding: 5, textAlign: 'center'
          }} value={title} onChangeText={value => setTitle(value)} />
        {/* Large input field for post description */}
        <TextInput placeholder='Post Description' placeholderTextColor={props.theme.colors.placeholder}
          autoFocus multiline editable spellCheck style={{
            backgroundColor: props.theme.colors.card,
            color: props.theme.colors.text, flex: 1, margin: 15,
            padding: 20, textAlignVertical: 'top', width
          }} value={description} onChangeText={(value) => setDescription(value)} />
        {/* Submit button with form validation */}
        <View style={{ marginBottom: 15, marginTop: -15 }}>
          <Button {...props} accent style={{ backgroundColor: props.theme.colors.primary }}
            text='Save' onPress={() => {
              // Check for required fields
              if (title.trim() === '') {
                props.snackbar('Post title is required', 157);
                return;
              }
              if (description.trim() === '') {
                props.snackbar('Post description is required', 203);
                return;
              }
              // Create or update record depending on whether an existing record was given as payload
              props.setPosts(
                props.payload
                  // Find and update existing record
                  ? props.posts.map(post =>
                    post.id === props.payload.id
                      ? { ...post, title, description: paragraphs(description) }
                      : post)
                  // Append new record
                  : [
                    ...props.posts,
                    { id: props.posts.length + 1, title, description: paragraphs(description) }
                  ]);
              // Exit page, return to previous
              props.navigation.pop();
            }} />
        </View>
      </View>
    </AppPage>
  );
};