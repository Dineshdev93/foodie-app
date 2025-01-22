import axios from "axios";
import { toast } from "react-toastify";

const api_url = "http://192.168.168.13:8000/userAuth/api/";

// Register a user 
export const registerUser = async (formdata, config) => {
  try {
    const result = await axios.post(`${api_url}register`, formdata, config);
    return result;
  } catch (error) {
    console.error("Error in registerUser:", error); // Improved error logging
    throw error; // Re-throw the error for proper handling at higher levels
  }
};

// login user api call
export const loginuserapi = async (data) => {
  try {
    const logindata = await axios.post(`${api_url}login`, data);
    return logindata;
  } catch (error) {
    console.log("Error in login", error);
    throw error;
  }
};

//  forgot password api call
export const forgotpasswordapi = async (data) => {
  try {
    const result = await axios.post(`${api_url}forgotpassword`, data);
    if(result.status === 200){
      toast.success("Password reset link sent successfully to your email !");
    }
    return result.data;
  } catch (error) {
      if(error.response){
          console.log("server error" , error.response.data.error);
          toast.error(error.response.data.error)
          throw new Error(error.response.data.error)
      }else{
        console.error("Unexpected Error:", error.message);
        throw new Error("An unexpected error occurred");
      }
  }
};



