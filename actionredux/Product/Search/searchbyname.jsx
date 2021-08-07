import { createSlice } from '@reduxjs/toolkit';

const initialValue = null;

const SearchProduct = createSlice({
    name: 'Search',
    initialState: initialValue,
    reducers: {
        searchproductbyname :  (state, action) => {
            state = action.payload
            return state;
        }
    }
})

const { actions, reducer } = SearchProduct
export const {searchproductbyname} = actions;
export default reducer