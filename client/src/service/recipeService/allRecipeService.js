import { createRecipe } from "../../api/recipeapi/allRecipeapi";
import {getAlldata}   from '../../api/recipeapi/allRecipeapi'

// create recipes service
export const createRecipeService = async (formdata,config, ) => {
  try {
    const result = await createRecipe(formdata,config);
    return result;
  } catch (error) {
    console.log(error + "error at service");
  }
};

//  get all recipes data service
export const getallrecipedataService = async (search,page) => {
    try {
        const response = await getAlldata(search,page)
        return response ; 
    } catch (error) {
      console.log(error);
      
    }
}

