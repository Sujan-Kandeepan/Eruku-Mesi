import React from 'react';
import { Text, TextInput, View } from 'react-native';

import AppPage from './AppPage';
import { Button } from '../shared/SharedComponents';

export default function FeedbackForm(props) {
  const [text, setText] = React.useState('');
  // Reference: https://stackoverflow.com/a/59875773
  const [width, setWidth] = React.useState('99%');
  React.useEffect(() => setWidth('auto'));
  const maxLength = 2000;
  const textChanged = (value) => {
    if (value.length >= maxLength)
      props.snackbar('Feedback message is too long', 222);
    setText(value);
  };
  const handleSubmit = () => {
    if (text.trim() === '') {
      props.snackbar('Feedback message is empty', 210);
    } else {
      console.log(`Feedback submitted:\n${'-'.repeat(20)}\n${text}\n${'-'.repeat(20)}\n`);
      props.snackbar('Feedback submitted', 160);
      setText('');
    }
  }
  return (
    <AppPage {...props}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: props.theme.colors.text, marginVertical: 25, textAlign: 'center' }}>
          Report bugs or share feedback about the app below.
        </Text>
        {/* Reference: https://reactnative.dev/docs/textinput */}
        <TextInput autoFocus multiline editable spellCheck maxLength={maxLength}
          style={{ backgroundColor: props.theme.colors.card,
            color: props.theme.colors.text, flex: 1, marginHorizontal: 25,
            padding: 20, textAlignVertical: 'top', width }}
          value={text} onChangeText={textChanged} />
        <View style={{ marginHorizontal: 10, marginVertical: 25 }}>
          <Button {...props} accent style={{ backgroundColor: props.theme.colors.primary }}
            text='Submit' onPress={handleSubmit} />
        </View>
      </View>
    </AppPage>
  );
};