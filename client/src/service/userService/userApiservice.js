import {
  loginuserapi,
  registerUser,
  forgotpasswordapi,
} from "../../api/userAuth/userAuthapi";

// Register a User service
export const registerService = async (formdata, config) => {
  try {
    return await registerUser(formdata, config);
  } catch (error) {
    console.error(
      "Error in registerService:",
      error.response?.data || error.message
    );
    throw error; // Ensure errors propagate to the caller
  }
};
// login  Userservice
export const loginService = async (data) => {
  try {
    const logindata = await loginuserapi(data);
    return logindata;
  } catch (error) {
    console.log("error in login", error);
    throw error;
  }
};
  // User forgot password service
export const forgotpasswordService = async (forgotdata) => {
  try {
    const forgotpassword = await forgotpasswordapi(forgotdata);
    return forgotpassword.data;
  } catch (error) {
    console.log(error);
  }
};


