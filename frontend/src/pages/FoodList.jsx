import axios from "axios";
import { useEffect, useState } from "react";

function FoodList() {

    const [foods, setFoods] = useState([]);

    const getFoods = async () => {

        const res = await axios.get(
            "http://localhost:5000/foods"
        );

        setFoods(res.data.food);
    };

    useEffect(() => {
        getFoods();
    }, []);

    const deleteFood = async (id) => {

        await axios.delete(
            `http://localhost:5000/foods/delete/${id}`
        );

        getFoods();
    };

    return (

        <div className="p-6">

            <div className="bg-white p-5 rounded shadow">

                <h1 className="text-2xl font-bold mb-4">
                    Food List
                </h1>

                <table className="w-full border">

                    <thead className="bg-gray-200">

                        <tr>

                            <th className="border p-2">Food</th>
                            <th className="border p-2">Owner</th>
                            <th className="border p-2">Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            foods.map((food) => (

                                <tr key={food._id}>

                                    <td className="border p-2">
                                        {food.foodName}
                                    </td>

                                    <td className="border p-2">
                                        {food.foodOwnerName}
                                    </td>

                                    <td className="border p-2">

                                        <button
                                            onClick={() => deleteFood(food._id)}
                                            className="bg-red-500 text-white px-3 py-1"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>
    )
}

export default FoodList