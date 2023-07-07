// COMPONENTES INTEGRADOS
import SideBar from "./Side-Bar/SideBar";
import NavBar from "./NavBar/NavBar";


// ESTILOS
import styles from "./Profile.module.css";

const Profile = () => {
	return (
		<div className={styles.mainContainer}>
            {/* < SideBar/> */}
            <div className={styles.block}>
            < NavBar/>
            </div>
		</div>
	);
};

export default Profile;
