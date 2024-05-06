import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import TaskList from "../../components/task/TaskList";
import SideNavLayout from "../../layouts/SideNavLayout";
import { initUser } from "../../redux/auth-slice";
import { getDeveloper } from "../../services/auth-service";

const TaskListPage = () => {
    const { kind, status } = useParams();
    const dispatch = useDispatch();

    const initDeveloper = _ => getDeveloper()
        .then(res => {
            const developer = res.data?.data?.developer;
            dispatch(initUser(developer));
        })
        .catch(e => console.log(e));

    useEffect(() => {
        initDeveloper();
    }, []);

    return (
        <div>
            <SideNavLayout element={<TaskList kind={kind} status={status} />} />
        </div>
    );
};

export default TaskListPage;
