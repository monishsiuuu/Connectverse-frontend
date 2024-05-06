import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, List, notification } from 'antd';
import { getProfile } from "../../services/auth-service";
import { DEVELOPER } from "../../data";
import { setProfile } from "../../redux/profile-slice";
import { acceptJoinRequest, rejectJoinRequest } from "../../services/project-service";
import { addDeveloper, setRequestedDeveloper } from "../../redux/project-slice";


const DeveloperList = ({ kind = 'developers' }) => {

    const dispatch = useDispatch();
    const [notice, contextHolder] = notification.useNotification();
    const projectId = useSelector(state => state.project.id);
    const isAdmin = useSelector(state => state.project.isAdmin);
    const developers = useSelector(state => state.project[kind]);

    const handleRequestAccept = requesterId => {
        acceptJoinRequest(projectId, requesterId).catch(e => notice.warning({ message: e.message }));
        const requestedDevelopers = developers.filter(dev => dev?.id === requesterId);
        const filtered = developers.filter(dev => dev?.id !== requesterId);
        dispatch(setRequestedDeveloper(filtered));
        dispatch(addDeveloper(requestedDevelopers[0]));
    }

    const handleRequestReject = requesterId => {
        const filtered = developers.filter(dev => dev?.id !== requesterId);
        dispatch(setRequestedDeveloper(filtered));
        rejectJoinRequest(projectId, requesterId).catch(e => notice.warning({ message: e.message }));
    }

    const ProjectAdminAction = ({ requesterId }) => (
        <div hidden={!isAdmin || kind !== "requestedDevelopers"}>
            <Button onClick={() => { handleRequestAccept(requesterId) }} key="list-loadmore-edit">Accept</Button>&nbsp;
            <Button onClick={() => { handleRequestReject(requesterId) }} key="list-loadmore-Reject">Reject</Button>&nbsp;
        </div>
    );

    const handleOpenProfile = id => {
        getProfile(id)
            .then(res => {
                dispatch(setProfile(res.data["data"]["developer"]))
            })
            .catch(e => {
                console.log(e);
                dispatch(setProfile(DEVELOPER))
            });
    }

    useEffect(_ => {
        console.log(`DeveloperList Refreshed to use kind: ${kind}.`);
    }, [kind]);

    return (
        <div>
            {contextHolder}
            <List
                itemLayout="horizontal"
                dataSource={developers}
                style={{
                    marginBottom: "10%"
                }}
                pagination={{
                    position: "top",
                    align: "end",
                }}
                renderItem={(item) => (
                    <List.Item
                        key={item.id}
                        actions={[<Button key="list-loadmore-more" onClick={() => handleOpenProfile(item.id)}>Profile</Button>, <ProjectAdminAction requesterId={item.id} />]}
                    >
                        <List.Item.Meta
                            key={item.id}
                            avatar={<Avatar src={item.profilePicUrl || "https://content.tupaki.com/twdata/2020/0920/news/Rajni-To-Not-Come-Out-For-Shooting-Till-Vaccine-Arrives--1601448273-1492.jpg"} />}
                            title={item.name}
                            description={item.email}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default DeveloperList;
