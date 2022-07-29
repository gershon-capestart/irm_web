import { useEffect, useState } from "react";

import { getFloorDetailsById } from "../apis/BuildingAPI";

export default function ViewSeat(props) {
  const [floor, setFloor] = useState({});
  const [seats, setSeats] = useState({});

  useEffect(() => {
    if (floor.floorId === undefined) {
      getFloorDetailsById(props.floorId).then((response) => {
        setFloor(response);
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
        if (props.bookedRow == i && props.bookedColumn == j) {
          col["booked"] = true;
        } else {
          col["booked"] = false;
        }
        rows[i].push(col);
      }
    }
    setSeats(rows);
    console.log(rows);
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
                      key={col.id}
                      className={
                        col.booked ? "seat-col seat-booked" : "seat-col"
                      }
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
