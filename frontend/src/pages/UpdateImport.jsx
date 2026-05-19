import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateImport() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [foodId, setFoodId] = useState("");
    const [importDate, setImportDate] = useState("");
    const [quantity, setQuantity] = useState("");

    const [foods, setFoods] = useState([]);

    const getFoods = async () => {
        const res = await axios.get("http://localhost:5000/foods");
        setFoods(res.data.food);
    };

    const getImport = async () => {
        const res = await axios.get(`http://localhost:5000/import/get/${id}`);
        const data = res.data.import;

        setFoodId(data.foodId?._id);
        setImportDate(data.importDate);
        setQuantity(data.quantity);
    };

    useEffect(() => {
        getFoods();
        getImport();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();

        await axios.put(
            `http://localhost:5000/import/update/${id}`,
            { foodId, importDate, quantity }
        );

        alert("Import Updated");
        navigate("/import");
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
                onSubmit={handleUpdate}
                className="bg-blue-100 p-6 w-full max-w-md rounded-xl shadow-lg"
            >

                <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
                    Update Import
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
                    value={importDate}
                    onChange={(e) => setImportDate(e.target.value)}
                    className="w-full bg-gray-200 py-3 px-4 rounded-full mb-4"
                />

                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full bg-gray-200 py-3 px-4 rounded-full mb-4"
                />

                <button className="bg-blue-500 w-full py-3 rounded-full text-white hover:bg-blue-600">
                    Update Import
                </button>

            </form>

        </div>
    );
}

export default UpdateImport;