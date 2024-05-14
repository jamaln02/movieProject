import React from "react";

const Footer = () => {
  return (
    <div className="p-2">
      <div className="text-center z-10 relative mt-5 mb-3">
        <h2 className="text-base">
          ©2023{" "}
          <span className="text-blue-600 font-bold text-xl">React Movies</span>,
          All Rights Reserved
        </h2>
        <div className="flex flex-wrap justify-center my-2">
          <h2 className="text-red-500 text-base font-semibold me-3">
            About Us
          </h2>
          <h2 className="text-red-500 text-base font-semibold me-3">
            Terms of Use
          </h2>
          <h2 className="text-red-500 text-base font-semibold">Privacy</h2>
        </div>
      </div>
    </div>
  );
};

export default Footer;
