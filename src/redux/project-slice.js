import { createSlice } from "@reduxjs/toolkit";
import { PROJECTS } from "../data";

const projectSlice = createSlice({
    name: "project",
    initialState: PROJECTS[0],
    reducers: {
        init: (state, action) => {
            state.id = action.payload.id;
            state.tittle = action.payload.tittle;
            state.description = action.payload.description;
            state.status = action.payload.status;
            state.developers = action.payload.developers;
            state.tasks = action.payload.tasks;
            state.requestedDevelopers = action.payload.requestedDevelopers;
            state.createdBy = action.payload.createdBy;
            state.createdAt = action.payload.createdAt;
            state.isAdmin = action.payload.isAdmin;
            state.isDeveloper = action.payload.isDeveloper;
            state.hasRequested = action.payload.hasRequested;
        },
        projectStatus: (state, action) => {
            state.status = action.payload;
        },
        requestJoin: (state, action) => {
            state.hasRequested = action.payload;
        },
        setFilter: (state, action) => {
            state.isAdmin = action.payload.isAdmin;
            state.isDeveloper = action.payload.isDeveloper;
            state.hasRequested = action.payload.hasRequested;
        },
        setRequestedDeveloper: (state, actions) => {
            state.requestedDevelopers = actions.payload;
        },
        addDeveloper: (state, actions) => {
            state.developers.push(actions.payload);
        },
        destroyProject: (state) => {
            state = PROJECTS[0];
        },
        editProject: (state, action) => {
            const { tittle, description } = action.payload;
            state.tittle = tittle;
            state.description = description;
        },
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        addComment: (state, action) => {
            const taskToUpdate = state.tasks.find(item => item.id === action.payload.taskId);
            taskToUpdate?.comments.push(action.payload.comment);
        },
        togglePrrojectTaskStatus: (state, action) => {
            const taskToUpdate = state.tasks.find(item => item.id === action.payload.taskId);
            if (taskToUpdate) {
                taskToUpdate.status = action.payload.status;
            }
        }
    }
});

export const { init, projectStatus, requestJoin, setFilter, destroyProject, setRequestedDeveloper, addDeveloper, editProject, addTask, addComment, togglePrrojectTaskStatus } = projectSlice.actions;
export default projectSlice.reducer;
