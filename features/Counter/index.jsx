import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: []
}
const ProductPhotoDetailSlice = createSlice({
    name: 'Add_Photo',
    initialState: initialState,
    reducers: {
        addPhoto: (state, action) => {
            state.list.push(action.payload);
        },
        removePhoto: (state, action) => {
            state.list = state.list.filter(photo => photo.id != action.payload)
            return state;
        },
        editPhoto: (state, action) => {
            const newList = action.payload;
            // output 1 số trả về >= 0 nếu tìm thấy trong mảng
            const result = state.list.findIndex(photo => parseInt(photo.id) === parseInt(newList.id));

            if (result >= 0) {
                state.list[result] = newList
            }
        }
    },
})

const { actions, reducer, cart } = ProductPhotoDetailSlice
export const { addPhoto, removePhoto, editPhoto } = actions
export default reducer