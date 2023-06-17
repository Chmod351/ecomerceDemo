import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from '@material-ui/icons';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.footer`
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg};
  display: flex;
  margin: auto;

  max-width: 1200px;
  ${mobile({ flexDirection: 'column', display:'flex' })}
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
  margin-bottom: 0.625rem;
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
            <SocialIcon color='3B5999'>
              <Facebook />
            </SocialIcon>
            <SocialIcon color='E4405F'>
              <Instagram />
            </SocialIcon>
            <SocialIcon color='55ACEE'>
              <Twitter />
            </SocialIcon>
            <SocialIcon color='E60023'>
              <Pinterest />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Man Fashion</ListItem>
            <ListItem>Woman Fashion</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Room style={{ marginRight: '10px' }} /> 622 Dixie Path , South
            Tobinchester 98336
          </ContactItem>
          <ContactItem>
            <Phone style={{ marginRight: '10px' }} /> +1 234 56 78
          </ContactItem>
          <ContactItem>
            <MailOutline style={{ marginRight: '10px' }} /> y.kasper@protonmail.com
          </ContactItem>
          <Payment src='https://i.ibb.co/Qfvn4z6/payment.png' />
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Footer;
