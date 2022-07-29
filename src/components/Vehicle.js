import { useState, useEffect } from "react";

import NavBar from "./NavBar";

import { getMyVehicles } from "../apis/VehiclesAPI";

export default function AdminVehicles() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    getMyVehicles().then((response) => {
      setVehicles(response);
    });
  }, []);

  return (
    <div className="container">
      <NavBar></NavBar>
      <div style={{ marginTop: 50 }}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Vehicle Id #</th>
              <th scope="col">Vehicle Model</th>
              <th scope="col">Employee Code</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => {
              return (
                <tr>
                  <th scope="row">{vehicle.vehicleId}</th>
                  <th>{vehicle.vehicleModel}</th>
                  <th>{vehicle.empCode}</th>
                  <th>{vehicle.status}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
