import "./assets/main.scss";
import SignIn from "./Components/SignIn/index";
import SignUp from "./Components/SignUp/index";
import UsersTable from "./Components/Users";
import { Routes, Route } from "react-router-dom";
import ProductsPage from "./Components/Products/ProductsPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/users" element={<UsersTable />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </div>
  );
}

export default App;
