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