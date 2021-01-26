import { Dimensions } from 'react-native';
import dayjs from 'dayjs';

// Perform GET request to provided endpoint URL
// Reference: https://reactnative.dev/docs/network
export const get = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Perform POST request to provided endpoint URL with body
export const post = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Perform DELETE request to provided endpoint URL
export const del = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Shorten text for compact display purposes
export const truncate = (string, num) => {
  let truncated = string.split(' ').slice(0, num).join(' ');
  if (truncated.length < string.length)
    truncated = truncated.replace(/\. $/, '') + '...';
  return truncated;
}

// Round current date to nearest minute; reference: https://stackoverflow.com/a/28037042
export const currentDate = () => new Date(Math.round((new Date()).getTime() / 60000) * 60000);

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
export const paragraphs = text => text.split('\n').filter(s => s !== '').map(s => s.trim());

// Merge list of paragraphs back into single text string
export const text = paragraphs => paragraphs.join('\n\n');