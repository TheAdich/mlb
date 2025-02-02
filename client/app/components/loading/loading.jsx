import React from "react";

const Loading= () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-700 text-lg font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
