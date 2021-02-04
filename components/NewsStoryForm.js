import React from 'react';
import { View } from 'react-native';

import AppPage from './AppPage';
import { BodyInput, Button, TitleInput } from '../shared/SharedComponents';
import { paragraphs, post, text } from '../shared/SharedFunctions';

// Form for creating or updating a news story record
export default function NewsStoryForm(props) {
  // State variables for form fields (two-way data binding)
  const [title, setTitle] = React.useState(props.payload ? props.payload.title : '');
  const [content, setContent] =
    React.useState(props.payload ? text(props.payload.content) : '');
  // Reference: https://stackoverflow.com/a/59875773
  const [width, setWidth] = React.useState('99%');
  // Disable save button while database operation processing
  const [saving, setSaving] = React.useState(false);
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
          <Button {...props} color='accent' text='Save' disabled={saving} onPress={() => {
            // Check for required fields
            if (title.trim() === '') {
              props.snackbar('News story title is required');
              return;
            }
            if (content.trim() === '') {
              props.snackbar('News story content is required');
              return;
            }
            // Update database with new or modified record
            setSaving(true);
            post(`${props.baseURL}/newsStories/${props.payload ? `edit/${props.payload.id}` : 'add'}`,
              { title, content: text(paragraphs(content)), source: 'admin' })
              // Update locally and return to previous page
              .then(() => {
                props.update && props.update();
                props.navigation.pop();
              })
              // Display message if failed
              .catch(() => props.snackbar('Failed to update database'))
              .finally(() => setSaving(false));
          }} />
        </View>
      </View>
    </AppPage>
  );
};