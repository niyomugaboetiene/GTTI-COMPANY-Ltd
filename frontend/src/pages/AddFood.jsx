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

        await axios.post(
            "http://localhost:5000/foods/add",
            formData
        );

        alert("Food Added");

        setFormData({
            foodName: "",
            foodOwnerName: ""
        });

    };

    return (

        <div className="p-6">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-5 rounded shadow"
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

        </div>
    )
}

export default AddFood