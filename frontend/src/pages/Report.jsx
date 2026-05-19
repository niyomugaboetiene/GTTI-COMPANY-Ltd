import axios from "axios";
import { useEffect, useState } from "react";

function Report() {
    const [exportsData, setExportsData] = useState([]);
    const [imports, setImports] = useState([]);

    const getExports = async () => {
        const res = await axios.get("http://localhost:5000/export");
        setExportsData(res.data.export);
    };

    const getImports = async () => {
        const res = await axios.get("http://localhost:5000/import");
        setImports(res.data.import);
    };

    useEffect(() => {
        getImports();
    }, []);
    useEffect(() => {
        getExports();
    }, []);


    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-start">
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