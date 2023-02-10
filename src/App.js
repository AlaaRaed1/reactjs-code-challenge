import { useState } from "react";
import "./assets/main.scss";
import SignIn from "./Components/SignIn/index";
import SignUp from "./Components/SignUp/index";
import UsersTable from "./Components/Users";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ProductsPage from "./Components/Products/ProductsPage";
import ProductDetails from "./Components/Products/ProductDetails";
import { Box, Button } from "@mui/material";
function App() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="App">
      <Box>
        <Button
          onClick={() => navigate("/")}
          disabled={location.pathname === "/" ? true : false}
        >
          Products Page
        </Button>
        <Button
          onClick={() => navigate("/users")}
          disabled={location.pathname === "/users" ? true : false}
        >
          Users
        </Button>
      </Box>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/users" element={<UsersTable />} />
        <Route path="/" element={<ProductsPage />} />
        <Route path="/productDetails" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
