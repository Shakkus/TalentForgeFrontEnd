import "./App.css";

import { Route, Routes } from "react-router-dom";
import Landing from "./Components/LandingPage/LandingPage";
import Form from "./Components/Form/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Form />} />
        <Route path="/presentation" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
