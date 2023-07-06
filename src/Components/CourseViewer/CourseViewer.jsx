import React from "react";
import "./CourseViewer.css";

const course = {
  id: 1,
  videoUrl: "https://www.youtube.com/watch?v=ZN9Ygzx6Sfo&ab_channel=Fazt",
  thumbnail: "https://example.com/course1-thumbnail.jpg",
  title: "Curso 1",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis itaque amet odio, commodi quo id dolorem eius aperiam minus magni.",
  instructor: "Instructor 1",
  rating: 4.5,
  duration: "2 horas",
  price: "$19.99",
  relatedVideos: [
    { id: 2, title: "Video 2" },
    { id: 3, title: "Video 3" },
    { id: 4, title: "Video 4" },
  ],
};

const CourseViewer = () => {
  return (
    <div className="course-viewer">
      <div className="course-viewer-video">
        <div className="video-container">
          <iframe
            src={course.videoUrl}
            title={course.title}
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
        <div className="course-info">
          <h2 className="video-title">{course.title}</h2>
          <channel className="instructor-details">
            <img
              src=""
              alt="Course Thumbnail"
              className="video-image"
            />
            <div className="video-instructor">{course.instructor}</div>
          </channel>
          <description className="video-description">
            {course.description}
          </description>
          <details className="course-details">
            <p>Rating: {course.rating}</p>
            <p>Duration: {course.duration}</p>
            <p>Price: {course.price}</p>
          </details>

        </div>
      </div>
      <div className="course-viewer-related-videos">
        <h3>Related Videos:</h3>
        {course.relatedVideos.map((video) => (
          <div key={video.id} className="related-video">
            {video.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseViewer;
