import { validationAPI } from "./axios-config"

export const validateUploadedFiles = batchId => {
    return validationAPI.get(`/process-batch/${batchId}`);
}

export const clearBatch = batchId => {
    return validationAPI.get(`/clearbatch/${batchId}`);
} 
