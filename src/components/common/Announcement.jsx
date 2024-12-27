import React from 'react';
import styled from 'styled-components';
import { mobile, pc } from '../../responsive';

const Container = styled.div`
	height: 2rem;
	background-color: black;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: bold;
	${pc({ maxWidth: '100vw' })}
	${mobile({ marginTop: '6rem' })}
`;

const Title = styled.h1`
	color: white;
	font-size: 1rem;
`;
const Announcement = React.memo(({ text }) => {
	return (
		<Container role="banner">
			<Title
				role="complementary"
				title="Free shipping on orders over $50!"
				aria-label="Free shipping on orders over $50!"
			>
				{text}
			</Title>
		</Container>
	);
});

export default Announcement;
