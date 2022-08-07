import { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";

import { getAllBuildings, getFloorsInBuilding } from "../apis/BuildingAPI";
import { Button } from "react-bootstrap";

export default function AdminBuildings() {
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    getAllBuildings().then((buildings) => {
      console.log(buildings);
      setBuildings(buildings);
    });
  }, []);

  return (
    <div className="container">
      <AdminNavBar></AdminNavBar>
      <div style={{ marginTop: 50, textAlign: "center" }}>
        <span style={{ marginLeft: "50%" }}></span>
        <Button className="btn btn-primary">Create Building</Button>
        <span style={{ margin: 5 }}></span>
        <Button className="btn btn-primary ">Create Floor</Button>
        <div style={{ marginBottom: "5%" }}></div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Buidling Id #</th>
              <th scope="col">Buidling Name</th>
            </tr>
          </thead>
          <tbody>
            {buildings.map((building) => {
              return (
                <tr>
                  <th scope="row">{building.buildingId}</th>
                  <th>{building.buildingName}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
