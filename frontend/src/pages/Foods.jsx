import axios from "axios";
import { useEffect, useState } from "react";

function Foods() {

    const [foods, setFoods] = useState([]);

    const [formData, setFormData] = useState({
        foodName: "",
        foodOwnerName: ""
    });

    const getFoods = async () => {

        const res = await axios.get("http://localhost:5000/foods");

        setFoods(res.data);
    };

    useEffect(() => {
        getFoods();
    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        await axios.post(
            "http://localhost:5000/foods/add",
            formData
        );

        getFoods();

        setFormData({
            foodName: "",
            foodOwnerName: ""
        });

    };

    const deleteFood = async (id) => {

        await axios.delete(
            `http://localhost:5000/foods/delete/${id}`
        );

        getFoods();
    };

    return (

        <div className="p-6">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-4 rounded shadow mb-5"
            >

                <h1 className="text-2xl font-bold mb-4">
                    Add Food
                </h1>

                <input
                    type="text"
                    name="foodName"
                    placeholder="Food Name"
                    value={formData.foodName}
                    onChange={handleChange}
                    className="border p-2 w-full mb-3"
                />

                <input
                    type="text"
                    name="foodOwnerName"
                    placeholder="Owner Name"
                    value={formData.foodOwnerName}
                    onChange={handleChange}
                    className="border p-2 w-full mb-3"
                />

                <button className="bg-blue-600 text-white px-4 py-2">
                    Save
                </button>

            </form>

            <div className="bg-white p-4 rounded shadow">

                <h1 className="text-2xl font-bold mb-4">
                    Foods List
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

export default Foods