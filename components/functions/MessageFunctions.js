import { get, post } from '../../shared/SharedFunctions';

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
      callback();
    });
};

// Handle submit action to send a new message
export const sendMessage = (props, setMessages, newMessage, setNewMessage, list, callback) => {
  if (newMessage.trim() === '') {
    props.snackbar('Message is empty');
    return;
  }
  post(`${props.baseURL}/messages/add`, { sender: '5ffb51c8ee35744495bf5903', message: newMessage })
    // Clear message input field and scroll to bottom
    .then(() => {
      setNewMessage('');
      setTimeout(() => list.scrollToEnd({ animated: true }), 250);
    })
    // Display message if failed
    .catch(() => props.snackbar('Failed to update database'))
    .finally(() => fetchMessages(props, setMessages, callback));
}