import { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";

import { getAllBookingsForUser } from "../apis/BookingAPI";

export default function AdminWorkspace() {
  const [bookings, setBooking] = useState([]);

  useEffect(() => {
    getAllBookingsForUser().then((response) => {
      setBooking(response);
    });
  }, []);

  return (
    <div className="container">
      <AdminNavBar></AdminNavBar>
      <div style={{ marginTop: 50 }}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Booking #</th>
              <th scope="col">Employee Code </th>
              <th scope="col">Employee Name #</th>
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
                  <td>{booking.employeeId}</td>
                  <td>{booking.employeeName}</td>
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
