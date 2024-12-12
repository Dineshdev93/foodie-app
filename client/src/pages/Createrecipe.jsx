import React from "react";
import "../CSS/createrecipe.css";
import { useState } from "react";
import { createRecipeService } from "../service/recipeService/allRecipeService";
import { toast } from "react-toastify";
import Spiner from "../Spiner/Spiner";
import { useNavigate } from "react-router-dom";
export default function Createrecipe() {
  const [recipename, setRecipaname] = useState("");
  const [recipeImg, setRecipeimg] = useState("");
  const [discription, setDiscription] = useState("");
  const [instruction, setInstruction] = useState("");
  const [cookingtime, setCookingtime] = useState("");
  const [ingradients, setIngridents] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [ingredientInput, setIngredientInput] = useState(""); // For single input

  // Add ingredient from the input
  const addIngredient = () => {
    if (ingredientInput.trim() !== "") {
      setIngridents([...ingradients, ingredientInput.trim()]);
      setIngredientInput(""); // Clear the input
    }
  };

  // Add ingredient on pressing "Enter"
  const handleAddIngredient = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient();
    }
  };

  // Remove an ingredient
  const removeIngredient = (index) => {
    setIngridents(ingradients.filter((_, i) => i !== index));
  };

  // Create a new FormData object
  const formData = new FormData();
  // Append all the data to the FormData object
  formData.append("recipename", recipename);
  formData.append("recipeImg", recipeImg); // For the image file
  formData.append("discription", discription);
  formData.append("instruction", instruction);
  formData.append("cookingtime", cookingtime);
  formData.append("ingradients", JSON.stringify(ingradients)); // Send the ingredients as a JSON array

  const token = localStorage.getItem("authtoken");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    },
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !recipename ||
      !recipeImg ||
      !discription ||
      !instruction ||
      !cookingtime ||
      !ingradients
    ) {
      toast.error("Please fill all fields !");
      return;
    }
    setLoader(true);
    try {
      const response = await createRecipeService(formData, config);
      setLoader(false);
      toast.success("Recipe created successfully !");
      navigate("/");
      return response;
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  return (
    <>
      {loader ? (
        <Spiner />
      ) : (
        <div className="recipe-form-container container mt-5 mb-5">
          <h2>Create a New Recipe</h2>
          <form className="recipe-form row justify-content-center">
            <div className="col-md-6">
              <label>
                Recipe Name:
                <input
                  type="text"
                  name="recipename"
                  value={recipename}
                  onChange={(e) => setRecipaname(e.target.value)}
                  placeholder="Enter recipe name"
                  required
                />
              </label>
            </div>
            <div className="col-md-6">
              <label>
                Recipe Image URL:
                <input
                  type="file"
                  name="recipeImg"
                  onChange={(e) => setRecipeimg(e.target.files[0])}
                  placeholder="Enter image URL"
                  required
                />
              </label>
            </div>
            <div className="col-md-6">
              <label>
                Description:
                <textarea
                  name="discription"
                  value={discription}
                  onChange={(e) => setDiscription(e.target.value)}
                  placeholder="Enter a brief description"
                  required
                />
              </label>
            </div>
            <div className="col-md-6">
              <label>
                Instructions:
                <textarea
                  name="instruction"
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  placeholder="Enter cooking instructions"
                  required
                />
              </label>
            </div>

            <div className="col-md-6">
              <label>
                Ingredients:
                <div className="ingredients-input">
                  <input
                    type="text"
                    name="ingredientInput"
                    placeholder="Add an ingredient"
                    value={ingredientInput}
                    onChange={(e) => setIngredientInput(e.target.value)}
                    onKeyDown={(e) => handleAddIngredient(e)}
                  />
                  <button
                    type="button"
                    onClick={addIngredient}
                    disabled={!ingredientInput.trim()}
                    className="add-ingredient"
                  >
                    + Add
                  </button>
                </div>
                <div className="ingredients-tags row ">
                  {ingradients.map((ingredient, index) => (
                    <div className="col-md-5">
                      <span key={index} className="ingredient-tag">
                        {ingredient}
                        {ingradients.length > 0 && (
                          <div
                            className="remove-tag"
                            onClick={() => removeIngredient(index)}
                          >
                            ✖
                          </div>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </label>
            </div>

            <div className="col-md-6">
              <label>
                Cooking Time:
                <input
                  type="text"
                  name="cookingtime"
                  value={cookingtime}
                  onChange={(e) => setCookingtime(e.target.value)}
                  placeholder="Enter cooking time (e.g., 1/2 h)"
                  required
                />
              </label>
            </div>
            <div className="col-md-6">
              <button
                type="submit"
                className="submit-button"
                onClick={handleSubmit}
              >
                Submit Recipe
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
