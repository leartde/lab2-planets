import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


const Planets = () => {
    const [planets , setPlanets] = useState([]);
    useEffect(() => {
        const fetchPlanets = async () => {
            const url = "http://localhost:5284/api/planets";
            try {
                const res = await axios.get(url);
                if (res.status === 200) {
                    setPlanets(res.data);
                } else {
                    console.error("Error fetching planets");
                }
            } catch (err) {
                console.error("Error fetching planets", err);
            }
        };
        fetchPlanets();
    }, []);
    return (
        <div className="w-full m-0 p-8">
            <h1 className="text-2xl font-bold">Planets</h1>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Id
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Satellites
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {planets.map((planet) => (
                    <tr key={planet.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {planet.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {planet.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {planet.type}
                        </td>
                        <td>
                            <Link to={`/satellites/${planet.name}`} className="text-blue-500">View satellites</Link>
                        </td>

                        <td>
                            <Link to={`/planets/edit/${planet.name}`} className="text-orange-600"> Edit</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="flex mt-4 gap-8">
                <Link to="/planets/create" className="p-2 text-white bg-green-400 rounded-lg ">
                    Add a planet
                </Link>
                <Link to="/satellites/create" className="p-2 text-white bg-blue-400 rounded-lg ">
                    Add a satellite
                </Link>
            </div>

        </div>
    );
};

export default Planets;
