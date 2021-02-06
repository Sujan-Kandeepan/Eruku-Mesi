import { get, paragraphs } from '../../shared/SharedFunctions';

// Fetch events and populate component state array
export const fetchEvents = (props, setEvents, callback) => {
  get(`${props.baseURL}/events`)
    .then(response =>
      setEvents(response.map(item =>
        ({ id: item._id, title: item.name, description: paragraphs(item.desc),
          date: new Date(), location: 'fix me' }))))
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
  // Create or update record depending on whether an existing record was given as payload
  props.setEvents(
    props.payload
      // Find and update existing record
      ? props.events.map(event =>
        event.id === props.payload.id
          ? { ...event, title, date, location, description: paragraphs(description) }
          : event)
      // Append new record
      : [
        ...props.events,
        { id: props.events.length + 1, title, date, location, description: paragraphs(description) }
      ]);
  // Exit page, return to previous
  props.navigation.pop();
}