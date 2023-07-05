import React from "react";
import { NavLink } from "react-router-dom";
import logo1 from "./imgs/image 66.png";
const DetailCourses = () => {
  return (
    <div>
      <h1>pitón</h1> <img src="image 66.png" alt="" />
      {/* <img src="image 66.png" alt="" /> */}
      <div className="description">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quidem
          veniam facilis, beatae corporis cum magnam nulla nesciunt perferendis
          nam dicta quaerat asperiores ratione praesentium sed labore non,
          libero itaque doloribus. Laboriosam animi officia architecto mollitia
          tempora culpa quidem unde molestiae a voluptatem eveniet harum
          reprehenderit modi velit ad corrupti minima laborum, soluta accusamus
          voluptatibus quam temporibus odit iste ratione! Cupiditate quis unde
          adipisci labore laborum libero, ratione animi officia nobis fuga
          corrupti delectus id accusamus nostrum. Facilis sint similique aliquam
          maiores dolorum nemo nobis excepturi aspernatur ipsam veritatis vero
          temporibus doloremque nostrum eos id, nisi tempora! Libero, asperiores
          est.
        </p>
      </div>
      <div className="description">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
          quidem illum velit incidunt placeat vero laborum necessitatibus hic
          fugiat nam.
        </p>
      </div>
      <div className="companies">
        <img src={logo1} alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
      </div>
      <div className="videoDescription">
        <img src="" alt="" />
      </div>
      <div className="toCourse">
        <NavLink>
          <button>Comenzar con el primer video</button>
        </NavLink>
        <div className="nameProfessor">
          <p>Lorem, ipsum dolor.</p>
        </div>
      </div>
    </div>
  );
};

export default DetailCourses;
