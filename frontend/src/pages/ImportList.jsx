import axios from "axios";
import { useEffect, useState } from "react";

function ImportList() {

    const [imports, setImports] = useState([]);

    const getImports = async () => {

        const res = await axios.get(
            "http://localhost:5000/import"
        );

        setImports(res.data.import);
    };

    useEffect(() => {
        getImports();
    }, []);

    return (

        <div className="p-6">

            <div className="bg-white p-5 rounded shadow">

                <h1 className="text-2xl font-bold mb-4">
                    Import List
                </h1>

                <table className="w-full border">

                    <thead className="bg-gray-200">

                        <tr>

                            <th className="border p-2">Food</th>
                            <th className="border p-2">Quantity</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            imports.map((item) => (

                                <tr key={item._id}>

                                    <td className="border p-2">
                                        {item.foodId?.foodName || "No food name"}
                                    </td>

                                    <td className="border p-2">
                                        {item.quantity}
                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>
    )
}

export default ImportList