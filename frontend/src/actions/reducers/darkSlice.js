import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isDarkMode: true
};

const darkSlice = createSlice({
    name: 'dark',
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode;
        },
    },
});

export const { toggleDarkMode } = darkSlice.actions;
export default darkSlice.reducer;
