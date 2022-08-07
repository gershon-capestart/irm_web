import "./App.css";
import Login from "./components/Login";
import Vehicle from "./components/Vehicle";
import BookingHistory from "./components/BookingHistory";
import Workspace from "./components/WorkspaceBooking";
import AdminWorkspace from "./components/AdminWorkspace";

import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom";
import AdminVehicles from "./components/AdminVehicles";
import AdminBuildings from "./components/AdminBuildings";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/booking-history" element={<BookingHistory />} />
          <Route path="/workspace-booking" element={<Workspace />} />
          <Route path="/vehicles" element={<Vehicle />} />
          <Route path="/admin/workspace" element={<AdminWorkspace />} />
          <Route path="/admin/vehicles" element={<AdminVehicles />} />
          <Route path="/admin/buildings" element={<AdminBuildings />} />
          <Route path="/*" element={<p>404</p>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
