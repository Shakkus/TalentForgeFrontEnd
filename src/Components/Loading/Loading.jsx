import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-20 h-20 bg-purple-700 rounded-full flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-white rounded-full ml-2 animate-bounce200"></div>
        <div className="w-4 h-4 bg-white rounded-full ml-2 animate-bounce400"></div>
      </div>
    </div>
  );
};

export default Loading;
