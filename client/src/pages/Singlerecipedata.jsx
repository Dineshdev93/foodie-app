import React from "react";
import "../CSS/singleRecipe.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/Usercontext";
import { useContext } from "react";
export default function Singlerecipedata() {
  const { user } = useContext(UserContext);

  const [recipes, setRecipes] = useState([]);
  const [reviews, setReviews] = useState([]);

  // states for reviews
  const [username, setUsername] = useState("");
  const [ratings, setRatings] = useState("");
  const [discription, setDiscription] = useState("");
  const params = useParams();
  const token = localStorage.getItem("authtoken");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  // recipe id
  const { id } = params;
  // Get reviews
  const fetchreviews = async () => {
    try {
      const response = await axios.get(
        `http://192.168.168.13:8000//review/api/getalldata/${id}`
      );
      // its reviews data
      const { recipedata } = response.data;
      setReviews(recipedata);
    } catch (error) {
      console.log(error);
    }
  };

  //  delete reviews
  const deleteReview = async (reviewid) => {
    try {
      const deleteReview = await axios.delete(
        `http://192.168.168.13:8000//review/api/deletereview/${reviewid}`,
        config
      );

      setReviews((preReviews)=>
         preReviews.filter((item)=>item._id !== reviewid)
      )

      toast.success("Review deleted succesfully");
      return deleteReview
    } catch (error) {
      console.log(error);
    }
  };

  const fetchdata = async () => {
    try {
      const response = await axios.get(
        `http://192.168.168.13:8000/recipes/api/getSinglerecipe/${id}`
      );
      const { recipedata } = response.data;
      setRecipes([recipedata]);
    } catch (error) {
      console.error("Error fetching recipe data:", error);
    }
  };

  

  useEffect(() => {
    fetchdata();
    fetchreviews();
  }, [id]);
  

  //  post review
  const reviewdata = {
    username,
    ratings,
    discription,
  };

  const handlepostreview = async () => {
    try {
      if (!token) {
        toast.error("Please login first !");
      } else if (!username || !ratings || !discription) {
        toast.error("Please provide details !");
      } else {
        const response = await axios.post(
          `http://192.168.168.13:8000/review/api/createreview/${id}`,
          reviewdata,
          config
        );
        const newdata = response.data ; 
        setReviews((prereview)=>[...prereview , newdata])
        setUsername("");
        setRatings("");
        setDiscription("");
        toast.success("Review added successfully !");
      }
    } catch (error) {
      console.log(error + "Error in  catch block");
    }
  };
  
  return (
    <section className="container">
      <div className="row single-recipe-container justify-content-between mb-5">
        {recipes.map((data, index) => {
          return (
            <>
              <div key={index} className="col-md-6 recipe-left-part">
                <h1>{data.recipename} </h1>
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
                  <p>{data.instruction}</p>
                </div>
                <div>
                  <h2>Ingredients</h2>
                  <ul>
                    {data.ingradients.map((ingrident, i) => {
                      return (
                        <>
                          <li>{ingrident}</li>
                        </>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <h2>Cooking Time: {data.cookingtime}</h2>
                </div>
              </div>
              <div className="col-md-5 recipe-right-part">
                <h2>Description</h2>
                <div className="recipe-right-part-para">
                  <p>{data.discription}</p>
                </div>
                {/*Post Reviews Section */}
                <div className="col-md-12 create-review">
                  <h3 className="review-title">Post Your Review</h3>

                  {/* Username Input */}
                  <div className="review-input-group">
                    <label htmlFor="">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={username}
                      id="username-input"
                      placeholder="Enter your name"
                      className="form-control"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  {/* Ratings Input */}
                  <div className="review-input-group">
                    <label htmlFor="rating-select" className="rating-label">
                      Rating
                    </label>
                    <select
                      name="ratings"
                      id="rating-select"
                      className="form-control"
                      value={ratings}
                      onChange={(e) => setRatings(e.target.value)}
                      required
                    >
                      <option value="">Select Rating</option>
                      <option value="Poor">1 - Poor</option>
                      <option value="Fair">2 - Fair</option>
                      <option value="Good">3 - Good</option>
                      <option value="Very Good">4 - Very Good</option>
                      <option value="Excellent">5 - Excellent</option>
                    </select>
                  </div>

                  {/* Description Input */}
                  <div className="review-input-group">
                    <label htmlFor="">About Recipe</label>
                    <textarea
                      name="description"
                      id="review-textarea"
                      placeholder="Describe your experience..."
                      rows="4"
                      className="form-control"
                      value={discription}
                      onChange={(e) => setDiscription(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  {/* Post Review Button */}
                  <div className="review-submit-group">
                    <button
                      className="btn btn-danger"
                      onClick={handlepostreview}
                    >
                      Post Review
                    </button>
                  </div>
                </div>
                <hr className="mt-5 mb-3" />
                {/*Get review section */}
                  <h3>Reviews</h3>
                    
                <div className="col-md-12 mt-4 review-card" >
                {reviews.map((reviewdata, i) => {
                  return (
                    <>
                        <div key={i} className=" review-header">
                          <div className="d-flex  gap-2">
                            <span className="review-label">
                              <FontAwesomeIcon icon={faUser} /> :
                            </span>
                            <span>{reviewdata.username}</span>
                          </div>
                        </div>
                        <div className="review-text">
                          {reviewdata.discription}
                          <div className="d-flex justify-content-between">
                            <div className="star-rating mt-1">
                              <FontAwesomeIcon
                                icon={faStar}
                                className="star-filled"
                              />
                              <FontAwesomeIcon
                                icon={faStar}
                                className="star-filled"
                              />
                              <FontAwesomeIcon
                                icon={faStar}
                                className="star-filled"
                              />
                              <FontAwesomeIcon icon={faStar} />
                              <FontAwesomeIcon icon={faStar} />
                            </div>
                           
                            <div>
                              {user && user._id === reviewdata.userId ? (
                                <span
                                  className="delete"
                                  onClick={() => deleteReview(reviewdata._id)}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                        <hr />
                    </>
                  );
                })}
                      </div>
              </div>
            </>
          );
        })}
      </div>
    </section>
  );
}
