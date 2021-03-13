import { del, get, paragraphs, post } from '../../shared/SharedFunctions';

// Fetch information and populate component state array
export const fetchInformation = (props, setPages, setData, callback) => {
  get(`${props.baseURL}/information`)
    .then(response => {
        setPages(response.map(item => item.title));
        setData(response.map(item =>
          ({ id: item._id, title: item.title, content: paragraphs(item.content),
            imageTop: null, imageBottom: null })));
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
      props.snackbar('Failed to update database');
      callback && callback();
    });
};

// Edit information section name and update interface upon success
export const editInfoSection = (props, pages, setPages, data, setData,
  originalText, setOriginalText, editText, setEditText, callback) => {
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
      props.snackbar('Failed to update database');
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
      props.snackbar('Failed to update database');
      callback && callback();
    });
};

// Edit information section content and return to content view
export const editInfoContent = (props, localProps, page, setPages, data, setData,
  imageTop, imageBottom, editText, setEditText, callback) => {
  const found = data.find(entry => page.includes(entry.title));
  post(`${props.baseURL}/information/edit/${found.id}`, { content: editText, imageTop, imageBottom })
    // Update locally within same page
    .then(() => {
      fetchInformation(props, setPages, setData, () => {
        setEditText('');
        localProps.navigation.pop();
        callback && callback();
      });
    })
    // Display message if failed
    .catch((error) => {
      console.log(error);
      props.snackbar('Failed to update database');
      callback && callback();
    });
};