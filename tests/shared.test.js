import { Dimensions } from 'react-native';
import React from 'react';
import { currentDate, del, get, paragraphs, periodic, post, scale, showDate, showTime, text, truncate }
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

  describe('periodic - run function periodically', () => {
    test('Runs the given function immediately', () => {
      React.useEffect = jest.fn(f => f());
      let count = 0;
      const reset = periodic(() => count++);
      reset();
      expect(count).toEqual(1);
    });

    test('Runs the given function at specified interval', done => {
      React.useEffect = jest.fn(f => f());
      let count = 0;
      const reset = periodic(() => count++, 50);
      setTimeout(() => {
        reset();
        expect(count).toEqual(2);
        done();
      }, 75);
    });
  });

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

  describe('currentDate - get current date/time accurate to minutes', () => {
    test('Current date is accurate to minutes', () => {
      // Reference: https://codewithhugo.com/mocking-the-current-date-in-jest-tests/
      const now = new Date();
      const realDate = Date;
      global.Date = class extends Date {
        constructor(date) {
          return date ? super(date) : now;
        }
      }
      const returned = currentDate();
      const actual = new Date();
      expect(returned.getFullYear()).toEqual(actual.getFullYear());
      expect(returned.getMonth()).toEqual(actual.getMonth());
      expect(returned.getDate()).toEqual(actual.getDate());
      expect(returned.getDay()).toEqual(actual.getDay());
      expect(returned.getHours()).toEqual(actual.getHours());
      expect(returned.getMinutes()).toEqual(actual.getMinutes());
      expect(returned.getSeconds()).toEqual(0);
      expect(returned.getMilliseconds()).toEqual(0);
      global.Date = realDate;
    });
  });

  describe('scale - scale/fix image for display', () => {
    beforeEach(() => {
      Dimensions.get = jest.fn().mockReturnValue({ width: 1200 });
    });

    test('Correct scaling with default options', () => {
      expect(scale({ image: { height: 300, width: 400 } }))
        .toMatchObject({ height: 877.5, width: 1170 });
    });

    test('Assumed square if dimensions missing', () => {
      expect(scale({ image: {} }))
        .toMatchObject({ height: 1170, width: 1170 });
    });

    test('Correct scaling with sideways rotation', () => {
      expect(scale({ image: { height: 300, width: 400, rotation: 90 } }))
        .toMatchObject({ height: 1560, width: 1170 });
    });

    test('Correct scaling with custom margin', () => {
      expect(scale({ image: { height: 300, width: 400 }, marginHorizontal: 50 }))
        .toMatchObject({ height: 825, width: 1100 });
    });

    test('Correct scaling with max height', () => {
      expect(scale({ image: { height: 300, width: 400 }, maxHeight: 600 }))
        .toMatchObject({ height: 600, width: 800 });
    });
  });

  describe('showDate - print readable date format', () => {
    test('Returns expected short date format', () => {
      expect(showDate(new Date(2021, 1, 7, 23, 30))).toEqual('Sun, Feb 7, 2021');
    });

    test('Returns expected long date format', () => {
      expect(showDate(new Date(2021, 1, 7, 23, 30), true)).toEqual('Sunday, February 7, 2021');
    });
  });

  describe('showTime - print readable time format', () => {
    test('Returns expected time format', () => {
      expect(showTime(new Date(2021, 1, 7, 23, 30))).toEqual('11:30 PM');
    });
  });

  describe('paragraphs - get list of paragraphs from text', () => {
    test('Empty string gives no paragraphs', () => {
      expect(paragraphs('')).toEqual([]);
    });

    test('Single sentence gives one paragraph', () => {
      expect(paragraphs('This is a sentence.')).toEqual(['This is a sentence.']);
    });

    test('Single sentence has surrounding spaces removed', () => {
      expect(paragraphs('   This is a sentence.\n')).toEqual(['This is a sentence.']);
    });

    test('Multiple sentences give one paragraph', () => {
      expect(paragraphs('This is a sentence. This is another sentence.'))
        .toEqual(['This is a sentence. This is another sentence.']);
    });

    test('Text with line breaks gives multiple paragraphs', () => {
      expect(paragraphs('This is a sentence.\nThis is another sentence.'))
        .toEqual(['This is a sentence.', 'This is another sentence.']);
    });

    test('Text with superfluous whitespace is handled properly', () => {
      expect(paragraphs('\t This is a sentence.\r\n\r\nThis is another sentence.   '))
        .toEqual(['This is a sentence.', 'This is another sentence.']);
    });
  });

  describe('text - get text from list of paragraphs', () => {
    test('Empty list of paragraphs gives empty text', () => {
      expect(text([])).toEqual('');
    });

    test('Singleton list of paragraphs gives one line', () => {
      expect(text(['This is a sentence.'])).toEqual('This is a sentence.');
    });

    test('Longer list of paragraphs gives multiple lines', () => {
      expect(text(['This is a sentence.', 'This is another sentence.']))
        .toEqual('This is a sentence.\n\nThis is another sentence.');
    });
  });
});