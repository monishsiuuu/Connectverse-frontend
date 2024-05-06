import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectForm from "../../components/project/ProjectForm";
import SideNavLayout from "../../layouts/SideNavLayout";
import { initUser } from "../../redux/auth-slice";
import { getDeveloper } from "../../services/auth-service";


const Content = () => {

    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.id);
    const PROJECTINITIAL = {
        "tittle": "",
        "description": "",
        "createdBy": userId,
    }

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
            <h1>Enterprise Your Idea!</h1><br/>
            <ProjectForm projectData={PROJECTINITIAL} />
        </div>
    );
}

const CreateProjectPage = _ => {
    return (
        <SideNavLayout element={<Content />} />
    );
};

export default CreateProjectPage;
