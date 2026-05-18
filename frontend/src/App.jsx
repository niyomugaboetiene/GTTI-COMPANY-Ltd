import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login";

import AddFood from "./pages/AddFood";
import FoodList from "./pages/FoodList";

import AddImport from "./pages/AddImport";
import ImportList from "./pages/ImportList";

import AddExport from "./pages/AddExport";
import ExportList from "./pages/ExportList";

function App() {

  return (

    <BrowserRouter>

      <div className="min-h-screen bg-gray-100">

        <nav className="bg-blue-600 text-white p-4 flex gap-4">

          <Link to="/">Login</Link>

          <Link to="/add-food">Add Food</Link>
          <Link to="/food-list">Food List</Link>

          <Link to="/add-import">Add Import</Link>
          <Link to="/import-list">Import List</Link>

          <Link to="/add-export">Add Export</Link>
          <Link to="/export-list">Export List</Link>

        </nav>

        <Routes>

          <Route path="/" element={<Login />} />

          <Route path="/add-food" element={<AddFood />} />
          <Route path="/food-list" element={<FoodList />} />

          <Route path="/add-import" element={<AddImport />} />
          <Route path="/import-list" element={<ImportList />} />

          <Route path="/add-export" element={<AddExport />} />
          <Route path="/export-list" element={<ExportList />} />

        </Routes>

      </div>

    </BrowserRouter>

  )
}

export default App