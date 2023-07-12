import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../../Recourses/CarpinchoLogo.png";
import hearth from "../../Recourses/hearth.png";
import shopcar from "../../Recourses/shop-car.png";
import social from "../../Recourses/social.png";
import searchIcon from "../../Recourses/searchIcon.png";
import profile from "../../Recourses/profile.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.js";
import "./SearchBar.css";

const SearchBar = () => {
	const { logOut, loading } = useAuth();
	const navigate = useNavigate();

	// LOGOUT DEL USUARIO

	const handleLogOut = async () => {
		try {
			await logOut();
			localStorage.setItem("loggedUser", "");
			navigate("/");
		} catch (error) {
			console.error(error);
		}
	};
	// ------------------

	// VALIDACION DE USUARIO LOGEADO

	const loggedUser = localStorage.getItem("loggedUser");

	// --------

	// DROPDOWN PERFIL
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => {
		setIsOpen(!isOpen);
	};
	// ----------------
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	// CursosStates
	const [showSubMenu, setShowSubMenu] = useState(false);
	const [showProgrammingLanguages, setShowProgrammingLanguages] =
		useState(false);
	const [showLanguages, setShowLanguages] = useState(false);

	const [courses, setCourses] = useState([]);
	const [showResults, setShowResults] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [redirectCourse, setRedirectCourse] = useState(null);
	const [searchResults, setSearchResults] = useState([]);

	const [isCartOpen, setCartOpen] = useState(false);

	const handleSubMenuToggle = () => {
		setShowSubMenu(!showSubMenu);
	};

	const handleProgrammingLanguagesToggle = () => {
		//CursosStates submenu
		setShowProgrammingLanguages(!showProgrammingLanguages);
		setShowLanguages(false);
	};

	const handleLanguagesToggle = () => {
		//CursosStates submenu
		setShowLanguages(!showLanguages);
		setShowProgrammingLanguages(false);
	};

	const handleSearch = () => {
		const foundCourse = courses.filter((course) =>
			course.title.toLowerCase().includes(searchTerm.toLowerCase())
		);
		if (foundCourse) {
			setSearchResults(foundCourse);
		} else {
			setSearchResults([]);
		}

		setShowResults(true); // Mostrar los resultados al hacer clic en el botón de búsqueda
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get(
					"https://talent-forge-data.cyclic.app/courses"
				);
				setCourses(data);
			} catch (error) {
				throw new Error(`Error fetching courses ${error}`);
			}
		};
		fetchData();
	}, []);

	const location = useLocation();

	/* LOGICA DE CARRITO */
	const [CartCourses, setCartCourses] = useState([]);

	const cartCourses = JSON.parse(localStorage.getItem("cartCourses")) || [];

	const deleteFromCart = (course) => {
		const updatedCartCourses = cartCourses.filter(
			(item) => item.id !== course.id
		);

		localStorage.setItem("cartCourses", JSON.stringify(updatedCartCourses));
		console.log("Se elimino curso");
	};

	useEffect(() => {
		if (location.pathname !== "/search") {
			setSearchTerm("");
		}
	}, [location]);

	// LOADING
	if (loading === true) return <h1>loading</h1>;
	// -------

	return (
		<nav className="all">
			<div className="nav">
				<div className="Nav-left">
					<Link to="/">
						<img className="logo" src={logo} alt="logo" />
					</Link>
					<div className="menu-container">
						<div
							className="menu-item"
							onClick={handleSubMenuToggle}
						>
							<h2 className="seacrchBar-CoursesTitle">Courses</h2>
							{showSubMenu ? (
								<span className="">
									<div className="triangle-up"></div>
								</span>
							) : (
								<span className="">
									<div className="triangle-down"></div>
								</span>
							)}
						</div>

						{showSubMenu && (
							<div className="submenu-container">
								<ul className="submenu">
									<li
										className="submenu-item"
										onClick={handleLanguagesToggle}
									>
										{" "}
										<NavLink to="/course/create">
											{" "}
											Create your Course{" "}
										</NavLink>{" "}
									</li>

									<li
										className="submenu-item"
										onClick={handleLanguagesToggle}
									>
										{" "}
										<NavLink to="/home">
											{" "}
											Home{" "}
										</NavLink>{" "}
									</li>
								</ul>
							</div>
						)}
					</div>
				</div>
				<div className="searchbar-container">
					<input
						type="text"
						placeholder="Buscar..."
						value={searchTerm}
						onChange={(event) => setSearchTerm(event.target.value)}
						className="searchbar-class"
					/>
					<div className="busqueda-box">
						{" "}
						<Link to="search">
							{" "}
							<img
								className="busqueda"
								src={searchIcon}
								alt="search"
								onClick={handleSearch}
							/>{" "}
						</Link>
					</div>
				</div>

				{loggedUser ? (
					<div className="Nav-right">
						<div className="nav-dropdown">
							<p className="inventory">
								<Link to="/inventory">
									<button className="myCourses">
                    My Courses
                  </button>
								</Link>
							</p>
						</div>
						<Link to="/wishlist" className="custom-link">
							<img className="hearth" src={hearth} alt="hearth" />
						</Link>
						<Link to="/shopcar" className="custom-link">
							<img
								className="shopcar"
								src={shopcar}
								alt="shopcar"
							/>
						</Link>
						<Link to="/social" className="custom-link">
							<img className="social" src={social} alt="social" />
						</Link>
            <button onClick={handleLogOut} className="logout" >
							<svg
								width="35px"
								height="25px"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M14 4L17.5 4C20.5577 4 20.5 8 20.5 12C20.5 16 20.5577 20 17.5 20H14M3 12L15 12M3 12L7 8M3 12L7 16"
									stroke="#ffffff"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</button>
						<Link to="/profile/:id" className="custom-link">
							<img
								className="profile-img"
								src={profile}
								alt="profile"
							/>
						</Link>
					</div>
				) : (
					<div className="buttons">
						<Link to="/register">
							<button className="register">Register</button>
						</Link>
						<Link to="/login">
							<button className="login">Log In</button>
						</Link>
						<button
							className="cart"
							id="cart"
							onClick={() => setCartOpen(!isCartOpen)}
						>
							Carrito{" "}
						</button>
						{isCartOpen && (
							<div id="cartMenu" className="cart-menu">
								{/* Contenido del menú de cursos */}
								{cartCourses.map((course, index) => (
									<div key={index} className="courseOnCart">
										<p>{course.title}</p>
										<p>{course.prize}</p>
										<button onClick={deleteFromCart}>
											{" "}
											X{" "}
										</button>
									</div>
								))}
							</div>
						)}
					</div>
				)}
			</div>
			{showResults && (
				<div search-mapper>
					<h3>Search...</h3>
					<div className="course-container">
						{searchResults.map((course) => {
							return (
								<div key={course.id} className="course">
									<img
										src={course.image}
										alt="Course Image"
										className="course-form-image"
									/>

									<div className="course-presentation">
										<div className="course-form-title-box">
											<NavLink
												to={`/course/${course._id}`}
											>
												<h4 className="course-form-title">
													{course.title}
												</h4>
											</NavLink>
										</div>

										<div className="course-form-teacher-box">
											<p className="course-form-teacher">
												{course.teacher}
											</p>
										</div>
									</div>

									<div className="course-box">
										<div className="course-form-info-box">
											<div className="label">
												<h6 className="label-text">
													{" "}
													category{" "}
												</h6>
												<p className="course-form-category">
													{" "}
													{course.cathegory}
												</p>
											</div>

											<div className="label">
												<h6 className="label-text">
													{" "}
													duration{" "}
												</h6>
												<p className="course-form-duration">
													{" "}
													{course.duration}
												</p>
											</div>

											<div className="label">
												<h6 className="label-text">
													{" "}
													price{" "}
												</h6>
												<p className="course-form-price">
													{course.prize}
												</p>
											</div>

											<div className="label">
												<h6 className="label-text">
													{" "}
													rating{" "}
												</h6>
												<p className="course-form-rating">
													{course.rating}
												</p>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</nav>
	);
};

export default SearchBar;
