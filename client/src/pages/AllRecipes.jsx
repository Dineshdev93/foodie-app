import React, { useEffect, useState } from "react";
import "../CSS/allrecipes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getallrecipedataService } from "../service/recipeService/allRecipeService";
import {NavLink} from 'react-router-dom'
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
const AllRecipes = () => {
  // All states
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagecount, setPageCount] = useState(0);
   

  const fetchrecipedata = async () => {
    try {
      const response = await getallrecipedataService(search, page);
      // get recipe data and pagination data destructure
      const { recipedata, pagination } = response.data;
      setRecipes(recipedata);
      setPageCount(pagination.pageCount);
    } catch (error) {
      console.log(error);
    }
  };

  const userdata = recipes.map(element => {
    return element.userData;
  });

  console.log(userdata);
  
  

  useEffect(() => {
    fetchrecipedata();
  }, [search, page]);

  const handlenextpage = () => {
    if (page < pagecount) {
      setPage(page + 1);
    }
  };
  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  // handle input box
  const emptybox = () => {
    setSearch("");
  };
  return (
    <section className="container">
      <h1 className="text-center mt-5">Explore Our Exclusive Recipes</h1>
      <div className="row justify-content-center">
        <div className="col-md-6 saerch-section">
          <div className="position-relative">
            <input
              type="text"
              name="search"
              value={search}
              placeholder="Search for your favorite recipe"
              className="searchInput"
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="cross-icon" onClick={emptybox}>
              ✖
            </div>
          </div>
        </div>
      </div>

      <div className="row  recipeSection ">
        {recipes.map((data, i) => {
          return (
            <>
              <div className="col-md-4 mt-4">
                <div key={i} className="card recipeCard">
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src={data.recipeImg}
                      width={20}
                      className="card-img-top"
                      alt="..."
                    />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">
                      <b>{data.recipename}</b>
                    </h3>
                    <p className="card-text">{data.discription}</p>
                    <NavLink to={`/getSingleRecipedata/${data._id}`}>View Recipe</NavLink>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 mb-4 d-flex justify-content-end align-items-end next-previious-icon">
        <span
          className="icon me-2"
          onClick={handlePreviousPage}
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </span>
        <span className="mx-2" style={{ color: "rgb(139 40 40)" }}>
          Page {page} of {pagecount}
        </span>
        <span
          className="icon"
          onClick={handlenextpage}
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </span>
      </div>
    </section>
  );
};

export default AllRecipes;
