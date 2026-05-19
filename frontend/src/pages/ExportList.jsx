import axios from "axios";
import { useEffect, useState } from "react";

function ExportList() {

    const [exportsData, setExportsData] = useState([]);

    const getExports = async () => {

        const res = await axios.get(
            "http://localhost:5000/export"
        );

        setExportsData(res.data.export);
    };

    useEffect(() => {
        getExports();
    }, []);

    return (

        <div className="p-6">

            <div className="bg-white p-5 rounded shadow">

                <h1 className="text-2xl font-bold mb-4">
                    Export List
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
                            exportsData.map((item) => (

                                <tr key={item._id}>

                                    <td className="border p-2">
                                        {item.foodId?.foodName}
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

export default ExportList