import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../../Recourses/CarpinchoLogo.png";
import hearth from "../../Recourses/hearth.png";
import shopcar from "../../Recourses/shop-car.png";
import social from "../../Recourses/social.png";
import searchIcon from "../../Recourses/searchIcon.png";
import profile from "../../Recourses/profile.png";
import "./SearchBar.css";
import { Link, NavLink } from "react-router-dom";

const SearchBar = () => {
	// VALIDACION LOGIN

	const loggedUser = localStorage.getItem("loggedUser");

	// --------

	// DROPDOWN PERFIL
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => {
		setIsOpen(!isOpen);
	};
	// ----------------
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	//    CursosStates
	const [showSubMenu, setShowSubMenu] = useState(false);
	const [showProgrammingLanguages, setShowProgrammingLanguages] =
		useState(false);
	const [showLanguages, setShowLanguages] = useState(false);

	const [courses, setCourses] = useState([]);

	const [showResults, setShowResults] = useState(false); // BrowsedCoursesState

	const [searchTerm, setSearchTerm] = useState("");

	const [redirectCourse, setRedirectCourse] = useState(null);

	const [searchReults, setSearchReults] = useState([]);

	const handleSubMenuToggle = () => {
		// CursosStates
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
			setSearchReults(foundCourse);
		} else {
			setSearchReults([]);
		}

		setShowResults(true); // Mostrar los resultados al hacer clic en el botón de búsqueda
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get(
					`https://talent-forge-data.cyclic.app/courses`
				);
				setCourses(data);
			} catch (error) {
				throw new Error(`Error fetching courses ${error}`);
			}
		};
		fetchData();
	}, []);
	const location = useLocation();

	useEffect(() => {
		if (location.pathname !== "/search") {
			setSearchTerm("");
		}
	}, [location]);

	return (
		<nav className="all">
			<div className="nav">
				<div className="Nav-left">
					<Link to="/home">
						<img className="logo" src={logo} alt="logo" />
					</Link>
					<div></div>
					<div className="menu-container">
						<div
							className="menu-item"
							onClick={handleSubMenuToggle}
						>
							<h2 className="seacrchBar-CoursesTitle">Cursos</h2>
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
										<NavLink to="/course/create">
											Create your Course
										</NavLink>
									</li>
									<li
										className="submenu-item"
										onClick={handleLanguagesToggle}
									>
										<NavLink to="/home">Home</NavLink>
									</li>
								</ul>
							</div>
						)}
					</div>
				</div>
				<div className="Nav-center">
					<input
						type="text"
						placeholder="Buscar..."
						value={searchTerm}
						onChange={(event) => setSearchTerm(event.target.value)}
						className="searchbar-class" // Agregar la clase w-full para ocupar el 100% del ancho
					/>
					<div className="busqueda-box">
						<Link to="search">
							<img
								className="busqueda"
								src={searchIcon}
								alt="search"
								onClick={handleSearch}
							/>
						</Link>
					</div>
				</div>

				{isLoggedIn ? (
					<div className="Nav-right">
						<div className="nav-dropdown">
							<p className="inventory">
								<Link to="/inventory" className="custom-link">
									Mis cursos
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
						<div>
							<button className="profileImg" onClick={handleOpen}>
								<img
									className="profile-img"
									src={profile}
									alt="profile"
								/>
							</button>
						</div>
					</div>
				) : (
					<div className="buttons">
						<Link to="/register">
							<button className="register">Register</button>
						</Link>
						<Link to="/login">
							<button className="login">Log In</button>
						</Link>
					</div>
				)}
				{isOpen === true && loggedUser === "true" && (
					<div className="dropDown">
						<ul className="ul">
							<Link to={"/profile"}>
								<li>Profile</li>
							</Link>
							<hr className="hr" />
							<Link to={"/login"}>
								<li>Log Out</li>
							</Link>
						</ul>
					</div>
				)}
			</div>
		</nav>
	);
};

export default SearchBar;
