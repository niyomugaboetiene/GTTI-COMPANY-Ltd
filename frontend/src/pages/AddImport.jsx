import axios from "axios";
import { useEffect, useState } from "react";

function AddImport() {

    const [importDate, setImportDate] = useState("");
    const [foodId, setFoodId] = useState("");
    const [quantity, setQuantity] = useState("");

    const [foods, setFoods] = useState([]);

    const getFoods = async () => {
        const res = await axios.get("http://localhost:5000/foods");
        setFoods(res.data.food);
    };

    useEffect(() => {
        getFoods();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:5000/import/add",
                { foodId, importDate, quantity }
            );

            alert("Import Added");

            // reset fields
            setFoodId("");
            setImportDate("");
            setQuantity("");

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">

            <form
                onSubmit={handleSubmit}
                className="bg-blue-100 p-6 w-full max-w-md rounded-xl shadow-lg"
            >

                <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
                    Add Import
                </h1>

                {/* Food Select */}
                <div className="mb-4">
                    <label className="block text-lg text-blue-600 mb-1">
                        Food
                    </label>

                    <select
                        value={foodId}
                        onChange={(e) => setFoodId(e.target.value)}
                        className="w-full bg-gray-200 py-3 px-4 rounded-full focus:outline focus:outline-blue-500"
                    >
                        <option value="">--- Select food ---</option>

                        {foods.map((food, index) => (
                            <option value={food._id} key={index}>
                                {food.foodName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Date */}
                <div className="mb-4">
                    <label className="block text-lg text-blue-600 mb-1">
                        Date (optional)
                    </label>

                    <input
                        type="date"
                        value={importDate}
                        onChange={(e) => setImportDate(e.target.value)}
                        className="w-full bg-gray-200 py-3 px-4 rounded-full focus:outline focus:outline-blue-500"
                    />
                </div>

                {/* Quantity */}
                <div className="mb-4">
                    <label className="block text-lg text-blue-600 mb-1">
                        Quantity
                    </label>

                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full bg-gray-200 py-3 px-4 rounded-full focus:outline focus:outline-blue-500"
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="bg-blue-500 w-full py-3 rounded-full text-white hover:bg-blue-600 transition-colors"
                >
                    Save Import
                </button>

            </form>

        </div>
    );
}

export default AddImport;