/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios.post("http://localhost:3000/api/v1/users/signup", {
      name,
      email,
      password,
      passwordConfirm,
    });

    if (res.data.status === "Success") {
      showAlert("success", "Account created successfully");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const login = async (email, password) => {
  try {
    const res = await axios.post("http://localhost:3000/api/v1/users/login", {
      email,
      password,
    });

    if (res.data.status === "Success") {
      showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/v1/users/logout");

    if (res.data.status === "Success") location.reload(true);
  } catch (err) {
    showAlert("error", "Error logging out! Try again.");
  }
};
