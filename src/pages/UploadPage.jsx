import { useState, useEffect } from 'react';
import UploadBox from '../components/parser/UploadBox';
import SideNavLayout from "../layouts/SideNavLayout";
import { Button, message, Steps, theme, Popover, notification } from 'antd';
import RemarksBox from '../components/parser/ValidationBox';
import { batchUploadDevelopers, getUserId } from '../services/auth-service';
import { clearBatch, validateUploadedFiles } from '../services/validation-service';
import PreviewBox from '../components/parser/PreviewTable';
import { batchUploadProject } from '../services/project-service';
import { batchUploadTask } from '../services/task-service';

const customDot = (dot, { status, index }) => (
    <Popover
        content={
            <span>
                step {index} status: {status}
            </span>
        }
    >
        {dot}
    </Popover>
);

const UploadCompoent = _ => {

    const userId = getUserId();
    const { token } = theme.useToken();
    const [notice, contextHolder] = notification.useNotification();
    const [validations, setValidations] = useState([]);
    const [previewData, setPreviewData] = useState([]);
    const [processStatus, setProcessState] = useState("process");
    const [nextDisabled, toggleNext] = useState(false);
    const [current, setCurrent] = useState(0);

    const next = () => {
        if (current == 0) {
            setProcessState("error");
            validateUploadedFiles(userId)
                .then(res => {
                    const { isValid, data, errors } = res.data;
                    if (isValid) {
                        setPreviewData(data);
                        setCurrent(current + 2);
                    } else {
                        setValidations(errors);
                        toggleNext(!isValid);
                        setCurrent(current + 1);
                    }
                })
                .catch(e => console.log(e));
        } else if (current == 2) {
            setProcessState("process");
            console.log("called");
            const { developer, project, task } = previewData;

            var currentBatchLength = 1;
            let batchData = [];

            let developerIndex = 0;
            while (developerIndex < developer.length) {
                batchData.push(developer[developerIndex]);
                if (currentBatchLength == 10) {
                    batchUploadDevelopers(batchData)
                        .catch(e => {
                            notice.warning({
                                message: "Problem Upload",
                                description: e.message
                            });
                            console.log(e);
                        });
                    currentBatchLength = 1;
                    batchData = [];
                }
                if (developerIndex == developer.length - 1) {
                    batchUploadDevelopers(batchData)
                        .catch(e => {
                            notice.warning({
                                message: "Problem Upload",
                                description: e.message
                            });
                            console.log(e);
                        });
                    currentBatchLength = 1;
                    batchData = [];
                }
                developerIndex++;
                currentBatchLength++;
            }

            let projectIndex = 0;
            while (projectIndex < project.length) {
                batchData.push(project[projectIndex]);
                if (currentBatchLength == 10) {
                    batchUploadProject(batchData)
                        .catch(e => {
                            notice.warning({
                                message: "Problem Upload",
                                description: e.message
                            });
                            console.log(e);
                        });
                    currentBatchLength = 1;
                    batchData = [];
                }
                if (projectIndex == project.length - 1) {
                    batchUploadProject(batchData)
                        .catch(e => {
                            notice.warning({
                                message: "Problem Upload",
                                description: e.message
                            });
                            console.log(e);
                        });
                    currentBatchLength = 1;
                    batchData = [];
                }
                projectIndex++;
                currentBatchLength++;
            }

            let taskIndex = 0;
            while (taskIndex < task.length) {
                batchData.push(task[taskIndex]);
                if (currentBatchLength == 10) {
                    batchUploadTask(batchData)
                        .catch(e => {
                            notice.warning({
                                message: "Problem Upload",
                                description: e.message
                            });
                            console.log(e);
                        });
                    currentBatchLength = 1;
                    batchData = [];
                }
                if (taskIndex == task.length - 1) {
                    // save remaining developers
                    batchUploadTask(batchData)
                        .catch(e => {
                            notice.warning({
                                message: "Problem Upload",
                                description: e.message
                            });
                            console.log(e);
                        });
                    currentBatchLength = 1;
                    batchData = [];
                }
                taskIndex++;
                currentBatchLength++;
            }

            setCurrent(current + 1);
        } else {
            setCurrent(current + 1);
        }
    };
    const prev = () => {
        console.log(current)
        if (current == 2)
            setCurrent(current - 2);
        else
            setCurrent(current - 1);
    };
    const items = [
        {
            title: 'Upload',
            content: <UploadBox actionURL={"http://127.0.0.1:8000/uploadfile/" + userId} />,
            description: "Kindly Select 3 files"
        },
        {
            title: 'Validations',
            content: <RemarksBox validations={validations} />,
            description: "Error Handling"
        },
        {
            title: 'Preview',
            description: "Feel free to change at this point",
            content: <PreviewBox data={previewData} />,
        },
        {
            title: 'Finish',
            description: "Completed!",
            content: 'The Datas are saved to Database Successfully.',
        },
    ]

    const contentStyle = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    useEffect(() => {
        if (current == 0)
            toggleNext(false);
        if (current == 2)
            setProcessState("process");
    }, [current]);

    return (
        <div>
            {contextHolder}
            <Steps
                current={current}
                items={items}
                status={processStatus}
                progressDot={customDot}
            />
            <div style={contentStyle}>{items[current].content}</div>
            <div>
                {current < items.length - 1 && (
                    <Button
                        disabled={nextDisabled}
                        type="primary"
                        onClick={() => next()}
                    >
                        Next
                    </Button>
                )}
                {current === items.length - 1 && (
                    <Button
                        type="primary"
                        onClick={() => {
                            message.success('Processing complete!')
                            clearBatch(userId)
                                .then(res => {
                                    notice.info({
                                        message: "Batch Cleared",
                                    });
                                })
                                .catch(e => {
                                    console.log(e);
                                    notice.warning({
                                        message: "Problem clearing batch",
                                        description: e.message,
                                    });
                                });
                        }}
                    >
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button
                        style={{
                            margin: '5% 8px',
                        }}
                        onClick={() => prev()}
                    >
                        Previous
                    </Button>
                )}
            </div>
        </div>
    );
}

const UploadPage = _ => {
    return (
        <div>
            <SideNavLayout element={<UploadCompoent />} breadcrumb={[{ title: "Upload" }, { title: "File" }]} />
        </div>
    );
};

export default UploadPage;
