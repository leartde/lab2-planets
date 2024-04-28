import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AddPlanet = () => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const navigate = useNavigate();
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleTypeChange = (e) => {
        setType(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "http://localhost:5284/api/planets";
        const data = {
            name: name,
            type: type,
            isDeleted : false
        };
        try {
            const res = await axios.post(url, data);
            if (res.status === 200) {
                console.log("Planet added successfully");
                navigate("/");
            } else {
                console.error("Error adding planet");
            }
        } catch (err) {
            console.error("Error adding planet", err);
        }
    }

    return (
        <div className="w-full m-0 p-12">
            <form method="post" className="w-1/2">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name" type="text" placeholder="Name" value={name} onChange={handleNameChange}/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                        Type
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="type" type="text" placeholder="Type" value={type} onChange={handleTypeChange}/>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button" onClick={handleSubmit}>
                        Add Planet
                    </button>
                </div>
            </form>
            
        </div>
    );
};

export default AddPlanet;
