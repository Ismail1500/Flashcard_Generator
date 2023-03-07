// this file will dispalying the logo for our institute ( Almabetter  )

import React from "react";
import logo from "../assets/BrandLogo.png";

const Header = () => {
  return (
    <div className=" shadow-lg shadow-zinc-400 bg-white ">
      <img className=" pt-3 pb-2 ml-5 sm:w-auto " src={logo} alt="logo" />
    </div>
  );
};

export default Header;
