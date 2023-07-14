export const validate = (input) => {
  let errors = {};
  if (!input.fullName || input.fullName.length === 0) {
      errors.fullName = "The name cannot be empty";
  }
  if (!input.fullName || input.fullName.length < 6) {
    errors.fullName = "The name must contain more than 6 letters";
  }
  if (!input.fullName || input.fullName.length > 45) {
    errors.fullName = "Name must contain less than 45 letters";
  }

  if (!input.username || input.username.length > 25) {
    errors.username = "Username must contain less than 25 letters";
  }
  if (!input.username || input.username.length < 5) {
    errors.username = "The username must contain more than 5 letters";
  }
  const regexUser = /^[a-zA-Z0-9_]*$/
  if (!regexUser.test(input.username)) {
    errors.username = "The username only allows numbers, letters and _";
  }

  const regexMail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/
  if (!regexMail.test(input.email)) {
    errors.email = "The email is invalid";
  }

  const countrys =  ["Argentina", "Chile", "Brasil", "Venezuela", "Bolivia", "Perú", "Colombia", "Ecuador", "México", "El Salvador", "Honduras", "España", "Panamá", "Cuba", "Costa Rica", "Uruguay", "Estados Unidos", "España", "Alemania", "Reino Unido", "Alemania", "Francia", "Italia", "Canadá", "Rusia"]
  if (!countrys.some(country => country.toLowerCase() === input.country.toLowerCase())) {
    errors.country = "The country is invalid for this platform";
  }

  const regexDate = /^\d{2}\/\d{2}\/\d{4}$/
  if (!regexDate.test(input.dateOfBirth)) {
    errors.dateOfBirth = "Date is invalid, the format is xx/xx/xxxx";
  }

  const regexPass = /^(?=.*[a-zA-Z])(?=.*[0-9]).+$/
  if (!regexPass.test(input.password)){
    errors.password = "Password must have at least one number";
  }

  if (input.confirmPass !== input.password){
    errors.confirmPass = "The passwords are not the same";
  }

  if (!input.accountType || input.accountType === '') {
    errors.accountType = "You need to select an account type";
  }

  return errors;
}
