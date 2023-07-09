import React from "react";
import "./BrowsedCourses.css"
import { Link } from "react-router-dom";

function BrowsedCourses({ courses }) {
  return (
    <div className="browsed-courses">
      {courses.map((course) => (
        <div key={course.id} className="course-item">
          <div className="thumbnail">
            <Link to={`/course/${course.id}`}>
            <img src={course.thumbnail} alt="Course Thumbnail" />
            </Link>
          </div>
          <div className="details">
            <h2 className="title">{course.title}</h2>
            <p className="description">{course.description}</p>
            <div className="rating">{course.rating}</div>
            <div className="duration">{course.duration}</div>
          </div>
          <div className="price">{course.price}</div>
        </div>
      ))}
    </div>
  );
}

export default BrowsedCourses;
