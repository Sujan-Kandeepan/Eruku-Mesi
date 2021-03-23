import React from 'react';
import { Text, View } from 'react-native';

import AppPage from './AppPage';
import { submitMediaContent } from './functions/MediaContentFunctions';
import { BodyInput, Button, FilePicker, Media, MediaPicker, TitleInput } from '../shared/SharedComponents';

// Form for creating or updating a media content record
export default function MediaContentForm(props) {
  // State variables for form fields (two-way data binding)
  const [title, setTitle] = React.useState(props.payload ? props.payload.title : '');
  const [description, setDescription] =
    React.useState(props.payload ? props.payload.description.join('\n\n') : '');
  const [image, setImage] =
    React.useState(props.payload && props.payload.type === 'photo'
      ? { ...props.payload.metadata, uri: props.payload.url } : null);
  const [file, setFile] =
    React.useState(props.payload && props.payload.type === 'file'
      ? { ...props.payload.metadata, uri: props.payload.url } : null);
  // Reference: https://stackoverflow.com/a/59875773
  const [width, setWidth] = React.useState('99%');
  // Disable save button while database operation processing
  const [saving, setSaving] = React.useState(false);
  React.useEffect(() => setWidth('auto'));
  // Clear image when file uploaded and vice versa
  React.useEffect(() => { if (image) setFile(null)}, [image]);
  React.useEffect(() => { if (file) setImage(null)}, [file]);
  return (
    <AppPage {...props} nested cancel scroll>
      <View style={{ flex: 1 }}>
        {/* Simple bold input field for post title */}
        {/* Reference: https://reactnative.dev/docs/textinput */}
        <TitleInput {...props} placeholder='Post Title' value={title}
          onChangeText={value => setTitle(value)} />
        {/* Large input field for post description */}
        <BodyInput {...props} placeholder='Post Description' value={description}
          onChangeText={(value) => setDescription(value)} width={width} />
        {/* Image/video or filename with buttons to open image/video or file picker */}
        <Media image={image} scale={{ image, maxHeight: 300 }}
          style={{ alignSelf: 'center', marginBottom: 15 }} />
        {file &&
          <Text style={{ color: props.theme.colors.text, paddingBottom: 15, textAlign: 'center' }}>
            Selected file: {file.name}
          </Text>}
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, marginRight: -16 }}>
            <MediaPicker {...props} text='Choose Photo or Video'
              allowVideo handleResult={setImage} />
          </View>
          <View style={{ flex: 1, marginLeft: -16 }}>
            <FilePicker {...props} text='Choose File' handleResult={setFile} />
          </View>
        </View>
        {/* Submit button with form validation */}
        <View style={{ marginBottom: 15 }}>
          <Button {...props} color='accent' text='Save' disabled={saving}
            onPress={() => submitMediaContent(props, title, description, image, file, setSaving)} />
        </View>
      </View>
    </AppPage>
  );
};