import React from 'react';
import { TextInput, View } from 'react-native';

import AppPage from './AppPage';
import { Button } from '../shared/SharedComponents';
import { paragraphs } from '../shared/SharedFunctions';

export default function MediaContentForm(props) {
  const [title, setTitle] = React.useState(props.payload ? props.payload.title : '');
  const [description, setDescription] = React.useState(props.payload ? props.payload.description.join('\n\n') : '');
  // Reference: https://stackoverflow.com/a/59875773
  const [width, setWidth] = React.useState('99%');
  React.useEffect(() => setWidth('auto'));
  return (
    <AppPage {...props} nested cancel onReturn={() => setDescription('')}>
      <View style={{ flex: 1 }}>
        {/* Reference: https://reactnative.dev/docs/textinput */}
        <TextInput placeholder='Post Title' autoFocus autoCapitalize='words' style={{
          backgroundColor: props.theme.colors.card,
          color: props.theme.colors.text, fontSize: 16, fontWeight: 'bold',
          margin: 15, marginBottom: 0, padding: 5, textAlign: 'center'
        }} value={title} onChangeText={value => setTitle(value)} />
        <TextInput placeholder='Post Description' autoFocus multiline editable spellCheck style={{
          backgroundColor: props.theme.colors.card,
          color: props.theme.colors.text, flex: 1, margin: 15,
          padding: 20, textAlignVertical: 'top', width
        }} value={description} onChangeText={(value) => setDescription(value)} />
        <View style={{ marginBottom: 15, marginTop: -15 }}>
          <Button {...props} accent style={{ backgroundColor: props.theme.colors.primary }}
            text='Save' onPress={() => {
              if (title.trim() === '') {
                props.snackbar('Post title is required', 157);
                return;
              }
              if (description.trim() === '') {
                props.snackbar('Post description is required', 203);
                return;
              }
              props.setPosts(
                props.payload
                  ? props.posts.map(post =>
                    post.id === props.payload.id
                      ? { ...post, title, description: paragraphs(description) }
                      : post)
                  : [
                      ...props.posts,
                      { id: props.posts.length + 1, title, description: paragraphs(description) }
                    ]);
              props.navigation.pop();
            }} />
        </View>
      </View>
    </AppPage>
  );
};