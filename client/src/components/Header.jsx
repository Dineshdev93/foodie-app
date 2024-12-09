import { useContext,useEffect, useState } from "react";
import "../CSS/navbar.css";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/Usercontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const Header = () => {
  const { user,loggedUser } = useContext(UserContext);
  const [data,setData]  = useState("")
  useEffect(() => {
    loggedUser(); // Ensure user data is up-to-date
    userdata();
  }, []);
  
  const userdata = async () => {
    try {
      const token = localStorage.getItem("authtoken");

      if (token) {
        const response = await axios.get(
          "http://localhost:8000/userAuth/api/verifyUser",
          {
            headers: { authorization: token },
          }
        );
        setData(response.data);
        console.log("Token set");
        
      }
    } catch (error) {
      console.log(error + "Token not set");
      
    }
  };
  

  return (
    <header className="header_conatiner">
         {/* modal */}
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title " id="exampleModalLabel">User Profile</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
           <div className="userProfile">
                <div className="d-flex justify-content-center align-items-center">
                     <img src={data.userProfile} alt=""width={200} />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                <div className="d-flex flex-column mt-3">
                    <div className="d-flex justify-content-start align-items-center gap-2">
                         <h3><FontAwesomeIcon icon={faUser}/> : </h3> <span className="fs-5">{data.firstname} &nbsp; {data.atlastname}</span>
                    </div>
                    <div className="d-flex justify-content-start align-items-start gap-2">
                         <h3><FontAwesomeIcon icon={faEnvelope}/></h3> &nbsp; <span className="fs-5">{data.email}</span>
                    </div>
                </div>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <h3>Created Recipe</h3>
                     <ul>
                         <li>Pizza Recipe</li>
                         <li>Pasta Recipe</li>
                         <li>Milk Cake Recipe</li>
                         <li>Samosa Recipe</li>
                     </ul>
                </div>
           </div>
      </div>
    </div>
  </div>
</div>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{backgroundColor : "#F47822" }}
      >
        <div className="container">
          {/* Brand Logo */}
          <NavLink className="navbar-brand" to={"/"} style={{fontSize:"35px", color:"lavender"}}>
            {/* <img
              src="/logo.png"
              alt="Logo"
              width="250"
              className="d-inline-block align-text-top"
            /> */}
            RecipeNest
          </NavLink>

          {/* Toggle Button for Navbar */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div
            className="collapse navbar-collapse small_navbar_css"
            id="navbarContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
              {
                user ? 
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Create Recipe
                </a>
              </li>
               : ""
              }
            </ul>

            {/* User Section */}
            {user ? (
              <div className="dropdown">
                <div
                  className="dropdown-toggle d-flex align-items-center gap-2"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {/* Profile Image */}
                  <img
                    src={user.userProfile || "default-avatar.png"}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-circle"
                  />
                </div>
                {/* Dropdown Menu */}
                <ul
                  className="dropdown-menu"
                  aria-labelledby="userDropdown"
                  style={{ minWidth: "150px" }}
                >
                  <li>
                    <NavLink className="dropdown-item" to={"#"}data-bs-toggle="modal" data-bs-target="#exampleModal" >
                       <span >Profile</span> 
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to={"/settings"}>
                      Settings
                    </NavLink>
                  </li>
                  
                  <li>
                    <a
                      href="#"
                      className="dropdown-item"
                      onClick={() => {
                        localStorage.removeItem("authtoken");
                        window.location.reload();
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex gap-3">
                <NavLink to={"/login"} className="btn " style={{ fontWeight:"600",fontSize:"18px"}}>
                  <span><FontAwesomeIcon icon={faUser} /></span>&nbsp; Log in
                </NavLink>
              </div>
            )}
          </div>

          
        </div>
        



      </nav>
    </header>
  );
};

export default Header;
