import React from "react";
import { useState } from "react";

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="bg-gray-200/70 fixed w-full">

        <div className="flex py-5 gap-10 items-center justify-center">
      


{/*date */}
        <div className="text-gray-600">
          <strong>{new Date().toLocaleString()}</strong>
        </div>


        
      </div>
    </header>
  );
}

export default Navbar;
