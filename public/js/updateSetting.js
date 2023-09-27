/* eslint-disable */

import axios from "axios";
import { showAlert } from "./alerts";

export const updateSettings = async (data, type) => {
  const url =
    type === "password"
      ? "http://localhost:3000/api/v1/users/updateMyPassword"
      : "http://localhost:3000/api/v1/users/updateMe";

  try {
    const res = await axios.patch(url, data);

    if (res.data.status === "Success") {
      showAlert("success", `${type.toUpperCase()} Updated Successfully!`);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
