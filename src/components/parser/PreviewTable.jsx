import { Table, Tabs } from 'antd';


const DeveloperTable = ({ developerData }) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'User Name',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
    ];
    developerData.map((data, index) => ({ ...data, key: index }));
    return <Table columns={columns} pagination={{ pageSize: 2, }} dataSource={developerData} />;
}

const ProjectTable = ({ projectData }) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'tittle',
            key: 'tittle',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Developers',
            dataIndex: 'developers',
            key: 'developers',
        },
        {
            title: 'Project Owner',
            dataIndex: 'createdby',
            key: 'createdby',
        },
    ];
    projectData.map((data, index) => ({ ...data, key: index }));
    return <Table columns={columns} pagination={{ pageSize: 2, }} dataSource={projectData} />;
}

const TaskTable = ({ taskData }) => {
    const columns = [
        {
            title: 'Title',
            dataIndex: 'tittle',
            key: 'tittle',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Project',
            dataIndex: 'projectId',
            key: 'projectId',
        },
        {
            title: 'Assigned To',
            dataIndex: 'assignedTo',
            key: 'assignedTo',
        },
        {
            title: 'Deadline',
            dataIndex: 'deadline',
            key: 'deadline',
        },
        {
            title: 'Comments',
            dataIndex: 'comments',
            key: 'comments',
        },
    ];
    taskData.map((data, index) => ({ ...data, key: index }));
    return <Table expandable={true} pagination={{ pageSize: 1, }} columns={columns} dataSource={taskData} />;
}

const PreviewBox = ({ data }) => {

    const items = [
        {
            key: '1',
            label: 'Developer',
            children: <DeveloperTable developerData={data["developer"]} />,
        },
        {
            key: '2',
            label: 'Project',
            children: <ProjectTable projectData={data["project"]} />,
        },
        {
            key: '3',
            label: 'Task',
            children: <TaskTable taskData={data["task"]} />,
        },
    ];
    return (
        <div>
            <Tabs defaultActiveKey="1" items={items} style={{ margin: "1.5%" }} />
        </div>
    );
}

export default PreviewBox;
