import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isValid: !!localStorage.getItem('userInfo'),
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isValid = true;
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        signup: (state, action) => {
            state.isValid = false;
            state.userInfo = action.payload;
        },
        logout: (state) => {
            state.isValid = false;
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
    },
});

export const { login, logout, signup } = authSlice.actions;
export const store = configureStore({ reducer: { auth: authSlice.reducer } });