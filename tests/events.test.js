import { deleteEvent, fetchEvents, submitEvent } from '../components/functions/EventFunctions';

require('jest-fetch-mock').enableMocks();

describe('Upcoming Events', () => {
  beforeEach(() => {
    fetch.resetMocks()
  });

  test('Fetches events', done => {
    let props = { snackbar: () => { } };
    let events = [];
    let setEvents = value => events = value;
    fetch.mockResponseOnce(JSON.stringify(
      [
        {
          media: [],
          _id: '5ffb5726ee35744495bf590b',
          name: '2021 Reunion In Maryland',
          type: 'reunion',
          desc: '2021 Reunion In Maryland by EPU North America, INC',
          date: '2021-01-10T19:39:21.903Z',
          location: 'Maryland',
          createdAt: '2021-01-10T19:39:21.903Z'
        }
      ]
    ));
    fetchEvents(props, setEvents, () => {
      try {
        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toContain('events');
        expect(events.length).toBe(1);
        expect(events[0]).toMatchObject({
          name: '2021 Reunion In Maryland',
          desc: '2021 Reunion In Maryland by EPU North America, INC',
          date: '2021-01-10T19:39:21.903Z',
          location: 'Maryland',
        });
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  test('Validates event form', () => {
    let message = '';
    let props = { snackbar: value => message = value };
    let saving = false;
    let setSaving = value => saving = value;
    submitEvent(props, '', new Date(), 'location', 'description', setSaving);
    expect(message.toLowerCase()).toContain('title');
    submitEvent(props, 'title', new Date(), '', 'description', setSaving);
    expect(message.toLowerCase()).toContain('location');
    submitEvent(props, 'title', new Date(), 'location', '', setSaving);
    expect(message.toLowerCase()).toContain('description');
    expect(saving).toBe(false);
    expect(fetch.mock.calls.length).toEqual(0);
  });

  test('Makes request to create event', () => {
    let now = new Date();
    let message = '';
    let props = {
      events: [],
      setEvents: () => { },
      navigation: { pop: () => { } },
      snackbar: value => message = value
    };
    let saving = false;
    let setSaving = value => saving = value;
    fetch.mockResponseOnce(JSON.stringify({}));
    submitEvent(props, 'title', now, 'location', 'description', setSaving);
    expect(saving).toBe(true);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toContain('events/add');
    expect(fetch.mock.calls[0][1].method).toBe('POST');
    expect(JSON.parse(fetch.mock.calls[0][1].body))
      .toMatchObject({ title: 'title', date: now, location: 'location', description: 'description' });
  });

  test('Makes request to update event', () => {
    let now = new Date();
    let message = '';
    let props = {
      events: [],
      setEvents: () => { },
      navigation: { pop: () => { } },
      snackbar: value => message = value,
      payload: { id: 1, title: 'title', date: now, location: 'location', description: 'description' }
    };
    let saving = false;
    let setSaving = value => saving = value;
    fetch.mockResponseOnce(JSON.stringify({}));
    submitEvent(props, 'title', new Date(), 'location', 'description', setSaving);
    expect(saving).toBe(true);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toContain('events/edit/1');
    expect(fetch.mock.calls[0][1].method).toBe('POST');
    expect(JSON.parse(fetch.mock.calls[0][1].body))
      .toMatchObject({ title: 'title', date: now, location: 'location', description: 'description' });
  });

  test('Deletes event', done => {
    let now = new Date();
    let props = { snackbar: () => { } };
    let event = { id: 1, title: 'title', date: now, location: 'location', description: 'description' };
    let events = [];
    let setEvents = () => { };
    let setFetched = () => { };
    fetch.mockResponseOnce(JSON.stringify({}));
    fetch.mockResponseOnce(JSON.stringify([]));
    deleteEvent(props, event, events, setEvents, setFetched, () => {
      try {
        expect(fetch.mock.calls.length).toEqual(2);
        expect(fetch.mock.calls[0][0]).toContain('events');
        expect(fetch.mock.calls[0][1].method).toBe('DELETE');
        expect(fetch.mock.calls[1][0]).toContain('events');
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});