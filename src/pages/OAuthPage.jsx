import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyJwt } from "../services/auth-service";


const OAuthPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const verified = verifyJwt(id);

    useEffect(_ => {
        if (verified)
            navigate("/");
    }, [verified])

    return (<></>);
}

export default OAuthPage;