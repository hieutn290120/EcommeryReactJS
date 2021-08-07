import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list : []

}

const ProductSlice = createSlice({
    name: 'Product',
    initialState: initialState,
    reducers: {
      addListProductById : (state,action) =>  {
        state.list = action.payload
        return state;
      },
    },
})

const {actions, reducer} = ProductSlice;
export const {addListProductById} = actions;
export default reducer