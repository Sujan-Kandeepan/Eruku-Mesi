import { validEmail, validPassword, validPhone } from '../../shared/SharedFunctions';

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
    props.snackbar('Saving changes');
    valid = true;
    props.updateUser({ username, firstName, lastName, phone, email },
      () => {
        props.snackbar('Information updated');
        setEditInfoError('');
        props.navigation.pop();
      },
      error => setEditInfoError(error.message),
      callback);
  }
  if (!valid && callback)
    callback();
};

// Form validation checks for password change
export const changePassword = (props, oldPassword, newPassword, confirmPassword, setPasswordError, callback) => {
  let valid = false;
  if (oldPassword.trim() == '') {
    setPasswordError('Please enter your old password.');
  } else if (newPassword.trim() == '') {
    setPasswordError('Please specify a new password.');
  } else if (confirmPassword.trim() == '') {
    setPasswordError('Please re-enter your new password.');
  } else if (newPassword !== confirmPassword) {
    setPasswordError('Entered passwords do not match.');
  } else if (validPassword(newPassword, setPasswordError)) {
    props.snackbar('Saving changes');
    valid = true;
    props.updateUser({ oldPassword, newPassword },
      () => {
        props.snackbar('Password changed');
        setPasswordError('');
        props.navigation.pop();
      },
      error => setPasswordError(error.message),
      callback);
  }
  if (!valid && callback)
    callback();
};