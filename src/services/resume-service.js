import { resumeAPI } from "./axios-config";


export const filterUsers = (key, value) => {
    let string = "";
    if(key.length < 1 || value == []) {
        key = "all";
        string = "all";
    } else {
        value.map(val => {
            string += "," + val;
        })
        string = string.substring(1, string.length);
    }
    key = string ? key : "all";
    string = string || "all";
    return resumeAPI.get(`/user/filter/${key}/${string}`);
}

export const clearAllresumes = _ => {
    return resumeAPI.delete("/user");
}
