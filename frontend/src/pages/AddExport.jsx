import axios from "axios";
import { useEffect, useState } from "react";

function AddExport() {

    const [exportDate, setExportDate] = useState("");
    const [foodId, setFoodId] = useState("");
    const [quantity, setQuantity] = useState("");

    const [Error, setError] = useState("");

    const [foods, setFoods] = useState([]);
    // foodId, exportsData, quantity

    const getFoods = async () => {

        const res = await axios.get(
            "http://localhost:5000/foods"
        );

        setFoods(res.data.food);
    };

    useEffect(() => {
        getFoods();
    }, []);

    const handleSubmit = async (e) => {
       e.preventDefault();
        try {
        await axios.post(
            "http://localhost:5000/export/add", { foodId, exportDate, quantity }
        );

        alert("Export Added");
        }  catch (err) {
            console.error(err);
            const errorMessage = err.response?.data.message || "Error occured";
            if (errorMessage === "You dont have this quantity in stock") {
                alert(errorMessage);
            }
        }
    };

    return (
      <div className="bg-gray-100 flex justify-center items-center">
        <div className="mt-20 bg-blue-100 p-4 h-fit w-100 rounded-xl">
           <div className="mt-2">
               <label htmlFor="" className="block text-xl text-blue-600">Food</label>
               <select onChange={(e) => setFoodId(e.target.value)} className="w-full bg-gray-300 py-3 rounded-full text-gray-900 focus:outline focus:outline-gray-800">
                <option value="">Select food</option>
                  {foods.map((food, index) => (
                    <option value={food._id} key={index}>{food.foodName}</option>
                  ))}
               </select>
           </div>
           <div>
              <label  className="block text-xl text-blue-600">Date (optional)</label>
              <input type="date" onChange={(e) => setExportDate(e.target.value)} className="w-full bg-gray-300 py-3 rounded-full text-gray-900 focus:outline focus:outline-gray-800" />
           </div>
           <div>
              <label  className="block text-xl text-blue-600">Quantity</label>
              <input type="number" onChange={(e) => setQuantity(e.target.value)} className="w-full bg-gray-300 py-3 rounded-full text-gray-900 focus:outline focus:outline-gray-800" />
           </div>
           <button onClick={handleSubmit} className="bg-blue-500 w-full mt-3 py-2 rounded-full text-white hover:bg-blue-600 transition-colors">Save Export</button>
        </div>
      </div>
    )
}

export default AddExport