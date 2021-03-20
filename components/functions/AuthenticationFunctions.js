import { post, validEmail, validPassword, validPhone } from '../../shared/SharedFunctions';

// Form validation and API call for login
export const login = (props, username, password, setLoginError, callback) => {
  let valid = false;
  if (username.trim() == '') {
    setLoginError('Email or username required.');
  } else if (password.trim() == '') {
    setLoginError('Password required.');
  } else {
    valid = true;
    post(`${props.baseURL}/accounts/login`,
      { ...(validEmail(username) ? { email: username } : { username }), password })
      .then(response => {
        setLoginError('');
        props.setUser(response.account);
        props.setAdmin(response.account.accountType == 'admin');
      })
      .catch(error => setLoginError(error.message))
      .finally(callback);
  }
  if (!valid && callback)
    callback();
};

// Form validation and API call for signup
export const signup = (props, newUsername, newPassword, confirmPassword,
  firstName, lastName, phone, email, setSignupError, callback) => {
  let valid = false;
  if (newUsername.trim() == '') {
    setSignupError('Please specify a username.');
  } else if (newPassword == '') {
    setSignupError('Please specify a password.');
  } else if (confirmPassword == '') {
    setSignupError('Please re-enter your password.');
  } else if (firstName.trim() == '' || lastName.trim() == '') {
    setSignupError('Please enter your first and last name.');
  } else if (phone.trim() == '') {
    setSignupError('Please enter your phone number.');
  } else if (email.trim() == '') {
    setSignupError('Please enter your email address.');
  } else if (newPassword !== confirmPassword) {
    setSignupError('Entered passwords do not match.');
  } else if (!validPhone(phone)) {
    setSignupError('Please enter a valid phone number.');
  } else if (!validEmail(email)) {
    setSignupError('Please enter a valid email address.');
  } else if (validPassword(newPassword, setSignupError)) {
    valid = true;
    post(`${props.baseURL}/accounts/signup`,
      { username: newUsername, password: newPassword, firstName, lastName, phone, email })
      .then(() =>
        post(`${props.baseURL}/accounts/login`, { username: newUsername, password: newPassword })
          .then(response => {
            setSignupError('');
            props.setUser(response.account);
            props.setAdmin(response.account.accountType == 'admin');
          })
          .catch(() => setSignupError('Unable to log in'))
          .finally(callback))
      .catch(error => { setSignupError(error.message); callback && callback(); });
  }
  if (!valid && callback)
    callback();
};