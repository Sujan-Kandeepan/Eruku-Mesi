import React from 'react';
import { View } from 'react-native';

import AppPage from './AppPage';
import { submitMediaContent } from './functions/MediaContentFunctions';
import { BodyInput, Button, Media, MediaPicker, TitleInput } from '../shared/SharedComponents';

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
    <AppPage {...props} nested cancel scroll>
      <View style={{ flex: 1 }}>
        {/* Simple bold input field for post title */}
        {/* Reference: https://reactnative.dev/docs/textinput */}
        <TitleInput {...props} placeholder='Post Title' value={title}
          onChangeText={value => setTitle(value)} />
        {/* Large input field for post description */}
        <BodyInput {...props} placeholder='Post Description' value={description}
          onChangeText={(value) => setDescription(value)} width={width} />
        {/* Image or video with button to open image/video picker */}
        <Media image={image} scale={{ image, maxHeight: 300 }}
          style={{ alignSelf: 'center', marginBottom: 15 }} />
        <MediaPicker {...props} text='Choose Photo or Video'
          allowVideo handleResult={setImage} />
        {/* Submit button with form validation */}
        <View style={{ marginBottom: 15 }}>
          <Button {...props} color='accent' text='Save'
            onPress={() => submitMediaContent(props, title, description, image, () => {})} />
        </View>
      </View>
    </AppPage>
  );
};