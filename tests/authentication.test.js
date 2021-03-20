import { login, signup } from '../components/functions/AuthenticationFunctions';

require('jest-fetch-mock').enableMocks();

describe('Authentication', () => {
  beforeEach(() => {
    fetch.resetMocks()
  });

  test('Validates login form input', () => {
    let user = {};
    let admin = false;
    let loginError = '';
    let setLoginError = value => loginError = value;
    let props = { setUser: value => user = value, setAdmin: value => admin = value };
    login(props, '', 'password', setLoginError);
    expect(loginError.toLowerCase()).toMatch(/.*(username|email|field).*/);
    expect(user).toMatchObject({});
    expect(admin).toEqual(false);
    login(props, 'username', '', setLoginError);
    expect(loginError.toLowerCase()).toMatch(/.*(password|field).*/);
    expect(user).toMatchObject({});
    expect(admin).toEqual(false);
  });

  test('Makes request to log user in with username', done => {
    let user = {};
    let admin = false;
    let loginError = '';
    let setLoginError = value => loginError = value;
    let props = { setUser: value => user = value, setAdmin: value => admin = value };
    fetch.mockResponseOnce(JSON.stringify({
      account: {
        phoneVerified: false,
        passwordResetToken: null,
        resetTokenExpiredAt: null,
        accountType: 'admin',
        receiveNotifications: true,
        theme: 'dark',
        _id: '603dcf2497c3c4522cfba1c0',
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        phone: '1234567890',
        createdAt: '2021-03-02T05:37:40.838Z',
        email: 'testuser@domain.com'
      }
    }));
    login(props, 'testuser', 'Test123!', setLoginError, () => {
      try {
        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toContain('accounts/login');
        expect(fetch.mock.calls[0][1].method).toBe('POST');
        expect(JSON.parse(fetch.mock.calls[0][1].body)).toMatchObject({
          username: 'testuser',
          password: 'Test123!'
        });
        expect(loginError).toEqual('');
        expect(user).toMatchObject({
          phoneVerified: false,
          passwordResetToken: null,
          resetTokenExpiredAt: null,
          accountType: 'admin',
          receiveNotifications: true,
          theme: 'dark',
          _id: '603dcf2497c3c4522cfba1c0',
          username: 'testuser',
          firstName: 'Test',
          lastName: 'User',
          phone: '1234567890',
          createdAt: '2021-03-02T05:37:40.838Z',
          email: 'testuser@domain.com'
        });
        expect(admin).toEqual(true);
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  test('Makes request to log user in with email', done => {
    let user = {};
    let admin = false;
    let loginError = '';
    let setLoginError = value => loginError = value;
    let props = { setUser: value => user = value, setAdmin: value => admin = value };
    fetch.mockResponseOnce(JSON.stringify({
      account: {
        phoneVerified: false,
        passwordResetToken: null,
        resetTokenExpiredAt: null,
        accountType: 'admin',
        receiveNotifications: true,
        theme: 'dark',
        _id: '603dcf2497c3c4522cfba1c0',
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        phone: '1234567890',
        createdAt: '2021-03-02T05:37:40.838Z',
        email: 'testuser@domain.com'
      }
    }));
    login(props, 'testuser@domain.com', 'Test123!', setLoginError, () => {
      try {
        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toContain('accounts/login');
        expect(fetch.mock.calls[0][1].method).toBe('POST');
        expect(JSON.parse(fetch.mock.calls[0][1].body)).toMatchObject({
          email: 'testuser@domain.com',
          password: 'Test123!'
        });
        expect(loginError).toEqual('');
        expect(user).toMatchObject({
          phoneVerified: false,
          passwordResetToken: null,
          resetTokenExpiredAt: null,
          accountType: 'admin',
          receiveNotifications: true,
          theme: 'dark',
          _id: '603dcf2497c3c4522cfba1c0',
          username: 'testuser',
          firstName: 'Test',
          lastName: 'User',
          phone: '1234567890',
          createdAt: '2021-03-02T05:37:40.838Z',
          email: 'testuser@domain.com'
        });
        expect(admin).toEqual(true);
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  test('Validates signup form input', () => {
    let user = {};
    let admin = false;
    let setSignupError = value => signupError = value;
    let props = { setUser: value => user = value, setAdmin: value => admin = value };
    signup(props, '', 'Test123!', 'Test123!', 'Test', 'User',
      '1234567890', 'testuser@domain.com', setSignupError);
    expect(signupError.toLowerCase()).toMatch(/.*(username|specify|field|enter|required).*/);
    expect(user).toMatchObject({});
    expect(admin).toEqual(false);
    signup(props, 'testuser', '', 'Test123!', 'Test', 'User',
      '1234567890', 'testuser@domain.com', setSignupError);
    expect(signupError.toLowerCase()).toMatch(/.*(password|specify|field|enter|required).*/);
    expect(user).toMatchObject({});
    expect(admin).toEqual(false);
    signup(props, 'testuser', 'Test123!', '', 'Test', 'User',
      '1234567890', 'testuser@domain.com', setSignupError);
    expect(signupError.toLowerCase()).toMatch(/.*(password|confirm|re-?enter|field|enter|required).*/);
    expect(user).toMatchObject({});
    expect(admin).toEqual(false);
    signup(props, 'testuser', 'Test123!', 'Test123!', '', 'User',
      '1234567890', 'testuser@domain.com', setSignupError);
    expect(signupError.toLowerCase()).toMatch(/.*(first|name|specify|field|enter|required).*/);
    expect(user).toMatchObject({});
    expect(admin).toEqual(false);
    signup(props, 'testuser', 'Test123!', 'Test123!', 'Test', '',
      '1234567890', 'testuser@domain.com', setSignupError);
    expect(signupError.toLowerCase()).toMatch(/.*(last|name|specify|field|enter|required).*/);
    expect(user).toMatchObject({});
    expect(admin).toEqual(false);
    signup(props, 'testuser', 'Test123!', 'Test123!', 'Test', 'User',
      '', 'testuser@domain.com', setSignupError);
    expect(signupError.toLowerCase()).toMatch(/.*(phone|number|specify|field|enter|required).*/);
    expect(user).toMatchObject({});
    expect(admin).toEqual(false);
    signup(props, 'testuser', 'Test123!', 'Test123!', 'Test', 'User',
      '1234567890', '', setSignupError);
    expect(signupError.toLowerCase()).toMatch(/.*(email|address|specify|field|enter|required).*/);
    expect(user).toMatchObject({});
    expect(admin).toEqual(false);
    signup(props, 'testuser', 'SomePassword!', 'DifferentPassword!', 'Test', 'User',
      '1234567890', 'testuser@domain.com', setSignupError);
    expect(signupError.toLowerCase()).toMatch(/.*(password|match|same|specify|field|enter|required).*/);
    expect(user).toMatchObject({});
    expect(admin).toEqual(false);
    signup(props, 'testuser', 'Test123!', 'Test123!', 'Test', 'User',
      'bad-phone', 'testuser@domain.com', setSignupError);
    expect(signupError.toLowerCase()).toMatch(/.*(phone|number|invalid|format).*/);
    expect(user).toMatchObject({});
    expect(admin).toEqual(false);
    signup(props, 'testuser', 'Test123!', 'Test123!', 'Test', 'User',
      '1234567890', 'bad-email', setSignupError);
    expect(signupError.toLowerCase()).toMatch(/.*(email|address|invalid|format).*/);
    expect(user).toMatchObject({});
    expect(admin).toEqual(false);
    signup(props, 'testuser', 'bad-password', 'bad-password', 'Test', 'User',
      '1234567890', 'testuser@domain.com', setSignupError);
    expect(signupError.toLowerCase()).toMatch(/.*(password|invalid|format).*/);
    expect(user).toMatchObject({});
    expect(admin).toEqual(false);
  });

  test('Makes request to sign user up', done => {
    let user = {};
    let admin = false;
    let setSignupError = value => signupError = value;
    let props = { setUser: value => user = value, setAdmin: value => admin = value };
    fetch.mockResponseOnce(JSON.stringify({}));
    fetch.mockResponseOnce(JSON.stringify({
      account: {
        phoneVerified: false,
        passwordResetToken: null,
        resetTokenExpiredAt: null,
        accountType: 'admin',
        receiveNotifications: true,
        theme: 'dark',
        _id: '603dcf2497c3c4522cfba1c0',
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        phone: '1234567890',
        createdAt: '2021-03-02T05:37:40.838Z',
        email: 'testuser@domain.com'
      }
    }));
    signup(props, 'testuser', 'Test123!', 'Test123!', 'Test', 'User',
      '1234567890', 'testuser@domain.com', setSignupError, () => {
      try {
        expect(fetch.mock.calls.length).toEqual(2);
        expect(fetch.mock.calls[0][0]).toContain('accounts/signup');
        expect(fetch.mock.calls[0][1].method).toBe('POST');
        expect(JSON.parse(fetch.mock.calls[0][1].body)).toMatchObject({
          username: 'testuser',
          password: 'Test123!',
          firstName: 'Test',
          lastName: 'User',
          phone: '1234567890',
          email: 'testuser@domain.com'
        });
        expect(fetch.mock.calls[1][0]).toContain('accounts/login');
        expect(fetch.mock.calls[1][1].method).toBe('POST');
        expect(JSON.parse(fetch.mock.calls[1][1].body)).toMatchObject({
          username: 'testuser',
          password: 'Test123!'
        });
        expect(signupError).toEqual('');
        expect(user).toMatchObject({
          phoneVerified: false,
          passwordResetToken: null,
          resetTokenExpiredAt: null,
          accountType: 'admin',
          receiveNotifications: true,
          theme: 'dark',
          _id: '603dcf2497c3c4522cfba1c0',
          username: 'testuser',
          firstName: 'Test',
          lastName: 'User',
          phone: '1234567890',
          createdAt: '2021-03-02T05:37:40.838Z',
          email: 'testuser@domain.com'
        });
        expect(admin).toEqual(true);
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});