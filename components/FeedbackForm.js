import React from 'react';
import { Keyboard, Text, TextInput, View } from 'react-native';

import AppPage from './AppPage';
import { Button } from '../shared/SharedComponents';

// Form for submitting user feedback/issues
export default function FeedbackForm(props) {
  // State variable for feedback field (two-way data binding)
  const [text, setText] = React.useState('');
  // Reference: https://stackoverflow.com/a/59875773
  const [width, setWidth] = React.useState('99%');
  React.useEffect(() => setWidth('auto'));
  // Ensure text does not exceed max length
  const maxLength = 2000;
  const textChanged = (value) => {
    if (value.length >= maxLength)
      props.snackbar('Feedback message is too long', 222);
    setText(value);
  };
  // Validate form and handle submit
  const handleSubmit = () => {
    if (text.trim() === '') {
      props.snackbar('Feedback message is empty', 210);
    } else {
      console.log(`Feedback submitted:\n${'-'.repeat(20)}\n${text}\n${'-'.repeat(20)}\n`);
      props.snackbar('Feedback submitted', 160);
      Keyboard.dismiss();
      setText('');
    }
  }
  return (
    <AppPage {...props}>
      <View style={{ flex: 1 }}>
        {/* Informational text above feedback input field */}
        <Text style={{ color: props.theme.colors.text, marginVertical: 25, textAlign: 'center' }}
          onPress={Keyboard.dismiss}>
          Report bugs or share feedback about the app below.
        </Text>
        {/* Main feedback input field filling majority of screen */}
        {/* Reference: https://reactnative.dev/docs/textinput */}
        <TextInput autoFocus multiline editable spellCheck maxLength={maxLength}
          style={{ backgroundColor: props.theme.colors.card,
            color: props.theme.colors.text, flex: 1, marginHorizontal: 25,
            padding: 20, textAlignVertical: 'top', width }}
          value={text} onChangeText={textChanged} onBlur={Keyboard.dismiss} />
        {/* Button to validate and submit feedback */}
        <View style={{ marginHorizontal: 10, marginVertical: 25 }}>
          <Button {...props} accent style={{ backgroundColor: props.theme.colors.primary }}
            text='Submit' onPress={handleSubmit} />
        </View>
      </View>
    </AppPage>
  );
};