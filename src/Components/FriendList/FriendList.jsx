import React, { useState } from "react";
import "./FriendList.css"

const FriendList = () => {
  const [activeFriend, setActiveFriend] = useState(null);

  const friends = [
    {
      id: 1,
      name: "Jane Smith",
      profileImage: "https://pbs.twimg.com/media/FQqPmHhXsAgbkMf.jpg",
    },
    {
      id: 2,
      name: "Michael Johnson",
      profileImage: "https://pbs.twimg.com/media/FQqPmHhXsAgbkMf.jpg",
    },
    {
      id: 3,
      name: "Emily Davis",
      profileImage: "https://pbs.twimg.com/media/FQqPmHhXsAgbkMf.jpg",
    },
    {
      id: 4,
      name: "David Lee",
      profileImage: "https://pbs.twimg.com/media/FQqPmHhXsAgbkMf.jpg",
    },
  ];

  const handleActionsClick = (friendId) => {
    setActiveFriend(friendId);
  };
  return (
    <div id="container">
      <h2 className="text-2xl font-bold text-[#7c38cd]">Amigos</h2>
      <div className="m-auto grid grid-cols-2 gap-4 mt-4">
        {friends &&
          friends.slice(0, 4).map((friend) => (
            <div
              key={friend.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <img
                  src={friend.profileImage}
                  alt={friend.name}
                  className="rounded h-20 w-20"
                />
                <h3 className="ml-3 text-lg font-semibold truncate">
                  {friend.name}
                </h3>
              </div>
              {/* Colocar la imagen a 200px de distancia de las opciones */}
              <div className="space-x-4">
                {activeFriend === friend.id ? (
                  <div>
                    <button
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                      onClick={() => setActiveFriend(null)}
                    >
                      Ver perfil
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-r"
                      onClick={() => {
                        // Lógica para eliminar al amigo
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                ) : (
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                    onClick={() => handleActionsClick(friend.id)}
                  >
                    Acciones
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FriendList;