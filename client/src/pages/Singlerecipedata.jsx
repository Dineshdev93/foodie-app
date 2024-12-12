import React from "react";
import "../CSS/singleRecipe.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function Singlerecipedata() {
  const [recipes, setRecipes] = useState([]);
  const params = useParams();

  const { id } = params;
  const fetchdata = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/recipes/api/getSinglerecipe/${id}`
      );
      const { recipedata } = response.data;
      setRecipes([recipedata]);
      console.log(recipes);
    } catch (error) {
      console.error("Error fetching recipe data:", error);
    }
  };
  useEffect(() => {
    fetchdata();
  }, [id]);

  return (
    <section className="container">
      <div className="row single-recipe-container">
        {
         recipes.map((data,index)=>{
            return(
                < >
           <div className="col-md-6 recipe-left-part">
          <h1>{data.recipename}  </h1>
          <div className="image-section">
            <img
              src={`${data.recipeImg}`}
              className="recipe-image"
              width={600}
              alt="Pizza"
            />
          </div>
          <div>
            <h2>Instructions</h2>
            <p>
               {data.instruction}
            </p>
          </div>
          <div>
            <h2>Ingredients</h2>
            <ul>
              {
                 data.ingradients.map((ingrident,i)=>{
                    return(
                        <>
                           <li>{ingrident}</li>
                        </>
                    )
                 })
              }
            </ul>
          </div>
          <div>
            <h2>Cooking Time: {data.cookingtime}</h2>
          </div>
        </div>
        <div className="col-md-6 recipe-right-part">
          <h2>Description</h2>
          <div className="recipe-right-part-para">
            <p>{data.discription}</p>
          </div>
        </div>     
                </>
            )
         })
        }
      </div>
    </section>
  );
}
