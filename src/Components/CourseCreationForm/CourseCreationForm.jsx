import React, { useEffect, useState } from "react";

function validate(input) {
  let errors = {};
  if (!input.title || input.title.length < 4) {
    errors.title = "Title must be at least 4 characters long";
  }
  if (!input.category) {
    errors.category = "You must choose a category";
  }
  if (!input.theme || input.theme.length < 3) {
    errors.theme = "Theme must be at least 3 characters long";
  }
  if (!input.link || !isValidUrl(input.link)) {
    errors.link = "Please enter a valid video link";
  }
  if (!input.teacher || input.teacher.length < 4) {
    errors.teacher = "Teacher name must be at least 4 characters long";
  }
  if (!input.description || input.description.length < 10) {
    errors.description = "Description must be at least 10 characters long";
  }
  return errors;
}

function isValidUrl(url) {
  // Regular expression to validate URL format
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
}

export default function CourseForm() {
  const [input, setInput] = useState({
    title: "",
    category: "",
    theme: "",
    link: "",
    teacher: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [hasEmptyFields, setHasEmptyFields] = useState(false); // New state

  useEffect(() => {
    setHasEmptyFields(
      !input.title ||
        !input.category ||
        !input.theme ||
        !input.link ||
        !input.teacher ||
        !input.description
    );
  }, [input]);

  function handleChange(event) {
    const { name, value } = event.target;

    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validate({ ...input, [name]: value })[name],
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formErrors = validate(input);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (hasEmptyFields) {
      alert("Error: All fields must be filled out");
      return;
    }

    // Submit the form or dispatch an action to save the data
    // ...
    alert("Form submitted successfully");
    setInput({
      title: "",
      category: "",
      theme: "",
      link: "",
      teacher: "",
      description: "",
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Course Form</h3>
        <div>
          <label>Title of the course</label>
          <input
            type="text"
            placeholder="Enter the course title"
            name="title"
            value={input.title}
            onChange={handleChange}
          />
          {errors.title && errors.title === errors["title"] && <p>{errors.title}</p>}
        </div>
        <div>
          <label>Category</label>
          <select name="category" value={input.category} onChange={handleChange}>
            <option value="">Select a category</option>
            <option value="programming">Programming</option>
            <option value="languages">Languages</option>
          </select>
          {errors.category && errors.category === errors["category"] && (
            <p>{errors.category}</p>
          )}
        </div>
        <div>
          <label>Theme</label>
          <input
            type="text"
            placeholder="Enter the course theme"
            name="theme"
            value={input.theme}
            onChange={handleChange}
          />
          {errors.theme && errors.theme === errors["theme"] && <p>{errors.theme}</p>}
        </div>
        <div>
          <label>Video Link</label>
          <input
            type="text"
            placeholder="Enter a valid video link"
            name="link"
            value={input.link}
            onChange={handleChange}
          />
          {errors.link && errors.link === errors["link"] && <p>{errors.link}</p>}
        </div>
        <div>
          <label>Teacher</label>
          <input
            type="text"
            placeholder="Enter the teacher's name"
            name="teacher"
            value={input.teacher}
            onChange={handleChange}
          />
          {errors.teacher && errors.teacher === errors["teacher"] && <p>{errors.teacher}</p>}
        </div>
        <div>
          <label>Description</label>
          <textarea
            placeholder="Enter a description (at least 10 characters)"
            name="description"
            value={input.description}
            onChange={handleChange}
          />
          {errors.description && errors.description === errors["description"] && (
            <p>{errors.description}</p>
          )}
        </div>
        <div>
          <button type="submit" disabled={hasEmptyFields}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
