import { fetchNewsStories } from '../components/functions/NewsStoryFunctions';

require('jest-fetch-mock').enableMocks();

describe('News Feed', () => {
  test('Fetches news stories', done => {
    let props = { baseURL: 'http://localhost:4000', snackbar: () => { } };
    let stories = [];
    let setStories = value => stories = value;
    fetch.mockResponseOnce(JSON.stringify(
      [
        {
          topic: 'featured',
          media: [],
          _id: '600d95924340ce59d8508e46',
          title: 'My First News Story',
          content: 'Here is some content in my first news story.',
          source: 'admin',
          publishedAt: '2021-01-24T15:43:14.513Z',
          __v: 0
        }
      ]
    ));
    fetchNewsStories(props, setStories, () => {
      try {
        expect(stories.length).toBe(1);
        expect(stories[0]).toMatchObject({
          title: 'My First News Story',
          content: ['Here is some content in my first news story.']
        });
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});