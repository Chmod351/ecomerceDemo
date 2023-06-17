import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { phones, social, schedule } from '../data/footerData';
import Announcement from './Announcement';

const Container = styled.footer`
  width: 100%;
  padding: 1.2rem 0rem;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  ${mobile({ height: '3.125rem' })}
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 1.25rem;
  font-size: 1.5rem;
  background-color: ${({ theme }) => theme.bg};
  ${mobile({
    padding: '0.625rem 0rem',
    fontSize: '1.3rem',
    flexDirection: 'column',
  })}
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  ${mobile({ flexBasis: '100%', justifyContent: 'center', display: 'flex' })}
`;

const Center = styled.div`
  ${mobile({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  })}
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  ${mobile({ flexBasis: '100%', justifyContent: 'center' })}
`;

const Icon = styled.svg`
  display: flex;
  width: 1.3rem;
  height: 1.3rem;
  align-items: center;
  justify-content: center;
  margin: auto 1rem;
  color: ${({ theme }) => theme.text};
`;
const IconSocial = styled.svg`
  width: 2.3rem;
  height: 2.3rem;
  margin: auto 1.3rem auto -1.3rem;
  color: ${({ theme }) => theme.text};
`;
const Items = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: auto;
`;
const ItemsSocial = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: auto;
`;

const ListItem = styled.li`
  margin: 0.4rem;
`;

const Links = styled.a`
  margin: 0.3125rem 0rem;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  font-size: 0.8rem;
  align-items: center;
  color: ${({ theme }) => theme.hover};
`;

const Frame = styled.iframe`
  width: 30rem;
  height: 15rem;
  border: 1px solid black;
  ${mobile({ justifyContent: 'center', width: '100vw', height: 'auto' })}
`;

const Footer = () => {
  return (
    <Container id="Footer">
      <Wrapper>
        <Left>
          <ItemsSocial>
            {social.map((socials) => {
              const { id, link, platform, icon } = socials;
              return (
                <ListItem key={id}>
                  <Links href={link} target="_blank" alt={platform}>
                    <IconSocial>{icon}</IconSocial>
                  </Links>
                </ListItem>
              );
            })}
          </ItemsSocial>
          <Items>
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
        </Left>
        <Center>
          <Items>
            {schedule.map((h) => {
              const { id, Date, hour } = h;
              return (
                <ListItem key={id}>
                  <Links>
                    {Date} {hour}
                  </Links>
                </ListItem>
              );
            })}
          </Items>
        </Center>
        <Right>
          <Frame
            src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1054215431213379%2C51.497990292603085%2C-0.09351253509521486%2C51.502004286184594&amp;layer=mapnik&amp;marker=51.499997333585014%2C-0.09946703910827637"
            blank="https://www.openstreetmap.org/?mlat=-34.58804&mlon=-58.52441#map=19/-34.58804/-58.52441"
          ></Frame>
        </Right>
      </Wrapper>
      <Announcement
        text={'©2022 As Team All Rights Reserved.'}
        link={'https://yamil-tauil.onrender.com/'}
      />
    </Container>
  );
};

export default Footer;
