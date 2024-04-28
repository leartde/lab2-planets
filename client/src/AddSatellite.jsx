import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const AddSatellite = () => {
    const [name, setName] = useState("");
    const [planets, setPlanets] = useState([]);
    const [planetId, setPlanetId] = useState();
    const navigate = useNavigate();
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handlePlanetIdChange = (e) => {
        setPlanetId(e.target.value);
    }
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "http://localhost:5284/api/satellites";
        const data = {
            name: name,
            planetId: planetId
        };
        try {
            const res = await axios.post(url, data);
            if (res.status === 200) {
                console.log("Satellite added successfully");
                navigate("/");
            } else {
                console.error("Error adding satellite");
            }
        } catch (err) {
            console.error("Error adding satellite", err);
        }
    }

    return (
        <div className="w-full m-0 p-12">
            <form className="w-1/2" method="post">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" placeholder="Name" value={name} onChange={handleNameChange}/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Planet
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={planetId} onChange={handlePlanetIdChange}>
                        <option value="">Select a planet</option>
                        {planets.map((planet) => (
                            <option key={planet.id} onSelect={handlePlanetIdChange} value={planet.id}>{planet.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button" onClick={handleSubmit}>
                        Add Satellite
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AddSatellite;
