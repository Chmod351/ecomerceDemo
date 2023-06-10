import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { phones, schedule, social } from '../data';

const Container = styled.section`
  width: 100%;
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
  font-size: 1.5rem;
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
  text-decoration: underline;
  cursor: pointer;
  display: flex;
  text-align: center;
  align-items: center;
  color: ${({ theme }) => theme.hover};
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
              const { id, number } = phone;
              return <ListItem key={id}>{number}</ListItem>;
            })}
          </Items>
        </Center>
        <Right>
          <Title>Schedule</Title>
          <Items className='li-container'>
            {schedule.map((schedule) => {
              const { id, date, hour } = schedule;
              return (
                <ListItem key={id}>
                  {date} {hour}
                </ListItem>
              );
            })}
          </Items>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Footer;
