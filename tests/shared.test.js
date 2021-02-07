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