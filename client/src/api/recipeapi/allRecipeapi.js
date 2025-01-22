
import axios from "axios";
const api_url = "http://192.168.168.13:8000/recipes/api";

// create recipe api 
export const createRecipe = async (formdata,config ) => {
  try {
    const response = await axios.post(
      `${api_url}/createRecipe`,
      formdata,
      config,
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// get recipes with  search and pagination 

export const getAlldata = async(search,page) =>{
     try {
      const response = await axios.get(
        `http://192.168.168.13:8000/recipes/api/getAll/`,
        {
          // get params from the help of inbult axios params
          params: { search , page },
        }
      );
      return response
     } catch (error) {
        console.log(error+"catch block error");
     }
}
