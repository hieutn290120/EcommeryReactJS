import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const QttListCartById = createSlice({
    name: 'Add_Photo',
    initialState: initialState,
    reducers: {
        Quantity: (state, action) => {
            state = action.payload;
            return state;
        },
        DownQuantity: (state, action) => {
            //Xoa so luong trong cart
            return state - 1;
        },
        UpQuantity: (state, action) => {
            //Tang so luong trong cart
            return state + 1;
        },
    },
})

const { actions, reducer } = QttListCartById
export const { Quantity,DownQuantity,UpQuantity } = actions
export default reducer