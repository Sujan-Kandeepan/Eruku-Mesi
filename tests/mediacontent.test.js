import { fetchMediaContent, submitMediaContent, deleteMediaContent } from '../components/functions/MediaContentFunctions';

require('jest-fetch-mock').enableMocks();

describe('Media Content', () => {
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
          url: 'https://image.shutterstock.com/image-vector/sample-stamp-grunge-texture-vector-260nw-1389188336.jpg',
          metadata: {},
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
          url: 'https://image.shutterstock.com/image-vector/sample-stamp-grunge-texture-vector-260nw-1389188336.jpg',
          metadata: {}
        });
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  test('Validates media content form', () => {
    const image = { cancelled: false, height: 359, uri: 'https://bit.ly/3sAOAp8', type: 'image', width: 640 };
    const file = { name: 'test.pdf', size: 12345, type: 'success', uri: 'file:///path/test.pdf' };
    let message = '';
    let props = { snackbar: value => message = value };
    let saving = false;
    let setSaving = value => saving = value;
    submitMediaContent(props, '', 'description', image, file, setSaving);
    expect(message.toLowerCase()).toContain('title');
    submitMediaContent(props, 'title', '', image, file, setSaving);
    expect(message.toLowerCase()).toContain('description');
    submitMediaContent(props, 'title', 'description', null, null, setSaving);
    expect(message.toLowerCase()).toMatch(/.*(photo|image|video|file|selected|choose|chosen).*/);
    expect(saving).toBe(false);
    expect(fetch.mock.calls.length).toEqual(0);
  });

  test('Makes request to create post', () => {
    const image = { cancelled: false, height: 359, uri: 'https://bit.ly/3sAOAp8', type: 'image', width: 640 };
    let message = '';
    let props = {
      posts: [],
      setPosts: () => { },
      navigation: { pop: () => { } },
      snackbar: value => message = value
    };
    let saving = false;
    let setSaving = value => saving = value;
    fetch.mockResponseOnce(JSON.stringify({}));
    submitMediaContent(props, 'title', 'description', image, null, setSaving);
    expect(saving).toBe(true);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toContain('mediaContent/add');
    expect(fetch.mock.calls[0][1].method).toBe('POST');
    expect(JSON.parse(fetch.mock.calls[0][1].body))
      .toMatchObject({ title: 'title', description: 'description', url: 'https://bit.ly/3sAOAp8',
        metadata: { cancelled: false, height: 359, type: 'image', width: 640 } });
  });

  test('Makes request to update post', () => {
    const image = { cancelled: false, height: 359, uri: 'https://bit.ly/3sAOAp8', type: 'image', width: 640 };
    let message = '';
    let props = {
      posts: [],
      setPosts: () => { },
      navigation: { pop: () => { } },
      snackbar: value => message = value,
      payload: { id: 1, title: 'title', description: 'description', image, file: null }
    };
    let saving = false;
    let setSaving = value => saving = value;
    fetch.mockResponseOnce(JSON.stringify({}));
    submitMediaContent(props, 'title', 'description', image, null, setSaving);
    expect(saving).toBe(true);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toContain('mediaContent/edit/1');
    expect(fetch.mock.calls[0][1].method).toBe('POST');
    expect(JSON.parse(fetch.mock.calls[0][1].body))
      .toMatchObject({ title: 'title', description: 'description', url: 'https://bit.ly/3sAOAp8',
        metadata: { cancelled: false, height: 359, type: 'image', width: 640 } });
  });

  test('Deletes post', done => {
    const image = { cancelled: false, height: 359, uri: 'https://bit.ly/3sAOAp8', type: 'image', width: 640 };
    const file = { name: 'test.pdf', size: 12345, type: 'success', uri: 'file:///path/test.pdf' };
    let props = { snackbar: () => { } };
    let post = { id: 1, title: 'title', description: 'description', image };
    let posts = [];
    let setPosts = value => posts = value;
    let setFetched = () => { };
    fetch.mockResponseOnce(JSON.stringify({}));
    fetch.mockResponseOnce(JSON.stringify([]));
    deleteMediaContent(props, post, setPosts, setFetched, () => {
      try {
        expect(fetch.mock.calls.length).toEqual(2);
        expect(fetch.mock.calls[0][0]).toContain('mediaContent');
        expect(fetch.mock.calls[0][1].method).toBe('DELETE');
        expect(fetch.mock.calls[1][0]).toContain('mediaContent');
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});