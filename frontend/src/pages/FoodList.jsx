import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FoodList() {
    const [isAuth, setIsAuth] = useState(true);
    
    const [foods, setFoods] = useState([]);
    const navigate = useNavigate();

    const getFoods = async () => {
        try {
           const res = await axios.get("http://localhost:5000/foods");
           setFoods(res.data.food);
        } catch (err) {
            console.error(err);
            const status = err.response?.status;
            if (status === 401) {
                setIsAuth(false);
            }
        }

    };

    useEffect(() => {
        getFoods();
    }, []);

    const deleteFood = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this food?");

        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/foods/delete/${id}`);
            alert("Food deleted successfully");
            getFoods();
        } catch (err) {
            console.error(err);
            alert("Failed to delete food");
            const status = err.response?.status;
            if (status === 401) {
                setIsAuth(false);
            }
        
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6 flex justify-center">

            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl">

                <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
                    Food List
                </h1>

                <table className="w-full border border-gray-300">

                    <thead className="bg-blue-500 text-white">

                        <tr>
                            <th className="border p-3">Food Name</th>
                            <th className="border p-3">Owner</th>
                            <th className="border p-3">Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {foods.map((food) => (

                            <tr key={food._id} className="text-center">

                                <td className="border p-3">
                                    {food.foodName}
                                </td>

                                <td className="border p-3">
                                    {food.foodOwnerName}
                                </td>

                                <td className="border p-3 flex justify-center gap-2">

                                    <button
                                        onClick={() => navigate(`/food/update/${food._id}`)}
                                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-full"
                                    >
                                        Update
                                    </button>

                                    <button
                                        onClick={() => deleteFood(food._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full"
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

export default FoodList;