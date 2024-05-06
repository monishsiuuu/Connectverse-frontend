import { useState, useEffect } from "react";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initUser } from "../../redux/auth-slice";
import { isM2FEnabled, login, isAuthenticated } from "../../services/auth-service";
import OAuth from "./OAuth";

const INITIAL_FORM = {
    userName: "",
    password: "",
    otp: "null"
};

const SignInForm = _ => {

    const dispath = useDispatch();
    const navigate = useNavigate();
    const [notice, contextHolder] = notification.useNotification();
    const [state, setState] = useState(INITIAL_FORM);
    const [m2fEnabled, setM2fEnabled] = useState(false);
    const [authenticated, setAuthenticated] = useState(isAuthenticated());

    const handleChange = evt => {
        const { name, value } = evt.target;
        if (name == "userName") {
            isM2FEnabled(value)
                .then(s => {
                    setM2fEnabled(_ => s.data);
                });
        }
        setState({
            ...state,
            [name]: value
        });
    };

    const handleOnSubmit = evt => {
        evt.preventDefault();
        login(state).then(res => {
            dispath(initUser(res));
            setAuthenticated(_ => true);
        }).catch(e => {
            console.log(e.message);
            notice.error({ message: e.message });
        });
    };

    useEffect(_ => {
        setAuthenticated(isAuthenticated());
        if (authenticated == true)
            navigate("/");
    }, [authenticated]);

    return (
        <div className="form-container sign-in-container">
            {contextHolder}
            <form>
                <h1>Sign in</h1>
                <OAuth />
                <span>or use your account</span>
                <input
                    type="userName"
                    placeholder="User Name"
                    name="userName"
                    value={state.userName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={state.password}
                    onChange={handleChange}
                    required
                />
                {
                    m2fEnabled &&
                    <input
                        type="number"
                        name="otp"
                        placeholder="Secure Id"
                        value={state.otp}
                        onChange={handleChange}
                        required
                    />
                }
                <a href="#">Forgot your password?</a>
                <button onClick={handleOnSubmit}>Sign In</button>
            </form>
        </div>
    );
}

export default SignInForm;