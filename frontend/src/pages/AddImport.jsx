import axios from "axios";
import { useEffect, useState } from "react";

function AddImport() {

    const [foods, setFoods] = useState([]);

    const [formData, setFormData] = useState({
        foodId: "",
        quantity: ""
    });

    const getFoods = async () => {

        const res = await axios.get(
            "http://localhost:5000/foods"
        );

        setFoods(res.data);
    };

    useEffect(() => {
        getFoods();
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        await axios.post(
            "http://localhost:5000/imports/add",
            formData
        );

        alert("Import Added");
    };

    return (

        <div className="p-6">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-5 rounded shadow"
            >

                <h1 className="text-2xl font-bold mb-4">
                    Add Import
                </h1>

                <select
                    className="border p-2 w-full mb-3"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            foodId: e.target.value
                        })
                    }
                >

                    <option>Select Food</option>

                    {
                        foods.map((food) => (

                            <option
                                key={food._id}
                                value={food._id}
                            >
                                {food.foodName}
                            </option>

                        ))
                    }

                </select>

                <input
                    type="number"
                    placeholder="Quantity"
                    className="border p-2 w-full mb-3"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            quantity: e.target.value
                        })
                    }
                />

                <button className="bg-blue-600 text-white px-4 py-2">
                    Save
                </button>

            </form>

        </div>
    )
}

export default AddImport