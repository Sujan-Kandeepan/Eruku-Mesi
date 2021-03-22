import { del, get, post } from '../../shared/SharedFunctions';

// Fetch messages and populate component state array
export const fetchMessages = (props, messages, setMessages, prepend, callback) => {
  const endpoint = messages.length
    ? (prepend
      ? `1/${messages[0].id}`
      : `3/${messages[messages.length - 1].id}`)
    : '2/initial';
  get(`${props.baseURL}/messages/${endpoint}`)
    .then(response => {
      let names = {};
      Promise.all(response.messages.map(item =>
        get(`${props.baseURL}/accounts/${item.sender}`)
          .then(account =>
            names[item.sender] =
              account && account.account
                ? `${account.account.firstName} ${account.account.lastName} (@${account.account.username})`
                : 'Unknown User')
          .catch(() => names[item.sender] = 'Unknown User')
        ))
        .then(() => setMessages([
          ...(prepend ? [] : messages),
          ...response.messages.map(item => ({
            id: item._id,
            sender: names[item.sender],
            message: item.message,
            sentAt: item.sentAt
          })),
          ...(prepend ? messages : [])
        ]))
        .finally(callback);
    })
    .catch(error => {
      console.error(error);
      props.snackbar('Unable to fetch messages');
      callback && callback();
    });
};

// Handle submit action to send a new message
export const sendMessage = (props, messages, setMessages, newMessage, setNewMessage, list, callback) => {
  if (newMessage.trim() === '') {
    props.snackbar('Message is empty');
    return;
  }
  post(`${props.baseURL}/messages/add`, { sender: props.user._id, message: newMessage })
    // Clear message input field and scroll to bottom
    .then(() => {
      setNewMessage('');
      setTimeout(() => list.scrollToEnd({ animated: true }), 250);
    })
    // Display message if failed
    .catch(error => console.error(error) && props.snackbar('Failed to update database'))
    .finally(() => fetchMessages(props, messages, setMessages, false, callback));
};

// Handle submit action to delete a message
export const deleteMessage = (props, message, messages, setMessages, callback) => {
  del(`${props.baseURL}/messages/${message.id}`)
    .then(() => {
      setMessages(messages.filter(m => m.id !== message.id));
      callback && callback();
    })
    .catch(error => {
      console.error(error);
      props.snackbar('Unable to delete message');
      callback && callback();
    });
};