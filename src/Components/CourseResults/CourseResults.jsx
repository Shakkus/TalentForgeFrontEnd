import React from "react";
import BrowsedCourses from "../BrowsedCourses/BrowsedCourses";
import SearchBar from "../SearchBar/SearchBar";

const courses = [
  {
    id: 1,
    thumbnail: "https://example.com/course1-thumbnail.jpg",
    title: "Curso 1",
    description: "Descripción del curso 1",
    rating: 4.5,
    duration: "2 horas",
    price: "$19.99",
  },
  {
    id: 2,
    thumbnail: "https://example.com/course2-thumbnail.jpg",
    title: "Curso 2",
    description: "Descripción del curso 2",
    rating: 4.2,
    duration: "1.5 horas",
    price: "$14.99",
  },
  {
    id: 1,
    thumbnail: "https://example.com/course1-thumbnail.jpg",
    title: "Curso 3",
    description: "Descripción del curso 3",
    rating: 4.5,
    duration: "2 horas",
    price: "$19.99",
  },
  {
    id: 2,
    thumbnail: "https://example.com/course2-thumbnail.jpg",
    title: "Curso 4",
    description: "Descripción del curso 4",
    rating: 4.2,
    duration: "1.5 horas",
    price: "$14.99",
  },
  {
    id: 1,
    thumbnail: "https://example.com/course1-thumbnail.jpg",
    title: "Curso 5",
    description: "Descripción del curso 5",
    rating: 4.5,
    duration: "2 horas",
    price: "$19.99",
  },
  {
    id: 2,
    thumbnail: "https://example.com/course2-thumbnail.jpg",
    title: "Curso 6",
    description: "Descripción del curso 6",
    rating: 4.2,
    duration: "1.5 horas",
    price: "$14.99",
  },
  {
    id: 1,
    thumbnail: "https://example.com/course1-thumbnail.jpg",
    title: "Curso 7",
    description: "Descripción del curso 7",
    rating: 4.5,
    duration: "2 horas",
    price: "$19.99",
  },
  {
    id: 2,
    thumbnail: "https://example.com/course2-thumbnail.jpg",
    title: "Curso 8",
    description: "Descripción del curso 8",
    rating: 4.2,
    duration: "1.5 horas",
    price: "$14.99",
  },
  // Agrega más cursos aquí...
];

function CourseResults() {
  return (
    <div>
        <SearchBar />
      <div className="course-results">
        <BrowsedCourses courses={courses} />
      </div>
    </div>
  );
}

export default CourseResults;
