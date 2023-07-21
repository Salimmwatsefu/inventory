import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <header className="bg-white border-b-1 border-white  fixed w-full z-10 ">
      <div className="flex py-5 gap-10 items-center justify-center">
        {user ? (
          <p className=" lg:ml-20">Welcome back  <span className=" text-orange-600 font-semibold">{user.name}</span></p>
        ) : (
          <p>Please login first</p>
        )}
      </div>
    </header>
  );
}

export default Navbar;
