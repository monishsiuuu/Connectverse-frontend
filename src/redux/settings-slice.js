import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        loading: true,
    },
    reducers: {
        toggleLoading: (state) => {
            state.loading = !state.loading;
        }
    }
});

export const { toggleLoading } = settingsSlice.actions;
export default settingsSlice.reducer;
