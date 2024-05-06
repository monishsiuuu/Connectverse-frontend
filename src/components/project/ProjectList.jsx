import { useState, useEffect, createElement } from "react";
import { Avatar, List, Space } from 'antd';
import { useSelector } from "react-redux";
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { PROJECTS } from "../../data";
import { fetchProjects } from "../../services/project-service";
import { Link } from "react-router-dom";

const ProjectList = ({ kind = "all" }) => {

    const [projects, setProjects] = useState(PROJECTS);
    const projectsFromState = useSelector(state => state.auth[kind]);

    const initProjects = _ => {
        if (kind === "all") {
            fetchProjects()
                .then(res => {
                    console.log(res)
                    try {
                        const hhh = res.data?.data?.projects.length > 0 ? res.data?.data?.projects : PROJECTS;
                        setProjects(hhh);
                    } catch (e) {
                        console.log(e);
                        setProjects(PROJECTS);
                    }
                }).catch(e => {
                    console.log(e);
                    setProjects(PROJECTS);
                });
        }
        else {
            setProjects(projectsFromState);
        }
    }

    useEffect(() => {
        initProjects();
    }, [kind]);

    const IconText = ({ icon, text }) => (
        <Space>
            {createElement(icon)}
            {text}
        </Space>
    );

    return (
        <List
            itemLayout="vertical"
            size="large"
            style={{
                marginBottom: "10%"
            }}
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 3,
                position: "top",
                align: "end",
            }}
            dataSource={projects}
            renderItem={(item) => (
                <List.Item
                    key={item.id}
                    actions={[
                        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                        <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                    ]}
                    extra={
                        <img
                            width={272}
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                    }
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.icon} />}
                        title={<Link to={`/project/${item.id}`}>{item.tittle}</Link>}
                        description={item.description.length <= 500 ? item.description : item.description.substring(0, 500) + "  ...more"}
                    />
                </List.Item>
            )}
        />
    );
};

export default ProjectList;
