import React from "react";
import { NavLink } from "react-router-dom";
import "./CourseResults.css";

const CourseResults = ({ searchResults }) => {
  return (
    <div id="search-mapper">
      <h3>Search...</h3>
      <div id="course-container">
        <strong>Results found: {searchResults.length}</strong>
        {searchResults.map((course) => {
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
    </div>
  );
};

export default CourseResults;
