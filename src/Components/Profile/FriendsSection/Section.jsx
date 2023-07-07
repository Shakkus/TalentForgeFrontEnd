// IMAGENES DE PRUEBA
import testImg from '../../../Recourses/profile.png'

// ESTILOS
import styles from "./Section.module.css";

const Section = () => {
    const friends = [
      { name: "amigo 1", profilePicture: "si" },
      { name: "amigo 2", profilePicture: "si" },
      { name: "amigo 3", profilePicture: "si" },
      { name: "amigo 4", profilePicture: "si" },
      { name: "amigo 5", profilePicture: "si" },
      { name: "amigo 6", profilePicture: "si" }
    ];
  
    return (
      <div className={styles.mainContainer}>
        {friends.map((friend, index) => (
          <div key={index} className={styles.friendsTest}>
            <h3>{friend.name}</h3>
            <img src={testImg} alt="la foto :D" className={styles.testImg}/>
          </div>
        ))}
      </div>
    );
  };
  
  export default Section;
  
