import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';


export const NotFound = () => {
    const navigate = useNavigate();
    return <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={() => navigate("/")}>Back Home</Button>}
    />
};

export const Unauthorized  = () => (
    <Result
        status="401"
        title="401"
        subTitle="Unauthorized, login to visit this page."
        extra={<Button type="primary">Login</Button>}
    />
);
