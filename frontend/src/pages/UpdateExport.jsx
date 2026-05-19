import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateExport() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [foodId, setFoodId] = useState("");
    const [exportDate, setExportDate] = useState("");
    const [quantity, setQuantity] = useState("");

    const [foods, setFoods] = useState([]);

    const getFoods = async () => {
        const res = await axios.get("http://localhost:5000/foods");
        setFoods(res.data.food);
    };

const getExport = async () => {
    try {
        const res = await axios.get(`http://localhost:5000/export/get/${id}`);
        const data = res.data.export;

        setFoodId(data.foodId?._id || data.foodId);
        setExportDate(data.exportDate?.split("T")[0]);
        setQuantity(data.quantity);

    } catch (err) {
        console.error(err);
    }
};
    useEffect(() => {
        getFoods();
        getExport();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();

        await axios.put(
            `http://localhost:5000/export/update/${id}`,
            { foodId, exportDate, quantity }
        );

        alert("Export Updated");
        navigate("/export");
    };

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">

            <form
                onSubmit={handleUpdate}
                className="bg-blue-100 p-6 w-full max-w-md rounded-xl shadow-lg"
            >

                <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
                    Update Export
                </h1>

                <select
                    value={foodId}
                    onChange={(e) => setFoodId(e.target.value)}
                    className="w-full bg-gray-200 py-3 px-4 rounded-full mb-4"
                >
                    <option value="">select food</option>
                    {foods.map((food) => (
                        <option key={food._id} value={food._id}>
                            {food.foodName}
                        </option>
                    ))}
                </select>

                <input
                    type="date"
                    value={exportDate}
                    onChange={(e) => setExportDate(e.target.value)}
                    className="w-full bg-gray-200 py-3 px-4 rounded-full mb-4"
                />

                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full bg-gray-200 py-3 px-4 rounded-full mb-4"
                />

                <button className="bg-blue-500 w-full py-3 rounded-full text-white hover:bg-blue-600">
                    Update Export
                </button>

            </form>

        </div>
    );
}

export default UpdateExport;