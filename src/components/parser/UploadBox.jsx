import { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;


const UploadBox = ({ actionURL }) => {
    const props = {
        name: "files",
        multiple: true,
        action: actionURL,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                for (const file of info.fileList) {
                    const extension = file.name.split(".")[1]
                    if(extension != "csv" && extension != "xlxs" && extension != "xls") {
                        message.error(`${file.name} file extension must be [xlxs, csv, xls]`);
                    }
                }
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                banned files.
            </p>
        </Dragger>
    );
}

export default UploadBox;
