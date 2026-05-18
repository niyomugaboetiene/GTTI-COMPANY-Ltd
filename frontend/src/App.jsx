import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import Foods from "./pages/Foods";
import Imports from "./pages/Imports";
import ExportsPage from "./pages/Exports";

function App() {

  return (
    <BrowserRouter>

      <div className="min-h-screen bg-gray-100">

        <nav className="bg-blue-600 text-white p-4 flex gap-4">

          <Link to="/">Login</Link>
          <Link to="/foods">Foods</Link>
          <Link to="/imports">Imports</Link>
          <Link to="/exports">Exports</Link>

        </nav>

        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/foods" element={<Foods />} />
          <Route path="/imports" element={<Imports />} />
          <Route path="/exports" element={<ExportsPage />} />

        </Routes>

      </div>

    </BrowserRouter>
  )
}

export default App