import { editInfo } from '../components/functions/SettingsFunctions';
import { post } from '../shared/SharedFunctions';

require('jest-fetch-mock').enableMocks();

describe('Settings', () => {
  beforeEach(() => {
    fetch.resetMocks()
  });

  test('Validates personal information form input', () => {
    let user = {
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
    };
    const initialUser = { ...user };
    let props = {
      updateUser: value => user = { ...user, ...value },
      navigation: { pop: () => { } }
    };
    let editInfoError = '';
    let setEditInfoError = value => editInfoError = value;
    editInfo(props, {}, '', 'Test', 'User', '1234567890', 'testuser@domain.com', setEditInfoError);
    expect(editInfoError.toLowerCase()).toMatch(/.*(username|specify|field|enter|required).*/);
    expect(user).toMatchObject(initialUser);
    editInfo(props, {}, 'testuser', '', 'User', '1234567890', 'testuser@domain.com', setEditInfoError);
    expect(editInfoError.toLowerCase()).toMatch(/.*(first|name|specify|field|enter|required).*/);
    expect(user).toMatchObject(initialUser);
    editInfo(props, {}, 'testuser', 'Test', '', '1234567890', 'testuser@domain.com', setEditInfoError);
    expect(editInfoError.toLowerCase()).toMatch(/.*(last|name|specify|field|enter|required).*/);
    expect(user).toMatchObject(initialUser);
    editInfo(props, {}, 'testuser', 'Test', 'User', '', 'testuser@domain.com', setEditInfoError);
    expect(editInfoError.toLowerCase()).toMatch(/.*(phone|number|specify|field|enter|required).*/);
    expect(user).toMatchObject(initialUser);
    editInfo(props, {}, 'testuser', 'Test', 'User', '1234567890', '', setEditInfoError);
    expect(editInfoError.toLowerCase()).toMatch(/.*(email|address|specify|field|enter|required).*/);
    expect(user).toMatchObject(initialUser);
    editInfo(props, {}, 'testuser', 'Test', 'User', 'bad-phone', 'testuser@domain.com', setEditInfoError);
    expect(editInfoError.toLowerCase()).toMatch(/.*(phone|number|invalid|format).*/);
    expect(user).toMatchObject(initialUser);
    editInfo(props, {}, 'testuser', 'Test', 'User', '1234567890', 'bad-email', setEditInfoError);
    expect(editInfoError.toLowerCase()).toMatch(/.*(email|address|invalid|format).*/);
    expect(user).toMatchObject(initialUser);
  });

  test('Makes request to update personal information', done => {
    let user = {
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
    };
    const initialUser = { ...user };
    let props = {
      updateUser: (value, _thenCallback, _catchCallback, finallyCallback) => {
        user = { ...user, ...value };
        post(`accounts/edit/${user._id}`, value)
          .finally(finallyCallback);
      },
      navigation: { pop: () => { } }
    };
    let editInfoError = '';
    let setEditInfoError = value => editInfoError = value;
    fetch.mockResponseOnce(JSON.stringify({
      account: {
        ...initialUser,
        username: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        phone: '4161234567',
        email: 'johndoe@domain.com'
      }
    }));
    editInfo(props, '', 'john_doe', 'John', 'Doe', '4161234567', 'johndoe@domain.com', setEditInfoError, () => {
      try {
        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toContain('accounts/edit/603dcf2497c3c4522cfba1c0');
        expect(fetch.mock.calls[0][1].method).toBe('POST');
        expect(JSON.parse(fetch.mock.calls[0][1].body)).toMatchObject({
          profilePicture: '',
          username: 'john_doe',
          firstName: 'John',
          lastName: 'Doe',
          phone: '4161234567',
          email: 'johndoe@domain.com'
        });
        expect(editInfoError).toEqual('');
        expect(user).toMatchObject({
          ...initialUser,
          username: 'john_doe',
          firstName: 'John',
          lastName: 'Doe',
          phone: '4161234567',
          email: 'johndoe@domain.com'
        });
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});