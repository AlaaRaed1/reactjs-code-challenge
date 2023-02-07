import "./assets/main.scss";
import SignIn from "./Components/SignIn/index";
import SignUp from "./Components/SignUp/index";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
