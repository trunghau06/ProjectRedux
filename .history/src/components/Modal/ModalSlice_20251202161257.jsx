import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
    name: "modal",
    
    initialState: {
        isOpen     : false,
        isEditMode : false,
        editingUser: null
    },
    
    reducers: {
        openAddModal: (state) => {
            state.isOpen     = true;
            state.isEditMode  = false;
            state.editingUser = null;
        },
        
        openEditModal: (state, action) => {
            state.isOpen = true;
            state.isEditMode = true;
            state.editingUser = action.payload; 
        },
        
        closeModal: (state) => {
            state.isOpen = false;
            state.isEditMode = false;
            state.editingUser = null;
        }
    }
});

export const { openAddModal, openEditModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;