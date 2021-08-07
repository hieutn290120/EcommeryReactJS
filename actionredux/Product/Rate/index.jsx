import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    list: 0
}

const Rate = createSlice({
    name: 'Rate',
    initialState : initialValue,
    reducers: {
        AddCountRate: (state, action) => {
            state.list = action.payload;
            return state;
        }
    }
})

const {actions,reducer} = Rate;
export const {AddCountRate} = actions;
export default reducer