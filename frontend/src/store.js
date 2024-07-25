import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isValid: localStorage.getItem('userInfo')? true : false,
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    webToken: JSON.parse(localStorage.getItem('webToken')) || null,
};

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isValid = true;
            state.userInfo = action.payload.user;
            state.webToken = action.payload.webToken;
            //console.log("Payload --- "+action.payload)
            localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
            localStorage.setItem('webToken', JSON.stringify(action.payload.webToken));
        },
        signup: (state, action) => {
            state.isValid = false;
            state.userInfo = action.payload.user;
        },
        logout: (state) => {
            state.isValid = false;
            state.userInfo = null;
            state.webToken = null;
            localStorage.removeItem('userInfo');
            localStorage.removeItem('webToken');
        },
    },
});

export const { login, logout, signup } = userAuthSlice.actions;
export const store = configureStore({ reducer: { auth: userAuthSlice.reducer } });  