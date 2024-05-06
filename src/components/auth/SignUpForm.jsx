import { useState } from "react";
import { notification } from "antd";
import { registerUser } from "../../services/auth-service";
import OAuth from "./OAuth";

const INITIAL_FORM = {
    name: "",
    email: "",
    password: "",
    authProvider: "Native",
}

const SignUpForm = _ => {

    const [notice, contextHolder] = notification.useNotification();
    const [state, setState] = useState(INITIAL_FORM);
    const handleChange = evt => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };

    const handleOnSubmit = evt => {
        evt.preventDefault();

        registerUser(state)
            .then(res => {
                notice.success({
                    message: "Sign Successful."
                });
            })
            .catch(e => {
                notice.error({
                    message: "Error Signin Try Google Login"
                });
            });

        for (const key in state) {
            setState({
                ...state,
                [key]: ""
            });
        }
    };

    return (
        <div className="form-container sign-up-container">
            {contextHolder}
            <form onSubmit={handleOnSubmit}>
                <h1>Create Account</h1>
                <OAuth />
                <span>or use your email for registration</span>
                <input
                    type="text"
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <button>Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;
