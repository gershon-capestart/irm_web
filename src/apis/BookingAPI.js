import axios from "axios";
import constants from "../constants";

async function getAllBookingsForUser() {
  try {
    let response = await axios.get(constants.BASE_URL + `/admin/workspaces`);
    return response.data.data;
  } catch (e) {
    console.info(e);
    return [];
  }
}

async function getTodaysBookingForUser() {
  try {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = yyyy + "-" + mm + "-" + dd;

    let response = await axios.get(
      constants.BASE_URL +
        `/admin/workspaces?date=${formattedToday}&empCode=${constants.EMPLOYEE_CODE}`
    );
    return response.data.data;
  } catch (e) {
    console.info(e);
    return {};
  }
}

async function bookWorkspace(payload) {
  try {
    await axios.post(constants.BASE_URL + `/workspace`, payload);
  } catch (e) {
    console.info(e);
  }
}

export { getAllBookingsForUser, getTodaysBookingForUser, bookWorkspace };
