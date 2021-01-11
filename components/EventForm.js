import React from 'react';
import { View } from 'react-native';

import AppPage from './AppPage';
import { BodyInput, Button, TitleInput } from '../shared/SharedComponents';
import { paragraphs } from '../shared/SharedFunctions';

// Form for creating or updating an event record
export default function EventForm(props) {
  // State variables for form fields (two-way data binding)
  const [title, setTitle] = React.useState(props.payload ? props.payload.title : '');
  const [description, setDescription] =
    React.useState(props.payload ? props.payload.description.join('\n\n') : '');
  // Reference: https://stackoverflow.com/a/59875773
  const [width, setWidth] = React.useState('99%');
  React.useEffect(() => setWidth('auto'));
  return (
    <AppPage {...props} nested cancel onReturn={() => setDescription('')}>
      <View style={{ flex: 1 }}>
        {/* Simple bold input field for event title */}
        <TitleInput {...props} placeholder='Event Title' value={title}
          onChangeText={value => setTitle(value)} />
        {/* Large input field for event description */}
        <BodyInput {...props} placeholder='Event Description' value={description}
          onChangeText={(value) => setDescription(value)} width={width} />
        {/* Submit button with form validation */}
        <View style={{ marginBottom: 15, marginTop: -15 }}>
          <Button {...props} accent style={{ backgroundColor: props.theme.colors.primary }}
            text='Save' onPress={() => {
              // Check for required fields
              if (title.trim() === '') {
                props.snackbar('Event title is required', 163);
                return;
              }
              if (description.trim() === '') {
                props.snackbar('Event description is required', 209);
                return;
              }
              // Create or update record depending on whether an existing record was given as payload
              props.setEvents(
                props.payload
                  // Find and update existing record
                  ? props.events.map(event =>
                    event.id === props.payload.id
                      ? { ...event, title, description: paragraphs(description) }
                      : event)
                  // Append new record
                  : [
                    ...props.events,
                    { id: props.events.length + 1, title, description: paragraphs(description) }
                  ]);
              // Exit page, return to previous
              props.navigation.pop();
            }} />
        </View>
      </View>
    </AppPage>
  );
};