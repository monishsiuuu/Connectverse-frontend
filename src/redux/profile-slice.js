import { createSlice } from "@reduxjs/toolkit";
import { DEVELOPER } from "../data";

const initialState = {
    ...DEVELOPER,
    showProfile: false,
    backlogTaskCount: 0,
    backlogProjectCount: 0,
    requestedProjectCount: 0,
    skills: [],
    description: "C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc.",
    place: "Chennai",
    links: [],
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.linkedInProfile = action.payload.linkedInProfile;
            state.githubProfile = action.payload.githubProfile;
            state.projects = action.payload.projects;
            state.createdProjects = action.payload.createdProjects;
            state.backlogTaskCount = action.payload.tasks?.filter(task => task.status == true).length;
            state.backlogProjectCount = action.payload.projects?.filter(project => project.status == true).length;
            state.requestedProjectCount = action.payload.requestedProjects?.length;

            if (action.payload.skills) {
                state.skills = action.payload.skills.join(", ");
                state.projects = [{ tittle: "No Acccount YET" }];
                state.createdProjects = [{ tittle: "No Acccount YET" }];
                state.name = action.payload.firstName + " " + action.payload.lastName;
                state.place = action.payload.place;
                state.backlogTaskCount = 0;
                state.backlogProjectCount = 0;
                state.requestedProjectCount = 0;
                state.links = action.payload.links || ["Has No Social Profiles Mentioned"];
            }

            state.showProfile = true;
        },
        toggleProfile: (state) => {
            state.showProfile = false;
        },
    }
});

export const { setProfile, toggleProfile } = profileSlice.actions;
export default profileSlice.reducer;
