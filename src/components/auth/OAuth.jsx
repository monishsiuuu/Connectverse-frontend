import { GithubOutlined, GoogleOutlined } from "@ant-design/icons";
import { BASE_URL } from "../../services/axios-config";

const OAuth = _ => (
    <div className="social-container">
        <a href={`${BASE_URL}/oauth2/authorization/google`} className="social">
            <GoogleOutlined />
        </a>
        <a href={`${BASE_URL}/oauth2/authorization/github`} className="social">
            <GithubOutlined />
        </a>
    </div>
);

export default OAuth;