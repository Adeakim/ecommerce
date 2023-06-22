import React, { useState } from "react";
import logo from "../assest/logo.png";
import { Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(userData);
  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
    // if (window.innerWidth > 768) {
    //     return;
    //     } else{
    //         console.log("clicked");
    //         setShowMenu(!showMenu);
    //         };
  };
  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("logout successfully");
  };
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      {/* desktop */}

      <div className="flex items-center h-full justify-between">
        <Link to={"/"}>
          <div className="h-10">
            <img src={logo} alt="logo" className="h-full" />
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-7">
          <nav className="flex gap-4 md:gap-6 text-base md:text-lg">
            <Link to={""}>Home</Link>
            <Link to={"menu"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl text-slate-600 relative">
            <BsCartFill />
            <div className="absolute -top-1 -right-2 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
              0
            </div>
          </div>
          <div className=" text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-7, h-7 rounded-full overflow-hidden drop-shadow">
              {userData.user.image ? (
                <img
                  src={userData.user.image}
                  alt="dp"
                  className="w-full h-full"
                />
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>

            {showMenu && (
              <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col ">
                {userData.user.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to={"new-product"}
                    className="whitespace-nowrap cursor-pointer"
                  >
                    New product
                  </Link>
                )}

                {userData.user.image ? (
                  <p
                    className="cursor-pointer text-while px-2 bg-red-500"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer "
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
    </header>
  );
};

export default Header;
