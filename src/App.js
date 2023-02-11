import { useEffect, useState } from "react";
import "./assets/styles/main.scss";
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
  const [auth, setAuth] = useState(localStorage.getItem("access_token"));
  useEffect(() => {
    setAuth(localStorage.getItem("access_token"));
  }, [navigate]);

  return (
    <Box className="App">
      {location.pathname !== "/signin" && location.pathname !== "/" && auth ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            boxShadow: "2px 1px 1px 1px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Button
            onClick={() => navigate("/products")}
            disabled={location.pathname === "/products" ? true : false}
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
      ) : (
        ""
      )}

      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {auth ? (
          <>
            <Route path="/users" element={<UsersTable />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/productDetails" element={<ProductDetails />} />
          </>
        ) : (
          ""
        )}
      </Routes>
    </Box>
  );
}

export default App;
