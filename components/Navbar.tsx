import React from "react";
import { useState } from "react";

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="bg-white border-b-1 border-white  fixed w-full z-10 ">

        <div className="flex py-5 gap-10 items-center justify-center">
      


{/*date 
        <div className="text-black ml-44 tracking-wider">
          <strong>{new Date().toLocaleString()}</strong>
        </div>*/}


        
      </div>
    </header>
  );
}

export default Navbar;
