import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Forgotpassword from "./pages/Forgotpassword";
import ResetPassword from "./pages/ResetPassword";
import Createrecipe from "./pages/Createrecipe";
import AllRecipes from "./pages/AllRecipes";
import Singlerecipedata from "./pages/Singlerecipedata";
function App() {
  return (
    <>
      <Header />
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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route
          path="/resetpassword/:id/:token"
          element={<ResetPassword />}
        />
        {/* Recipe Routes */}
        <Route path="/createRecipe" element={<Createrecipe/>}/>
        <Route path="/allrecipes" element={<AllRecipes/>}/>
        <Route path="/getSingleRecipedata/:id" element={<Singlerecipedata/>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
