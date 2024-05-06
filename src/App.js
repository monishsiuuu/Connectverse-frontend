import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages";
import { NotFound } from "./components/Results";
import LoginPage from "./pages/LoginPage";
import ProtectedComponent from "./components/ProtectedComponent";
import OAuthPage from "./pages/OAuthPage";
import ProjectPage from "./pages/project/ProjectPage";
import ProjectListPage from "./pages/project/ProjectListPage";
import TaskListPage from "./pages/task/TaskListPage";
import UploadPage from "./pages/UploadPage";
import CreateProjectPage from "./pages/project/CreateProjectPage";
import ResumePage from "./pages/ResumePage";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedComponent component={<HomePage />} />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/oauth/:id",
    element: <OAuthPage />
  },
  {
    path: "/projects/create",
    element: <CreateProjectPage />
  },
  {
    path: "/projects/:kind",
    element: <ProjectListPage />
  },
  {
    path: "/tasks/:kind/:status",
    element: <TaskListPage />
  },
  {
    path: "/project/:id",
    element: <ProjectPage />
  },
  {
    path: "/upload",
    element: <UploadPage />
  },
  {
    path: "/parser",
    element: <ResumePage />
  },
  {
    path: "*",
    element: <NotFound />
  },
]);


const App = () => {
  useEffect(_ => {
    const handleContextmenu = e => {
      e.preventDefault()
    }
    document.onkeydown = (e) => {
      if (e.key == 123) {
        e.preventDefault();
      }
      if (e.ctrlKey && e.shiftKey && e.key == 'I') {
        e.preventDefault();
      }
      if (e.ctrlKey && e.shiftKey && e.key == 'C') {
        e.preventDefault();
      }
      if (e.ctrlKey && e.shiftKey && e.key == 'J') {
        e.preventDefault();
      }
      if (e.ctrlKey && e.key == 'U') {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', handleContextmenu)
    return function cleanup() {
      document.removeEventListener('contextmenu', handleContextmenu)
    }
  }, [])

  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  )
};

export default App;
