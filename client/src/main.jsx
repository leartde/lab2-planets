import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Planets from "./Planets.jsx";
import Satellites from "./Satellites.jsx";
import AddPlanet from "./AddPlanet.jsx";
import AddSatellite from "./AddSatellite.jsx";
import EditPlanet from "./EditPlanet.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Planets/>,
    },
    {
        path:"/satellites/:planetName",
        element: <Satellites/>,
        loader:({params}) => fetch(`http://localhost:5284/api/satellites/${params.planetName}`)
    },
    {
        path:"/planets/create",
        element: <AddPlanet/>
    }
    ,
    {
        path:"/satellites/create",
        element: <AddSatellite/>
    },
    {
        path:"/planets/edit/:name",
        element: <EditPlanet/>,
        loader:({params}) => fetch(`http://localhost:5284/api/planets/${params.name}`)
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
