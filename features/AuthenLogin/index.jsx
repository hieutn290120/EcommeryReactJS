import React from 'react'

import { createSlice } from '@reduxjs/toolkit'


const initialState = null;

const AuthenLogin = createSlice({
    name: 'Authen',
    initialState: initialState,
    reducers: {
        authLogin: (state, action) => {

            state = action.payload;

            const now = new Date().getTime();
            const setupTime = localStorage.getItem('setupTime');

            if (setupTime == null && state) {
                localStorage.setItem('setupTime', now);
            }
            
            return state;
        },
        authLogout: (state, action) => {
            state = "";
            localStorage.clear();
            return state;
        }
    }
})

const { actions, reducer } = AuthenLogin
export const { authLogin, authLogout } = actions
export default reducer