import React from 'react';
import { TextInput, View } from 'react-native';

import AppPage from './AppPage';
import { Button } from '../shared/SharedComponents';
import { paragraphs } from '../shared/SharedFunctions';

export default function EventForm(props) {
  const [title, setTitle] = React.useState(props.payload ? props.payload.title : '');
  const [description, setDescription] = React.useState(props.payload ? props.payload.description.join('\n\n') : '');
  // Reference: https://stackoverflow.com/a/59875773
  const [width, setWidth] = React.useState('99%');
  React.useEffect(() => setWidth('auto'));
  return (
    <AppPage {...props} nested cancel onReturn={() => setDescription('')}>
      <View style={{ flex: 1 }}>
        {/* Reference: https://reactnative.dev/docs/textinput */}
        <TextInput placeholder='Event Title' placeholderTextColor={props.theme.colors.placeholder}
        autoFocus autoCapitalize='words' style={{
          backgroundColor: props.theme.colors.card,
          color: props.theme.colors.text, fontSize: 16, fontWeight: 'bold',
          margin: 15, marginBottom: 0, padding: 5, textAlign: 'center'
        }} value={title} onChangeText={value => setTitle(value)} />
        <TextInput placeholder='Event Description' placeholderTextColor={props.theme.colors.placeholder}
        autoFocus multiline editable spellCheck style={{
          backgroundColor: props.theme.colors.card,
          color: props.theme.colors.text, flex: 1, margin: 15,
          padding: 20, textAlignVertical: 'top', width
        }} value={description} onChangeText={(value) => setDescription(value)} />
        <View style={{ marginBottom: 15, marginTop: -15 }}>
          <Button {...props} accent style={{ backgroundColor: props.theme.colors.primary }}
            text='Save' onPress={() => {
              if (title.trim() === '') {
                props.snackbar('Event title is required', 163);
                return;
              }
              if (description.trim() === '') {
                props.snackbar('Event description is required', 209);
                return;
              }
              props.setEvents(
                props.payload
                  ? props.events.map(event =>
                    event.id === props.payload.id
                      ? { ...event, title, description: paragraphs(description) }
                      : event)
                  : [
                      ...props.events,
                      { id: props.events.length + 1, title, description: paragraphs(description) }
                    ]);
              props.navigation.pop();
            }} />
        </View>
      </View>
    </AppPage>
  );
};