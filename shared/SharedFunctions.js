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

export const truncate = (string, num) => {
  let truncated = string.split(' ').slice(0, num).join(' ');
  if (truncated.length < string.length)
    truncated = truncated.replace(/\. $/, '') + '...';
  return truncated;
}