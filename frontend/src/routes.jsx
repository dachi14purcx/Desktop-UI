import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ChangeBackground from "./components/Desktop/ChangeBackground";
import VsCode from "./components/Files/VsCode";
import Camera from "./components/Camera/camera";
import Gallery from "./components/Gallery/Gallery";
import Weather from "./components/Weather/Weather";


export const routes =  createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/changebackground', element: <ChangeBackground /> },
            { path: "/vscode/:id", element: <VsCode /> },
            { path: '/camera', element: <Camera /> },
            { path: '/gallery', element: <Gallery /> },
            { path: '/weather', element: <Weather /> }
        ]
    }
])