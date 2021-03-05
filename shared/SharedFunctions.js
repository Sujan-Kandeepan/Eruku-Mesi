import { Dimensions } from 'react-native';
import dayjs from 'dayjs';

// Shared logic for HTTP requests in functions to export
// Reference: https://reactnative.dev/docs/network
const request = async (url, params) => {
  try {
    const response = await fetch(url, params);
    const json = await response.json();
    if (!response.ok)
      throw Error(`Returned ${response.status} with message: ${json.message}`);
    return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Perform GET request to provided endpoint URL
export const get = async url => request(url);

// Perform POST request to provided endpoint URL with body
export const post = async (url, body) =>
  request(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

// Perform DELETE request to provided endpoint URL with body
export const del = async (url, body) =>
  request(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

// Shorten text for compact display purposes
export const truncate = (string, num) => {
  let words = string.split(/\s+/);
  let truncated = words.slice(0, num).join(' ');
  if (words.length > num)
    truncated = truncated.replace(/\.$/, '') + '...';
  return truncated;
};

// Round current date to nearest minute; reference: https://stackoverflow.com/a/28037042
export const currentDate = () => new Date(Math.floor((new Date()).getTime() / 60000) * 60000);

// Scale image to screen width or to maximum height with customizable horizontal margin
export const scale = ({ image, marginHorizontal, maxHeight }) => {
  if (!image) return;
  if (image.rotation && [90, 270].includes(parseInt(image.rotation)))
    image = { ...image, width: image.height, height: image.width };
  let width = Dimensions.get('window').width - (marginHorizontal * 2 || 30);
  let height = image.width && image.height ? width * image.height / image.width : width;
  if (maxHeight && height > maxHeight) {
    width *= maxHeight / height;
    height = maxHeight;
  }
  return { height, width };
};

// Get formatted date to display
// Reference: https://day.js.org/docs/en/display/format
export const showDate = (date, long) =>
  dayjs(date).format(`${'d'.repeat(long ? 4 : 3)}, ${'M'.repeat(long ? 4 : 3)} D, YYYY`);

// Get formatted time to display
export const showTime = (date) => dayjs(date).format('h:mm A');

// Extract list of paragraphs from large input field value containing text
export const paragraphs = text => text.split('\n').filter(s => s.trim() !== '').map(s => s.trim());

// Merge list of paragraphs back into single text string
export const text = paragraphs => paragraphs.join('\n\n');

// Phone number validation logic
export const validPhone = (phone) => phone.split('').filter(c => c.match(/[0-9]/g)).length >= 10;

// Email validation logic
export const validEmail = (email) => email.match(/[A-Za-z0-9\.\-]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9]+/g);

// Password validation logic
export const validPassword = (password, setError) => {
  let valid = false;
  if (password.length < 8)
    setError('Password must be at least 8 characters long.');
  else if (!password.split('').some(c => c.match(/[A-Z]/g)))
    setError('Password must contain at least one uppercase letter.');
  else if (!password.split('').some(c => c.match(/[a-z]/g)))
    setError('Password must contain at least one lowercase letter.');
  else if (!password.split('').some(c => c.match(/[0-9]/g)))
    setError('Password must contain at least one digit.');
  else if (!password.split('').some(c => !c.match(/[A-Za-z0-9\s]/g)))
    setError('Password must contain at least one special character.');
  else valid = true
  return valid;
};