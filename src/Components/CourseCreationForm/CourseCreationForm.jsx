import React, { useState, useEffect, useRef } from "react";
import { validate } from "./validation";
import axios from "axios";
import './CourseCreation.css'

const CourseForm = () => {

// CONFIG PARA SUBIR FOTOS A CLOUDINARY

const cloudinaryRef = useRef();
const widgetRef = useRef();


const [selectedImage, setSelectedImage] = useState('')


// ---------------

const [errors, setErrors] = useState({});

const [input, setInput] = useState({
	title: "",
	cathegory: "",
	theme: "",
	link: "",
	teacher: "",
	description: "",
	image: "",
	prize: "",
	duration: "",
	rating: "",
});

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

const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validate(input);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const inputData = {
      ...input,
      image: selectedImage 
    };

    await axios.post('https://talent-forge-data.cyclic.app/courses/', inputData);
    setInput({
      title: '',
      cathegory: '',
      theme: '',
      link: '',
      teacher: '',
      description: '',
      prize: '',
      duration: '',
      rating: '',
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
		<div className="course-form-container">
			<form onSubmit={handleSubmit}>
				<div>
					<div className="input-boxes">
						<div className="input-box">				
							<label className="label-creation-course"> Title: </label>
							<input className="input-course-form" type="text" name="title" value={input.title} onChange={handleChange} />
							{errors.title && (<span style={{ color: "red" }}> {errors.title}</span>)}
						</div>

						<div className="input-box">
							<label className="label-creation-course"> Description: </label>
							<input className="input-course-form" name="description" value={input.description} onChange={handleChange} />
							{errors.description && ( <span style={{ color: "red" }}> {errors.description}</span> )}
						</div>

					</div>

					<div className="input-boxes">
						<div className="input-box">
							<label className="label-creation-course"> Category: </label>
							<select className="select-course-form" name="cathegory" value={input.cathegory} onChange={handleChange}>
								<option value="">Select a category</option>
								<option value="programming">Programming</option>
								<option value="languages">Languages</option>
							</select>
							{errors.cathegory && (<span style={{ color: "red" }}> {errors.cathegory}</span>)}
						</div>

						<div className="input-box">
							<label className="label-creation-course"> Theme: </label>
							<input className="input-course-form" type="text" name="theme" value={input.theme} onChange={handleChange} />
							{errors.theme && (<span style={{ color: "red" }}> {errors.theme}</span>)}
						</div>
					</div>

					<div className="input-boxes">
						<div className="input-box">
							<label className="label-creation-course"> Teacher: </label>
							<input className="input-course-form" type="text" name="teacher" value={input.teacher} onChange={handleChange} />
							{errors.teacher && ( <span style={{ color: "red" }}> {errors.teacher}</span> )}
						</div>
					</div>

					<div className="input-boxes">
						<div className="input-box">
							<label className="label-creation-course"> Link: </label>
							<input className="input-course-form" type="text" name="link" value={input.link} onChange={handleChange}/>
							{errors.link && (<span style={{ color: "red" }}> {errors.link}</span>)}
						</div>
					</div>

					<div className="input-boxes">
						
						<div className="input-box">
							<label className="label-creation-course"> Image</label>
							<button className="input-course-form form-image" type='button' name='image' onClick={() => widgetRef.current.open()}>Upload Image</button>
							{!selectedImage && (<span style={{ color: "red" }}> {errors.image}</span>)}
							{selectedImage && <img src={selectedImage} alt="" className="img-upload"/>} 
						</div>
					</div>

					<div className="input-boxes sixth-input-box">
						<div className="input-box">
							<label className="label-creation-course"> Rating: </label>
							<input className="input-course-form sixth-inputs" type="number" name="rating" value={input.rating} onChange={handleChange}/>
							{errors.rating && <span style={{ color: 'red' }}> {errors.rating}</span>}
						</div>

						<div className="input-box">
							<label className="label-creation-course"> Price: </label>
							<input className="input-course-form sixth-inputs" type="number" name="prize" value={input.prize} onChange={handleChange}/>
							{errors.prize && <span style={{ color: 'red' }}> {errors.prize}</span>}
						</div>

						<div className="input-box">
							<label className="label-creation-course"> Duration: </label>
							<input className="input-course-form sixth-inputs" type="text" name="duration" value={input.duration} onChange={handleChange}/>
							{errors.duration && <span style={{ color: 'red' }}> {errors.duration}</span>}
						</div>
					</div>
				</div>

				<div btn-box>
					<button type="submit" className="btn-course" disabled={!input.title || !input.cathegory || !input.theme || !input.link || !input.teacher || !input.description || !input.rating || !input.prize || !input.duration }> Create Course </button>
				</div>

      	</form>
    </div>
  );
};

export default CourseForm;
