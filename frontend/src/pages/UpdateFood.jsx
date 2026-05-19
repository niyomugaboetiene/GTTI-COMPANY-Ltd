import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateFood() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(true);

    const [formData, setFormData] = useState({
        foodName: "",
        foodOwnerName: ""
    });

    const getFoodById = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/foods/get/${id}`);
            setFormData(res.data.food);
        }    catch (err) {
            console.error(err);
            const status = err.response?.status;
            if (status === 401) {
                setIsAuth(false);
            }
    }
    };

    useEffect(() => {
        getFoodById();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try { 
          await axios.put(
            `http://localhost:5000/foods/update/${id}`,
            formData
        );

        alert("Food updated successfully");
        navigate("/food-list");
        }   catch (err) {
            console.error(err);
            const status = err.response?.status;
            if (status === 401) {
                setIsAuth(false);
            }
    }
    };

   if (!isAuth) {
        return (
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
               <div className="bg-sky-200 h-30 p-3 rounded-xl">
                  <h1 className="text-center mt-2">Please login to access this page.</h1>
                  <button onClick={() => navigate('/login')} className="bg-blue-500 px-6 py-2 mt-4 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors">Login</button>
               </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">

            <form
                onSubmit={handleUpdate}
                className="bg-white p-6 rounded-xl shadow w-full max-w-md"
            >

                <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
                    Update Food
                </h1>

                <input
                    type="text"
                    name="foodName"
                    value={formData.foodName}
                    onChange={handleChange}
                    placeholder="Food Name"
                    className="border p-2 w-full mb-3 rounded"
                />

                <input
                    type="text"
                    name="foodOwnerName"
                    value={formData.foodOwnerName}
                    onChange={handleChange}
                    placeholder="Owner Name"
                    className="border p-2 w-full mb-3 rounded"
                />

                <button className="bg-blue-600 text-white w-full py-2 rounded">
                    Update
                </button>

            </form>

        </div>
    );
}

export default UpdateFood;