import { del, filenameOrDefault, get, paragraphs, post, upload } from '../../shared/SharedFunctions';

// Fetch information and populate component state array
export const fetchInformation = (props, setPages, setData, callback) => {
  get(`${props.baseURL}/information`)
    .then(response => {
        setPages([...new Set(response.map(item => item.title))]);
        setData(response.map(item =>
          ({ id: item._id, title: item.title, content: paragraphs(item.content), imageTop: item.imageTop,
            metadataImageTop: item.metadataImageTop ? JSON.parse(item.metadataImageTop) : {},
            type: item.type, url: item.url })));
      })
    .catch(error => console.error(error) && props.snackbar('Unable to fetch information'))
    .finally(callback);
};

// Add new information section and update interface upon success
export const addInfoSection = (props, pages, setPages, data, setData,
  setOriginalText, setEditText, newSection, callback) => {
  if (pages.includes(newSection)) {
    props.snackbar('Rename the previous new section first');
    return;
  }
  post(`${props.baseURL}/information/add`,
    { title: newSection, content: 'Nothing here yet...', imageTop: null, imageBottom: null })
    // Update locally within same page
    .then(() => {
      fetchInformation(props, setPages, setData, () => {
        setOriginalText(newSection);
        setEditText(newSection);
        callback && callback();
      });
    })
    // Display message if failed
    .catch(error => {
      console.error(error);
      props.snackbar('Failed to save changes');
      callback && callback();
    });
};

// Edit information section name and update interface upon success
export const editInfoSection = (props, pages, setPages, data, setData,
  originalText, setOriginalText, editText, setEditText, callback) => {
  if (editText.trim() === '') {
    props.snackbar('Section name cannot be blank');
    return;
  }
  if (pages.includes(editText) && originalText !== editText) {
    props.snackbar('Duplicate sections not allowed');
    return;
  }
  const found = data.find(entry => entry.title == originalText);
  post(`${props.baseURL}/information/edit/${found.id}`, { title: editText })
    // Update locally within same page
    .then(() => {
      fetchInformation(props, setPages, setData, () => {
        setOriginalText('');
        setEditText('');
        callback && callback();
      });
    })
    // Display message if failed
    .catch(error => {
      console.error(error);
      props.snackbar('Failed to save changes');
      callback && callback();
    });
};

// Delete information section and update interface upon success
export const deleteInfoSection = (props, pages, setPages, data, setData, item, callback) => {
  const found = data.find(entry => entry.title == item);
  del(`${props.baseURL}/information/${found.id}`, found)
    // Update locally within same page
    .then(() => {
      fetchInformation(props, setPages, setData, callback);
    })
    // Display message if failed
    .catch(error => {
      console.error(error);
      props.snackbar('Failed to save changes');
      callback && callback();
    });
};

// Persist changes to information section reordering
export const reorderInfoSections = (props, ordering, data, setPages, callback) => {
  const newPages = [...new Set(ordering.data)];
  setPages(newPages);
  const orderedData = newPages.map(page => data.find(item => item.title === page));
  const information = orderedData.map(item => ({ _id: item.id }));
  post(`${props.baseURL}/information/updatePages`, { information })
    .catch(() => props.snackbar('Failed to save changes'))
    .finally(callback);
};

// Edit information section content and return to content view
export const editInfoContent = (props, localProps, page, setPages,
  data, setData, imageTop, editText, setEditText, callback) => {
  const found = data.find(entry => page.includes(entry.title));
  const name = filenameOrDefault(imageTop);
  const uploadFile = imageTop
    ? { ...imageTop, name,
        type: name.endsWith('png') ? 'image/png' : (name.endsWith('gif') ? 'image/gif' : 'image/jpeg') }
    : null;
  const metadataImageTop = imageTop ? JSON.stringify({ ...uploadFile, uri: undefined }) : null;
  props.snackbar('Saving changes');
  upload(`${props.baseURL}/information/edit/${found.id}`, { content: editText, uploadFile, metadataImageTop })
    // Update locally within same page
    .then(() => {
      fetchInformation(props, setPages, setData, () => {
        props.snackbar('Changes saved');
        setEditText('');
        localProps.navigation.pop();
        callback && callback();
      });
    })
    // Display message if failed
    .catch((error) => {
      console.log(error);
      props.snackbar('Failed to save changes');
      callback && callback();
    });
};