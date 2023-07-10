import React, { useState, useEffect, useRef } from "react";
import { validate } from "./validation";
import axios from "axios";

const CourseForm = () => {

// CONFIG PARA SUBIR FOTOS A CLOUDINARY

const cloudinaryRef = useRef();
const widgetRef = useRef();


const [selectedImage, setSelectedImage] = useState('')

useEffect(() => {
  cloudinaryRef.current = window.cloudinary;
  widgetRef.current = cloudinaryRef.current.createUploadWidget(
    {
      cloudName: "dal385dkc",
      uploadPreset: "q3fewzvu",
    },
    function (error, result) {
      if (result && result.event === "success") {
        const imageUrl = result.info.secure_url;
        setSelectedImage(imageUrl);
      }
    }
  );
}, []);

// ---------------

const [errors, setErrors] = useState({});

const [input, setInput] = useState({
  title: "",
  cathegory: "",
  theme: "",
  link: "",
  teacher: "",
  description: "",
  image: '',
});


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validate(input);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    await axios.post('https://talent-forge-data.cyclic.app/courses/', input);
      setInput({
        title: '',
        cathegory: '',
        theme: '',
        link: '',
        teacher: '',
        description: '',
        image: ''
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'theme') {
      const themeArray = value.split(',').map((item) => item.trim());
      setInput({ 
        ...input, 
        [name]: themeArray ,
        image: selectedImage
      });
    } else {
      setInput({ ...input, [name]: value });
    }

    setErrors({
      ...errors,
      [name]: validate({ ...input, [name]: value })[name],
    });
  };

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<label> Title: </label>
				<input
					type="text"
					name="title"
					value={input.title}
					onChange={handleChange}
				/>
				{errors.title && (
					<span style={{ color: "red" }}> {errors.title}</span>
				)}

				<br />
				<label> Category: </label>
				<select
					name="cathegory"
					value={input.cathegory}
					onChange={handleChange}
				>
					<option value="">Select a category</option>
					<option value="programming">Programming</option>
					<option value="languages">Languages</option>
				</select>
				{errors.cathegory && (
					<span style={{ color: "red" }}> {errors.cathegory}</span>
				)}

				<br />
				<label> Theme: </label>
				<input
					type="text"
					name="theme"
					value={input.theme}
					onChange={handleChange}
				/>
				{errors.theme && (
					<span style={{ color: "red" }}> {errors.theme}</span>
				)}

				<br />
				<label> Link: </label>
				<input
					type="text"
					name="link"
					value={input.link}
					onChange={handleChange}
				/>
				{errors.link && (
					<span style={{ color: "red" }}> {errors.link}</span>
				)}

				<br />
				<label> Teacher: </label>
				<input
					type="text"
					name="teacher"
					value={input.teacher}
					onChange={handleChange}
				/>
				{errors.teacher && (
					<span style={{ color: "red" }}> {errors.teacher}</span>
				)}

				<br />
				<label> Description: </label>
				<textarea
					name="description"
					value={input.description}
					onChange={handleChange}
				/>
				{errors.description && (
					<span style={{ color: "red" }}> {errors.description}</span>
				)}

				<br />
				<label> Image</label>
				{/* <input type="text" name="image" value={input.image} onChange={handleChange}/> */}
				<button type='button' name='image' onClick={() => widgetRef.current.open()}>Upload Image</button>
				{!selectedImage && (
					<span style={{ color: "red" }}> {errors.image}</span>
				)}

<br />
        <label> Rating: </label>
        <input type="number" name="rating" value={input.rating} onChange={handleChange}/>
        {errors.rating && <span style={{ color: 'red' }}> {errors.rating}</span>}

        <br />
        <label> Prize: </label>
        <input type="number" name="prize" value={input.prize} onChange={handleChange}/>
        {errors.prize && <span style={{ color: 'red' }}> {errors.prize}</span>}

        <br />
        <label> Duration: </label>
        <input type="text" name="duration" value={input.duration} onChange={handleChange}/>
        {errors.duration && <span style={{ color: 'red' }}> {errors.duration}</span>}
        
        <br />

        <br />
        <button type="submit" disabled={!input.title || !input.cathegory || !input.theme || !input.link || !input.teacher || !input.description ||
          !input.image
          }>Create Course</button>
      </form>
    </div>
  );
};

export default CourseForm;
