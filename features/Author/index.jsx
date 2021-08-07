import { createSlice } from "@reduxjs/toolkit";
import React from 'react'


const initialValue = null;

const Author = createSlice({

    name: "Autho",
    initialState: initialValue,
    reducers: {
        authorUser: (state, action) => {
            state = action.payload;
            return state;
        },
        authorLogout: (state, action) => {
            localStorage.clear();
            state = "";
            return state;
        },
    }
})


const { actions, reducer } = Author
export const { authorUser, authorLogout } = actions
export default reducer