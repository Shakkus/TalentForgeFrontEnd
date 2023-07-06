import { useEffect, useState } from "react";
import "./Register.css";
import { useForm } from "react-hook-form";

const Form = () => {
  const [days, setDays] = useState([]);
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  const countrys = [
    "Argentina  🇦🇷",
    "Chile 🇨🇱",
    "Brasil 🇧🇷",
    "Venezuela 🇻🇪",
    "Bolivia 🇧🇴",
    "Perú 🇵🇪",
    "Colombia 🇨🇴",
    "Ecuador 🇪🇨",
    "México 🇲🇽",
    "El Salvador 🇸🇻",
    "Honduras 🇭🇳",
    "España 🇪🇸",
    "Panamá 🇵🇦",
    "Cuba 🇨🇺",
    "Costa Rica 🇨🇷",
    "Uruguay 🇺🇾",
  ];

  const daysInMonth = {
    Enero: 31,
    Febrero: 28,
    Marzo: 31,
    Abril: 30,
    Mayo: 31,
    Junio: 30,
    Julio: 31,
    Agosto: 31,
    Septiembre: 30,
    Octubre: 31,
    Noviembre: 30,
    Diciembre: 31,
  };

  useEffect(() => {
    const monthsArray = Object.keys(daysInMonth);
    setMonths(monthsArray);

    const currentYear = new Date().getFullYear();
    const yearsArray = Array.from(
      { length: currentYear - 1900 + 1 },
      (_, index) => currentYear - index
    );
    setYears(yearsArray);

    const currentMonth = monthsArray[new Date().getMonth()];
    generateDays(currentMonth); // Agregar esta línea para establecer los días correspondientes al mes actual
  }, []);

  const generateDays = (selectedMonth) => {
    const daysCount = daysInMonth[selectedMonth];
    const daysArray = Array.from(
      { length: daysCount },
      (_, index) => index + 1
    );
    setDays(daysArray);
  };

  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    generateDays(selectedMonth);
  };

  const onSubmit = (data) => {
    const { Password, Confirmpassword } = data;
    if (Password !== Confirmpassword) {
      return; // No se envía el formulario si la confirmación no coincide
    }
    console.log(data);
  };

  return (
    <div className="form">
      <h1 className="formTitle">Account Registration</h1>
      <div className="continueWith">
        <div className="continueWithGoogle">
          <p>Continue with</p>
          <img src="image 109.png" alt="" />
        </div>

        <div className="continueWithGmail">
          <p>Continue with</p>
          <img src="image 87.png" alt="" />
        </div>

        <div className="continueWithTwitter">
          <p>Continue with</p>
          <img src="image 88.png" alt="" />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formContainer">
          <div className="inputNameLastname">
            <label htmlFor="">Name & lastname</label>
            <input
              className="inputText"
              type="text"
              {...register("nameLastname", {
                required: true,
                maxLength: 40,
                minLength: 8,
              })}
            />
            {errors.nameLastname?.type === "required" && (
              <p>Este campo es requerido</p>
            )}
            {errors.nameLastname?.type === "maxLength" && (
              <p>El nombre y apellido no puede tener mas de 40 caracteres</p>
            )}
            {errors.nameLastname?.type === "minLength" && (
              <p>El nombre y apellido no puede tener menos de 8 caracteres</p>
            )}
          </div>
          <div className="inputEmail">
            <label htmlFor="">Email</label>
            <input
              className="inputText"
              type="text"
              {...register("email", {
                required: true,
                maxLength: 35,
                minLength: 10,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
              })}
            />
            {errors.email?.type === "required" && (
              <p>Este campo es requerido</p>
            )}
            {errors.email?.type === "maxLength" && (
              <p>El email no debe tener menos de 35 caracteres</p>
            )}
            {errors.email?.type === "minLength" && (
              <p>El email debe tener mas de 10 caracteres</p>
            )}
            {errors.email?.type === "pattern" && (
              <p>El formato del email no es válido</p>
            )}
          </div>
          <div className="inputCountry">
            <label htmlFor="">Country</label>
            <select
              name=""
              className="inputSelect"
              {...register("Country", {
                required: true,
              })}
            >
              {countrys.map((country) => (
                <option className="optionCountry" value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <label htmlFor="">Date of birth</label> <br />
          <div className="inputDateOfBorn">
            <div>
              <label className="inputDateOfBornLabel" htmlFor="month">
                Month
              </label>
              <select
                className="inputSelect"
                name="month"
                id="month"
                onChange={handleMonthChange}
                {...register("Date of birth month", {
                  required: true,
                })}
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              {errors.month?.type === "required" && <p>El mes es requerido</p>}
            </div>
            <div>
              <label className="inputDateOfBornLabel" htmlFor="day">
                Day
              </label>
              <select
                name="day"
                id="day"
                className="inputSelect"
                {...register("Date of birth day", {
                  required: true,
                })}
              >
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              {errors.day?.type === "required" && <p>El día es requerido</p>}
            </div>

            <div>
              <label className="inputDateOfBornLabel" htmlFor="year">
                Year
              </label>
              <select
                className="inputSelect"
                name="year"
                id="year"
                {...register("Date of birth year", {
                  required: true,
                })}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              {errors.year?.type === "required" && <p>El año es requerido</p>}
            </div>
          </div>
          <div className="inputPassword">
            <label htmlFor="">Password</label>
            <input
              className="inputText"
              type="password"
              {...register("Password", {
                required: true,
                maxLength: 20,
                minLength: 5,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,20}$/,
              })}
            />
            {errors.Password?.type === "required" && (
              <p>Este campo es requerido</p>
            )}
            {errors.Password?.type === "maxLength" && (
              <p>La contraseña debe tener menos de 20 caracteres</p>
            )}
            {errors.Password?.type === "minLength" && (
              <p>La contraseña debe tener mas de 5 caracteres</p>
            )}
            {errors.Password?.type === "pattern" && (
              <p>
                Debe contener al menos una mayúscula, una minúscula y un número
              </p>
            )}
          </div>
          <div className="inputConfirmPassword">
            <label htmlFor="">Confirm Password</label>
            <input
              className="inputText"
              type="password"
              {...register("Confirmpassword", {
                required: true,
              })}
            />
            {errors.Confirmpassword?.type === "required" && (
              <p>Este campo es requerido</p>
            )}
            {getValues("Password") !== getValues("Confirmpassword") && (
              <p>La confirmación de contraseña no coincide</p>
            )}
          </div>
          <div>
            <input type="submit" value="Submit" className="buttonSubmit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
