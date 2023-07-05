import "./App.css";

import { Route, Routes } from "react-router-dom";
import Landing from "./Components/LandingPage/LandingPage";
import Form from "./Components/Form/Form";
import Login from "./Components/Login/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Form />} />
        <Route path="/presentation" element={<Landing />} />
        <Route path='/login' elemnt ={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
