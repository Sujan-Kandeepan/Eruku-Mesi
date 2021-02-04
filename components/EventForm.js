import React from 'react';
import { Text, View, YellowBox } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import AppPage from './AppPage';
import { BodyInput, Button, SimpleInput, TitleInput } from '../shared/SharedComponents';
import { currentDate, paragraphs, showDate, showTime } from '../shared/SharedFunctions';

// Form for creating or updating an event record
export default function EventForm(props) {
  // State variables for form fields (two-way data binding)
  const [title, setTitle] = React.useState(props.payload ? props.payload.title : '');
  const [description, setDescription] =
    React.useState(props.payload ? props.payload.description.join('\n\n') : '');
  const [date, setDate] = React.useState(props.payload ? props.payload.date : currentDate());
  const [location, setLocation] = React.useState(props.payload ? props.payload.location : '');
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);
  // Reference: https://stackoverflow.com/a/59875773
  const [width, setWidth] = React.useState('99%');
  React.useEffect(() => setWidth('auto'));
  // Ignore warnings about date picker (still works, warning is superfluous) and YellowBox itself
  React.useEffect(() => YellowBox.ignoreWarnings([
    'Possible Unhandled Promise Rejection',
    'YellowBox has been replaced with LogBox'
  ]), []);
  return (
    <AppPage {...props} nested cancel scroll>
      <View style={{ flex: 1 }}>
        {/* Simple bold input field for event title */}
        <TitleInput {...props} placeholder='Event Title' value={title}
          onChangeText={value => setTitle(value)} />
        {/* Buttons to open date picker in date and time selection mode respectively */}
        {/* Reference: https://github.com/react-native-datetimepicker/datetimepicker */}
        {/* Reference: https://github.com/mmazzarolo/react-native-modal-datetime-picker */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 15 }}>
          <View style={{ flex: 1, margin: -15, marginRight: -16, minWidth: 50 }}>
            <Button {...props} style={{ flex: 1 }} onPress={() => { setShow(true); setMode('date'); }} text={
              <View>
                <Text style={{ flexShrink: 1 }}>
                  <Text style={{ fontWeight: 'bold' }}>Date:</Text> {showDate(date)}
                </Text>
              </View>} />
          </View>
          <View style={{ flex: 1, margin: -15, marginLeft: -16 }}>
            <Button {...props} style={{ flex: 1 }} onPress={() => { setShow(true); setMode('time'); }} text={
              <View>
                <Text style={{ flexShrink: 1 }}>
                  <Text style={{ fontWeight: 'bold' }}>Time:</Text> {showTime(date)}
                </Text>
              </View>} />
          </View>
        </View>
        {/* Date picker widget triggered by buttons above */}
        <DateTimePickerModal mode={mode} date={date} isVisible={show} isDarkModeEnabled={props.theme.dark}
          onCancel={() => setShow(false)} onConfirm={value => { setShow(false); setDate(value); }} />
        {/* Simple input field for event location */}
        <SimpleInput {...props} placeholder='Event Location' value={location} autoCapitalize='words'
          onChangeText={(value) => setLocation(value)} width={width} />
        {/* Large input field for event description */}
        <BodyInput {...props} placeholder='Event Description' value={description}
          onChangeText={(value) => setDescription(value)} width={width} />
        {/* Submit button with form validation */}
        <View style={{ marginBottom: 15, marginTop: -15 }}>
          <Button {...props} color='accent' text='Save' onPress={() => {
              // Check for required fields
              if (title.trim() === '') {
                props.snackbar('Event title is required');
                return;
              }
              if (location.trim() === '') {
                props.snackbar('Event location is required');
                return;
              }
              if (description.trim() === '') {
                props.snackbar('Event description is required');
                return;
              }
              // Create or update record depending on whether an existing record was given as payload
              props.setEvents(
                props.payload
                  // Find and update existing record
                  ? props.events.map(event =>
                    event.id === props.payload.id
                      ? { ...event, title, date, location, description: paragraphs(description) }
                      : event)
                  // Append new record
                  : [
                    ...props.events,
                    { id: props.events.length + 1, title, date, location, description: paragraphs(description) }
                  ]);
              // Exit page, return to previous
              props.navigation.pop();
            }} />
        </View>
      </View>
    </AppPage>
  );
};