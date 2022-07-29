import axios from "axios";
import constants from "../constants";

async function getFloorDetailsById(floorId) {
  try {
    let response = await axios.get(constants.BASE_URL + `/floor/${floorId}`);
    return response.data.data;
  } catch (e) {
    console.info(e);
    return [];
  }
}

async function getAllBuildings() {
  try {
    let response = await axios.get(constants.BASE_URL + `/buildings`);
    return response.data.data;
  } catch (e) {
    console.info(e);
    return [];
  }
}

async function getFloorsInBuilding(buildingId) {
  try {
    let response = await axios.get(
      constants.BASE_URL + `/building/${buildingId}/floor`
    );
    return response.data.data;
  } catch (e) {
    console.info(e);
    return [];
  }
}

async function getBookedSeatsInFloor(floorId) {
  try {
    let response = await axios.get(
      constants.BASE_URL + `/floor/${floorId}/seats/booked`
    );
    return response.data.data;
  } catch (e) {
    console.info(e);
    return [];
  }
}

export {
  getFloorDetailsById,
  getAllBuildings,
  getFloorsInBuilding,
  getBookedSeatsInFloor,
};
