import { del, get, paragraphs, post } from '../../shared/SharedFunctions';

// Fetch posts and populate component state array
export const fetchMediaContent = (props, setPosts, callback) => {
  get(`${props.baseURL}/mediaContent`)
    .then(response =>
      setPosts(response.map(item =>
        ({ id: item._id, title: item.title, description: paragraphs(item.description || ""),
          image: { uri: item.url } }))))
    .catch(() => props.snackbar('Unable to fetch posts'))
    .finally(callback);
};

// Handle submit of media content form to create or update media content record
export const submitMediaContent = (props, title, description, image, setSaving) => {
  // Check for required fields
  if (title.trim() === '') {
    props.snackbar('Post title is required');
    return;
  }
  if (description.trim() === '') {
    props.snackbar('Post description is required');
    return;
  }
  if (!image) {
    props.snackbar('No photo or video selected');
    return;
  }
  // Update database with new or modified record
  setSaving(true);
  post(`${props.baseURL}/mediaContent/${props.payload ? `edit/${props.payload.id}` : 'add'}`,
    { title, description: description, image, url: image.uri, type: "photo" })
    // Update locally and return to previous page
    .then(() => {
      props.update && props.update();
      props.navigation.pop();
    })
    // Display message if failed
    .catch(() => props.snackbar('Failed to update database'))
    .finally(() => setSaving(false));
};

// Handle confirmation step to delete new story record
export const deleteMediaContent = (props, post, setPosts, setFetched, callback) =>
  del(`${props.baseURL}/mediaContent/${post.id}`)
    .then(() => fetchMediaContent(props, setPosts, () => setFetched(true)))
    .catch(() => props.snackbar('Failed to update database'))
    .finally(callback);