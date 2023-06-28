import { publicRequest } from '../requestMethods';
import { handleError, handleSuccess } from '../utils/toast';

// validate format and data
export const validateUsername = (username, setError, setUsername) => {
  if (username.length === 0 || username.length < 3) {
    setError('username');
  } else {
    setError('');
    setUsername(username);
  }
};

export const validatePassword = (
  password,
  setError,
  setPassword,
  setStore,
  login,
  setOff,
) => {
  if (password.length === 1 || password.length < 8) {
    setError('password');
    login ? setOff(false) : '';
  } else {
    setError('');
    setPassword(password);
    setStore(password);
  }
};

export const matchPasswords = (confirmPassword, setError, setOff, store) => {
  if (store !== confirmPassword) {
    setError('confirmPassword');
    setOff(true);
  } else {
    setError('');
    setOff(false);
  }
};

export const verifyEmail = (email, setError, setEmail) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError('email');
  } else {
    setError('');
    setEmail(email);
  }
};

// functionals functions
// register
export const handleRegistration = async (email, password, username, setMsg) => {
  try {
    await publicRequest.post('/users/signUp', {
      email,
      password,
      username,
    });
    handleSuccess('created');
    setMsg('created');
  } catch (error) {
    setMsg(error.message);
    handleError(error);
    setMsg('');
  }
};
