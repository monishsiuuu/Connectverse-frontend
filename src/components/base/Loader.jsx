import { useSelector } from "react-redux";

const Loader = _ => {
    const isLoading = useSelector(state => state.settings.loading);

    return (
        <div className="loader" hidden={!isLoading}>
            <div className="bar">
                <div className="ball"></div>
            </div>
        </div>
    );
}

export default Loader;
