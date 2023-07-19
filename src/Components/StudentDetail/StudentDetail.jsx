import React, { useState } from "react";
import "./StudentDetail.css";

const defaultProfileImage =
  "https://media.lacapital.com.ar/p/6887ba94829db49b2af29709653b4264/adjuntos/203/imagenes/030/516/0030516809/1200x675/smart/carpincho-bebejpg.jpg";

const StudentDetail = () => {
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const { user } = useAuth()
  const handleSubmit = (e) => {
    e.preventDefault();
    // Código para enviar la nueva publicación al servidor, incluyendo el contenido y la imagen si es necesario

    setNewPostContent("");
    setNewPostImage(null);
  };

  const student = {
    id: 1,
    name: "John Doe",
    friends: [
      {
        id: 1,
        name: "Jane Smith",
        profileImage: "",
      },
      {
        id: 2,
        name: "Michael Johnson",
        profileImage: "",
      },
      {
        id: 1,
        name: "Jane Smith",
        profileImage: "",
      },
      {
        id: 2,
        name: "Michael Johnson",
        profileImage: "",
      },
      {
        id: 1,
        name: "Jane Smith",
        profileImage: "",
      },
      {
        id: 2,
        name: "Michael Johnson",
        profileImage: "",
      },
      {
        id: 1,
        name: "Jane Smith",
        profileImage: defaultProfileImage,
      },
      {
        id: 2,
        name: "Michael Johnson",
        profileImage: defaultProfileImage,
      },
    ],
    posts: [
      {
        id: 1,
        author: {
          name: "John Doe",
          profileImage: defaultProfileImage,
        },
        title: "Post 1",
        content: "This is the first post",
        image: "https://res.cloudinary.com/dal385dkc/image/upload/v1689720441/TEST%20IMAGES/make-money-in-instagram_cdjr0w.webp",
      },
      {
        id: 2,
        author: {
          name: "John Doe",
          profileImage: defaultProfileImage,
        },
        title: "Post 2",
        content: "This is the second post",
        image: "https://res.cloudinary.com/dal385dkc/image/upload/v1689720441/TEST%20IMAGES/make-money-in-instagram_cdjr0w.webp",
      },
    ],
  };

  return (
    <div className="flex" id="student-container">
      <div className="w-1/3">
        <img
          src={student.profileImage || defaultProfileImage}
          alt="Foto de perfil"
          className="w-full rounded-full"
          id="student-photo"
        />
        <div className="mt-8">
          <Link to="/social/friends">
          <h2 className="text-2xl font-bold text-[#7c38cd]">Amigos</h2>
          </Link>
          <div className="flex flex-wrap mt-1">
            {student.friends &&
              student.friends.slice(0, 3).map((friend) => (
                <div key={friend.id} className="flex items-center p-2 mt-0">
                  <img
                    src={friend.profileImage}
                    alt={friend.name}
                    className="rounded-full h-10 w-10"
                  />
                  <h3 className="ml-3 text-lg font-semibold truncate">
                    {friend.name}
                  </h3>
                </div>
              ))}
          </div>
          <Link to="/social/inventory">
            <h2 className="text-2xl font-bold text-[#7c38cd]">Inventorys</h2>
          </Link>
        </div>
      </div>

      <div className="w-2/3 px-8" id="student-text">
        <div>
          <h2 className="text-2xl font-bold text-[#7c38cd]">Student</h2>
          <h3 className="text-lg font-semibold text-[#aa6fff]">
            {student.name}
          </h3>

          <div className="mt-4">
            <h2 className="text-2xl font-bold text-[#7c38cd]">
              Post publication
            </h2>
            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full h-20 mt-2 p-2 border border-gray-300 rounded"
                placeholder="Escribe tu publicación..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              ></textarea>
              <input
                type="file"
                className="mt-2"
                onChange={(e) => setNewPostImage(e.target.files[0])}
              />
              <button
                type="submit"
                className="bg-purple-500 text-white px-4 py-2 mt-2 rounded"
              >
                Post
              </button>
            </form>
          </div>

          <div className="mt-4">
            {student.posts &&
              student.posts.map((post) => (
                <div key={post.id} className="mt-4">
                  <div className="border-t border-gray-300 my-8"></div>
                  <div className="flex items-center">
                    <img
                      src={post.author.profileImage}
                      alt={post.author.name}
                      className="rounded-full h-10 w-10"
                    />
                    <h3 className="ml-3 text-lg font-semibold">
                      {post.author.name}
                    </h3>
                  </div>
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p>{post.content}</p>
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Imagen del post"
                      className="mt-2 rounded"
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
