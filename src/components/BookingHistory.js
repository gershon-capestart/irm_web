import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import { getAllBookingsForUser } from "../apis/BookingAPI";

import NavBar from "./NavBar";

function BookingHistory() {
  const [bookings, setBooking] = useState([]);

  useEffect(() => {
    getAllBookingsForUser().then((response) => {
      setBooking(response);
    });
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container" style={{ width: "50%" }}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Booking #</th>
              <th scope="col">Date</th>
              <th scope="col">Buidling</th>
              <th scope="col">Floor</th>
              <th scope="col">Shift</th>
              <th scope="col">Dinner</th>
              <th scope="col">snacks</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => {
              return (
                <tr>
                  <th scope="row">{booking.workspaceId}</th>
                  <td>{booking.bookedDate}</td>
                  <td>{booking.buildingName}</td>
                  <td>{booking.floorName}</td>
                  <td>{booking.shift}</td>
                  <td>Yes</td>
                  <td>No</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingHistory;
