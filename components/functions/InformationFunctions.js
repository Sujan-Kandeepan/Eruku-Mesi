import { get, paragraphs } from '../../shared/SharedFunctions';

// Fetch information and populate component state array
export const fetchInformation = (props, pages, data, setData, callback) => {
  // Wait for all content and trigger update to list by setting flag
  const populate = async () => {
    await Promise.all(pages.map((page, index) =>
      get('https://baconipsum.com/api/?type=meat-and-filler').then(content => {
        let newData = data;
        newData[index] = { title: page, content, imageTop: null, imageBottom: null };
        setData(newData);
      })));
    callback();
  };
  populate();
};

// Add new information section and update interface upon success
export const addInfoSection = (props, pages, setPages, data, setData, setOriginalText, setEditText, newSection) => {
  if (pages.includes(newSection)) {
    props.snackbar('Rename the previous new section first');
    return;
  }
  setPages([...pages, newSection]);
  setData([...data, { title: newSection, content: [], imageTop: null, imageBottom: null }]);
  setOriginalText(newSection);
  setEditText(newSection);
};

// Edit information section name and update interface upon success
export const editInfoSection = (props, pages, setPages, data, setData,
  originalText, setOriginalText, editText, setEditText) => {
  if (pages.includes(editText) && originalText !== editText) {
    props.snackbar('Duplicate sections not allowed');
    return;
  }
  setPages(pages.map(page => page === originalText ? editText : page));
  setData(data.map(entry =>
    entry.title === originalText ? { ...entry, title: editText } : entry));
  setOriginalText('');
  setEditText('');
};

// Delete information section and update interface upon success
export const deleteInfoSection = (props, pages, setPages, data, setData, item) => {
  setPages(pages.filter(page => page !== item));
  setData(data.filter(entry => entry.title !== item));
};

// Edit information section content and return to content view
export const editInfoContent = (props, localProps, page, data, setData,
  imageTop, imageBottom, editText, setEditText) => {
  setData(data.map(entry =>
    page.includes(entry.title)
      ? { ...entry, content: paragraphs(editText), imageTop, imageBottom }
      : entry));
  setEditText('');
  localProps.navigation.pop();
};