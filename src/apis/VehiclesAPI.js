import axios from "axios";
import constants from "../constants";

async function adminGetAllVehicles() {
  try {
    let response = await axios.get(constants.BASE_URL + `/admin/vehicles`);
    return response.data.data;
  } catch (e) {
    console.info(e);
    return [];
  }
}

async function getMyVehicles() {
  try {
    let response = await axios.get(
      constants.BASE_URL + `/vehicles?searchKey=${constants.EMPLOYEE_CODE}`
    );
    return response.data.data;
  } catch (e) {
    console.info(e);
    return [];
  }
}

export { adminGetAllVehicles, getMyVehicles };
