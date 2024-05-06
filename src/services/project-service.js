import api from "./axios-config";
import { JWT_TOKEN_KEY } from "./auth-service";

export const fetchProjects = _ => {
    const GET_ALL_PROJECT_QUERY = `query {
        projects {
            id
            tittle
            description
            icon
            status
            tasks {
                id
                tittle
                description
                comments
                status
                assignedTo
                projectId
                deadline
                updatedAt
                createdAt
            }
            requestedDevelopers {
                id
                profilePicUrl
                name
                username
                enabledM2F
                email
                githubProfile
                linkedInProfile
                authProvider
            }
            developers {
                id
                profilePicUrl
                name
                username
                enabledM2F
                email
                githubProfile
                linkedInProfile
                authProvider
            }
            createdBy {
                id
                profilePicUrl
                name
                username
                enabledM2F
                email
                githubProfile
                linkedInProfile
                authProvider
            }
            createdAt
        }
    }`;
    const authorization = localStorage.getItem(JWT_TOKEN_KEY);
    console.log("Backend call.")
    return api.post("/graphql", { query: GET_ALL_PROJECT_QUERY }, { headers: { Authorization: `Bearer ${authorization}` } });
};

export const fetchProject = id => {
    const GET_PROJECT_QUERY = `query {
        project(id: "${id}") {
            id
            tittle
            description
            icon
            status
            tasks {
                id
                tittle
                description
                comments
                status
                assignedTo
                projectId
                deadline
                updatedAt
                createdAt
            }
            requestedDevelopers {
                id
                profilePicUrl
                name
                username
                enabledM2F
                email
                githubProfile
                linkedInProfile
                authProvider
            }
            developers {
                id
                profilePicUrl
                name
                username
                enabledM2F
                email
                githubProfile
                linkedInProfile
                authProvider
            }
            createdBy {
                id
                profilePicUrl
                name
                username
                enabledM2F
                email
                githubProfile
                linkedInProfile
                authProvider
            }
            createdAt
        }
    }`;
    console.log("Backend call.")
    const authorization = localStorage.getItem(JWT_TOKEN_KEY);
    return api.post("/graphql", { query: GET_PROJECT_QUERY }, { headers: { Authorization: `Bearer ${authorization}` } });
}

export const toggleProject = (projectId, status) => {
    const authorization = localStorage.getItem(JWT_TOKEN_KEY);
    return api.get(`/project/${projectId}/${status}`, { headers: { Authorization: `Bearer ${authorization}` } });
}

export const requestJoinProject = (projectId, userId) => {
    const authorization = localStorage.getItem(JWT_TOKEN_KEY);
    return api.get(`/project/${projectId}/request/${userId}`, { headers: { Authorization: `Bearer ${authorization}` } });
}

export const acceptJoinRequest = (projectId, userId) => {
    const authorization = localStorage.getItem(JWT_TOKEN_KEY);
    return api.get(`/project/${projectId}/accept/${userId}`, { headers: { Authorization: `Bearer ${authorization}` } });
}

export const rejectJoinRequest = (projectId, userId) => {
    const authorization = localStorage.getItem(JWT_TOKEN_KEY);
    return api.get(`/project/${projectId}/reject/${userId}`, { headers: { Authorization: `Bearer ${authorization}` } });
}

export const createOrUpdateProject = projectData => {
    const authorization = localStorage.getItem(JWT_TOKEN_KEY);
    return api.post("/project", projectData, { headers: { Authorization: `Bearer ${authorization}` } });
}

export const batchUploadProject = projects => {
    const authorization = localStorage.getItem(JWT_TOKEN_KEY);
    projects = projects.map(project => {
        let data = {
            ...project, developers: project["developers"] + ""?.split("||")
        }
        if (!Array.isArray(data["developers"]))
            data["developers"] = [data["developers"]];
        return data;
    });
    return api.post("/project/save-many", projects, { headers: { Authorization: `Bearer ${authorization}` } });
}
