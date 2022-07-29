import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import constants from "../constants";
import { getTodaysBookingForUser, bookWorkspace } from "../apis/BookingAPI";
import { getAllBuildings, getFloorsInBuilding } from "../apis/BuildingAPI";
import NavBar from "./NavBar";
import ViewSeat from "./ViewSeat";
import BookSeat from "./BookSeat";

function Workspace() {
  const [booking, setBooking] = useState({});
  const [newBooking, setNewBooking] = useState(false);
  const [newWorkspace, setNewWorkspace] = useState({});
  const [floors, setFloors] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [bookedRow, setBookedRow] = useState(0);
  const [bookedCol, setBookedCol] = useState(0);

  useEffect(() => {
    getTodaysBookingForUser().then((response) => {
      if (response.length === 0) {
        setBooking({});
      } else {
        setBooking(response[0]);
      }
    });

    getAllBuildings().then((response) => {
      setBuildings(response);
    });
  }, []);

  function setFormValues(name, value) {
    if (name === "buildingId") {
      getFloorsInBuilding(value).then((response) => setFloors(response));
    }

    setNewWorkspace({ ...newWorkspace, [name]: value });
  }

  async function prepDataAndBookWorkspace(e) {
    e.preventDefault();
    let requestBody = newWorkspace;
    requestBody["row"] = bookedRow;
    requestBody["column"] = bookedCol;
    requestBody["employeeId"] = constants.EMPLOYEE_CODE;
    console.log(requestBody);
    await bookWorkspace(requestBody);
    window.location.reload();
  }

  return (
    <div>
      <NavBar></NavBar>
      <div className="container" style={{ width: "50%", marginBottom: "30%" }}>
        {booking.floorId === undefined && (
          <div>
            <div className="jumbotron" style={{ marginTop: "5%" }}>
              <h1 className="display-4">Hi {localStorage.getItem("name")}, </h1>
              <p className="lead">
                Looks like you dont have any upcoming reservations, Click on the
                button below to book and workspace
              </p>
              <hr className="my-4"></hr>
              {!newBooking && (
                <p className="lead">
                  <a
                    className="btn btn-primary btn-lg"
                    role="button"
                    onClick={() => setNewBooking(true)}
                  >
                    Book a Workspace !
                  </a>
                </p>
              )}
            </div>
            {newBooking && (
              <div>
                <form>
                  <div className="form-group">
                    <p>Choose A Date</p>
                    <input
                      required
                      className="form-control"
                      type="date"
                      placeholder=""
                      onChange={(e) =>
                        setFormValues("bookingDate", e.target.value)
                      }
                    ></input>
                  </div>
                  <br></br>
                  <div className="form-group">
                    <p>Shift</p>
                    <select
                      required
                      className="form-control"
                      id="shift"
                      placeholder=""
                      onChange={(e) => setFormValues("shift", e.target.value)}
                    >
                      <option selected>Morning</option>
                      <option>General</option>
                      <option>Swing</option>
                      <option>Night</option>
                    </select>
                  </div>
                  <br></br>
                  <div className="form-group">
                    <p>Building</p>
                    <select
                      required
                      className="form-control"
                      id="shift"
                      placeholder=""
                      onChange={(e) =>
                        setFormValues("buildingId", e.target.value)
                      }
                    >
                      <option disabled={true}>Choose A Building</option>
                      {buildings.map((building) => {
                        return (
                          <option
                            value={building.buildingId}
                            key={building.buildingId}
                          >
                            {building.buildingName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <br></br>
                  <div className="form-group">
                    <p>Floor</p>
                    <select
                      className="form-control"
                      id="floor"
                      placeholder="Select A Floor"
                      required
                      onChange={(e) => setFormValues("floorId", e.target.value)}
                    >
                      <option disabled={true} selected>
                        Choose A Floor
                      </option>
                      {floors.map((floor) => {
                        return (
                          <option
                            key={floor.floorId}
                            value={floor.floorId}
                            onChange={(e) =>
                              setFormValues("floorId", e.target.value)
                            }
                          >
                            {floor.floorName}
                          </option>
                        );
                      })}
                    </select>

                    {newWorkspace["floorId"] !== undefined && (
                      <div className="form-group">
                        <p>Select Your seat</p>
                        <BookSeat
                          floorId={newWorkspace["floorId"]}
                          workspace={`Name`}
                          setBookedRow={setBookedRow}
                          setBookedCol={setBookedCol}
                        ></BookSeat>
                      </div>
                    )}
                  </div>
                  <br></br>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => prepDataAndBookWorkspace(e)}
                  >
                    Book Workspace !
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
        {booking.floorId !== undefined && (
          <div className="card" style={{ width: "100%", marginTop: "5%" }}>
            <div className="card-body">
              <h5 className="card-title">Booking #{booking.workspaceId}</h5>
              <p className="card-text">
                You have reserved the following seat for {booking.bookedDate}
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Building Name : </b>
                {booking.buildingName}
              </li>
              <li className="list-group-item">
                <b>Floor Name : </b>
                {booking.floorName}
              </li>
              <li className="list-group-item">
                <b>Shift : </b>
                {booking.shift}
              </li>
              <li className="list-group-item">
                <b>Dinner : </b>
                Yes
              </li>
              <li className="list-group-item">
                <b>Snacks : </b>
                No
              </li>
            </ul>
            <div className="card-body">
              <div style={{ marginLeft: "30%" }}>
                {booking.floorId !== undefined && (
                  <ViewSeat
                    floorId={booking.floorId}
                    bookedRow={booking.bookedRow}
                    bookedColumn={booking.bookedColumn}
                    workspace={`${booking.buildingName}, ${booking.floorName}`}
                  ></ViewSeat>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Workspace;
