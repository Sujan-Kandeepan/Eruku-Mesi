import { post } from '../../shared/SharedFunctions';

export const feedbackTextChanged = (props, text, setText, maxLength) => {
  if (text.length > maxLength)
    props.snackbar('Feedback message is too long');
  else
    setText(text);
};

// Validate feedback form and handle submit
export const submitFeedback = (props, text, setText, keyboard, callback) => {
  if (text.trim() === '')
    props.snackbar('Feedback message is empty');
  else
    post(`${props.baseURL}/feedback/add`, { text })
      // Reset feedback form and display message
      .then(() => {
        props.snackbar('Feedback submitted');
        keyboard.dismiss();
        setText('');
      })
      // Display message if failed
      .catch(error => console.error(error) && props.snackbar('Failed to save changes'))
      .finally(callback);
}