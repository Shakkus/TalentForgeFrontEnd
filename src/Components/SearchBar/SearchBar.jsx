//IMPORTS
import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.js";
import axios from "axios";
import "./SearchBar.css";
import { CartContext } from "../../CartContext";
//ICONS
import logo from "../../Recourses/CarpinchoLogo.png";
import hearth from "../../Recourses/hearth.png";
import shopcar from "../../Recourses/shopcar-car.png";
import social from "../../Recourses/social.png";
import searchIcon from "../../Recourses/searchIcon.png";
import profile from "../../Recourses/profile.png";
import homeIcon from "../../Recourses/homeIcon.png";

//COMPONENT
const SearchBar = ({ setSearchResults }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const {cartCount,setCartCount} = useContext(CartContext)
  const { logOut, loading, user } = useAuth();
  const [userFormData, setUserFormData] = useState({}) //state para almacenar la informacion de user por form
  const formUserId = localStorage.getItem("userId")

  useEffect(() => { //effect para llenar el userFormData
    if (formUserId) {
      setUserFormData({
        userAccountType: localStorage.getItem('userAccountType'),
        userCountry: localStorage.getItem('userCountry'),
        userDate: localStorage.getItem('userDate'),
        userDesc: localStorage.getItem('userDesc'),
        userEmail: localStorage.getItem('userEmail'),
        userfullName: localStorage.getItem('userfullName'),
        userImage: localStorage.getItem('userImage'),
        userId: localStorage.getItem('userId'),
        username: localStorage.getItem('username')
      });
    }
  }, []);


//  const [cartCount, setCartCount] = useState(0);

	// LOGOUT DEL USUARIO POR AUTH
	const handleLogOut = async () => {
		try {
      if (formUserId) {
        setUserFormData({
          userAccountType: "",
          userCountry: "",
          userDate: "",
          userDesc: "",
          userEmail: "",
          userfullName: "",
          userImage: "",
          userId: "",
          username: ""
        });
        localStorage.removeItem("userAccountType");
        localStorage.removeItem("userCountry");
        localStorage.removeItem("userDate");
        localStorage.removeItem("userDesc");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userfullName");
        localStorage.removeItem("userImage");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        navigate("/");
      }
      
      await logOut();
			localStorage.setItem("loggedUser", "");
			navigate("/");

		} catch (error) {
			console.error(error);
		}
	};

	// DROPDOWN PERFIL
	const [isOpen, setIsOpen] = useState(false);
	const handleOpen = () => {
		setIsOpen(!isOpen);
	};

	const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFormLoggedIn, setIsFormLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const userLoggedIn = localStorage.getItem('loggedUser')

	//    CursosStates
	const [showSubMenu, setShowSubMenu] = useState(false);
	const [showProgrammingLanguages, setShowProgrammingLanguages] = useState(false);
	const [showLanguages, setShowLanguages] = useState(false);

  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  const handleSearch = () => {
    const foundCourses = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (foundCourses.length > 0) {
      setSearchResults(foundCourses);
    } else {
      setSearchResults([]);
    }
    setSearchTerm("")
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("https://talent-forge-data.cyclic.app/courses");
        setCourses(data);
      } catch (error) {
        throw new Error(`Error fetching courses ${error}`);
      } 
    }; fetchData(); }, []);

  useEffect(() => {
    const coursesInCart = localStorage.getItem("cartCourses");
    if (coursesInCart) {
      const parsedCourses = JSON.parse(coursesInCart);
      setCartCount(parsedCourses.length);
    } else setCartCount(0);
  }, []);

  useEffect(() => { 
    if (location.pathname !== "/search") setSearchTerm(""); 
  }, [location]);

  useEffect(() => {
    // user  ? console.log(user):console.log('no hay user');
    if (userLoggedIn) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, [user]);

  useEffect(() => {
    if (formUserId) setIsFormLoggedIn(true);
    else setIsFormLoggedIn(false);
  }, [formUserId]);

  const handleProfileMenuToggle = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  // ACCOUTN TYPE
    const accountType = localStorage.getItem('userAccountType')
  // ------------

  return (
    <nav className="bg-[#7c38cd]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">

            <Link to="/">
              <img className="h-10" src={logo} alt="logo" />
            </Link>

            <Link to="/home" className="ml-4">
              <img className="h-6 filter-invert" id="icon" src={homeIcon} alt="home" />
            </Link>

            <div className="ml-4">
              <div className="relative">
                <input type="text" placeholder="Buscar..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} className="bg-white text-black rounded-md pl-10 pr-4 py-2"/>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">

                  <Link to="search">
                    <img className="h-4 text-gray-500 filter-invert" src={searchIcon} alt="search" onClick={handleSearch} />
                  </Link>

                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center">
          {userLoggedIn ? (
            <>
              <Link to="/wishlist" className="text-white hover:text-gray-300 ml-6" >
                  <img className="h-6 filter-invert" id="icon" src={hearth} alt="hearth" />
                </Link>

                <Link  to="/cart" className="text-white hover:text-gray-300 ml-6 relative" >
                  <div className="flex items-center">
                    <img className="h-6 filter-invert" id="icon" src={shopcar} alt="shopcar"/>
                    {cartCount > 0 && (
                      <div className="bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center absolute -top-1 -right-1">
                        {cartCount}
                      </div>
                    )}
                  </div>
                </Link>

                <Link to="/social" className="text-white hover:text-gray-300 ml-6" >
                  <img className="h-6 filter-invert" id="icon" src={social} alt="social" />
                </Link>

                <div className="relative">
                  {user ?
                  <img className="ml-2 filter-invert cursor-pointer rounded-full w-10 h-10 rounded-full" src={user.photoURL} alt="profile" onClick={handleProfileMenuToggle} />
                : <img className="m-2 filter-invert cursor-pointer rounded-full w-10 h-10 rounded-full" src={profile} alt="profile" onClick={handleProfileMenuToggle} />}

                  {showProfileMenu && (
                    <div className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute right-0">

                      {user && 
                        <div className="px-4 py-3">
                          <span className="block text-sm text-gray-900 dark:text-white">
                            {user.displayName}
                          </span>

                          <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                            {user.email}
                          </span>
                        </div>
                      }

                      <ul className="py-2" aria-labelledby="user-menu-button">
                        <li>
                          <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" >
                            Profile
                          </a>
                        </li>

                        <li>
                          <a href="/course/create" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                            Create course
                          </a>
                        </li>

                        <li>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={handleLogOut}>
                            Sign out
                          </a>
                        </li>

                      </ul>
                    </div>
                  )}
                </div>
            </>
            ) : ( 
              isFormLoggedIn ? (
              <>
                <Link to="/wishlist" className="text-white hover:text-gray-300 ml-6" >
                  <img className="h-6 filter-invert" id="icon" src={hearth} alt="hearth" />
                </Link>

                <Link  to="/cart" className="text-white hover:text-gray-300 ml-6 relative" >
                  <div className="flex items-center">
                    <img className="h-6 filter-invert" id="icon" src={shopcar} alt="shopcar"/>
                    {cartCount > 0 && (
                      <div className="bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center absolute -top-1 -right-1">
                        {cartCount}
                      </div>
                    )}
                  </div>
                </Link>

                <Link to="/social" className="text-white hover:text-gray-300 ml-6" >
                  <img className="h-6 filter-invert" id="icon" src={social} alt="social" />
                </Link>

                <div className="relative">
                  <img className="h-6 filter-invert cursor-pointer rounded-full p-1" src={profile} alt="profile" onClick={handleProfileMenuToggle} />

                  {showProfileMenu && (
                    <div className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute right-0">

                      {userFormData && 
                        <div className="px-4 py-3">
                          <span className="block text-sm text-gray-900 dark:text-white">
                            {localStorage.getItem('username')}
                          </span>
                          <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                            {localStorage.getItem('userEmail')}
                          </span>
                        </div>
                      }

                      <ul className="py-2" aria-labelledby="user-menu-button">
                        <li>
                          <a href="/social/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" >
                            Profile
                          </a>
                        </li>

                       {accountType === 'teacher' && (
                         <li>
                            <a href="/course/create" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                              Create course
                            </a>
                          </li>
                       )}

                        <li>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={handleLogOut}>
                            Sign out
                          </a>
                        </li>

                      </ul>
                    </div>
                  )}

                </div>
              </>
            ) : (
              <div className="hidden lg:flex items-center">
                <Link to="/register" className="text-white hover:text-gray-300 px-3 py-2" >
                  Register
                </Link>

                <Link to="/login" className="text-white hover:text-gray-300 px-3 py-2" >
                  Log In
                </Link>
              </div>
            )
          )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SearchBar;
