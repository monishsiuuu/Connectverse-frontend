import { createElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { ExperimentOutlined, UserOutlined, ColumnWidthOutlined, FolderOpenOutlined, BugOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Modal, notification } from 'antd';
import { getProfile, toggleM2F } from '../services/auth-service';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './Footer';
import FloatingButton from './FloatingButton';
import ShowQRCode from '../components/auth/ShowQRCode';
import Profile from '../components/base/Profile';
import { setProfile } from '../redux/profile-slice';
import { DEVELOPER } from '../data';
const { Content, Sider } = Layout;


const SideNavLayout = ({ element }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [notice, contextHolder] = notification.useNotification();
    const [collapsed, setCollapsed] = useState(false);
    const [link, setLink] = useState("-");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const urlSplitted = location.pathname.split("/");
    const selectedKey = urlSplitted[urlSplitted.length - 1];
    const openedKey = urlSplitted[1];

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleEnableM2F = _ => {
        toggleM2F(true)
            .then(res => {
                const qrLink = res.data?.qrcode_url;
                setLink(qrLink);
                setIsModalOpen(true);
            })
            .catch(e => {
                setIsModalOpen(true);
                setLink("-");
                console.log(e);
                notice.warning({ message: e.message });
            });
    }

    const handleOpenProfile = _ => {
        getProfile("me")
            .then(res => {
                dispatch(setProfile(res.data["data"]["developer"]))
            })
            .catch(e => {
                console.log(e);
                dispatch(setProfile(DEVELOPER))
                notice.warning({ message: e.message });
            });
    }

    const subnavItems = [
        {
            key: `user`,
            icon: createElement(UserOutlined),
            label: `User`,
            children: [
                {
                    key: "Disable M2D",
                    label: "Disable M2F",
                    onClick: () => {
                        toggleM2F(false).then(res => { notice.success({ message: "Disabled successfully..." }); }).catch(e => { console.log(e); notice.warning({ message: e.message }); });
                    }
                },
                {
                    key: "Enable M2D",
                    label: "Enable M2F",
                    onClick: () => { handleEnableM2F() }
                },
                {
                    key: "Profile",
                    label: "Profile",
                    onClick: () => { handleOpenProfile() }
                }
            ],
        },
        {
            key: `projects`,
            icon: createElement(ExperimentOutlined),
            label: `Project`,
            children: [
                {
                    key: "requestedProjects",
                    label: "Requested Projects",
                    onClick: () => {
                        navigate("/projects/requestedProjects", { replace: true });
                    }
                },
                {
                    key: "projects",
                    label: "Ongoing Projects",
                    onClick: () => { navigate("/projects/projects", { replace: true }) }
                },
                {
                    key: "createdProjects",
                    label: "Admin Projects",
                    onClick: () => { navigate("/projects/createdProjects", { replace: true }) }
                },
                {
                    key: "all",
                    label: "All Projects",
                    onClick: () => { navigate("/projects/all") }
                },
                {
                    key: "create",
                    label: "Create Project",
                    onClick: () => { navigate("/projects/create") }
                },
            ],
        },
        {
            key: `tasks`,
            icon: createElement(BugOutlined),
            label: `Tasks`,
            children: [
                {
                    key: "pending",
                    label: "Pending Tasks",
                    onClick: () => { navigate("/tasks/auth/pending", { replace: true }) }
                },
                {
                    key: "completed",
                    label: "Completed Tasks",
                    onClick: () => { navigate("/tasks/auth/completed", { replace: true }) }
                },
            ],
        },
        {
            key: `Parser`,
            label: `Parser`,
            type: "group",
            children: [
                {
                    key: "Parser",
                    icon: createElement(FolderOpenOutlined),
                    label: "Upload Projects",
                    onClick: () => { navigate("/upload", { replace: true }) }
                },
                {
                    key: "Resume Parser",
                    icon: createElement(FilePdfOutlined),
                    label: "Resume Parser",
                    onClick: () => { navigate("/parser", { replace: true }) }
                },
                {
                    key: "toggle",
                    icon: createElement(ColumnWidthOutlined),
                    label: "Toggle",
                    onClick: () => { setCollapsed(!collapsed) }
                },
            ],
        },
    ];

    return (
        <Layout>
            {contextHolder}
            <HeaderComponent />
            <Content
                style={{
                    padding: '0 48px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                    items={urlSplitted.map(url => ({ title: url.toLocaleUpperCase()}))}
                />
                <Layout
                    style={{
                        padding: '24px 0',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Sider
                        collapsible
                        collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
                        style={{
                            background: colorBgContainer,
                        }}
                        width={200}
                    >
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={[selectedKey]}
                            defaultOpenKeys={[openedKey]}
                            style={{
                                height: '100%',
                            }}
                            items={subnavItems}
                        />
                    </Sider>
                    <Content
                        style={{
                            padding: '0 24px',
                            minHeight: 250,
                        }}
                    >
                        {element}
                        <Modal title="Authenticator Token" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <ShowQRCode link={link} />
                        </Modal>
                        <Profile />
                    </Content>
                </Layout>
            </Content>
            <FloatingButton />
            <FooterComponent />
        </Layout>
    );
};

export default SideNavLayout;
