import React from 'react';
import styled from 'styled-components';
import { mobile } from '../../responsive';
import { contact, e, social } from '../../utils/data/footerData';
import { Link } from 'react-router-dom';
import Announcement from './Announcement';

const Container = styled.footer`
	background-color: ${({ theme }) => theme.bgLighter};
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
	border-radius: 10%;
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
	display: flex;
	align-items: center;
`;

const Footer = React.memo(() => {
	return (
		<Container role="contentinfo" aria-label="footer">
			<Wrapper role="complementary">
				<Left role="table">
					<Logo aria-label="Lazy logo" role="banner" title="Lazy Trendy">
						Lazy Trendy
					</Logo>
					<Desc
						aria-label="about Lazy"
						role="complementary"
						title="About Lazy Trendy"
					>
						Nuestra colección abarcan desde piezas atrevidas hasta clásicos
						reinventados, ideales para crear un guardarropa versátil. Cada
						prenda es confeccionada con amor y atención al detalle. En nuestra
						tienda, celebramos la diversidad y la autoexpresión a través de
						diseños únicos y contemporáneos que resaltan tu individualidad{' '}
					</Desc>
					<SocialContainer role="list">
						{/* seccion de redes sociales */}
						{social.map((i) => {
							const { id, color, icon, link, platform } = i;
							return (
								<A
									href={link}
									key={id}
									target="_blank"
									title={link}
									role="link"
									aria-label={link}
								>
									{platform !== 'Instagram' ? (
										<img
											src={icon}
											alt={link}
											style={{
												width: '2.5rem',
												height: '2.5rem',
												objectFit: 'contain',
												marginRight: '1.25rem',
											}}
										/>
									) : (
										<SocialIcon color={color} role="img">
											{icon}
										</SocialIcon>
									)}
								</A>
							);
						})}
					</SocialContainer>
				</Left>
				<Center role="table">
					{/* seccion de navegacion */}
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
				{/* seccion de contacto */}
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
										title={text}
										role="link"
										aria-label={text}
									>
										{icon}
										{text}
									</A>
								</ContactItem>
							);
						})}
					</>
					{/* seccion de pagos */}
					<Payment
						src="https://i.ibb.co/Qfvn4z6/payment.png"
						alt="payment method acepted, visa, mastercard, paypal, mercado pago"
						title="payment method acepted, visa, mastercard, paypal, mercado pago"
						aria-label="payment method acepted, visa, mastercard, paypal, mercado pago"
					/>
				</Right>
			</Wrapper>
			<Announcement text="holi" />
		</Container>
	);
});

export default Footer;
