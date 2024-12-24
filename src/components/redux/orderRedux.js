import {createSlice} from '@reduxjs/toolkit';

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
      // Validamos que action.payload sea un objeto con las propiedades esperadas
      Object.assign(state, action.payload);
    },
    setDeliveryMode: (state, action) => {
      state.deliveryMode = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
     state.lastName = action.payload;
    },
    setShippingAddress1: (state, action) => {
      state.shippingAddress1 = action.payload;
    },
    setFloor: (state, action) => {
      state.floor = action.payload;
    },
    setZip: (state, action) => {
      state.zip = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setCommentaries: (state, action) => {
      state.commentaries = action.payload;
    },
    setUserIdCard: (state, action) => {
      state.userIdCard = action.payload;
    },

  },
});

export const { setUserData, setDeliveryMode, setFirstName } = orderSlice.actions;
export default orderSlice.reducer;
