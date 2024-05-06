import { createSlice } from "@reduxjs/toolkit";
import { DEVELOPER } from "../data";
import { JWT_TOKEN_KEY, verifyJwt, logout } from "../services/auth-service";


const token = localStorage.getItem(JWT_TOKEN_KEY);
const authenticated = verifyJwt(token);

const initialState = {
    ...DEVELOPER,
    authenticated,
    token,
    enabledWeb3: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        initUser: (state, action) => {
            state.id = action.payload.id;
            state.profilePicUrl = action.payload.profilePicUrl;
            state.tasks = action.payload.tasks;
            state.projects = action.payload.projects;
            state.requestedProjects = action.payload.requestedProjects;
            state.createdProjects = action.payload.createdProjects;
        },
        setToken: (state, action) => {
            const authenticated = verifyJwt(action.payload);
            state.token = action.payload;
            state.authenticated = authenticated;
        },
        toggleTask: (state, action) => {
            const { taskId, status } = action.payload;
            const taskToUpdate = state.tasks.find(item => item.id === taskId);
            if (taskToUpdate) {
                taskToUpdate.status = status;
            }
        },
        reset: (state) => {
            state.id = "";
            state.token = "";
            state.authenticated = false;
            logout();
            state = DEVELOPER;
        },
        createProject: (state, action) => {
            state.createdProjects.push(action.payload);
        },
        toggleWeb3: (state) => {
            state.enabledWeb3 = !state.enabledWeb3;
        },
        addRequestProject: (state, action) => {
            state.requestedProjects.push(action.payload)
        }
    },
});

export const { initUser, reset, setToken, toggleTask, createProject, toggleWeb3, addRequestProject } = authSlice.actions;
export default authSlice.reducer;
