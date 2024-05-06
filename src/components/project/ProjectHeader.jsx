import { useState } from 'react';
import { Button, Descriptions, Modal, DatePicker, Select, Space, Input, notification } from 'antd';
import { Link } from 'react-router-dom';
import { PageHeader } from '@ant-design/pro-layout';
import { TrophyFilled, ClockCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { toggleProject, requestJoinProject } from '../../services/project-service';
import { addTask, projectStatus, requestJoin } from '../../redux/project-slice';
import { getProfile } from '../../services/auth-service';
import { setProfile } from '../../redux/profile-slice';
import { DEVELOPER } from '../../data';
import { assignTask } from '../../services/task-service';
import { addRequestProject } from '../../redux/auth-slice';
const { TextArea } = Input;


const ProjectHeader = () => {

    const dispatch = useDispatch();
    const [notice, contextHolder] = notification.useNotification();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userId = useSelector(state => state.auth.id);
    const project = useSelector(state => state.project);
    const { id, status, tittle, developers, createdAt, createdBy, tasks, requestedDevelopers, hasRequested, isAdmin, isDeveloper } = project;

    const INITIAL_NEW_TASK = {
        tittle: "",
        description: "",
        deadline: "",
        projectId: id,
        assignedTo: "",
        comments: [],
    }
    const [newTask, setNewtask] = useState(INITIAL_NEW_TASK);

    const openProfile = id => {
        getProfile(id)
            .then(res => {
                dispatch(setProfile(res.data?.data?.developer))
            })
            .catch(e => {
                console.log(e);
                dispatch(setProfile(DEVELOPER))
            });
    }

    const handleToggleProject = _ => {
        isAdmin &&
            toggleProject(id, !status).then(_ => dispatch(projectStatus(!status))).catch(e => dispatch(projectStatus(!status)));
    }

    const handleRequestJoin = _ => {
        requestJoinProject(id, userId).then(res => {
            dispatch(requestJoin(!hasRequested));
        }).catch(e => console.log(e));
        dispatch(addRequestProject(project));
    }

    const showModal = _ => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        console.log({ ...newTask, projectId: id });

        assignTask({ ...newTask, projectId: id })
            .then(res => {
                try {
                    if(res.status === 200) {
                        dispatch(addTask(res.data));
                        notice.success({
                            message: `Task ${newTask["tittle"]} assigned to developer.`
                        });
                    }
                } catch (e) {
                    console.log(e);
                    notice.warning({
                        message: e.message,
                    });
                }
            })
            .catch(e => {
                console.log(e);
                dispatch(addTask(newTask));
                notice.warning({
                    message: e.message,
                });
            });
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <PageHeader
            className="site-page-header-responsive"
            onBack={() => window.history.back()}
            title={tittle}
            extra={[
                <Button className='task-button' hidden={!isAdmin || !status} onClick={showModal}>
                    <svg
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path
                            d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                            fill="currentColor"
                        ></path>
                    </svg>
                    <span>Add Task</span>
                </Button>,
                <Button disabled={hasRequested} onClick={() => { handleRequestJoin(); }} hidden={isAdmin || isDeveloper || !status} key="1" style={{ backgroundColor: "grey", color: "white" }} >
                    <ClockCircleOutlined /> {hasRequested && status ? "Already Requested" : "Request Join"}
                </Button>,
                <Button key="3" onClick={() => { handleToggleProject() }} style={{ backgroundColor: "green", color: "white" }} >
                    <TrophyFilled /> {status ? "Active" : "In-Active"}
                </Button>,
            ]}
        >
            {contextHolder}
            <Descriptions size="default" column={2}>
                <Descriptions.Item label="Developers Working">
                    <Link>{developers.length}</Link>
                </Descriptions.Item>
                <Descriptions.Item label="Developers Requested">
                    <Link>{requestedDevelopers.length}</Link>
                </Descriptions.Item>
                <Descriptions.Item label="Tasks Count">
                    <Link>{tasks.length}</Link>
                </Descriptions.Item>
                <Descriptions.Item label="Start Date">
                    <Link>{createdAt ? createdAt.split("T")[0] : "10 Days ago"}</Link>
                </Descriptions.Item>
                <Descriptions.Item label="Project Owner">
                    <Link onClick={() => { openProfile(createdBy["id"]) }}>{createdBy?.name}</Link>
                </Descriptions.Item>
                <Descriptions.Item label="Owner Profile">
                    <Link target="_blank" to={createdBy?.linkedInProfile}>Linked IN</Link>
                </Descriptions.Item>
            </Descriptions>
            <Modal title="Task" okText="Assign" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Space direction="vertical" align='start'>
                    <Input placeholder="Title" value={newTask.tittle} onChange={(e) => { setNewtask(prev => ({ ...prev, tittle: e.target.value })) }} />
                    <TextArea
                        value={newTask.description}
                        onChange={(e) => { setNewtask(prev => ({ ...prev, description: e.target.value })) }}
                        placeholder="Description"
                        autoSize={{
                            minRows: 3,
                            maxRows: 5,
                        }}
                    />
                    <DatePicker onChange={(date, dateString) => { setNewtask(prev => ({ ...prev, deadline: dateString })) }} />
                    <Select
                        showSearch
                        style={{
                            width: 200,
                        }}
                        placeholder="Assign To"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        value={newTask.assignedTo}
                        onChange={(e) => { setNewtask(prev => ({ ...prev, assignedTo: e })) }}
                        options={developers.map(developer => ({ label: developer["name"], value: developer["id"] }))}
                    />
                </Space>
            </Modal>
        </PageHeader>
    );

}

export default ProjectHeader;
