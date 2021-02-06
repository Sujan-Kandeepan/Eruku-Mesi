import { fetchNewsStories, submitNewsStory } from '../components/functions/NewsStoryFunctions';

require('jest-fetch-mock').enableMocks();

describe('News Feed', () => {
  beforeEach(() => {
    fetch.resetMocks()
  });

  test('Fetches news stories', done => {
    let props = { snackbar: () => { } };
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
        expect(fetch.mock.calls.length).toEqual(1);
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

  test('Validates news story form', () => {
    let message = '';
    let props = { snackbar: value => message = value };
    let saving = false;
    let setSaving = value => saving = value;
    submitNewsStory(props, '', 'content', setSaving);
    expect(message.toLowerCase()).toContain('title');
    submitNewsStory(props, 'title', '', setSaving);
    expect(message.toLowerCase()).toContain('content');
    expect(saving).toBe(false);
    expect(fetch.mock.calls.length).toEqual(0);
  });

  test('Makes request to create news story', () => {
    let message = '';
    let props = { snackbar: value => message = value };
    let saving = false;
    let setSaving = value => saving = value;
    fetch.mockResponseOnce(JSON.stringify({}));
    submitNewsStory(props, 'title', 'content', setSaving);
    expect(saving).toBe(true);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toContain('newsStories/add');
    expect(fetch.mock.calls[0][1].method).toBe('POST');
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toMatchObject({ title: 'title', content: 'content' });
  });

  test('Makes request to update news story', () => {
    let message = '';
    let props = {
      snackbar: value => message = value,
      payload: { id: 1, title: 'title', content: ['content'] }
    };
    let saving = false;
    let setSaving = value => saving = value;
    fetch.mockResponseOnce(JSON.stringify({}));
    submitNewsStory(props, 'title', 'content', setSaving);
    expect(saving).toBe(true);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toContain('newsStories/edit/1');
    expect(fetch.mock.calls[0][1].method).toBe('POST');
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toMatchObject({ title: 'title', content: 'content' });
  });
});