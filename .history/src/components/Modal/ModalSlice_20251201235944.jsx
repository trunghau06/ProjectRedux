import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
    name: "modal",
    
    initialState: {
        isOpen: false
    },
    
    reducers: {
        openAddModal: (state) => {
            state.isOpen = true;
        },
        
        closeModal: (state) => {
            state.isOpen = false;
        }
    }
});

export const { openAddModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;