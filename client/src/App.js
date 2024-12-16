import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Forgotpassword from "./pages/Forgotpassword";
import ResetPassword from "./pages/ResetPassword";
import Createrecipe from "./pages/Createrecipe";
import AllRecipes from "./pages/AllRecipes";
import Singlerecipedata from "./pages/Singlerecipedata";
import Errorpage from "./components/Errorpage";
import Userlayout from "./layout/Userlayout";
import { useContext } from "react";
import { UserContext } from "./context/Usercontext";
function App() {
  const {user} = useContext(UserContext)
  return (
    <>
      {/* <Header /> */}
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Routes>
        <Route path="/" element={<Userlayout><Home /></Userlayout>} />
        {!user ? 
          <Route path="/login" element={<Userlayout><Login /></Userlayout>} />
          : ""
      }
        <Route path="/signup" element={<Userlayout><Signup /></Userlayout>} />
        <Route path="/forgotpassword" element={<Userlayout><Forgotpassword /></Userlayout>} />
        <Route
          path="/resetpassword/:id/:token"
          element={<Userlayout><ResetPassword /></Userlayout>}
        />
        {/* Recipe Routes */}
        {
          user ? 
          <Route path="/createRecipe" element={<Userlayout><Createrecipe/></Userlayout>}/>
          :""
        }
        <Route path="/allrecipes" element={<Userlayout><AllRecipes/></Userlayout>}/>
        <Route path="/getSingleRecipedata/:id" element={<Userlayout><Singlerecipedata/></Userlayout>}/>

        <Route path="*" element={<Errorpage/>}/>
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
