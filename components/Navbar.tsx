import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <header className="bg-white border-b-1 border-white  fixed w-full z-10 ">
      <div className="flex py-3 items-end justify-end">
        {user ? (
         <div className="h-14 w-14 mr-14 bg-orange-600 text-white flex items-center justify-center rounded-full">
         {/* Extract the first letter from user.name and capitalize it */}
         <span className="text-xl font-semibold">{user.name.charAt(0).toUpperCase()}</span>
       </div>
        ) : (
          <p className="font-semibold">Please login first</p>
        )}
      </div>
    </header>
  );
}

export default Navbar;
