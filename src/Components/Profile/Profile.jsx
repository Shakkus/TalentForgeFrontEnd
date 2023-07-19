// COMPONENTES INTEGRADOS
import SideBar from "./Side-Bar/SideBar";
import NavBar from "./NavBar/NavBar";

// ESTILOS
import styles from "./Profile.module.css";
import { useAuth } from "../../context/authContext";
import profile from "../../Recourses/profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className={styles.mainContainer}>
      {/* < SideBar/> */}

      <div className={styles.block}>
        <NavBar />
      </div>
      {user ? (
        <div style={{ position: "relative" }}>
          <img
            src={user.photoURL}
            alt=""
            className="w-52 rounded-full"
            style={{ position: "relative", zIndex: "10" }}
          />
          <div
            className="bg-slate-900 w-14 h-14 text-white ml-32 -mt-12 flex items-center justify-center rounded-full"
            style={{ position: "absolute", zIndex: "20" }}>
            <NavLink to={`/profile/edit`}>
              <button className="border-none">
                <FontAwesomeIcon className="m-0 w-6 h-6" icon={faPenToSquare} />
              </button>
            </NavLink>
          </div>
        </div>
      ) : (
        <img src={profile} alt="" />
      )}
    </div>
  );
};

export default Profile;
