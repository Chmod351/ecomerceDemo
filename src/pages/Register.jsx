import styled from 'styled-components';
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { googleLogin, login } from '../utils/endpointsLogic';
import {
  validateUsername,
  validatePassword,
  matchPasswords,
  verifyEmail,
  findByEmail,
  handleRegistration,
} from '../utils/endpointsLogic.js';
import { Messages } from '../utils/msg.js';
import { register } from '../data/registerData';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';

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
  width: 25rem;
  padding: 1rem;
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
  flex-direction: column;
`;

const Input = styled.input`
  width: 94%;
  margin: 1rem 0rem;
  outline: none;
  font-weight: bold;
  border: none;
  padding: 0.33rem;
  border-bottom: 1px solid ${({ theme }) => theme.text}; /* Agrega esta línea */
  background-color: transparent;
  color: ${({ theme }) => theme.text};
`;

const Agreement = styled.span`
  font-size: 0.75rem;
  margin: 1.25rem 0rem;
  width: 94%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  width: 100%;
  margin: 0.5px auto;
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
  margin: 0.3rem 0rem;
  color: ${({ theme }) => theme.text};
`;

const Register = () => {
  const [islogin, setLog] = useState(true);
  const [store, setStore] = useState(null);
  const [msg, setMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [off, setOff] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);

  const dispatch = useDispatch();
  const Create = 'Create account';
  const alreadyHaveOne = 'I already have an account';
  const initialFormValues = {
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  // google oauth
  const handleGoogleAuth = async (credentialResponse) => {
    const res = await googleLogin(credentialResponse.credential);
    const email = await findByEmail(res.email);
    if (!email) {
      await handleRegistration(res.email, res.jti, res.name, setMsg);
      await login(dispatch, res.email, res.jti, setMsg);
    }
    await login(dispatch, res.email, res.jti, setMsg);
  };

  // handle click function
  const handleClick = async (e) => {
    e.preventDefault();
    setOff(true);
    if (islogin) {
      await login(dispatch, email, password, setMsg);
    } else {
      setMsg('message');
      await handleRegistration(email, password, username, setMsg);
      await login(dispatch, email, password, setMsg);
    }
    setFormValues(initialFormValues);
    setOff(false);
  };

  // Función para manejar los cambios en los campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
    switch (name) {
      case 'username':
        validateUsername(value, setMsg, setUsername);
        break;
      case 'password':
        validatePassword(value, setMsg, setPassword, setStore, login, setOff);
        setLoggingIn(true);
        break;
      case 'confirmPassword':
        matchPasswords(value, setMsg, setOff, store);
        break;
      case 'email':
        verifyEmail(value, setMsg, setEmail);
        break;
      default:
        break;
    }
  };

  return (
    <Container id={islogin ? 'SignIn' : 'SignUp'} role="contentinfo">
      <Wrapper>
        {/* verifica si esta en el formulario de logeo o de registro */}
        <Title>{islogin ? 'SIGN IN' : Create} </Title>
        <Form role="form" aria-label={islogin ? 'SIGN IN' : Create}>
          {register.map((data) => {
            const { id, label, name, type, placeholder, errorMessage, shared } =
              data;
            if (islogin && shared) {
              return null; // Salta el campo en el modo de inicio de sesión
            }
            return (
              <InputContainer key={id}>
                <Label
                  title={msg === name ? <Error>{errorMessage}</Error> : label}
                  aria-label={
                    msg === name ? <Error>{errorMessage}</Error> : label
                  }
                >
                  {msg === name ? <Error>{errorMessage}</Error> : label}
                </Label>
                <Input
                  title={placeholder}
                  role="form"
                  aria-label={name}
                  autoComplete={name}
                  placeholder={placeholder}
                  type={type}
                  name={name}
                  value={formValues[name]}
                  onChange={handleChange}
                  tabIndex="0"
                />
              </InputContainer>
            );
          })}
          {msg in Messages ? (
            <Label
              role="dialog"
              aria-label={Messages[msg]}
              title={Messages[msg]}
            >
              {Messages[msg]}
            </Label>
          ) : (
            <Label> </Label>
          )}
          {msg.message ? (
            <Error role="dialog" aria-label={msg.message} title={msg.message}>
              {msg.message}
            </Error>
          ) : null}
          {!islogin ? (
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the{' '}
              <Link
                to="/"
                target="_blank"
                tabIndex="0"
                role="link"
                aria-label="link to home"
                title="PRIVACY POLICY"
              >
                PRIVACY POLICY
              </Link>
            </Agreement>
          ) : null}
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleGoogleAuth(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
          <Button
            title={islogin ? 'Submit' : Create}
            role="button"
            aria-label={islogin ? 'Submit' : Create}
            tabIndex="0"
            type="submit"
            onClick={handleClick}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleClick(e);
              }
            }}
            disabled={off}
          >
            {islogin ? 'Submit' : Create}
          </Button>
          <Button
            disabled={loggingIn}
            title={islogin ? Create : alreadyHaveOne}
            role="button"
            aria-label={islogin ? Create : alreadyHaveOne}
            tabIndex="0"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              setFormValues(initialFormValues);
              setMsg('');
              setLog(!islogin);
            }}
          >
            {islogin ? Create : alreadyHaveOne}
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
