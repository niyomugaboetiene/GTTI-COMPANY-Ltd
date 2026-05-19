import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddExport() {

    const [exportDate, setExportDate] = useState("");
    const [foodId, setFoodId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [isAuth, setIsAuth] = useState(true);

    const navigate = useNavigate();

    const [foods, setFoods] = useState([]);

    const getFoods = async () => {
        try {
           const res = await axios.get("http://localhost:5000/foods", { withCredentials: true });
           setFoods(res.data.food);
        } catch (err) {
            const status = err.response?.status;
            if (status === 401) {
                setIsAuth(false);
            }
        }

    };

    useEffect(() => {
        getFoods();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:5000/export/add",
                { foodId, exportDate, quantity }, { withCredentials: true }
            );

            alert("Export Added");

            setFoodId("");
            setExportDate("");
            setQuantity("");

        } catch (err) {
            console.error(err);

            const errorMessage = err.response?.data?.message || "Error occurred";
            const status = err.response?.status;

            if (errorMessage === "You dont have this quantity in stock") {
                alert(errorMessage);
            }
            if (status === 401) {
                setIsAuth(false);
            }
        }
    };

    if (!isAuth) {
        return (
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
               <div className="bg-sky-200 h-30 p-3 rounded-xl">
                  <h1 className="text-center mt-2">Please login to access this page.</h1>
                  <button onClick={() => navigate('/login')} className="bg-blue-500 px-6 py-2 mt-4 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors">Login</button>
               </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">

            <form
                onSubmit={handleSubmit}
                className="bg-blue-100 p-6 w-full max-w-md rounded-xl shadow-lg"
            >

                <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
                    Add Export
                </h1>

                <div className="mb-4">
                    <label className="block text-lg text-blue-600 mb-1">
                        Food
                    </label>

                    <select
                        value={foodId}
                        onChange={(e) => setFoodId(e.target.value)}
                        className="w-full bg-gray-200 py-3 px-4 rounded-full focus:outline focus:outline-blue-500"
                    >
                        <option value="">Select food</option>

                        {foods.map((food, index) => (
                            <option value={food._id} key={index}>
                                {food.foodName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-lg text-blue-600 mb-1">
                        Date (optional)
                    </label>

                    <input
                        type="date"
                        value={exportDate}
                        onChange={(e) => setExportDate(e.target.value)}
                        className="w-full bg-gray-200 py-3 px-4 rounded-full focus:outline focus:outline-blue-500"
                    />
                </div>

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

                <button
                    type="submit"
                    className="bg-blue-500 w-full py-3 rounded-full text-white hover:bg-blue-600 transition-colors"
                >
                    Save Export
                </button>

            </form>

        </div>
    );
}

export default AddExport;