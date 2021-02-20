import { del, get, paragraphs, post } from '../../shared/SharedFunctions';

// Fetch events and populate component state array
export const fetchEvents = (props, setEvents, callback) => {
  get(`${props.baseURL}/events`)
    .then(response =>
      setEvents(response.map(item =>
        ({ id: item._id, title: item.title, description: paragraphs(item.description),
          date: new Date(item.date), location: item.location }))))
    .catch(() => props.snackbar('Unable to fetch events'))
    .finally(callback);
};

// Handle submit of event form to create or update event record
export const submitEvent = (props, title, date, location, description, setSaving) => {
  // Check for required fields
  if (title.trim() === '') {
    props.snackbar('Event title is required');
    return;
  }
  if (location.trim() === '') {
    props.snackbar('Event location is required');
    return;
  }
  if (description.trim() === '') {
    props.snackbar('Event description is required');
    return;
  }
  // Update database with new or modified record
  setSaving(true);
  post(`${props.baseURL}/events/${props.payload ? `edit/${props.payload.id}` : 'add'}`,
    { title, date, location, description })
    // Update locally and return to previous page
    .then(() => {
      props.update && props.update();
      props.navigation.pop();
    })
    // Display message if failed
    .catch(() => props.snackbar('Failed to update database'))
    .finally(() => setSaving(false));
};

// Handle confirmation step to delete event record
export const deleteEvent = (props, event, setEvents, setFetched, callback) => 
  del(`${props.baseURL}/events/${event.id}`)
    .then(() => fetchEvents(props, setEvents, () => setFetched(true)))
    .catch(() => props.snackbar('Failed to update database'))
    .finally(callback);