import { useEffect } from "react";
import { isAuthenticated } from "../services/auth-service";
import { useNavigate } from "react-router-dom";

const ProtectedComponent = ({ component }) => {
    const navigate = useNavigate();
    useEffect(_ => {
        const authenticated = isAuthenticated();
        authenticated == "false" && navigate("/login", { replace: false })
    });
    return (
        <div>
            { component }
        </div>
    );
};

export default ProtectedComponent;
