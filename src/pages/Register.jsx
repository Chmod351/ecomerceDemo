import styled from 'styled-components';
import { mobile } from '../responsive';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: '75%' })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Error = styled.div`
  flex: 1;
  min-width: 40%;
  color: red;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Register = () => {
  const [store, setStore] = useState('');
  const [error, setError] = useState('');

  const errorMsg = {
    onlyLetters: 'Only letters',
    invalid: '3 o more characters',
    dontMach: 'Passwords does not match',
    password: 'at leats 8 characters',
  };

  const validateUsername = (username) => {
    if (username.length < 3) {
      setError('username');
    } else {
      setError('');
    }
  };
  const validatePassword = (password) => {
    if (password.length < 8) {
      setError('password');
    } else {
      setError('');
      setStore(password);
    }
  };
  const matchPasswords = (confirmPassword) => {
    if (store !== confirmPassword) {
      setError('dont');
    } else {
      setError('');
    }
  };

  const onlyLetters = (name) => {
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(name)) {
      setError('name');
    } else {
      setError('');
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'username':
        validateUsername(value);
        break;
      case 'password':
        validatePassword(value);
        // Add validation for the password field
        break;
      case 'confirmPassword':
        matchPasswords(value);
        break;
      case 'name':
        onlyLetters(value);
        break;
      default:
        break;
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <div>
            <Input
              placeholder='name' type='text'
              name='name'
              onChange={handleChange}
            />
            {error === 'name' ? <Error>{errorMsg.onlyLetters}</Error> : ''}
          </div>
          <div>
            <Input
            type='text'
              placeholder='last name'
              name='name'
              onChange={handleChange}
            />
            {error === 'name' ? <Error>{errorMsg.onlyLetters}</Error> : ''}
          </div>
          <div>
            <Input
            type='text'
              placeholder='username'
              name='username'
              onChange={handleChange}
            />
            {error === 'username' ? <Error>{errorMsg.invalid}</Error> : ''}
          </div>
          <div>
            <Input
              placeholder='email'
              type='email'
              name='email'
              onChange={handleChange}
            />
            {error === 'email' ? <Error>{errorMsg.invalid}</Error> : ''}
          </div>
          <div>
            <Input
              placeholder='password'
              type='password'
              name='password'
              onChange={handleChange}
            />
            {error === 'password' ? <Error>{errorMsg.password}</Error> : ''}
          </div>
          <div>
            <Input
              placeholder='confirm password'
              name='confirmPassword'
              onChange={handleChange}
            />
            {error === 'dont' ? <Error>{errorMsg.dontMach}</Error> : ''}
          </div>

          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type='submit'>CREATE</Button>
          <Link to='/login'>I already have an account</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
