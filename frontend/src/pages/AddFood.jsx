import axios from "axios";
import { useState } from "react";

function AddFood() {

    const [formData, setFormData] = useState({
        foodName: "",
        foodOwnerName: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:5000/foods/add",
                formData
            );

            alert("Food Added");

            setFormData({
                foodName: "",
                foodOwnerName: ""
            });

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
                    Add Food
                </h1>

                <div className="mb-4">
                    <label className="block text-lg text-blue-600 mb-1">
                        Food Name
                    </label>
                    <input
                        type="text"
                        name="foodName"
                        placeholder="Enter food name"
                        value={formData.foodName}
                        onChange={handleChange}
                        className="w-full bg-gray-200 py-3 px-4 rounded-full focus:outline focus:outline-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg text-blue-600 mb-1">
                        Owner Name
                    </label>
                    <input
                        type="text"
                        name="foodOwnerName"
                        placeholder="Enter owner name"
                        value={formData.foodOwnerName}
                        onChange={handleChange}
                        className="w-full bg-gray-200 py-3 px-4 rounded-full focus:outline focus:outline-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 w-full py-3 rounded-full text-white hover:bg-blue-600 transition-colors"
                >
                    Save Food
                </button>

            </form>

        </div>
    );
}

export default AddFood;