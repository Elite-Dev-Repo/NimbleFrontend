import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
      <div className="w-30 h-30 rounded-full animate-spin border-[1.5em] border-dotted"></div>
      <p>Loading Please Wait...</p>
    </div>
  );
};

export default Loading;
