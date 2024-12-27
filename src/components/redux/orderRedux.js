import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	deliveryMode: '',
	firstName: '',
	lastName: '',
	shippingAddress1: '',
	floor: '',
	zip: '',
	city: '',
	email: '',
	country: '',
	state: '',
	phoneNumber: '',
	commentaries: '',
	userIdCard: '',
};
const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setUserData: (state, action) => {
			state.deliveryMode = action.payload.deliveryMode;
			state.firstName = action.payload.firstName;
			state.lastName = action.payload.lastName;
			state.shippingAddress1 = action.payload.shippingAddress1;
			state.floor = action.payload.floor;
			state.zip = action.payload.zip;
			state.city = action.payload.city;
			state.email = action.payload.email;
			state.country = action.payload.country;
			state.state = action.payload.state;
			state.phoneNumber = action.payload.phoneNumber;
			state.commentaries = action.payload.commentaries;
			state.userIdCard = action.payload.userIdCard;
		},
		clearOrderInfo: (state) => {
			state.deliveryMode = '';
			state.firstName = '';
			state.lastName = '';
			state.shippingAddress1 = '';
			state.floor = '';
			state.zip = '';
			state.city = '';
			state.email = '';
			state.country = '';
			state.state = '';
			state.phoneNumber = '';
			state.commentaries = '';
			state.userIdCard = '';
		},
	},
});

export const { setUserData, clearOrderInfo } = orderSlice.actions;
export default orderSlice.reducer;
