import styled from 'styled-components';
import { mobile } from '../responsive';
import { contact, e, social } from '../data/footerData';
import { Link } from 'react-router-dom';

const Container = styled.footer`
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  color: ${({ theme }) => theme.text};
  display: flex;
  margin: auto;
  max-width: 1200px;
  ${mobile({ flexDirection: 'column', display: 'flex' })}
`;
const Left = styled.aside`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
`;

const Logo = styled.h3`
  font-size: 2rem;
`;

const Desc = styled.p`
  margin: 1.25rem 0px;
`;

const SocialContainer = styled.aside`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.25rem;
`;

const Center = styled.aside`
  flex: 1;
  padding: 1.25rem;
  ${mobile({ display: 'none' })}
`;

const Title = styled.h3`
  margin-bottom: 1.875rem;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 0.2rem;
  position: relative;

  &:hover {
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.text};
    text-decoration-thickness: 1px;
  }
`;
const Right = styled.aside`
  flex: 1;
  padding: 1.25rem;
`;

const ContactItem = styled.div`
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;
const MenuItem = styled.p`
  color: ${({ theme }) => theme.text};
`;
const A = styled.a`
  color: ${({ theme }) => theme.text};
`;

const Footer = () => {
  return (
    <Container role="contentinfo" aria-label="footer">
      <Wrapper role="complementary">
        <Left role="table">
          <Logo
            aria-label="cierva design logo"
            role="banner"
            title="Cierva Design"
          >
            Cierva Design
          </Logo>
          <Desc
            aria-label="about Cierva"
            role="complementary"
            title="About Cierva"
          >
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly
            believable.
          </Desc>
          <SocialContainer role="list">
            {social.map((i) => {
              const { id, color, icon, link } = i;
              return (
                <A
                  href={link}
                  key={id}
                  target="_blank"
                  title={link}
                  role="link"
                  aria-label={link}
                >
                  <SocialIcon color={color} role="img">
                    {icon}
                  </SocialIcon>
                </A>
              );
            })}
          </SocialContainer>
        </Left>
        <Center role="table">
          <Title role="complementary">Useful Links</Title>
          <List role="list">
            {e.map((i) => {
              const { id, route, name } = i;
              return (
                <ListItem key={id}>
                  <Link
                    to={route}
                    style={{ textDecoration: 'none' }}
                    title={name}
                    role="list"
                    aria-label={name}
                  >
                    <MenuItem>{name}</MenuItem>
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </Center>
        <Right role="tab">
          <Title role="complementary">Contact</Title>
          <>
            {contact.map((i) => {
              const { id, url, icon, text } = i;
              return (
                <ContactItem key={id}>
                  <A
                    href={url}
                    style={{ textDecoration: 'none' }}
                    title={url}
                    role="link"
                    aria-label={url}
                  >
                    {icon}
                    {text}
                  </A>
                </ContactItem>
              );
            })}
          </>
          <Payment
            src="https://i.ibb.co/Qfvn4z6/payment.png"
            alt="payment method acepted, visa, mastercard, paypal, mercado pago"
            title="payment method acepted, visa, mastercard, paypal, mercado pago"
            aria-label="payment method acepted, visa, mastercard, paypal, mercado pago"
          />
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Footer;
