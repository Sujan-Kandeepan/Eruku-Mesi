import React from 'react';
import { Dimensions, Platform, Text, View } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';

import AppPage from './AppPage';
import { IconButton } from '../shared/SharedComponents';
import { get } from '../shared/SharedFunctions';

export default function MessagesPage(props) {
  const [newMessage, setNewMessage] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  // Get reference to messages list to handle scrolling
  const [list, setList] = React.useState(<></>);
  // Status flag for fetching message history
  const [fetched, setFetched] = React.useState(false);
  // Reference:  https://stackoverflow.com/a/48050291
  const [needsToScroll, setNeedsToScroll] = React.useState(true);
  const scroll = () => needsToScroll && list.scrollToEnd({ animated: true });
  const stopScroll = () => setTimeout(() => setNeedsToScroll(false), 1000);
  // Initial load of messages by calling useEffect with [] as second param to run once
  React.useEffect(() => {
    // Wait for all messages and trigger update to list by setting flag
    const populate = async () => {
      // Using lorem ipsum data for now with 20 messages
      await Promise.all([...Array(20).keys()].map(index =>
        get('https://baconipsum.com/api/?type=all-meat&sentences=1').then(content => {
          let newMessages = messages;
          newMessages[index] = { id: index, sender: 'You', content };
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
          {!fetched &&
            <Text style={{ color: props.theme.colors.text, margin: 15, textAlign: 'center' }}>
              Loading messages...
            </Text>}
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
            </View>} keyExtractor={item => item && item.id.toString()} extraData={fetched}
            // Set reference and automatically scroll to bottom when list populates
            ref={ref => setList(ref)} onContentSizeChange={scroll} onLayout={scroll} onEndReached={stopScroll} />
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
                setMessages([...messages, {
                  id: messages.length,
                  sender: 'You',
                  content: newMessage
                }]);
                setNewMessage('');
                setTimeout(() => list.scrollToEnd({ animated: true }), 250);
              }} />
          </View>
        </View>
      </View>
    </AppPage>
  );
};