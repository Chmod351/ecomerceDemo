import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { social } from '../data';

const Wrapper = styled.div`
  padding: 0rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: '0.625rem 0rem' })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: 'center' })}
`;

const Container = styled.div`
  width: 100%;
  height: 60px;
  ${mobile({ height: '3.125rem' })}
`;

const Icon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.hover};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.625rem;
  transition: all 0.5s ease;
  color: ${({ theme }) => theme.bg};
  &:hover {
    transform: scale(1.1);
  }
`;
const WrapperIcons = styled.div`
  display: flex;
  flex-direction: column;
`;
const Items = styled.ul`
`;
const List = styled.li`
`;

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Items className='li-container'>
            {social.map((socials) => {
              const { id, link, plataform, icon } = socials;
              return (
                <List
                  className='social-media-links'
                  key={id}
                >
                  <a
                    href={link}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Icon>{icon}</Icon> {plataform}
                  </a>
                </List>
              );
            })}
          </Items>
        </Left>
        <Center>
          <WrapperIcons>schedule</WrapperIcons>
        </Center>
        <Right></Right>
      </Wrapper>
      <p>2023 - Todos los derechos reservados.</p>
    </Container>
  );
};
export default Footer;
