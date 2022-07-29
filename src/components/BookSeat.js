import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";

import {
  getFloorDetailsById,
  getBookedSeatsInFloor,
} from "../apis/BuildingAPI";

export default function BookSeat(props) {
  const [floor, setFloor] = useState({});
  const [seats, setSeats] = useState({});
  const [bookedSeats, setBookedSeats] = useState({});
  const [selectedSeat, setSelectedSeat] = useState({});

  useEffect(() => {
    if (floor.floorId === undefined) {
      getFloorDetailsById(props.floorId).then((response) => {
        setFloor(response);
      });

      getBookedSeatsInFloor(props.floorId).then((response) => {
        setBookedSeats(response);
      });
    }
    if (seats[1] === undefined) {
      seatGenerator();
    }
  });

  function seatGenerator() {
    let rows = {};
    for (var i = 1; i <= floor.maxRow; i++) {
      rows[i] = [];
      for (var j = 1; j <= floor.maxColumn; j++) {
        let col = {};
        col["id"] = j;
        col["booked"] = false;
        rows[i].push(col);
      }
    }
    setSeats(rows);
    console.log(rows);
  }

  function seatSeatClass(seat) {
    if (seat === selectedSeat) {
      return "seat-col seat-selected";
    }
    if (bookedSeats[seat] === undefined) {
      return "seat-col seat-avaliable";
    } else {
      return "seat-col seat-taken";
    }
  }

  function setBookedRowAndCol(row, col) {
    props.setBookedRow(row);
    props.setBookedCol(col);
    setSelectedSeat(row + "x" + col);
  }

  function getBookedBy(seat) {
    if (bookedSeats[seat] === undefined) {
      return "Click to book this seat";
    }
    return bookedSeats[seat].bookedBy;
  }

  return (
    <div>
      <div
        style={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {seats[1] !== undefined &&
          Object.keys(seats).map((row) => {
            return (
              <div key={row + "x"} className="seat-row">
                {seats[row].map((col) => {
                  return (
                    <div
                      title={getBookedBy(row + "x" + col.id)}
                      key={col.id}
                      className={seatSeatClass(row + "x" + col.id)}
                      onClick={() => setBookedRowAndCol(row, col.id)}
                    ></div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
}
