import { React, useState } from "react";
import { MdClose } from "react-icons/md";

const NavBar = () => {
  const [menu, setMenu] = useState(false);

  return (
    <section className="navigation-bar md:px-9 lg:px-9 xl:px-16">
      <nav className="">
        <div className="mx-auto px-4 md:py-3 lg:py-5">
          <div className="flex justify-between">
            <div>
              {/* Website Logo */}
              <a href="#" className="flex items-center py-4 px-2">
                <h1 className='text-white font-bold text-4xl'>Note Keeper</h1>
              </a>
            </div>
            <div className="flex space-x-7">
              {/* Secondary Navbar items */}
              <div className="hidden lg:flex items-center ml-14">
                <a href="" className="py-2 px-2 text-2xl text-white login-btn">
                  Login
                </a>
              </div>
            </div>
            {/* Mobile menu button  */}
            <div
              className="lg:hidden flex items-center"
              onClick={() => setMenu(true)}
            >
              <button className="outline-none mobile-menu-button">
                <svg
                  className=" w-6 h-6 text-gray-500 hover:text-green-500 "
                  x-show="!showMenu"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
            {/* Mobile Menu */}
            <div
              className={
                menu
                  ? "flex justify-center items-center mobile-menu mobile-popup"
                  : "hidden"
              }
            >
              <div className="close-btn" onClick={() => setMenu(false)}><MdClose /></div>
              <div >
                <div className="primary-link">
                  <a
                    href="#"
                    className="block text-xl px-2 py-4 text-white text-center"
                  >
                    Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default NavBar;