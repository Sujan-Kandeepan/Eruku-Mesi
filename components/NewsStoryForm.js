import React from 'react';
import { View } from 'react-native';

import AppPage from './AppPage';
import { submitNewsStory } from './functions/NewsStoryFunctions';
import { BodyInput, Button, TitleInput } from '../shared/SharedComponents';
import { text } from '../shared/SharedFunctions';

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
          <Button {...props} color='accent' text='Save' disabled={saving}
            onPress={() => submitNewsStory(props, title, content, setSaving)} />
        </View>
      </View>
    </AppPage>
  );
};