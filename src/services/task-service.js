import { JWT_TOKEN_KEY } from "./auth-service";
import api from "./axios-config";


export const assignTask = task => {
    console.log("backend call assignTask", `/task`);
    const authorization = localStorage.getItem(JWT_TOKEN_KEY);
    return api.post("/task", task, { headers: { Authorization: `Bearer ${authorization}` } });
}

export const toggleTaskStatus = (taskId, status) => {
    console.log("backend call toggleTaskStatus", `/task/${taskId}/status/${status}`);
    const authorization = localStorage.getItem(JWT_TOKEN_KEY);
    return api.get(`/task/${taskId}/status/${status}`, { headers: { Authorization: `Bearer ${authorization}` } });
}

export const commentTask = (taskId, comment) => {
    const authorization = localStorage.getItem(JWT_TOKEN_KEY);
    return api.get(`/task/${taskId}/comment/${comment}`, { headers: { Authorization: `Bearer ${authorization}` } });
}

export const batchUploadTask = tasks => {
    const authorization = localStorage.getItem(JWT_TOKEN_KEY);
    tasks = tasks.map(task => {
        let data = {
            ...task, comments: task["comments"]?.split("||").map(comment => comment.trim())
        }
        if (!Array.isArray(data["comments"]))
            data["comments"] = [data["comments"]];
        return data;
    });
    console.log("taks", JSON.stringify(tasks))
    return api.post(`/task/save-many`, tasks, { headers: { Authorization: `Bearer ${authorization}` } });
}
