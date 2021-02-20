import React from 'react';
import { Dimensions, Keyboard, Platform, Text, View } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';

import AppPage from './AppPage';
import { fetchMessages, sendMessage } from './functions/MessageFunctions';
import { IconButton } from '../shared/SharedComponents';

// Page for common messages forum (chat interface)
export default function MessagesPage(props) {
  // State variables for new and existing messages (two-way data binding)
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
  React.useEffect(() => fetchMessages(props, setMessages, () => setFetched(true)), []);
  return (
    <AppPage {...props}>
      {/* Reference: https://stackoverflow.com/a/61980218 */}
      <View style={{ height: Platform.OS === 'web' ? Dimensions.get('window').height - 65 : '100%' }}>
        <View style={{ flex: 1 }}>
          {/* Loading text while fetching messages */}
          {!fetched &&
            <Text style={{ color: props.theme.colors.text, margin: 15, textAlign: 'center' }}>
              Loading messages...
            </Text>}
          {/* List of messages displayed chronologically */}
          <FlatList data={messages} renderItem={({ item }) =>
            <View style={{
              borderColor: props.theme.colors.border, borderBottomWidth: 1,
              backgroundColor: props.theme.colors.background,
              paddingHorizontal: 15, paddingVertical: 5
            }}>
              {/* Basic layout for now, might enhance later */}
              <Text style={{ fontWeight: 'bold', color: props.theme.colors.text, marginBottom: 5 }}>
                {item.sender}
              </Text>
              <Text style={{ color: props.theme.colors.text }}>
                {item.content}
              </Text>
            </View>} keyExtractor={(item, index) => `${item ? item.id : index} ${index}`} extraData={fetched}
            // Set reference and automatically scroll to bottom when list populates
            ref={ref => setList(ref)} onContentSizeChange={scroll} onLayout={scroll} onEndReached={stopScroll} />
        </View>
        {/* Bottom interface for composing new message */}
        <View style={{ flexDirection: 'row', margin: 15 }}>
          {/* Input field for new message */}
          <TextInput autoFocus multiline editable spellCheck style={{
              backgroundColor: props.theme.colors.card,
              color: props.theme.colors.text, flex: 1, padding: 10
            }} placeholder='Enter your message' placeholderTextColor={props.theme.colors.placeholder}
            value={newMessage} onChangeText={value => setNewMessage(value)}
            onBlur={Keyboard.dismiss} />
          {/* Submit button with logic to add new message */}
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <IconButton {...props} style={{ marginLeft: 15 }} name='send' type='material'
              color={props.theme.colors.accent}
              onPress={() => sendMessage(props, setMessages, newMessage, setNewMessage, list)} />
          </View>
        </View>
      </View>
    </AppPage>
  );
};