import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Tabs, Select, Row, Avatar, List, Button, notification } from "antd";
import UploadBox from "../components/parser/UploadBox";
import SideNavLayout from "../layouts/SideNavLayout";
import { clearAllresumes, filterUsers } from '../services/resume-service';
import { setProfile } from '../redux/profile-slice';


const FilterTabContent = _ => {

    const options = [];
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [filterKey, setFilterKey] = useState("");
    const [filterValue, setFilterValue] = useState([""]);

    for (let i = 10; i < 36; i++) {
        options.push({
            value: i.toString(36) + i,
            label: i.toString(36) + i,
        });
    }

    const handleChangeKey = (e) => {
        setFilterKey(e.value);
    };

    const handleChangeValue = (value) => {
        setFilterValue(value);
    };

    useEffect(_ => {
        filterUsers(filterKey, filterValue).then(res => {
            setData(res.data);
        })
            .catch(e => console.log(e));
    }, [filterKey, filterValue]);

    return (
        <div>
            <Row
                align="left"
                style={{
                    marginBottom: "3%"
                }}
            >
                <Select
                    labelInValue
                    defaultValue={{
                        value: 'skills',
                        label: 'Skills',
                    }}
                    style={{
                        width: 140,
                    }}
                    onChange={handleChangeKey}
                    options={[
                        {
                            value: 'skills',
                            label: 'Skills',
                        },
                        {
                            value: 'email',
                            label: 'Email',
                        },
                        {
                            value: 'firstName',
                            label: 'First Name',
                        },
                        {
                            value: 'lastName',
                            label: 'Last Name',
                        },
                        {
                            value: 'place',
                            label: 'Location',
                        },
                        {
                            value: 'links',
                            label: 'Social Profiles',
                        },
                        {
                            value: 'education',
                            label: 'Qualifications',
                        },
                    ]}
                />
                <Select
                    mode="tags"
                    style={{
                        width: "50%",
                        marginLeft: "3%"
                    }}
                    onChange={handleChangeValue}
                    tokenSeparators={[',', "  "]}
                    options={options}
                />
            </Row>
            <List
                pagination={{
                    position: "top",
                    align: "end",
                }}
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item
                        actions={[<Button onClick={() => dispatch(setProfile(item))}>Profile</Button>]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                            title={<h4 key={item.id} >{item.firstName} {item.lastName}</h4>}
                            description={item.email}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
}

const UploadTabContent = _ => {
    const [notice, contextHolder] = notification.useNotification();
    const handleClearResumes = _ => {
        clearAllresumes()
            .then(res => {
                notice.success({
                    message: "Resumes cleared from DB..."
                });
            })
            .catch(e => {
                console.log(e);
                notice.warning({
                    message: "Problem Clearing resumes...",
                    description: e.message,
                });
            });
    }
    return (
        <div>
            {contextHolder}
            <UploadBox actionURL="http://localhost:3001/pdf/single" />
            <Button onClick={handleClearResumes}>Clear All Resumes</Button>
        </div>
    );
}

const PageContents = () => {
    const items = [
        {
            key: '1',
            label: 'Parse',
            children: <UploadTabContent />,
        },
        {
            key: '2',
            label: 'Filter',
            children: <FilterTabContent />
        },
    ];
    return (
        <div>
            <Tabs defaultActiveKey="1" items={items} style={{ margin: "1.5%" }} />
        </div>
    );
}

const ResumePage = _ => {
    return <SideNavLayout element={<PageContents />} />
}

export default ResumePage;
