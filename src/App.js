import "./App.css";

import { Route, Routes } from "react-router-dom";
import Landing from "./Components/LandingPage/LandingPage";
import Form from "./Components/Form/Register";
import Profile from "./Components/Profile/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Form />} />
        <Route path="/presentation" element={<Landing />} />
        <Route path="/profile" element={< Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;
