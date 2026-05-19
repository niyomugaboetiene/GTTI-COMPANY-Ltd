import axios from "axios";
import { useEffect, useState } from "react";

function AddExport() {

    const [exportDate, setExportDate] = useState("");
    const [foodId, setFoodId] = useState("");
    const [quantity, setQuantity] = useState("");

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

        await axios.post(
            "http://localhost:5000/exports/add", { foodId, exportDate, quantity }
        );

        alert("Export Added");
    };

    return (
      <div>
           <div>
               <label htmlFor="">Food</label>
               <select >
                  {foods.map((food, index) => (
                    <option value={food._id} key={index}>{food.foodName}</option>
                  ))}
               </select>
           </div>
      </div>
    )
}

export default AddExport