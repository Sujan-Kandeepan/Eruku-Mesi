import React from 'react';
import { Dimensions, Keyboard, Platform, Text, View } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';

import AppPage from './AppPage';
import { deleteMessage, fetchMessages, sendMessage } from './functions/MessageFunctions';
import { IconButton } from '../shared/SharedComponents';
import { periodic, showDate, showTime } from '../shared/SharedFunctions';
import SharedStyles from '../shared/SharedStyles';

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
  periodic(() => {
    // Refresh only if drawer nav currently on messages page
    if (!props.drawerState || !props.pages || (props.drawerState.current === props.pages.messages)
      || (!fetched && !props.drawerVisited.current.includes(props.pages.messages)))
      fetchMessages(props, messages, setMessages, false, () => setFetched(true));
  }, 5000);
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
          <FlatList data={messages} removeClippedSubviews={false} renderItem={({ item }) =>
            <View style={{
              borderColor: props.theme.colors.border, borderBottomWidth: 1,
              backgroundColor: props.theme.colors.background,
              flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10
            }}>
              <Avatar.Text size={50} style={{ alignSelf: 'flex-start', backgroundColor: props.theme.colors.accent }}
                // Construct user initials from first and last name in sender string
                label={item.sender.replace(/\(@.*\)/g, '').split(' ').map(s => s[0]).join('')
                  .replace(/(.).*(.)/g, (_, c1, c2) => `${c1}${c2}`).toUpperCase()} />
              <View style={{ flexDirection: 'column', marginHorizontal: 10, marginVertical: 0 }}>
                <Text selectable style={{ color: props.theme.colors.text, flexDirection: 'row', fontWeight: 'bold' }}>
                  {item.sender}
                </Text>
                <Text selectable style={{ color: props.theme.colors.text, fontSize: 10 }}>
                  {showDate(item.sentAt)} at {showTime(item.sentAt)}
                </Text>
                <Text selectable style={{ color: props.theme.colors.text, marginVertical: 5,
                  maxWidth: Dimensions.get('window').width - (props.admin ? 150 : 75) }}>
                  {item.message}
                </Text>
              </View>
              <View style={{ flex: 1 }} />
              {props.admin &&
                <IconButton style={{ ...SharedStyles.icon, alignSelf: 'flex-end', justifyContent: 'flex-start' }}
                  onPress={() => props.snackbar('Press and hold to delete')} delayLongPress={2000}
                  onLongPress={() => deleteMessage(props, item, messages, setMessages)}
                  name='delete' type='material' color={props.theme.colors.danger} />}
            </View>} keyExtractor={(item, index) => `${item ? item.id : index} ${index}`} extraData={fetched}
            // Load more messages upon scroll to top of messages list
            // Reference: https://stackoverflow.com/a/54928134
            onScroll={event => {
              if (event.nativeEvent.contentOffset.y == 0) {
                setFetched(false);
                fetchMessages(props, messages, setMessages, true, () => setFetched(true));
              }
            }}
            // Set reference and automatically scroll to bottom when list populates
            ref={ref => setList(ref)} onContentSizeChange={scroll} onLayout={scroll} onEndReached={stopScroll} />
        </View>
        {/* Bottom interface for composing new message */}
        <View style={{ flexDirection: 'row', margin: 15 }}>
          {/* Input field for new message */}
          <TextInput autoFocus multiline editable spellCheck style={{
              backgroundColor: props.theme.colors.card,
              borderColor: props.theme.colors.border, borderWidth: 1,
              color: props.theme.colors.text, flex: 1, padding: 10
            }} placeholder='Enter your message' placeholderTextColor={props.theme.colors.placeholder}
            value={newMessage} onChangeText={value => {
              const maxMessageLength = 1000;
              if (value.length > maxMessageLength)
                props.snackbar('Message is too long');
              setNewMessage(value.substring(0, maxMessageLength));
            }}
            onBlur={Keyboard.dismiss} />
          {/* Submit button with logic to add new message */}
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <IconButton {...props} style={{ marginLeft: 15 }} name='send' type='material'
              color={props.theme.colors.accent}
              onPress={() => sendMessage(props, messages, setMessages, newMessage, setNewMessage, list)} />
          </View>
        </View>
      </View>
    </AppPage>
  );
};