export const validateUsername = (username, setError, setUsername) => {
    if (username.length < 3) {
      setError('username');
    } else {
      setError('');
      setUsername(username);
    }
  };
  
  export const validatePassword = (password, setError, setPassword, setStore) => {
    if (password.length < 8) {
      setError('password');
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