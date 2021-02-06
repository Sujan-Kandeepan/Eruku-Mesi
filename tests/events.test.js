import { fetchEvents } from '../components/functions/EventFunctions';

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
});