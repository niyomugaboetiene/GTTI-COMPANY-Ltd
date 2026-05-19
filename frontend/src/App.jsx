import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import AddFood from "./pages/AddFood";
import FoodList from "./pages/FoodList";

import AddImport from "./pages/AddImport";
import ImportList from "./pages/ImportList";
import UpdateImport from "./pages/UpdateImport";

import AddExport from "./pages/AddExport";
import ExportList from "./pages/ExportList";
import UpdateExport from "./pages/UpdateExport";
import UpdateFood from "./pages/UpdateFood";
import Report from "./pages/Report";

function App() {

  return (

    <BrowserRouter>

      <div className="min-h-screen bg-gray-100">

     <div className="flex justify-between bg-blue-600 p-2 flex-wrap">
      <div>
        <h1 className="text-3xl text-white font-bold mt-3 ms-12">GTTI</h1>
      </div>
      <div>
        <nav className=" text-white p-4 flex space-x-5">

          <Link to="/">Home</Link>

          <Link to="/add-food">Add Food</Link>
          <Link to="/food-list">Food List</Link>

          <Link to="/add-import">Add Import</Link>
          <Link to="/import-list">Import List</Link>

          <Link to="/add-export">Add Export</Link>
          <Link to="/export-list">Export List</Link>
          <Link to="/report">Report</Link>
        </nav>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-900 text-white px-4 h-8 mt-3">Register</button>
          <button className="bg-blue-900 text-white px-4 h-8 mt-3">Login</button>
        </div>
     </div>


        <Routes>

          <Route path="/add-food" element={<AddFood />} />
          <Route path="/food-list" element={<FoodList />} />
          <Route path="/report" element={<Report />} />

          <Route path="/add-import" element={<AddImport />} />
          <Route path="/import-list" element={<ImportList />} />
          <Route path="/import/update/:id" element={<UpdateImport />} />

          <Route path="/add-export" element={<AddExport />} />
          <Route path="/export-list" element={<ExportList />} />
          <Route path="/export/update/:id" element={<UpdateExport />} />
          <Route path="/food/update/:id" element={<UpdateFood />} />

        </Routes>

      </div>

    </BrowserRouter>

  );
}

export default App;