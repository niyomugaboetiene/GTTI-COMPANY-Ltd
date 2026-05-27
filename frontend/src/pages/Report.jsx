import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Report() {
    const [exportsData, setExportsData] = useState([]);
    const [imports, setImports] = useState([]);
    const [isAuth, setIsAuth] = useState(true);
    const navigate = useNavigate();

    const getExports = async () => {
        try {
           const res = await axios.get("http://localhost:5000/export", { withCredentials: true });
           setExportsData(res.data.export);
        }   catch (err) {
            console.error(err);
            const status = err.response?.status;
            if (status === 401) {
                setIsAuth(false);
            }
        }
    };

    const getImports = async () => {
        try {
           const res = await axios.get("http://localhost:5000/import", { withCredentials: true });
           setImports(res.data.import);

        }  catch (err) {
            console.error(err);
            const status = err.response?.status;
            if (status === 401) {
                setIsAuth(false);
            }
        }
    };

    useEffect(() => {
        getImports();
    }, []);
    useEffect(() => {
        getExports();
    }, []);

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
        <div className="bg-gray-100 min-h-screen flex justify-center items-start">
            <div className="text-wrap absolute mt-4">
            <h1 className="text-xl font-bold text-blue-500">Welcome to GTTI Company ltd </h1>

            </div>
            <div className="mt-20 bg-blue-100 p-6 w-full max-w-4xl rounded-xl shadow-lg me-12">

                <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
                    Export List
                </h1>

                <table className="w-full border-collapse">

                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="border p-3">Food</th>
                            <th className="border p-3">Quantity</th>
                        </tr>
                    </thead>

                    <tbody>
                        {exportsData.map((item) => (
                            <tr key={item._id} className="bg-white text-center hover:bg-gray-100">

                                <td className="border p-3">
                                    {item.foodId?.foodName || "No food name"}
                                </td>

                                <td className="border p-3">
                                    {item.quantity}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

              <div className="mt-20 bg-blue-100 p-6 w-full max-w-4xl rounded-xl shadow-lg">

                <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
                    Import List
                </h1>

                <table className="w-full border-collapse">

                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="border p-3">Food</th>
                            <th className="border p-3">Quantity</th>
                        </tr>
                    </thead>

                    <tbody>

                        {imports.map((item) => (
                            <tr key={item._id} className="bg-white text-center hover:bg-gray-100">

                                <td className="border p-3">
                                    {item.foodId?.foodName || "No food name"}
                                </td>

                                <td className="border p-3">
                                    {item.quantity}
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>
        </div>
    );
}

export default Report;