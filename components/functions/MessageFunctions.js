import { get } from '../../shared/SharedFunctions';

// Fetch messages and populate component state array
export const fetchMessages = (props, setMessages, callback) => {
  get(`${props.baseURL}/messages`)
    .then(response => {
      let names = {};
      Promise.all(response.map(item =>
        get(`${props.baseURL}/accounts/${item.from}`)
          .then(account => names[item.from] = `${account.account.firstName} ${account.account.lastName}`)))
        .then(() => setMessages(response.map(item => ({
          id: item._id,
          sender: names[item.from],
          content: item.message
        }))));
    })
    .catch(() => props.snackbar('Unable to fetch messages'))
    .finally(callback);
};