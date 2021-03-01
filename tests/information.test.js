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
    let setPages = value => pages = value;
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
    fetchInformation(props, setPages, setData, () => {
      try {
        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toContain('information');
        expect(data.length).toBe(1);
        expect(data[0]).toMatchObject({
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

  test('Adds new information section', done => {
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
    fetch.mockResponseOnce(JSON.stringify({
      _id: '601efc24fc59f747183ee6e8',
      title: 'New Section',
      content: 'Nothing here yet...',
      imageTop: null,
      imageBottom: null,
      __v: 0
    }));
    fetch.mockResponseOnce(JSON.stringify(
      [
        {
          _id: '601efc24fc59f747183ee6e8',
          title: 'New Section',
          content: 'Nothing here yet...',
          imageTop: null,
          imageBottom: null,
          __v: 0
        }
      ]
    ));
    addInfoSection(props, pages, setPages, data, setData, setOriginalText, setEditText, newSection, () => {
      try {
        expect(fetch.mock.calls.length).toEqual(2);
        expect(fetch.mock.calls[0][0]).toContain('information/add');
        expect(fetch.mock.calls[0][1].method).toBe('POST');
        expect(fetch.mock.calls[1][0]).toContain('information');
        expect(JSON.parse(fetch.mock.calls[0][1].body))
          .toMatchObject({ title: 'New Section', content: 'Nothing here yet...', imageTop: null, imageBottom: null });
        expect(message.toLowerCase()).toEqual('');
        expect(pages).toEqual(['New Section']);
        expect(data.length).toEqual(1);
        expect(data[0]).toMatchObject({ title: 'New Section', content: ['Nothing here yet...'], imageTop: null, imageBottom: null });
        expect(originalText).toEqual('New Section');
        expect(editText).toEqual('New Section');
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  test('Prevents information section name conflicts when editing', () => {
    let message = '';
    let props = { snackbar: value => message = value };
    editInfoSection(props, ['General'], null, null, null, 'New Section', null, 'General', null);
    expect(fetch.mock.calls.length).toEqual(0);
    expect(message.toLowerCase()).toMatch(/.*(duplicate|exist).*/);
  });

  test('Edits existing information section', done => {
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
    fetch.mockResponseOnce(JSON.stringify({
      _id: '603414c4b283c9706cb730e5',
      title: 'Edit',
      content: '',
      imageTop: null,
      imageBottom: null,
      __v: 0
    }));
    fetch.mockResponseOnce(JSON.stringify(
      [
        {
          _id: '60341476b283c9706cb730e4',
          title: 'First',
          content: '',
          imageTop: null,
          imageBottom: null,
          __v: 0
        },
        {
          _id: '603414c4b283c9706cb730e5',
          title: 'Edit',
          content: '',
          imageTop: null,
          imageBottom: null,
          __v: 0
        },
        {
          _id: '6034157fb283c9706cb730e6',
          title: 'Last',
          content: '',
          imageTop: null,
          imageBottom: null,
          __v: 0
        }
      ]
    ));
    editInfoSection(props, pages, setPages, data, setData, originalText, setOriginalText, editText, setEditText, () => {
      try {
        expect(fetch.mock.calls.length).toEqual(2);
        expect(fetch.mock.calls[0][0]).toContain('information/edit');
        expect(fetch.mock.calls[0][1].method).toBe('POST');
        expect(fetch.mock.calls[1][0]).toContain('information');
        expect(JSON.parse(fetch.mock.calls[0][1].body)).toMatchObject({ title: 'Edit' });
        expect(message.toLowerCase()).toEqual('');
        expect(pages.length).toBe(3);
        expect(pages).toContain('First');
        expect(pages).toContain('Edit');
        expect(pages).toContain('Last');
        expect(data.length).toEqual(3);
        expect(data[pages.indexOf('Edit')]).toMatchObject({ title: 'Edit', content: [], imageTop: null, imageBottom: null });
        expect(originalText).toEqual('');
        expect(editText).toEqual('');
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  test('Deletes information section', done => {
    let message = '';
    let props = { snackbar: value => message = value };
    let pages = ['General'];
    let setPages = value => pages = value;
    let data = [{ title: 'General', content: [], imageTop: null, imageBottom: null }];
    let setData = value => data = value;
    let item = 'General';
    fetch.mockResponseOnce(JSON.stringify({
      _id: '601efc24fc59f747183ee6e8',
      title: 'General',
      content: '',
      imageTop: null,
      imageBottom: null,
      __v: 0
    }));
    fetch.mockResponseOnce(JSON.stringify([]));
    deleteInfoSection(props, pages, setPages, data, setData, item, () => {
      try {
        expect(fetch.mock.calls.length).toEqual(2);
        expect(fetch.mock.calls[0][0]).toContain('information');
        expect(fetch.mock.calls[0][1].method).toBe('DELETE');
        expect(fetch.mock.calls[1][0]).toContain('information');
        expect(message.toLowerCase()).toEqual('');
        expect(pages.length).toBe(0);
        expect(data.length).toEqual(0);
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  test('Edits existing information content', done => {
    let message = '';
    let props = { snackbar: value => message = value };
    let localProps = { navigation: { pop: () => { } } };
    let page = 'General';
    let pages = ['General'];
    let setPages = value => pages = value;
    let data = [{ title: 'General', content: [''], imageTop: null, imageBottom: null }];
    let setData = value => data = value;
    let imageTop = null;
    let imageBottom = null;
    let editText = 'Edit';
    let setEditText = value => editText = value;
    fetch.mockResponseOnce(JSON.stringify({
      _id: '603414c4b283c9706cb730e5',
      title: 'General',
      content: 'Edit',
      imageTop: null,
      imageBottom: null,
      __v: 0
    }));
    fetch.mockResponseOnce(JSON.stringify(
      [
        {
          _id: '603414c4b283c9706cb730e5',
          title: 'General',
          content: 'Edit',
          imageTop: null,
          imageBottom: null,
          __v: 0
        }
      ]
    ));
    editInfoContent(props, localProps, page, setPages, data, setData, imageTop, imageBottom, editText, setEditText, () => {
      try {
        expect(fetch.mock.calls.length).toEqual(2);
        expect(fetch.mock.calls[0][0]).toContain('information/edit');
        expect(fetch.mock.calls[0][1].method).toBe('POST');
        expect(fetch.mock.calls[1][0]).toContain('information');
        expect(JSON.parse(fetch.mock.calls[0][1].body))
          .toMatchObject({ content: 'Edit', imageTop: null, imageBottom: null });
        expect(message.toLowerCase()).toEqual('');
        expect(data.length).toEqual(1);
        expect(data[0]).toMatchObject({ title: 'General', content: ['Edit'], imageTop: null, imageBottom: null });
        expect(imageTop).toEqual(null);
        expect(imageBottom).toEqual(null);
        expect(editText).toEqual('');
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});