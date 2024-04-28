
import { useLoaderData, useNavigate} from "react-router-dom";
import axios from "axios";

const Satellites = () => {
    const navigate = useNavigate();
    const handleDelete = async (id) => {
        const url = `http://localhost:5284/api/satellites/${id}`;
        try {
            const res = await axios.put(url);
            if (res.status === 200) {
                console.log("Satellite deleted successfully");
                navigate("/");
            } else {
                console.error("Error deleting satellite");
            }
        } catch (err) {
            console.error("Error deleting satellite", err);
        }
    }
    const satellites = useLoaderData();
    return (
        <div className="w-full m-0 p-8">
            <h1 className="text-2xl font-bold">Satellites</h1>
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
                        Planet Id
                    </th>

                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {satellites.map((satellite) => (
                    <tr key={satellite.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {satellite.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {satellite.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {satellite.planetId}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                              <button onClick={()=>handleDelete(satellite.id)} className="text-white bg-red-600 rounded-lg p-2"> Delete Satellite</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>


        </div>
    );
};

export default Satellites;
