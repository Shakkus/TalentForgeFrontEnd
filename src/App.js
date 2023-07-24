import "./App.css";

import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./Components/LandingPage/LandingPage";
import Form from "./Components/Form/Register";
import SearchBar from "./Components/SearchBar/SearchBar";
import Footer from "./Components/Footer/Footer.jsx";
import CourseResults from "./Components/CourseResults/CourseResults";
import CourseViewer from "./Components/CourseViewer/CourseViewer.jsx";
import CourseForm from "./Components/CourseCreationForm/CourseCreationForm";
import Login from "./Components/Login/Login";
import NotFoundPage from "./Components/NotFoundPage/NotFoundPage";
import Home from "./Components/Home/Home";
import CourseDetail from "./Components/Course-Detail/CourseDetail";
import TeachersDetail from "./Components/TeachersDetail/teachersDetail";
import SucessRegister from "./Components/SucessRegister/SucessRegister";
import StudentDetail from "./Components/StudentDetail/StudentDetail";
import Breadcrumb from "./Components/Breadcrumb/Breadcrumb"
import { AuthProvider } from "./context/authContext.js";
import { CartProvider, CartContext } from "./CartContext";
import CartPage from "./Components/CartPage/CartPage";
import SuccessPayment from "./Components/CartPage/MercadoPago/SuccessPayment";
import Editprofile from "./Components/Profile/Edit-profile/Edit-profile";

import CompanyContact from "./Components/CompanyContact/CompanyContact";

import AdminDash from "./Components/AdminDash/AdminDash";

//imports de dashboard admin
import DisableTeachers from './Components/AdminDash/Dashboards/DisableTeachers'
import EditTeachers from './Components/AdminDash/Dashboards/EditTeachers'
import DisableCourses from './Components/AdminDash/Dashboards/DisableCourses'
import EditCourses from './Components/AdminDash/Dashboards/EditCourses'
import FormTeachersDash from "./Components/AdminDash/Dashboards/FormTeachersDash";
import FormCourseEdit from "./Components/AdminDash/Dashboards/FormCourseEdit";
import AccountManager from "./Components/AdminDash/Dashboards/AccountManager";


function App() {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  const shouldRenderSearchBar = location.pathname !== "/cart/success";

  useEffect(() => {
    // Titulo de ventana
    document.title = "Talent Forge";

    // Icono de pagina
    const favicon = document.querySelector("link[rel='icon']");
    favicon.href = "fiveicon.png";
  });

  return (
    <div className="App">
      <AuthProvider>
        <CartProvider>
          {shouldRenderSearchBar && (
            <SearchBar setSearchResults={setSearchResults} />
          )}
      <Breadcrumb/>
          <Routes>
            <Route path="/view/:id" element={<CourseViewer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Form />} />
            <Route path="/course/create" element={<CourseForm />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/teacher/:id" element={<TeachersDetail />} />
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/welcome" element={<SucessRegister />} />
            <Route path="/cart/success" element={<SuccessPayment />} />
            <Route path="/profile" element={<StudentDetail />} />
            <Route path="/profile/edit" element={<Editprofile />} />
            <Route path="/companyContact" element={<CompanyContact/>}/>
            <Route
              path="/search"
              element={<CourseResults searchResults={searchResults} />}
            />
            <Route path="/search" element={<CourseResults searchResults={searchResults} />} />
            <Route path="/adminDash" element={<AdminDash />}/>
            <Route path='/disableTeachers' element={<DisableTeachers />} />
            <Route path='/editTeachers' element={<EditTeachers />} />
            <Route path='/editTeachers/edit/:id' element={<FormTeachersDash />} />
            <Route path='/disableCourses' element={<DisableCourses />} />
            <Route path='/editCourses' element={<EditCourses />} />
            <Route path='/editCourses/edit/:id' element={<FormCourseEdit />} />
            <Route path='/accTypeTable' element={<AccountManager />} />
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;