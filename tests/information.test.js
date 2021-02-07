import { addInfoSection, deleteInfoSection, editInfoContent, editInfoSection, fetchInformation }
  from '../components/functions/InformationFunctions';

require('jest-fetch-mock').enableMocks();

describe('Information', () => {
  beforeEach(() => {
    fetch.resetMocks()
  });

  test('Fetches information', done => {
    let props = { snackbar: () => { } };
    let pages = ['General'];
    let data = [];
    let setData = value => data = value;
    fetch.mockResponseOnce(JSON.stringify(
      [
        {
          _id: '601efc24fc59f747183ee6e8',
          title: 'General',
          content: 'Here is some general information.',
          imageTop: null,
          imageBottom: null,
          __v: 0
        }
      ]
    ));
    fetchInformation(props, pages, data, setData, () => {
      try {
        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toContain('information');
        expect(posts.length).toBe(1);
        expect(posts[0]).toMatchObject({
          id: '601efc24fc59f747183ee6e8',
          title: 'General',
          content: ['Here is some general information.'],
          imageTop: null,
          imageBottom: null,
        });
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  test('Prevents adding multiple information sections without renaming', () => {
    let message = '';
    let props = { snackbar: value => message = value };
    addInfoSection(props, ['New Section'], null, null, null, null, null, 'New Section');
    expect(fetch.mock.calls.length).toEqual(0);
    expect(message.toLowerCase()).toMatch(/.*(replace|section).*/);
  });

  test('Adds new information section', () => {
    let message = '';
    let props = { snackbar: value => message = value };
    let pages = [];
    let setPages = value => pages = value;
    let data = [];
    let setData = value => data = value;
    let originalText = '';
    let setOriginalText = value => originalText = value;
    let editText = '';
    let setEditText = value => editText = value;
    let newSection = 'New Section';
    fetch.mockResponseOnce(JSON.stringify({ id: 1, title: 'New Section', content: '', imageTop: null, imageBottom: null }));
    addInfoSection(props, pages, setPages, data, setData, setOriginalText, setEditText, newSection);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toContain('information/add');
    expect(fetch.mock.calls[0][1].method).toBe('POST');
    expect(JSON.parse(fetch.mock.calls[0][1].body))
      .toMatchObject({ title: 'New Section', content: '', imageTop: null, imageBottom: null });
    expect(message.toLowerCase()).toEqual('');
    expect(pages).toEqual(['New Section']);
    expect(data.length).toEqual(1);
    expect(data[0]).toMatchObject({ title: 'New Section', content: [], imageTop: null, imageBottom: null });
    expect(originalText).toEqual('New Section');
    expect(editText).toEqual('New Section');
  });

  test('Prevents information section name conflicts when editing', () => {
    let message = '';
    let props = { snackbar: value => message = value };
    editInfoSection(props, ['General'], null, null, null, 'New Section', null, 'General', null);
    expect(fetch.mock.calls.length).toEqual(0);
    expect(message.toLowerCase()).toMatch(/.*(duplicate|exist).*/);
  });

  test('Edits existing information section', () => {
    let message = '';
    let props = { snackbar: value => message = value };
    let pages = ['First', 'Original', 'Last'];
    let setPages = value => pages = value;
    let data = [
      { title: 'First', content: [], imageTop: null, imageBottom: null },
      { title: 'Original', content: [], imageTop: null, imageBottom: null },
      { title: 'Last', content: [], imageTop: null, imageBottom: null }
    ];
    let setData = value => data = value;
    let originalText = 'Original';
    let setOriginalText = value => originalText = value;
    let editText = 'Edit';
    let setEditText = value => editText = value;
    fetch.mockResponseOnce(JSON.stringify({ id: 1, title: 'Edit', content: '', imageTop: null, imageBottom: null }));
    editInfoSection(props, pages, setPages, data, setData, originalText, setOriginalText, editText, setEditText);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toContain('information/edit');
    expect(fetch.mock.calls[0][1].method).toBe('POST');
    expect(JSON.parse(fetch.mock.calls[0][1].body))
      .toMatchObject({ title: 'Edit', content: '', imageTop: null, imageBottom: null });
    expect(message.toLowerCase()).toEqual('');
    expect(pages.length).toBe(3);
    expect(pages).toContain('First');
    expect(pages).toContain('Edit');
    expect(pages).toContain('Last');
    expect(data.length).toEqual(3);
    expect(data[pages.indexOf('Edit')]).toMatchObject({ title: 'Edit', content: [], imageTop: null, imageBottom: null });
    expect(originalText).toEqual('');
    expect(editText).toEqual('');
  });

  test('Deletes information section', () => {
    let message = '';
    let props = { snackbar: value => message = value };
    let pages = ['General'];
    let setPages = value => pages = value;
    let data = [{ title: 'General', content: [], imageTop: null, imageBottom: null }];
    let setData = value => data = value;
    let item = 'General';
    deleteInfoSection(props, pages, setPages, data, setData, item);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toContain('information/delete');
    expect(fetch.mock.calls[0][1].method).toBe('DELETE');
    expect(JSON.parse(fetch.mock.calls[0][1].body))
      .toMatchObject({ title: 'General', content: '', imageTop: null, imageBottom: null });
    expect(message.toLowerCase()).toEqual('');
    expect(pages.length).toBe(0);
    expect(data.length).toEqual(0);
  });

  test('Edits existing information content', () => {
    let message = '';
    let props = { snackbar: value => message = value };
    let localProps = { navigation: { pop: () => { } } };
    let page = 'General';
    let data = [{ title: 'General', content: [''], imageTop: null, imageBottom: null }];
    let setData = value => data = value;
    let imageTop = null;
    let imageBottom = null;
    let editText = 'Edit';
    let setEditText = value => editText = value;
    fetch.mockResponseOnce(JSON.stringify({ id: 1, title: 'General', content: 'Edit', imageTop: null, imageBottom: null }));
    editInfoContent(props, localProps, page, data, setData, imageTop, imageBottom, editText, setEditText);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toContain('information/edit');
    expect(fetch.mock.calls[0][1].method).toBe('POST');
    expect(JSON.parse(fetch.mock.calls[0][1].body))
      .toMatchObject({ title: 'General', content: 'Edit', imageTop: null, imageBottom: null });
    expect(message.toLowerCase()).toEqual('');
    expect(data.length).toEqual(1);
    expect(data[0]).toMatchObject({ title: 'General', content: ['Edit'], imageTop: null, imageBottom: null });
    expect(imageTop).toEqual(null);
    expect(imageBottom).toEqual(null);
    expect(editText).toEqual('');
  });
});