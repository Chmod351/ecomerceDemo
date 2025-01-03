import { Search, ShoppingCart, Payment } from '@material-ui/icons';
import styled from 'styled-components';
import { mobile } from '../../responsive';

const ButtonElement = styled.button`
	display: flex;
	align-items: center;
	text-align: center;
	padding: 10px;
	font-size: 1.2rem;
	color: ${({ theme }) => theme.bg};
	background-color: ${({ disabled, theme }) =>
		disabled ? 'gray' : theme.text};
	border: none;
	font-weight: bold;
	border-radius: 5px;
	border: none;
	cursor: pointer;
	transition: background-color 0.3s ease;
	&:hover {
		background-color: ${({ theme }) => theme.hover};
	}
	&:focus {
		background-color: ${({ theme }) => theme.bg};
		border: 1px solid ${({ theme }) => theme.hover};
		color: ${({ theme }) => theme.text};
	}
	${mobile({ fontSize: '0.8rem' })}
`;

const ButtonElementSoft = styled.button`
	display: flex;
	align-items: center;
	text-align: center;
	padding: 10px;
	font-size: 1.2rem;
	color: grey;
	background-color: none;
	border-radius: 5px;
	border: none;
	font-weight: regular;
	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
	transition: background-color 0.3s ease;
	&:hover {
		background-color: none;
	}
	&:focus {
		background-color: red;
		border: 1px solid ${({ theme }) => theme.hover};
		color: ${({ theme }) => theme.text};
	}
	${mobile({ fontSize: '0.8rem' })}
`;

const Button = ({ text, onClick, onKeyUp, tabIndex, disabled = false }) => {
	const getStatusIcon = (status) => {
		if (status == 'CHECKOUT NOW' || 'MERCADO PAGO' || 'TRANSFERENCIA') {
			return <Payment />;
		} else if (status == 'CONTINUE SHOPPING') {
			return <ShoppingCart />;
		} else if (status == 'SHOP NOW') {
			return <Search />;
		} else if (status == 'LOGIN NOW') {
			return null;
		} else {
			return null;
		}
	};
	if (text === 'CONTINUE SHOPPING') {
		return (
			<ButtonElementSoft
				status={text}
				disabled={disabled}
				tabIndex={tabIndex}
				onClick={onClick}
				onKeyUp={onKeyUp}
				role="button"
				title={text}
				aria-label={text}
			>
				{getStatusIcon(`${text}`)} {text}
			</ButtonElementSoft>
		);
	} else {
		return (
			<ButtonElement
				status={text}
				tabIndex={tabIndex}
				onClick={onClick}
				onKeyUp={onKeyUp}
				role="button"
				title={text}
				disabled={disabled}
				aria-label={text}
			>
				{getStatusIcon(`${text}`)} {text}
			</ButtonElement>
		);
	}
};

export default Button;
