import React from "react";
import logo from "../../assets/logo.jpg";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from ".././../context/AuthProvider/AuthProvider";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userLogOut } = useContext(AuthContext);
  const handleLogOut = () => {
    userLogOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  return (
    <div className="shadow-lg h-20">
      <header aria-label="Site Header" className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <NavLink
                to="/"
                aria-label="Buy-Sell"
                title="Buy-Sell"
                className=" text-teal-600 inline-flex items-center"
              >
                <img className="w-24 " src={logo} alt="Buy-Sell" />
                <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                  Buy&Sell
                </span>
              </NavLink>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Site Nav">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <NavLink
                      to="/"
                      className="text-black text-xl transition hover:text-teal-600"
                    >
                      Home
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/blog"
                      className="text-black text-xl transition hover:text-teal-600"
                    >
                      Blog
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>

            {/* <div className="flex items-center gap-4"> */}
            <div className="md:flex hidden gap-5 items-center justify-center">
              <div className="hidden md:flex">
                <Link to="/">
                  {user?.photoURL ? (
                    <img
                      style={{ height: "30px", width: "30px" }}
                      className="rounded-full"
                      src={user?.photoURL}
                      alt=""
                      title={user?.displayName}
                    />
                  ) : (
                    <FaUser></FaUser>
                  )}
                </Link>
              </div>
              {user?.email ? (
                <>
                  <Link
                    onClick={handleLogOut}
                    className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                    aria-label="Log Out"
                    title="Log Out"
                  >
                    Log Out
                  </Link>
                  <div className="hidden md:flex">
                    <Link
                      className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                      to="/dashboard"
                    >
                      DashBoard
                    </Link>
                  </div>
                </>
              ) : (
                <Link
                  className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                  to="/login"
                >
                  Login
                </Link>
              )}
            </div>

            <div className="block md:hidden">
              <button
                className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                onClick={() => setIsMenuOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              {isMenuOpen && (
                <div className="absolute z-50 top-0 left-0 w-full">
                  <div className="p-5 bg-white border rounded shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <Link
                          to="/"
                          aria-label="Buy&Sell"
                          title="Buy&Sell"
                          className="inline-flex items-center"
                        >
                          <img className="w-14" src={logo} alt="Buy&Sell" />

                          <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                            Buy&Sell
                          </span>
                        </Link>
                      </div>
                      <div>
                        <button
                          aria-label="Close Menu"
                          title="Close Menu"
                          className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <svg
                            className="w-10 mr-4 text-black"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col ">
                      <NavLink
                        to="/"
                        className="font-medium tracking-wide nav-link transition-colors duration-200 hover:bg-teal-600 p-1 "
                      >
                        Home
                      </NavLink>

                      <NavLink
                        to="/blog"
                        className="font-medium tracking-wide nav-link transition-colors duration-200 hover:bg-teal-600 p-1 "
                      >
                        Blog
                      </NavLink>
                      {user?.uid ? (
                        <>
                          <NavLink
                            onClick={handleLogOut}
                            className="font-medium tracking-wide nav-link transition-colors duration-200 hover:bg-teal-600 p-1 "
                            aria-label="Log Out"
                            title="Log Out"
                          >
                            Log Out
                          </NavLink>
                          <NavLink
                            to="/dashboard"
                            className="font-medium tracking-wide nav-link transition-colors duration-200 hover:bg-teal-600 p-1 "
                          >
                            Dashboard
                          </NavLink>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            className="font-medium tracking-wide nav-link transition-colors duration-200 hover:bg-teal-600 p-1 "
                            aria-label="Log In"
                            title="Log In"
                          >
                            Log In
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* </div> */}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
