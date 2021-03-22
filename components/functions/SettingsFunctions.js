import { validEmail, validPhone } from '../../shared/SharedFunctions';

// Form validation and API call for editing personal info
export const editInfo = (props, username, firstName, lastName, phone, email, setEditInfoError, callback) => {
  let valid = false;
  if (username.trim() == '') {
    setEditInfoError('Please specify a username.');
  } else if (firstName.trim() == '' || lastName.trim() == '') {
    setEditInfoError('Please enter your first and last name.');
  } else if (phone.trim() == '') {
    setEditInfoError('Please enter your phone number.');
  } else if (email.trim() == '') {
    setEditInfoError('Please enter your email address.');
  } else if (!validPhone(phone)) {
    setEditInfoError('Please enter a valid phone number.');
  } else if (!validEmail(email)) {
    setEditInfoError('Please enter a valid email address.');
  } else {
    valid = true;
    props.updateUser({ username, firstName, lastName, phone, email },
      () => { setEditInfoError(''); props.navigation.pop(); },
      error => setEditInfoError(error.message),
      callback);
  }
  if (!valid && callback)
    callback();
};