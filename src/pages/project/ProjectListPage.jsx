import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ProjectList from "../../components/project/ProjectList";
import SideNavLayout from "../../layouts/SideNavLayout";
import { initUser } from "../../redux/auth-slice";
import { getDeveloper } from "../../services/auth-service";

const ProjectListPage = () => {

    const dispatch = useDispatch();
    const { kind } = useParams();

    const initDeveloper = _ => getDeveloper()
        .then(res => {
            const developer = res.data["data"]["developer"];
            dispatch(initUser(developer));
        })
        .catch(e => console.log(e));

    useEffect(() => {
        initDeveloper();
    }, []);

    return (
        <div>
            <SideNavLayout element={<ProjectList kind={kind} />} />
        </div>
    );
};

export default ProjectListPage;
