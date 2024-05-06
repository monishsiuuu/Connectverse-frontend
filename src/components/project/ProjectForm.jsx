import { useDispatch } from 'react-redux';
import { useWriteContract } from 'wagmi';
import { Button, Form, Input, notification } from 'antd';
import { editProject } from '../../redux/project-slice';
import { createProject } from '../../redux/auth-slice';
import { createOrUpdateProject } from '../../services/project-service';
import { projectToBlockchain } from '../../services/web3-service';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';


const ProjectForm = ({ projectData }) => {
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
    const { isConnected, address } = useWeb3ModalAccount();
    const { writeContractAsync } = useWriteContract();
    const dispatch = useDispatch();
    const [notice, contextHolder] = notification.useNotification();


    const writeDataToblockchain = data => {
        if (isConnected) {
            projectToBlockchain({ ...data, ownerAddress: address }, writeContractAsync);
            notice.success({
                message: `Project Copyrights reserved.`,
            });
        }
    };

    const saveProject = project => createOrUpdateProject(project)
        .then(res => {
            notice.success({
                message: `Project ${project.tittle} saved.`,
            });
            writeDataToblockchain(res.data);
        })
        .catch(e => {
            notice.error({
                message: e.message,
            });
            console.log(e)
        });

    const onFinish = (values) => {
        const project = { ...values["project"], createdBy: projectData.createdBy };
        console.log("project ", project);
        if (projectData["id"])
            dispatch(editProject(project));
        else
            dispatch(createProject(project));
        saveProject(project);
    };
    return (
        <div>
            {contextHolder}
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{
                    maxWidth: '70%',
                }}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name={['project', 'tittle']}
                    label="Title"
                    initialValue={projectData.tittle}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        count={{
                            show: true,
                            max: 20,
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name={['project', 'description']}
                    label="Markdown"
                    initialValue={projectData.description}
                    rules={[
                        {
                            required: true,
                        },
                    ]}>
                    <Input.TextArea
                        style={{
                            height: 500,
                        }}
                        count={{
                            show: true,
                            max: 4000,
                        }}
                    />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 8,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default ProjectForm;
