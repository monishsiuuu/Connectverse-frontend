import Loader from "../components/base/Loader";
import NormalLayout from "../layouts/NormalLayout";

const HomePage = () => {
    return (
        <div>
            <NormalLayout element={<Loader />} />
        </div>
    );
};

export default HomePage;
