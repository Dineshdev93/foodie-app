import React from "react";
import "../CSS/footer.css";
import { useContext } from "react";
import {UserContext} from "../context/Usercontext"
export default function Footer() {
  const {user} = useContext(UserContext)
  return (
    <div>
      <footer className="bg-dark text-light pt-4 pb-2 footer_conatiner">
        <div className="container">
          <div className="row ">
            <div className="col-md-4 mb-3">
              <h5>About RecipeApp</h5>
              <p>
                Discover a variety of delicious recipes from around the world.
                Whether you’re a beginner or a pro, our collection will inspire
                you to create amazing dishes.
              </p>
            </div>

            <div className="col-md-2 mb-3">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/" className="text-decoration-none text-light">
                    Home
                  </a>
                </li>
                {
                 user ? 
                <li>
                  <a
                    href="/create-recipe"
                    className="text-decoration-none text-light"
                  >
                    Create Recipe
                  </a>
                </li> : ""
                }
                <li>
                  <a
                    href="/recipes"
                    className="text-decoration-none text-light"
                  >
                    Explore Recipes
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 mb-3">
              <h5>Contact Us</h5>
              <p>
                Email:{" "}
                <a
                  href="mailto:support@recipeapp.com"
                  className="text-decoration-none text-light"
                >
                  support@recipeapp.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href="tel:+1234567890"
                  className="text-decoration-none text-light"
                >
                  +1 234 567 890
                </a>
              </p>
            </div>

            <div className="col-md-3 mb-3">
              <h5>Follow Us</h5>
              <div className="social-icons d-flex justify-content-center gap-3">
                <a href="#" className="text-light">
                  <i class="fa-brands fa-facebook"></i>
                </a>
                <a href="#" className="text-light">
                  <i class="fa-brands fa-twitter"></i>
                </a>
                <a href="#" className="text-light">
                  <i class="fa-brands fa-instagram"></i>
                </a>
                <a href="#" className="text-light">
                  <i class="fa-brands fa-pinterest"></i>
                </a>
              </div>
            </div>
          </div>
          <hr className="text-secondary" />
          <div className="text-center">
            <p>&copy; 2024 RecipeApp. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
