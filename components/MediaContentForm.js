import React from 'react';
import { View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import AppPage from './AppPage';
import { BodyInput, Button, Media, TitleInput } from '../shared/SharedComponents';
import { paragraphs } from '../shared/SharedFunctions';

// Form for creating or updating a media content record
export default function MediaContentForm(props) {
  // State variables for form fields (two-way data binding)
  const [title, setTitle] = React.useState(props.payload ? props.payload.title : '');
  const [description, setDescription] =
    React.useState(props.payload ? props.payload.description.join('\n\n') : '');
  const [image, setImage] = React.useState(props.payload ? props.payload.image : null);
  // Reference: https://stackoverflow.com/a/59875773
  const [width, setWidth] = React.useState('99%');
  React.useEffect(() => setWidth('auto'));
  return (
    <AppPage {...props} nested cancel scroll onReturn={() => setDescription('')}>
      <View style={{ flex: 1 }}>
        {/* Simple bold input field for post title */}
        {/* Reference: https://reactnative.dev/docs/textinput */}
        <TitleInput {...props} placeholder='Post Title' value={title}
          onChangeText={value => setTitle(value)} />
        {/* Large input field for post description */}
        <BodyInput {...props} placeholder='Post Description' value={description}
          onChangeText={(value) => setDescription(value)} width={width} />
        {/* Image or video with button to open image picker */}
        <Media image={image} scale={{ image, maxHeight: 300 }}
          style={{ alignSelf: 'center', marginBottom: 15 }} />
        <View style={{ marginTop: -15 }}>
          <Button {...props} text='Choose Photo or Video' onPress={async () => {
            try {
              // Reference: https://docs.expo.io/versions/latest/sdk/imagepicker/
              let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                quality: 1,
              });
              if (!result.cancelled) {
                setImage(result);
              }
            } catch {
              props.snackbar('File selected is not a valid photo or video', 286)
            }
          }} />
        </View>
        {/* Submit button with form validation */}
        <View style={{ marginBottom: 15 }}>
          <Button {...props} color='accent' text='Save' onPress={() => {
              // Check for required fields
              if (title.trim() === '') {
                props.snackbar('Post title is required', 157);
                return;
              }
              if (description.trim() === '') {
                props.snackbar('Post description is required', 203);
                return;
              }
              if (!image) {
                props.snackbar('No photo or video selected', 200);
                return;
              }
              // Create or update record depending on whether an existing record was given as payload
              props.setPosts(
                props.payload
                  // Find and update existing record
                  ? props.posts.map(post =>
                    post.id === props.payload.id
                      ? { ...post, title, description: paragraphs(description), image }
                      : post)
                  // Append new record
                  : [
                    ...props.posts,
                    { id: props.posts.length + 1, title, description: paragraphs(description), image }
                  ]);
              // Exit page, return to previous
              props.navigation.pop();
            }} />
        </View>
      </View>
    </AppPage>
  );
};