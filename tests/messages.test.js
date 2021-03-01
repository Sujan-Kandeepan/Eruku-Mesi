import { fetchMessages, sendMessage } from '../components/functions/MessageFunctions';

require('jest-fetch-mock').enableMocks();

describe('Messages', () => {
  beforeEach(() => {
    fetch.resetMocks()
  });

  const mockMessages = () => {
    fetch.mockResponseOnce(JSON.stringify(
      [
        {
          _id: '5ffb521eee35744495bf5905',
          from: '5ffb4dbeee35744495bf58fc',
          sentAt: '2021-01-10T19:20:03.960Z',
          message: 'SAMPLE MESSAGE BY ADMIN USER.'
        }
      ]
    ));
    fetch.mockResponseOnce(JSON.stringify(
      {
        account: {
          _id: '5ffb4dbeee35744495bf58fc',
          firstName: 'Ji Who',
          lastName: 'Choi'
        }
      }
    ));
  };

  test('Fetches messages', done => {
    let props = { snackbar: () => { } };
    let messages = [];
    let setMessages = value => messages = value;
    mockMessages();
    fetchMessages(props, setMessages, () => {
      try {
        expect(fetch.mock.calls.length).toEqual(2);
        expect(fetch.mock.calls[0][0]).toContain('messages');
        expect(fetch.mock.calls[1][0]).toContain('accounts/5ffb4dbeee35744495bf58fc');
        expect(messages.length).toBe(1);
        expect(messages[0]).toMatchObject({
          id: '5ffb521eee35744495bf5905',
          sender: 'Ji Who Choi',
          content: 'SAMPLE MESSAGE BY ADMIN USER.'
        });
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  test('Validates message content', () => {
    let message = '';
    let props = { snackbar: value => message = value };
    let messages = [];
    let setMessages = value => messages = value;
    let newMessage = '';
    let setNewMessage = value => newMessage = value;
    let list = { scrollToEnd: () => { } };
    sendMessage(props, setMessages, newMessage, setNewMessage, list);
    expect(fetch.mock.calls.length).toEqual(0);
    expect(messages.length).toEqual(0);
    expect(newMessage).toEqual('');
    expect(message.toLowerCase()).toContain('empty');
  });

  test('Posts new message', done => {
    let message = '';
    let props = { snackbar: value => message = value };
    let messages = [];
    let setMessages = value => messages = value;
    let newMessage = 'SAMPLE MESSAGE BY ADMIN USER.';
    let setNewMessage = value => newMessage = value;
    let list = { scrollToEnd: () => { } };
    fetch.mockResponseOnce(JSON.stringify({}));
    mockMessages();
    sendMessage(props, setMessages, newMessage, setNewMessage, list, () => {
      expect(fetch.mock.calls.length).toEqual(3);
      expect(fetch.mock.calls[0][0]).toContain('messages/add');
      expect(fetch.mock.calls[1][0]).toContain('messages');
      expect(fetch.mock.calls[2][0]).toContain('accounts/5ffb4dbeee35744495bf58fc');
      expect(messages.length).toEqual(1);
      expect(newMessage).toEqual('');
      done();
    });
  });
});