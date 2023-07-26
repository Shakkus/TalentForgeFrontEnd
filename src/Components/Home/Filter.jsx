import React, { useState } from "react";
import "../Home/Home.css"

const CourseFilter = ({ courses, onFilter }) => {

  const inputStyles = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";


  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");

  const ratingTotal = (ratings) => {
    if (!ratings) {
      return 0; 
    } else {    
      let ratingValues = []
      ratings.map((element) => {
        ratingValues.push(element.rating)
      });
      const totalRatings = ratingValues.length;
      const totalSum = ratingValues.reduce((acc, rating) => acc + rating, 0);
      const promedio = totalSum / totalRatings;
      return promedio
    }
  }

  const handleFilter = () => {
    let filteredCourses = [...courses];
    console.log(filteredCourses)

    if (category)
      filteredCourses = filteredCourses.filter(
        (course) => course.cathegory.toLowerCase() === category.toLowerCase()
      );
    if (duration === "greaterThan10")
      filteredCourses = filteredCourses.filter(
        (course) => course.duration.length > 4
      );
    if (duration === "lessThan10")
      filteredCourses = filteredCourses.filter(
        (course) => course.duration.length <= 4
      );
    if (price === "1-10")
      filteredCourses = filteredCourses.filter((course) => course.prize > 1 && course.prize <= 10);
    if (price === "11-20")
      filteredCourses = filteredCourses.filter((course) => course.prize > 10 && course.prize <= 20);
    if (price === "21-30")
      filteredCourses = filteredCourses.filter((course) => course.prize > 20 && course.prize <= 30);


    if (rating === "0")
      filteredCourses = filteredCourses.filter(
        (course) => ratingTotal(course.ratings) === 0 
      );
    if (rating === "1")
      filteredCourses = filteredCourses.filter(
        (course) => ratingTotal(course.interactions.ratings) >= 1 && ratingTotal(course.interactions.ratings) < 2);
    if (rating === "2")
      filteredCourses = filteredCourses.filter(
        (course) => ratingTotal(course.interactions.ratings) >= 2 && ratingTotal(course.interactions.ratings) < 3);
    if (rating === "3")
      filteredCourses = filteredCourses.filter(
        (course) => ratingTotal(course.interactions.ratings) >= 3 && ratingTotal(course.interactions.ratings) < 4);
    if (rating === "4")
      filteredCourses = filteredCourses.filter(
        (course) => ratingTotal(course.interactions.ratings) >= 4 && ratingTotal(course.interactions.ratings) < 5);
    if (rating === "5")
      filteredCourses = filteredCourses.filter((course) => ratingTotal(course.interactions.ratings) >= 5);

    onFilter(filteredCourses);
  };

  return (
    <div>
      {window.innerWidth <= 1024 ? (
        <div className="filters-boxResponsive">
      <div className="filtersResponsive">
        <div className="filtersContainerResponsive">
          <div className="select-box">
          <label className={"select-title"}>Categoría:</label>
          <select
            className={inputStyles}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">Todas</option>
            <option value="languages">Idioma</option>
            <option value="programming">Programación</option>
          </select>
        </div>

        <div className="select-box">
          <label className={"select-title"}>Duration:</label>
          <select
            id="countries"
            className={inputStyles}
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
          >
            <option selected>Todas</option>
            <option value="greaterThan10">More than 10 minutes</option>
            <option value="lessThan10">Less than 10 minutes</option>
          </select>
        </div>
        <div className="select-box">
          <label className={"select-title"}>Price:</label>
          <select
            className={inputStyles}
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          >
            <option value="">All</option>
            <option value="1-10">Less than $10</option>
            <option value="11-20">Less than $20</option>
            <option value="21-30">Less than $30</option>
          </select>
        </div>
        <div className="select-box">
          <label className={"select-title"}>Rating:</label>
          <select
            className={inputStyles}
            value={rating}
            onChange={(event) => setRating(event.target.value)}
          >
            <option value="">All</option>
            <option value="1">1 star</option>
            <option value="2">2 stars</option>
            <option value="3">3 stars</option>
            <option value="4">4 stars</option>
            <option value="5">5 stars</option>
          </select>
        </div>
        </div>
        <button class="buttonfilterResponsive bg-[#7c38cd] hover:bg-[#AA6FFF] text-white font-bold py-2 px-4 rounded m-5" onClick={handleFilter} id="filter-button">
          Filtrar
        </button>
      </div>
    </div>
      ) : (
        <div className="filters-box">
      <div className="filters">
        <div className="select-box">
        <label className={"select-title"}>Categoría:</label>
          <select
            className={inputStyles}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">Todas</option>
            <option value="languages">Idioma</option>
            <option value="programming">Programación</option>
          </select>
        </div>

        <div className="select-box">
          <label className={"select-title"}>Duration:</label>
          <select
            id="countries"
            className={inputStyles}
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
          >
            <option selected>Todas</option>
            <option value="greaterThan10">More than 10 minutes</option>
            <option value="lessThan10">Less than 10 minutes</option>
          </select>
        </div>
        <div className="select-box">
          <label className={"select-title"}>Price:</label>
          <select
            className={inputStyles}
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          >
            <option value="">All</option>
            <option value="1-10">Less than $10</option>
            <option value="11-20">Less than $20</option>
            <option value="21-30">Less than $30</option>
          </select>
        </div>
        <div className="select-box">
          <label className={"select-title"}>Rating:</label>
          <select
            className={inputStyles}
            value={rating}
            onChange={(event) => setRating(event.target.value)}
          >
            <option value="">All</option>
            <option value="1">1 star</option>
            <option value="2">2 stars</option>
            <option value="3">3 stars</option>
            <option value="4">4 stars</option>
            <option value="5">5 stars</option>
          </select>
        </div>
        <button class="bg-[#7c38cd] hover:bg-[#AA6FFF] text-white font-bold py-2 px-4 rounded" onClick={handleFilter} id="filter-button">
          Filtrar
        </button>
      </div>
    </div>
      )}
    </div>
  );
};

export default CourseFilter;
