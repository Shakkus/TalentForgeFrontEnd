import React, { useState } from 'react';

const CourseFilter = ({ courses, onFilter }) => {
  const [theme, setTheme] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');

  const handleFilter = () => {
    let filteredCourses = [...courses];

    if (theme) filteredCourses = filteredCourses.filter(course => course.theme.includes(theme));
    if (category) filteredCourses = filteredCourses.filter(course => course.cathegory.toLowerCase() === category.toLowerCase());
    if (duration === 'greaterThan10') filteredCourses = filteredCourses.filter(course => parseFloat(course.duration) > 10);
    if (duration === 'lessThan10') filteredCourses = filteredCourses.filter(course => parseFloat(course.duration) < 10);
    if (price === 'lessThan15') filteredCourses = filteredCourses.filter(course => course.prize < 15);
    if (price === 'greaterThan15') filteredCourses = filteredCourses.filter(course => course.prize > 15);
    if (rating === '1') filteredCourses = filteredCourses.filter(course => course.rating >= 1 && course.rating < 2 );
    if (rating === '2') filteredCourses = filteredCourses.filter(course => course.rating >= 2 && course.rating < 3 );
    if (rating === '3') filteredCourses = filteredCourses.filter(course => course.rating >= 3 && course.rating < 4 );
    if (rating === '4') filteredCourses = filteredCourses.filter(course => course.rating >= 4 && course.rating < 5 );
    if (rating === '5') filteredCourses = filteredCourses.filter(course => course.rating >= 5);

    onFilter(filteredCourses);
  };

  return (
    <div className='filters-box'>
    <div className='filters'>
      <div className='select-box'>
        <label className='select-title'>Categoría:</label>
        <select className='select-filters-courses' value={category} onChange={event => setCategory(event.target.value)}>
          <option value="">Todas</option>
          <option value="idiom">Idioma</option>
          <option value="programming">Programación</option>
        </select>
      </div>

      <div className='select-box'>
        <label className='select-title'>Tema:</label>
        <select className='select-filters-courses' value={theme} onChange={event => setTheme(event.target.value)}>
          <option value="">Todos</option>
          <option value="German">German</option>
          <option value="Italian">Italian</option>
          <option value="Japanese">Japanese</option>
          <option value="Korean">Korean</option>
          <option value="English">English</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="America">America</option>
          <option value="Backend">Backend</option>
          <option value="Frontend">Frontend</option>
          <option value="IA">IA</option>
          <option value="Machine Learning">Machine Learning</option>
          <option value="Python">Python</option>
          <option value="React">React</option>
          <option value="Typescript">Typescript</option>
          <option value="Javascript">Javascript</option>
          <option value="Nodejs">Nodejs</option>
        </select>
      </div>
      <div className='select-box'>
        <label className='select-title'>Duración:</label>
        <select className='select-filters-courses' value={duration} onChange={event => setDuration(event.target.value)}>
          <option value="">Todas</option>
          <option value="greaterThan10">Más de 10 minutos</option>
          <option value="lessThan10">Menos de 10 minutos</option>
        </select>
      </div>
      <div className='select-box'>
        <label className='select-title'>Precio:</label>
        <select className='select-filters-courses' value={price} onChange={event => setPrice(event.target.value)}>
          <option value="">Todos</option>
          <option value="lessThan15">Menor a $15</option>
          <option value="greaterThan15">Mayor a $15</option>
        </select>
      </div>
      <div className='select-box'>
        <label className='select-title'>Rating:</label>
        <select className='select-filters-courses' value={rating} onChange={event => setRating(event.target.value)}>
          <option value="">Todos</option>
          <option value="1">1 punto</option>
          <option value="2">2 puntos</option>
          <option value="3">3 puntos</option>
          <option value="4">4 puntos</option>
          <option value="5">5 puntos</option>
        </select>
      </div>
      <button className='filter-btn' onClick={handleFilter}>Filtrar</button>
    </div>
    </div>
  );
};

export default CourseFilter;