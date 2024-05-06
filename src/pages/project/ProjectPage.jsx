import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { notification, Tabs } from "antd";
import { BugOutlined, ContainerOutlined, FieldTimeOutlined, MailOutlined } from "@ant-design/icons";
import { fetchProject } from "../../services/project-service";
import SideNavLayout from "../../layouts/SideNavLayout";
import ProjectHeader from "../../components/project/ProjectHeader";
import { useDispatch, useSelector } from "react-redux";
import { init, setFilter } from "../../redux/project-slice";
import { userProjectFilter } from "../../services/filters/project-filter";
import TaskList from "../../components/task/TaskList";
import DeveloperList from "../../components/developer/DeveloperList";
import { DEVELOPER, PROJECTS } from "../../data";
import { getDeveloper } from "../../services/auth-service";
import { initUser } from "../../redux/auth-slice";
import MarkdownComponent from "../../components/project/Markdown";


const Content = _ => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.id);
    const [notice, contextHolder] = notification.useNotification();
    const projectDescription = useSelector(state => state.project?.description);

    const initPoject = (projectId) => {
        const developer = getDeveloper().catch(e => console.log(e));
        fetchProject(projectId)
            .then(res => {
                let projectData = res.data?.data?.project;
                projectData = projectData || PROJECTS[0];
                developer
                    .then(res => {
                        let receivedDeveloper = res.data?.data?.developer;
                        receivedDeveloper = receivedDeveloper || DEVELOPER;
                        dispatch(initUser(receivedDeveloper));
                        const filter = userProjectFilter(receivedDeveloper.id, projectData);
                        dispatch(init(projectData));
                        dispatch(setFilter(filter));
                    }).catch(e => {
                        dispatch(initUser(DEVELOPER));
                        const filter = userProjectFilter(DEVELOPER.id, projectData);
                        dispatch(init(projectData));
                        dispatch(setFilter(filter));
                        console.log(e);
                    });
            })
            .catch(e => {
                console.error(e);
                let filter = userProjectFilter(userId, PROJECTS[0]);
                dispatch(initUser(DEVELOPER));
                dispatch(init({...PROJECTS[0], ...filter}));
                notice.warning({
                    message: "Showing Dummy Datas",
                    description: "Error fetching data from backend showing dummy datas.",
                    placement: 'topRight',
                });
            });
    }

    const tabItems = [
        {
            key: "1",
            label: "Description",
            children: <MarkdownComponent content={projectDescription} />,
            icon: <ContainerOutlined />
        },
        {
            key: "2",
            label: "Developers",
            children: <DeveloperList />,
            icon: <BugOutlined />
        },
        {
            key: "3",
            label: "Tasks",
            children: <TaskList kind={"project"} />,
            icon: <MailOutlined />
        },
        {
            key: "4",
            label: "Requests",
            children: <DeveloperList kind="requestedDevelopers" />,
            icon: <FieldTimeOutlined />
        },
    ];

    useEffect(() => {
        initPoject(id);
    }, [id]);

    return (
        <div>
            {contextHolder}
            <div className="course-header">
                <ProjectHeader />
            </div>
            <Tabs
                defaultActiveKey="1"
                items={tabItems}
            />
        </div>
    );
}

const ProjectPage = _ => {
    return (
        <SideNavLayout element={<Content />} />
    );
}

export default ProjectPage;