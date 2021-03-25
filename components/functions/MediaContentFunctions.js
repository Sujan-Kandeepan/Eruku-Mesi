import { del, filenameOrDefault, get, paragraphs, upload } from '../../shared/SharedFunctions';

// Fetch posts and populate component state array
export const fetchMediaContent = (props, setPosts, callback) => {
  get(`${props.baseURL}/mediaContent`)
    .then(response =>
      setPosts(response.map(item =>
        ({ id: item._id, title: item.title, description: paragraphs(item.description || ''),
          metadata: item.metadata ? JSON.parse(item.metadata) : {}, type: item.type, url: item.url }))))
    .catch(error => console.error(error) && props.snackbar('Unable to fetch posts'))
    .finally(callback);
};

// Handle submit of media content form to create or update media content record
export const submitMediaContent = (props, title, description, image, file, setSaving) => {
  // Check for required fields
  if (title.trim() === '') {
    props.snackbar('Post title is required');
    return;
  }
  if (description.trim() === '') {
    props.snackbar('Post description is required');
    return;
  }
  if (!image && !file) {
    props.snackbar('Nothing selected for upload');
    return;
  }
  // Update database with new or modified record
  props.snackbar(props.payload ? 'Saving changes' : 'Uploading file');
  setSaving(true);
  const name = filenameOrDefault({ ...image, ...file });
  const uploadFile = { uri: { ...image, ...file }.uri, name,
    type: image
      ? (name.endsWith('png')
        ? 'image/png'
        : (name.endsWith('gif')
          ? 'image/gif'
          : (name.endsWith('mp4')
            ? 'video/mp4'
            : 'image/jpeg')))
      : 'application/pdf' };
  upload(`${props.baseURL}/mediaContent/${props.payload ? `edit/${props.payload.id}` : 'add'}`,
    { title, description, type: image ? 'photo' : 'file', uploadFile,
      metadata: JSON.stringify({ ...image, ...file, name, uri: undefined }) })
    // Update locally and return to previous page
    .then(() => {
      props.snackbar(props.payload ? 'Changes saved' : 'File uploaded');
      props.update && props.update();
      props.navigation.pop();
    })
    // Display message if failed
    .catch(error => console.error(error) && props.snackbar('Failed to save changes'))
    .finally(() => setSaving(false));
};

// Handle confirmation step to delete new story record
export const deleteMediaContent = (props, post, setPosts, setFetched, callback) =>
  del(`${props.baseURL}/mediaContent/${post.id}`)
    .then(() => fetchMediaContent(props, setPosts, () => setFetched(true)))
    .catch(error => console.error(error) && props.snackbar('Failed to save changes'))
    .finally(callback);