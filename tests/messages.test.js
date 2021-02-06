import { fetchMessages } from '../components/functions/MessageFunctions';

require('jest-fetch-mock').enableMocks();

describe('Messages', () => {
  beforeEach(() => {
    fetch.resetMocks()
  });

  test('Fetches messages', done => {
    let props = { snackbar: () => { } };
    let messages = [];
    let setMessages = value => messages = value;
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
});