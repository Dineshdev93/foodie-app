import React, { useState } from "react";
import "../CSS/home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import {UserContext} from '../context/Usercontext'
import { useContext } from "react";
export default function Home() {
  const [pizaaimg, setPizaaImg] = useState("./pizaa.png");
  const [dishplatecontent, setDishplateContent] = useState(
    " Peppy pizaa paneer"
  );
  const [animationKey, setAnimationKey] = useState(0);
  const [dishplatekey, setDishplateKey] = useState(0);
  const [heading, setHeading] = useState("Pizaa");
  const [recipe, setRecipe] = useState(
    "Making the perfect pizza starts with a crispy, flavorful base. Spread a generous layer of tangy tomato sauce, and sprinkle a mix of mozzarella, parmesan, and cheddar cheese for a gooey topping. Add your favorite toppings like pepperoni, bell peppers, mushrooms, or fresh basil. Bake it in a preheated oven at 250°C (480°F) until the crust is golden brown and the cheese is bubbly. Serve hot, and enjoy a slice of Italy at home!"
  );
  const changePizaaImg = (image, content, recipeContent, tagline) => {
    setPizaaImg(image); // Change image
    setDishplateContent(content);
    setHeading(tagline);
    setRecipe(recipeContent);
    setAnimationKey((prevKey) => prevKey + 1); // Increment animation key
    setDishplateKey((prevKey) => prevKey + 1);
  };
 
  // validation for user 
   const {user}  = useContext(UserContext)

  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="row ">
            <div className="col-md-6 herosection-left">
              <h1 className="hero-title">
                Welcome to <span>Recipe</span> Hub
              </h1>
              <p className="hero-subtitle">
                Discover a world of delicious recipes that will tantalize your
                taste buds and inspire your inner chef! From mouthwatering
                appetizers to hearty main courses and indulgent desserts, find
                everything you need to create culinary magic in one seamless
                experience. Whether you're a seasoned cook or just starting out,
                our collection is designed to make cooking fun, easy, and
                memorable.
              </p>
              <div className="hero-buttons mt-5">
                <a href="/allrecipes" className=" me-3">
                  Explore Recipes{" "}
                  <span>
                    <FontAwesomeIcon
                      className="arrow-icon"
                      icon={faArrowRightLong}
                    />
                  </span>
                </a>
              </div>
            </div>
            <div className="col-md-6 rotating d-flex justify-content-center align-items-center">
              <img className="circle" src="/sef.png" alt="circle" />
            </div>
          </div>
        </div>
      </section>

      <section className="baner-section mt-5 mb-5">
        <div className="container">
          <div className="row mt-5">
            {/* column first */}
            <div className="col-md-4 main-section mt-5 mb-5">
              <h1 className="recipe-heading">Recipe for {heading}</h1>
              <p>{recipe}</p>
              <div className="hero-buttons mt-3 d-flex">
                <a
                  href={user ? "/createRecipe" : "/login"}
                  className="text-center"
                  style={{ marginTop: "4rem", backgroundColor:"rgb(0,10,58)"}}
                >
                  Create Recipe
                  {/* <span>
                    <FontAwesomeIcon
                      className="arrow-icon"
                      icon={faArrowRightLong}
                    />
                  </span> */}
                </a>
              </div>
            </div>
            {/* column 2nd */}
            <div className="col-md-5">
              <div className="d-flex flex-column justify-content-center align-items-center position-relative">
                <div>
                  <img
                    src={pizaaimg}
                    key={animationKey}
                    className="pizaaclass pulse"
                    alt=""
                    width={400}
                  />
                </div>
                <div className="dishplate pulse mt-4" key={dishplatekey}>
                  <img src={"./dishplate.png"} alt="" width={200} />
                  <div className="paneer">{dishplatecontent}</div>
                </div>
              </div>
            </div>
            {/* column 3rd */}
            <div className="col-md-3 mt-5" style={{ cursor: "pointer" }}>
              <div className="food-images d-flex flex-column justify-content-end align-items-end">
                <div className="mb-3">
                  <img
                    src="./pizaa.png"
                    onClick={() =>
                      changePizaaImg(
                        "./pizaa.png",
                        "Peppy pizaa paneer",
                        "Making the perfect pizza starts with a crispy, flavorful base. Spread a generous layer of tangy tomato sauce, and sprinkle a mix of mozzarella, parmesan, and cheddar cheese for a gooey topping. Add your favorite toppings like pepperoni, bell peppers, mushrooms, or fresh basil. Bake it in a preheated oven at 250°C (480°F) until the crust is golden brown and the cheese is bubbly. Serve hot, and enjoy a slice of Italy at home!",
                        "Pizaa"
                      )
                    }
                    width={60}
                    alt=""
                  />
                </div>
                <div className="mb-3">
                  <img
                    src="./pasta.png"
                    width={60}
                    onClick={() =>
                      changePizaaImg(
                        "./pasta.png",
                        "Delicious Pasta Recipe",
                        "Cook pasta of your choice until al dente in salted boiling water. In a pan, sauté garlic and onions in olive oil, then add fresh tomatoes or a rich marinara sauce. Toss in cooked pasta and mix well, coating each strand with the sauce. Add a sprinkle of parmesan cheese, fresh basil, and a dash of Italian herbs for extra flavor. Serve warm with a side of garlic bread for a hearty and comforting meal!",
                        "Pasta"
                      )
                    }
                    alt=""
                  />
                </div>
                <div className="mb-3">
                  <img
                    src="./pasta2.png"
                    width={60}
                    onClick={() =>
                      changePizaaImg(
                        "./pasta2.png",
                        "Spring Pasta Recipe",
                        "Cooking the perfect pasta starts with boiling it to al dente in salted water. Sauté garlic in olive oil, then toss in vibrant spring veggies like asparagus, peas, and cherry tomatoes. Add a touch of lemon zest and juice for a tangy twist. Mix the pasta with the veggies, sprinkle with parmesan and basil, and finish with a drizzle of olive oil. A fresh, light, and utterly delightful springtime dish awaits!",
                        "Spring Pasta"
                      )
                    }
                    alt=""
                  />
                </div>
                <div className="mb-3">
                  <img
                    src="./burger.png"
                    width={60}
                    onClick={() =>
                      changePizaaImg(
                        "./burger.png",
                        "Tasty Tomato Pizaa Recipe",
                        "Shape freshly ground beef into patties and season with salt, pepper, and garlic powder. Grill or pan-fry until cooked to your liking. Toast burger buns and layer with crisp lettuce, juicy tomato slices, and pickles. Add the patty, a slice of cheese, and caramelized onions or your favorite sauce. Serve warm with a side of fries or salad for a satisfying meal!",
                        "Tomato Pizza"
                      )
                    }
                    alt=""
                  />
                </div>
                <div className="mb-3">
                  <img
                    src="./sandwich.png"
                    width={60}
                    onClick={() =>
                      changePizaaImg(
                        "./sandwich.png",
                        "Tasty Noddles Recipe",
                        "Begin with your favorite bread—sourdough, multigrain, or a baguette. Add crisp lettuce and juicy tomato for a fresh crunch. Layer with turkey, ham, or roasted chicken, or go veggie with creamy avocado and grilled vegetables. Sprinkle with salt, pepper, and a drizzle of olive oil or dressing. Top with cheese, add the second slice, and grill for a toasty finish or enjoy fresh. Perfect with chips!!",
                        "Tasty Noodles"
                      )
                    }
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="./torte.png"
                    width={60}
                    onClick={() =>
                      changePizaaImg(
                        "./torte.png",
                        "Torte Cake Recipe",
                        "Choose your favorite bread—sourdough, multigrain, or baguette. Layer it with crisp lettuce and juicy tomato for freshness. Add thinly sliced turkey, ham, or roasted chicken, or go veggie with avocado and grilled vegetables. Season with salt, pepper, and a drizzle of olive oil or dressing. Top with cheese, close with the second slice, and grill for warmth or enjoy it fresh. Pair with chips for a perfect bite!",
                        "Torte Cake"
                      )
                    }
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="mt-5 " />
      </div>

      <section class="how-it-works">
        <div class="container text-center mt-5">
          <h2 style={{ color: "black" }}>How It Works</h2>
          <div class="row">
            <div class="col-md-4 mb-4">
              <div class="card h-100 shadow-sm">
                <img
                  src="/search.jpg"
                  class="card-img-top"
                  alt="Search Recipes"
                />
                <div class="card-body">
                  <h4 class="card-title">Search Recipes</h4>
                  <p class="card-text">
                    Find the perfect recipe by searching with keywords or
                    ingredients. Discover new dishes to try every day.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card h-100 shadow-sm">
                <img
                  src="./mealplan.jpg"
                  class="card-img-top"
                  alt="Choose Meal Plan"
                />
                <div class="card-body">
                  <h4 class="card-title">Choose Meal Plan</h4>
                  <p class="card-text">
                    Select a meal plan that fits your preferences, whether it’s
                    a quick snack or a full-course dinner.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card h-100 shadow-sm">
                <img src="./share.webp" class="card-img-top" alt="Enjoy Dish" />
                <div class="card-body">
                  <h4 class="card-title">Enjoy & Share</h4>
                  <p class="card-text">
                    Cook your selected recipe, enjoy the delicious meal, and
                    share your cooking experience with friends and family.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
