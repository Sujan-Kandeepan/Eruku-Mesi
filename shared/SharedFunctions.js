import { Dimensions } from 'react-native';
import dayjs from 'dayjs';

// Perform GET request to provided endpoint URL
// Reference: https://reactnative.dev/docs/network
export const get = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    return console.error(error);
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