import { fetchMediaContent, submitMediaContent, deleteMediaContent } from '../components/functions/MediaContentFunctions';

require('jest-fetch-mock').enableMocks();

describe('Messages', () => {
  beforeEach(() => {
    fetch.resetMocks()
  });

  test('Fetches media content', done => {
    let props = { snackbar: () => { } };
    let posts = [];
    let setPosts = value => posts = value;
    fetch.mockResponseOnce(JSON.stringify(
      [
        {
          _id: '600d95924340ce59d8508e46',
          title: 'Example Post',
          description: 'Here is a description.',
          image: {},
          __v: 0
        }
      ]
    ));
    fetchMediaContent(props, setPosts, () => {
      try {
        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toContain('mediaContent');
        expect(posts.length).toBe(1);
        expect(posts[0]).toMatchObject({
          id: '600d95924340ce59d8508e46',
          title: 'Example Post',
          description: ['Here is a description.'],
          image: {}
        });
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});