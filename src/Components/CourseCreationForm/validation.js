function isValidUrl(url) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  }

export const validate = (input) => {
    let errors = {};
    if (!input.title || input.title.length < 4) {
        errors.title = "Title must be at least 4 characters long";
    }
    if (!input.cathegory) {
        errors.cathegory = "You must choose a category";
    }
    if (!input.theme || input.theme.length < 1) {
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
    if (!input.prize || input.prize > 30) {
        errors.prize = "The maximum price is 30";
    }
    if (!input.duration || input.duration.length > 8) {
        errors.duration = "Its too much time!";
    }
    return errors;
}