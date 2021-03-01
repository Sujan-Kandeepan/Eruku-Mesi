import { feedbackTextChanged, submitFeedback } from '../components/functions/FeedbackFunctions';

require('jest-fetch-mock').enableMocks();

describe('Feedback', () => {
  beforeEach(() => {
    fetch.resetMocks()
  });

  test('Allows typing until feedback reaches max length', () => {
    let message = '';
    let props = { snackbar: value => message = value };
    let text = 'abc';
    let setText = value => text = value;
    let maxLength = 10;
    feedbackTextChanged(props, 'abcd', setText, maxLength);
    expect(fetch.mock.calls.length).toEqual(0);
    expect(message).toEqual('');
    expect(text).toEqual('abcd');
  });

  test('Stops typing when feedback reaches max length', () => {
    let message = '';
    let props = { snackbar: value => message = value };
    let text = '1234567890';
    let setText = value => text = value;
    let maxLength = 10;
    feedbackTextChanged(props, '1234567890a', setText, maxLength);
    expect(fetch.mock.calls.length).toEqual(0);
    expect(message.toLowerCase()).toMatch(/.*(length|long|max|char).*/);
    expect(text).toEqual('1234567890');
  });

  test('Ensures feedback message is not empty', () => {
    let message = '';
    let props = { snackbar: value => message = value };
    let text = '';
    let setText = value => text = value;
    let keyboard = null;
    submitFeedback(props, text, setText, keyboard);
    expect(fetch.mock.calls.length).toEqual(0);
    expect(message.toLowerCase()).toMatch(/.*(empty|required|missing).*/);
    expect(text).toEqual('');
  });

  test('Submits feedback message if not empty', done => {
    let message = '';
    let props = { snackbar: value => message = value };
    let text = 'feedback';
    let setText = value => text = value;
    let keyboard = { dismiss: jest.fn() };
    fetch.mockResponseOnce(JSON.stringify({
      _id: '601ef4e1131f86304cb22760',
      text: 'feedback',
      __v: 0
    }));
    submitFeedback(props, text, setText, keyboard, () => {
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toContain('feedback/add');
      expect(fetch.mock.calls[0][1].method).toBe('POST');
      expect(JSON.parse(fetch.mock.calls[0][1].body))
        .toMatchObject({ text: 'feedback' });
      expect(message.toLowerCase()).toMatch(/.*(feedback|submitted|received|success).*/);
      expect(keyboard.dismiss).toHaveBeenCalled();
      expect(text).toEqual('');
      done();
    });
  });
});