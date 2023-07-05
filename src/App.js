import "./App.css";

import { Route, Routes } from "react-router-dom";
import Landing from "./Components/LandingPage/LandingPage";
import Form from "./Components/Form/Form";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/presentation" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path='/login' elemnt ={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
