import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { phones, social } from '../data';

const Container = styled.section`
  width: 100%;
  padding: 1.2rem 0rem;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  ${mobile({ height: '3.125rem' })}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 1.25rem;
  font-size: 1.5rem;
  background-color: ${({ theme }) => theme.bgLighter};
  ${mobile({
    padding: '0.625rem 0rem',
    fontSize: '1.3rem',
    flexDirection: 'column',
  })}
`;
const Title = styled.h4`
  display: none;
  ${mobile({ fontSize: '1.5rem', display: 'flex', justifyContent: 'center' })}
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mobile({ flexBasis: '100%', justifyContent: 'center', display: 'flex' })}
`;

const Center = styled.div`
  text-align: center;
  ${mobile({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  })}
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flexBasis: '100%', justifyContent: 'center' })}
`;

const Icon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.hover};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  color: ${({ theme }) => theme.bg};
  &:hover {
    transform: scale(1.1);
  }
`;

const Items = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  margin: 0.625rem;
`;

const Links = styled.a`
  margin: 0.3125rem 0rem;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  text-align: center;
  align-items: center;
  color: ${({ theme }) => theme.hover};
`;

const Frame = styled.iframe`
  width: 30rem;
  height: 14rem;
  border: 1px solid black;
  ${mobile({ justifyContent: 'center', width: '100%' })}
`;

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>Social Media</Title>
          <Items className='li-container'>
            {social.map((socials) => {
              const { id, link, platform, icon } = socials;
              return (
                <ListItem key={id}>
                  <Links
                    href={link}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Icon alt={platform}>{icon}</Icon>
                    {platform}
                  </Links>
                </ListItem>
              );
            })}
          </Items>
        </Left>
        <Center>
          <Title>Phones</Title>
          <Items className='li-container'>
            {phones.map((phone) => {
              const { id, number, icon } = phone;
              return (
                <ListItem key={id}>
                  <Links>
                    <Icon alt={number}>{icon}</Icon>
                    {number}
                  </Links>
                </ListItem>
              );
            })}
          </Items>
        </Center>
        <Title>Location</Title>
        <Right>
          <Frame src='https://www.openstreetmap.org/export/embed.html?bbox=-0.1054215431213379%2C51.497990292603085%2C-0.09351253509521486%2C51.502004286184594&amp;layer=mapnik&amp;marker=51.499997333585014%2C-0.09946703910827637'></Frame>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Footer;
