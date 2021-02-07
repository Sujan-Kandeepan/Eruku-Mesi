import { currentDate, del, get, paragraphs, post, scale, showDate, showTime, text, truncate }
  from '../shared/SharedFunctions';

require('jest-fetch-mock').enableMocks();

describe('Shared Functions', () => {
  beforeEach(() => {
    fetch.resetMocks();
    console.error = jest.fn();
  });

  const testRequests = (fn) => {
    test('Throws on invalid JSON', () => {
      fetch.mockResponseOnce('');
      fn('example.endpoint.com')
        .catch(error => expect(console.error).toHaveBeenCalledWith(error));
    });

    test('Throws on response with not OK status', () => {
      fetch.mockRejectOnce(JSON.stringify({ response: 'error' }));
      fn('example.endpoint.com')
        .catch(error => expect(console.error).toHaveBeenCalledWith(error));
    });

    test('Handles response with OK status', () => {
      fetch.mockResponseOnce(JSON.stringify({ response: 'data' }));
      fn('example.endpoint.com')
        .then(response => expect(response).toMatchObject({ response: 'data' }));
    });
  };

  describe('get - HTTP GET request', () => testRequests(get));

  describe('post - HTTP POST request', () => testRequests(post));

  describe('del - HTTP DELETE request', () => testRequests(del));

  describe('truncate - truncate string for display', () => {
    test('Truncates string with too many words', () => {
      expect(truncate('Here are four words', 3)).toEqual('Here are four...');
    });

    test('Preserves string with as many words as limit', () => {
      expect(truncate('Here are four words', 4)).toEqual('Here are four words');
    });

    test('Preserves string with fewer words than limit', () => {
      expect(truncate('Here are four words', 5)).toEqual('Here are four words');
    });

    test('Handles string with consecutive spaces', () => {
      expect(truncate('Here   are   four   words', 4)).toEqual('Here are four words');
    });

    test('Handles string with various types of spaces', () => {
      expect(truncate('Here\tare\rfour\nwords', 4)).toEqual('Here are four words');
    });

    test('Truncation replaces period with ellipsis', () => {
      expect(truncate('Ending with period.', 2)).toEqual('Ending with...');
    });

    test('Truncation handles period and trailing space', () => {
      expect(truncate('Ending with period and space. ', 4)).toEqual('Ending with period and...');
    });
  });

  describe('currentDate - get current date/time accurate to seconds', () => {

  });

  describe('scale - scale/fix image for display', () => {

  });

  describe('showDate - print readable date format', () => {

  });

  describe('showTime - print readable time format', () => {

  });

  describe('paragraphs - get list of paragraphs from text', () => {

  });

  describe('text - get text from list of paragraphs', () => {

  });
});