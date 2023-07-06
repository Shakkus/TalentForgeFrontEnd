import React from "react";
import BrowsedCourses from "../BrowsedCourses/BrowsedCourses";
import "./CourseResults.css"

import { useState } from "react";
const courses = [
  {
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
  },
  {
    id: 2,
    videoUrl: "https://www.youtube.com/watch?v=ABCDEF&ab_channel=Example",
    thumbnail: "https://example.com/course2-thumbnail.jpg",
    title: "Curso 2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis itaque amet odio, commodi quo id dolorem eius aperiam minus magni.",
    instructor: "Instructor 2",
    rating: 4.2,
    duration: "1.5 horas",
    price: "$14.99",
    relatedVideos: [
      { id: 5, title: "Video 5" },
      { id: 6, title: "Video 6" },
    ],
  },
  {
    id: 3,
    videoUrl: "https://www.youtube.com/watch?v=WXYZ&ab_channel=Example",
    thumbnail: "https://example.com/course3-thumbnail.jpg",
    title: "Curso 3",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis itaque amet odio, commodi quo id dolorem eius aperiam minus magni.",
    instructor: "Instructor 3",
    rating: 4.7,
    duration: "3 horas",
    price: "$24.99",
    relatedVideos: [
      { id: 7, title: "Video 7" },
      { id: 8, title: "Video 8" },
    ],
  },
  {
    id: 4,
    videoUrl: "https://www.youtube.com/watch?v=12345&ab_channel=Example",
    thumbnail: "https://example.com/course4-thumbnail.jpg",
    title: "Curso 4",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis itaque amet odio, commodi quo id dolorem eius aperiam minus magni.",
    instructor: "Instructor 4",
    rating: 4.0,
    duration: "2.5 horas",
    price: "$17.99",
    relatedVideos: [
      { id: 9, title: "Video 9" },
      { id: 10, title: "Video 10" },
    ],
  },
  {
    id: 5,
    videoUrl: "https://www.youtube.com/watch?v=67890&ab_channel=Example",
    thumbnail: "https://example.com/course5-thumbnail.jpg",
    title: "Curso 5",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis itaque amet odio, commodi quo id dolorem eius aperiam minus magni.",
    instructor: "Instructor 5",
    rating: 4.8,
    duration: "2.5 horas",
    price: "$22.99",
    relatedVideos: [
      { id: 11, title: "Video 11" },
      { id: 12, title: "Video 12" },
    ],
}]

function CourseResults() {
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showRatingFilter, setShowRatingFilter] = useState(false);
  const [showLanguageFilter, setShowLanguageFilter] = useState(false);
  const [showTopicFilter, setShowTopicFilter] = useState(false);
  const [showDurationFilter, setShowDurationFilter] = useState(false);
  // Submenú controller
  const handleDateFilterToggle = () => {
    setShowDateFilter(!showDateFilter);
    setShowRatingFilter(false);
    setShowLanguageFilter(false);
    setShowTopicFilter(false);
    setShowDurationFilter(false);
  };

  const handleRatingFilterToggle = () => {
    setShowRatingFilter(!showRatingFilter);
    setShowDateFilter(false);
    setShowLanguageFilter(false);
    setShowTopicFilter(false);
    setShowDurationFilter(false);
  };

  const handleLanguageFilterToggle = () => {
    setShowLanguageFilter(!showLanguageFilter);
    setShowDateFilter(false);
    setShowRatingFilter(false);
    setShowTopicFilter(false);
    setShowDurationFilter(false);
  };

  const handleTopicFilterToggle = () => {
    setShowTopicFilter(!showTopicFilter);
    setShowDateFilter(false);
    setShowRatingFilter(false);
    setShowLanguageFilter(false);
    setShowDurationFilter(false);
  };

  const handleDurationFilterToggle = () => {
    setShowDurationFilter(!showDurationFilter);
    setShowDateFilter(false);
    setShowRatingFilter(false);
    setShowLanguageFilter(false);
    setShowTopicFilter(false);
  };

  return (
    <div>
      <div className="new-container">
        <div>
          <h2 className="new-searched-results">{`${courses.length} resultados encontrados`}</h2>
        </div>

        <div className="new-orders">
          <div
            className={`new-order ${showDateFilter ? "selected" : ""}`}
            onClick={handleDateFilterToggle}
          >
            <h2>FECHA DE SUBIDO</h2>
            {showDateFilter && (
              <ul className="new-filter-list">
                <li>Esta semana</li>
                <li>Este mes</li>
                <li>Este año</li>
                <li>Más antiguo</li>
              </ul>
            )}
          </div>
          <div
            className={`new-order ${showRatingFilter ? "selected" : ""}`}
            onClick={handleRatingFilterToggle}
          >
            <h2>VALORACION</h2>
            {showRatingFilter && (
              <ul className="new-filter-list">
                <li>Excelente</li>
                <li>Buena</li>
                <li>Regular</li>
              </ul>
            )}
          </div>
          <div
            className={`new-order ${showLanguageFilter ? "selected" : ""}`}
            onClick={handleLanguageFilterToggle}
          >
            <h2>IDIOMA</h2>
            {showLanguageFilter && (
              <ul className="new-filter-list">
                <li>Español</li>
                <li>Inglés</li>
              </ul>
            )}
          </div>
          <div
            className={`new-order ${showTopicFilter ? "selected" : ""}`}
            onClick={handleTopicFilterToggle}
          >
            <h2>TEMA</h2>
            {showTopicFilter && (
              <ul className="new-filter-list">
                <li>Programación</li>
                <li>Idiomas</li>
              </ul>
            )}
          </div>
          <div
            className={`new-order ${showDurationFilter ? "selected" : ""}`}
            onClick={handleDurationFilterToggle}
          >
            <h2>DURACION</h2>
            {showDurationFilter && (
              <ul className="new-filter-list">
                <li>+10 horas</li>
                <li>5 - 10 horas</li>
                <li>-5 horas</li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="course-results">
        <BrowsedCourses courses={courses} />
      </div>
    </div>
  );
}

export default CourseResults;
