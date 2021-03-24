import { deleteMessage, fetchMessages, sendMessage } from '../components/functions/MessageFunctions';

require('jest-fetch-mock').enableMocks();

describe('Messages', () => {
  beforeEach(() => {
    fetch.resetMocks()
  });

  const mockMessages = () => {
    fetch.mockResponseOnce(JSON.stringify({
      messages: [
        {
          _id: '5ffb521eee35744495bf5905',
          sender: '5ffb4dbeee35744495bf58fc',
          sentAt: '2021-01-10T19:20:03.960Z',
          message: 'SAMPLE MESSAGE BY ADMIN USER.'
        }
      ]
    }));
    fetch.mockResponseOnce(JSON.stringify(
      {
        user: {
          _id: '5ffb4dbeee35744495bf58fc',
          firstName: 'Ji Who',
          lastName: 'Choi',
          username: 'jiwhochoi'
        }
      }
    ));
  };

  test('Fetches messages', done => {
    let props = { snackbar: () => { } };
    let messages = [];
    let setMessages = value => messages = value;
    mockMessages();
    fetchMessages(props, messages, setMessages, false, () => {
      try {
        expect(fetch.mock.calls.length).toEqual(2);
        expect(fetch.mock.calls[0][0]).toContain('messages');
        expect(fetch.mock.calls[1][0]).toContain('accounts/5ffb4dbeee35744495bf58fc');
        expect(messages.length).toBe(1);
        expect(messages[0]).toMatchObject({
          id: '5ffb521eee35744495bf5905',
          sender: 'Ji Who Choi (@jiwhochoi)',
          message: 'SAMPLE MESSAGE BY ADMIN USER.'
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
    sendMessage(props, messages, setMessages, newMessage, setNewMessage, list);
    expect(fetch.mock.calls.length).toEqual(0);
    expect(messages.length).toEqual(0);
    expect(newMessage).toEqual('');
    expect(message.toLowerCase()).toContain('empty');
  });

  test('Posts new message', done => {
    let props = {
      snackbar: () => { },
      user: {
        _id: '5ffb4dbeee35744495bf58fc',
        firstName: 'Ji Who',
        lastName: 'Choi',
        username: 'jiwhochoi'
      }
    };
    let messages = [];
    let setMessages = value => messages = value;
    let newMessage = 'SAMPLE MESSAGE BY ADMIN USER.';
    let setNewMessage = value => newMessage = value;
    let list = { scrollToEnd: () => { } };
    fetch.mockResponseOnce(JSON.stringify({}));
    mockMessages();
    sendMessage(props, messages, setMessages, newMessage, setNewMessage, list, () => {
      try {
        expect(fetch.mock.calls.length).toEqual(3);
        expect(fetch.mock.calls[0][0]).toContain('messages/add');
        expect(fetch.mock.calls[0][1].method).toBe('POST');
        expect(fetch.mock.calls[1][0]).toContain('messages');
        expect(fetch.mock.calls[2][0]).toContain('accounts/5ffb4dbeee35744495bf58fc');
        expect(messages.length).toEqual(1);
        expect(newMessage).toEqual('');
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  test('Deletes message', done => {
    let props = { snackbar: () => { } };
    let message = {
      id: '5ffb521eee35744495bf5905',
      sender: '5ffb4dbeee35744495bf58fc',
      sentAt: '2021-01-10T19:20:03.960Z',
      message: 'SAMPLE MESSAGE BY ADMIN USER.'
    };
    let messages = [{
      id: '5ffb521eee35744495bf5905',
      sender: '5ffb4dbeee35744495bf58fc',
      sentAt: '2021-01-10T19:20:03.960Z',
      message: 'SAMPLE MESSAGE BY ADMIN USER.'
    }];
    let setMessages = value => messages = value;
    fetch.mockResponseOnce(JSON.stringify({}));
    deleteMessage(props, message, messages, setMessages, () => {
      try {
        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toContain('messages');
        expect(fetch.mock.calls[0][1].method).toBe('DELETE');
        expect(messages.length).toEqual(0);
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});