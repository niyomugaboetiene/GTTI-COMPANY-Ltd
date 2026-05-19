import axios from "axios";
import { useEffect, useState } from "react";

function AddExport() {

    const [exportDate, setExportDate] = useState("");
    const [foodId, setFoodId] = useState("");
    const [quantity, setQuantity] = useState("");
    // foodId, exportsData, quantity

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
            "http://localhost:5000/exports/add",
            
        );

        alert("Export Added");
    };

    return (

      
    )
}

export default AddExport