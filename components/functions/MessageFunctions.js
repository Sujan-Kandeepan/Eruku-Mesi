import { get } from '../../shared/SharedFunctions';

// Fetch messages and populate component state array
export const fetchMessages = (props, setMessages, callback) => {
  get(`${props.baseURL}/messages`)
    .then(response => {
      let names = {};
      Promise.all(response.map(item =>
        get(`${props.baseURL}/accounts/${item.from}`)
          .then(account =>
            names[item.from] =
              account && account.account
                ? `${account.account.firstName} ${account.account.lastName}`
                : 'Unknown User')
          .catch(() => names[item.from] = 'Unknown User')
        ))
        .then(() => setMessages(response.map(item => ({
          id: item._id,
          sender: names[item.from],
          content: item.message
        }))))
        .finally(callback);
    })
    .catch(() => {
      props.snackbar('Unable to fetch messages');
      callback
    });
};

// Handle submit action to send a new message
export const sendMessage = (props, messages, setMessages, newMessage, setNewMessage, list) => {
  if (newMessage.trim() === '') {
    props.snackbar('Message is empty');
    return;
  }
  setMessages([...messages, {
    id: messages.length,
    sender: 'You',
    content: newMessage
  }]);
  setNewMessage('');
  setTimeout(() => list.scrollToEnd({ animated: true }), 250);
}