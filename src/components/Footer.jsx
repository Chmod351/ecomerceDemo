import styled from 'styled-components';
import { mobile } from '../responsive';
import { contact, e, social } from '../data/footerData';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const Container = styled.footer`
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg};
  display: flex;
  margin: auto;

  max-width: 1200px;
  ${mobile({ flexDirection: 'column', display: 'flex' })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 1.25rem 0px;
`;

const SocialContainer = styled.div`
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

const Center = styled.div`
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
const Right = styled.div`
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
    <Container>
      <Wrapper>
        <Left>
          <Logo>Cierva Design</Logo>
          <Desc>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly
            believable.
          </Desc>
          <SocialContainer>
            {social.map((i) => {
              const { id, color, icon, link } = i;
              return (
                <a href={link} key={id}>
                  <SocialIcon color={color}>
                    {icon}
                  </SocialIcon>
                </a>
              );
            })}
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            {e.map((i) => {
              const { id, route, name } = i;
              return (
                <ListItem key={id}>
                  <Link to={route} style={{ textDecoration: 'none' }}>
                    <MenuItem>{name}</MenuItem>
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <>
            {contact.map((i) => {
              const { id, url, icon, text } = i;
              return (
                <ContactItem key={id}>
                  <A href={url} style={{ textDecoration: 'none' }}>
                    {icon}
                    {text}
                  </A>
                </ContactItem>
              );
            })}
          </>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Footer;
