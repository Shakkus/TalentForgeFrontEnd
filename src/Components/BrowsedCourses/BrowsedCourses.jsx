import React from "react";
import "./BrowsedCourses.css"

function BrowsedCourses({ courses }) {
  return (
    <div className="browsed-courses">
      {courses.map((course) => (
        <div key={course.id} className="course-item">
          <div className="thumbnail">
            <img src={course.thumbnail} alt="Course Thumbnail" />
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
