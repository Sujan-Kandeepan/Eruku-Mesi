import { get, paragraphs, post, text } from '../../shared/SharedFunctions';

// Fetch news stories and populate component state array
export const fetchNewsStories = (props, setStories, callback) => {
  get(`${props.baseURL}/newsStories`)
    .then(response =>
      setStories(response.map(item =>
        ({ id: item._id, title: item.title, content: paragraphs(item.content) }))))
    .catch(() => props.snackbar('Unable to fetch news stories'))
    .finally(callback);
};

// Handle submit of news story form to create or update news story record
export const submitNewsStory = (props, title, content, setSaving) => {
  // Check for required fields
  if (title.trim() === '') {
    props.snackbar('News story title is required');
    return;
  }
  if (content.trim() === '') {
    props.snackbar('News story content is required');
    return;
  }
  // Update database with new or modified record
  setSaving(true);
  post(`${props.baseURL}/newsStories/${props.payload ? `edit/${props.payload.id}` : 'add'}`,
    { title, content: text(paragraphs(content)), source: 'admin' })
    // Update locally and return to previous page
    .then(() => {
      props.update && props.update();
      props.navigation.pop();
    })
    // Display message if failed
    .catch(() => props.snackbar('Failed to update database'))
    .finally(() => setSaving(false));
}