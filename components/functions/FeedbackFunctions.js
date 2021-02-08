export const feedbackTextChanged = (props, text, setText, maxLength) => {
  if (text.length >= maxLength)
    props.snackbar('Feedback message is too long');
  else
    setText(text);
};

// Validate feedback form and handle submit
export const submitFeedback = (props, text, setText, keyboard) => {
  if (text.trim() === '') {
    props.snackbar('Feedback message is empty');
  } else {
    console.log(`Feedback submitted:\n${'-'.repeat(20)}\n${text}\n${'-'.repeat(20)}\n`);
    props.snackbar('Feedback submitted');
    keyboard.dismiss();
    setText('');
  }
}