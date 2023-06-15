import styled from 'styled-components';
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { handleError, handleSuccess } from '../utils/toast';
import { publicRequest } from '../requestMethods';
import {
  validateUsername,
  validatePassword,
  matchPasswords,
  verifyEmail,
} from '../utils/RegisterLogic.js';

import { register } from '../data/registerData';

const Container = styled.section`
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
  width: 35rem;
  padding: 1.25rem;
  background-color: ${({ theme }) => theme.bgLighter};
  ${mobile({ width: '75%' })}
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 300;
  color: ${({ theme }) => theme.text};
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 1rem 0.625rem 0rem 0rem;
  padding: 0.625rem;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bgLighter};
`;

const Agreement = styled.span`
  font-size: 0.75rem;
  margin: 1.25rem 0rem;

  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 0.938rem 1.25rem;
  background-color: teal;
  color: white;
  cursor: pointer;
  &:disabled {
    color: white;
    cursor: not-allowed;
  }
`;
const Error = styled.div`
  flex: 1;
  min-width: 40%;
  color: red;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  font-size: 0.75rem;
  margin: 1rem 0rem 0 0;
  color: ${({ theme }) => theme.text};
`;

const Register = () => {
  const [store, setStore] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [off, setOff] = useState(true);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const success = await publicRequest.post('/signup', {
        email,
        password,
        username,
      });
      handleSuccess('welcome');
      console.log(success);
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'username':
        validateUsername(value, setError, setUsername);
        break;
      case 'password':
        validatePassword(value, setError, setPassword, setStore);
        break;
      case 'confirmPassword':
        matchPasswords(value, setError, setOff, store);
        break;
      case 'email':
        verifyEmail(value, setError, setEmail);
        break;
      default:
        break;
    }
  };

  return (
    <Container id='SignUp'>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          {register.map((data) => {
            const { id, label, name, type, placeholder, errorMessage } = data;
            return (
              <>
                <InputContainer key={id}>
                  <Label>
                    {error === name ? <Error>{errorMessage}</Error> : label}
                  </Label>
                  <Input
                    placeholder={placeholder}
                    type={type}
                    name={name}
                    onChange={handleChange}
                  />
                </InputContainer>
              </>
            );
          })}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the{' '}
            <Link
              to='/'
              target='_blank'
            >
              PRIVACY POLICY
            </Link>
          </Agreement>
          <Button
            type='submit'
            onClick={handleClick}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleClick(e);
              }
            }}
            disabled={off}
          >
            CREATE
          </Button>
          <Link to='/login'>I already have an account </Link>
          <Link to='/'> Go Home</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
