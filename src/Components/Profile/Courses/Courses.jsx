// IMAGENES DE PRUEBA
import testImg from '../../../Recourses/profile.png'

// ESTILOS
import styles from "./Courses.module.css";

const Courses = () => {
    const courses = [
      { name: "Javascript", profilePicture: "si" },
      { name: "Typescript", profilePicture: "si" },
      { name: "Python", profilePicture: "si" },
      { name: "Japones", profilePicture: "si" },
      { name: "Ingles", profilePicture: "si" },
      { name: "Frances", profilePicture: "si" },
      { name: "Angular", profilePicture: "si" },
      { name: "Transnistriniano", profilePicture: "si" },
      { name: "Python", profilePicture: "si" },
      { name: "Japones", profilePicture: "si" },
      { name: "Ingles", profilePicture: "si" },
      { name: "Ruso", profilePicture: "si" }
    ];
  
    return (
      <div className={styles.mainContainer}>
        {courses.map((friend, index) => (
          <div key={index} className={styles.coursesTest}>
            <h3>{friend.name}</h3>
            <img src='https://i.pinimg.com/originals/a2/e5/b2/a2e5b22e1a9926986c5f9444d71f703a.jpg' alt="la foto :D" className={styles.testImg}/>
          </div>
        ))}
      </div>
    );
  };
  
  export default Courses;