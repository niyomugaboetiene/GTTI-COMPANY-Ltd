import axios from "axios";
import { useEffect, useState } from "react";

function ExportList() {
    const [exportsData, setExportsData] = useState([]);

    const getExports = async () => {
        const res = await axios.get("http://localhost:5000/export");
        setExportsData(res.data.export);
    };

    useEffect(() => {
        getExports();
    }, []);

    // DELETE handler
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/export/${id}`);
            alert("Deleted successfully");
            getExports(); // refresh list
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-start">
            
            <div className="mt-20 bg-blue-100 p-6 w-full max-w-4xl rounded-xl shadow-lg">

                <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
                    Export List
                </h1>

                <table className="w-full border-collapse">

                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="border p-3">Food</th>
                            <th className="border p-3">Quantity</th>
                            <th className="border p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {exportsData.map((item) => (
                            <tr key={item._id} className="bg-white text-center hover:bg-gray-100">

                                <td className="border p-3">
                                    {item.foodId?.foodName || "No food name"}
                                </td>

                                <td className="border p-3">
                                    {item.quantity}
                                </td>

                                <td className="border p-3 flex gap-2 justify-center">

                                    {/* UPDATE BUTTON */}
                                    <button
                                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-full transition"
                                        onClick={() => alert("Update feature coming soon")}
                                    >
                                        Update
                                    </button>

                                    {/* DELETE BUTTON */}
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full transition"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default ExportList;