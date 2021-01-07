import React from 'react';
import { Dimensions, Platform, Text, View } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';

import AppPage from './AppPage';
import { IconButton } from '../shared/SharedComponents';

// Generate temporary lorem ipsum messages for now
// Reference: https://reactnative.dev/docs/network
const sentence = async () => {
  try {
    const response = await fetch('https://baconipsum.com/api/?type=all-meat&sentences=1');
    const json = await response.json();
    return json[0];
  } catch (error) {
    return console.error(error);
  }
}

export default function MessagesPage(props) {
  const [newMessage, setNewMessage] = React.useState('');
  const [messages, setMessages] = React.useState([...Array(20).keys()].map(n => 19 - n).map(n =>
    ({ id: n, sender: 'You', content: '' })));
  const [fetched, setFetched] = React.useState(false);
  // Initial load of messages by calling useEffect with [] as second param to run once
  React.useEffect(() => {
    // Wait for all messages and trigger update to list by setting flag
    const populate = async () => {
      await Promise.all(messages.map(message => sentence().then(content => {
        let newMessages = messages;
        newMessages.find(m => m.id === message.id).content = content;
        setMessages(newMessages);
      })));
      setFetched(true);
    };
    populate();
  }, []);
  return (
    <AppPage {...props}>
      {/* Reference: https://stackoverflow.com/a/61980218 */}
      <View style={{ height: Platform.OS === 'web' ? Dimensions.get('window').height - 65 : '100%' }}>
        <View style={{ flex: 1 }}>
          <FlatList data={messages} renderItem={({ item }) =>
            <View style={{
              borderColor: props.theme.colors.border, borderBottomWidth: 1,
              backgroundColor: props.theme.colors.background,
              paddingHorizontal: 15, paddingVertical: 5
            }}>
              <Text style={{ fontWeight: 'bold', color: props.theme.colors.text, marginBottom: 5 }}>
                {item.sender}
              </Text>
              <Text style={{ color: props.theme.colors.text }}>
                {item.content}
              </Text>
            </View>} keyExtractor={item => item.id.toString()} extraData={fetched} inverted />
        </View>
        <View style={{ flexDirection: 'row', margin: 15 }}>
          <TextInput autoFocus multiline editable spellCheck style={{
            backgroundColor: props.theme.colors.card,
            color: props.theme.colors.text, flex: 1, padding: 10
          }}
            placeholder='Enter your message' placeholderTextColor={props.theme.colors.placeholder}
            value={newMessage} onChangeText={value => setNewMessage(value)} />
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <IconButton {...props} style={{ marginLeft: 15 }} name='send' type='material'
              color={props.theme.colors.accent} onPress={() => {
                if (newMessage.trim() === '') {
                  props.snackbar('Message is empty', 146);
                  return;
                }
                setMessages([{
                  id: messages.length,
                  sender: 'You',
                  content: newMessage
                }, ...messages]);
                setNewMessage('');
              }} />
          </View>
        </View>
      </View>
    </AppPage>
  );
};