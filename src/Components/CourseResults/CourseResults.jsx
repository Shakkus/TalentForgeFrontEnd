import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./CourseResults.css";

const CourseResults = ({ searchResults }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;
  const totalPages = Math.ceil(searchResults.length / resultsPerPage);

  // Calcula el índice inicial y final de los resultados que se mostrarán en la página actual
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResults.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  // Cambia a la página especificada
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Cambia a la primera página
  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  // Cambia a la última página
  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  // Cambia a la página anterior
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Cambia a la página siguiente
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div id="search-mapper">
      <div id="course-container">
        <strong className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Results found: {searchResults.length}</strong>
        {currentResults.map((course) => {
          return (
            <React.Fragment key={course.id}>
              <div id="course">
                <div id="course-thumbnail">
                  <img
                    src={course.image}
                    alt="Course Image"
                    id="course-form-image"
                  />
                </div>

                <div id="course-details">
                  <div id="course-form-info">
                    <NavLink to={`/course/${course._id}`}>
                      <h4 id="course-form-title">
                        <strong>{course.title}</strong>
                      </h4>
                    </NavLink>
                    <p id="course-form-instructor">
                      <strong>Instructor:</strong> {course.teacher}
                    </p>
                    <p id="course-form-description">{course.description}</p>
                    <p id="course-form-rating">
                      <strong>Rating:</strong> {course.rating}
                    </p>
                  </div>
                </div>

                <div id="course-form-price">
                  <p id="course-form-price-text">${course.prize}</p>
                </div>
              </div>

              <div className="separator"></div>
            </React.Fragment>
          );
        })}
      </div>

      <div id="pagination">
        <button
          disabled={currentPage === 1}
          onClick={goToFirstPage}
          className="px-3 py-1 rounded-l-lg border border-gray-300 bg-white text-gray-500 disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          &lt;&lt;
        </button>
        <button
          disabled={currentPage === 1}
          onClick={goToPreviousPage}
          className="px-3 py-1 border border-gray-300 bg-white text-gray-500 disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          &lt;
        </button>

        {currentPage > 3 && <strong>...</strong>}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => changePage(pageNumber)}
              className={`px-3 py-1 border border-gray-300 bg-white text-gray-500 ${
                pageNumber === currentPage
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
            >
              {pageNumber}
            </button>
          )
        )}
        {currentPage < totalPages - 2 && <strong>...</strong>}

        <button
          disabled={currentPage === totalPages}
          onClick={goToNextPage}
          className="px-3 py-1 border border-gray-300 bg-white text-gray-500 disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          &gt;
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={goToLastPage}
          className="px-3 py-1 rounded-r-lg border border-gray-300 bg-white text-gray-500 disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default CourseResults;
