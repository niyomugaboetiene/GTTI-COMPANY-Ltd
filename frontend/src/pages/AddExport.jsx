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
      <div>
           <div>
               <label htmlFor="">Food</label>
               <select onChange={(e) => setFoodId(e.target.value)}>
                <option value="">Select food</option>
                  {foods.map((food, index) => (
                    <option value={food._id} key={index}>{food.foodName}</option>
                  ))}
               </select>
           </div>
           <div>
              <label htmlFor="">Date (optional)</label>
              <input type="date" onChange={(e) => setExportDate(e.target.value)} />
           </div>
           <div>
              <label htmlFor="">Quantity</label>
              <input type="number" onChange={(e) => setQuantity(e.target.value)} />
           </div>
           <button onClick={handleSubmit}>Save Export</button>
      </div>
    )
}

export default AddExport