import { PlusOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { useNavigate } from "react-router-dom";

const FloatingButton = _ => {
    const navigate = useNavigate();
    return (
        <FloatButton
            shape="circle"
            tooltip={<div>Create Projects</div>}
            onClick={() => navigate("/projects/create", { replace: true })}
            style={{
                background: "#999",
                margin: "0 8% 5% 0",
            }}
            icon={<PlusOutlined />}
        />
    );
};

export default FloatingButton;
