import React, { useState } from "react";
import { useAuth } from "../../../context/authContext";
import profile from "../../../Recourses/profile.png";
import "./EditProfile.css";

const Editprofile = () => {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    // Crear una URL temporal para previsualizar la imagen
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  console.log(user);

  return (
    <div className="flex justify-center items-center h-screen">
      {user ? (
        <div className="bg-slate-400 flex">
          <div className="">
            <div className="image-edit">
              <img
                src={previewImage ? previewImage : user.photoURL}
                alt=""
                className="rounded-full w-44 relative"
              />
              <input
                type="file"
                onChange={handleImageChange}
                className="relative"
              />
            </div>
            <form action="" className="border boder-black form-edit">
              <div className="pb-10 flex justify-end">
                <label htmlFor="" className="labeljajjajajaaj">
                  Nombre
                </label>
                <input
                  type="text"
                  className="input-edit"
                  value={user.displayName}
                />
              </div>
              <div className="pb-10 flex justify-end">
                <label htmlFor="">Email</label>
                <input type="text" className="input-edit" value={user.email} />
              </div>

              <button
                type="submit"
                className="bg-slate-700 text-white py-3 px-8 rounded-xl border-none">
                Listo ✅
              </button>
            </form>
          </div>
        </div>
      ) : (
        <img src={profile} alt="" />
      )}
    </div>
  );
};

export default Editprofile;
