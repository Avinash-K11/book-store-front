import { Link } from "react-router-dom";
import { FaRegChartBar } from "react-icons/fa6";
import { FaOpencart, FaUserCircle } from "react-icons/fa";
import { CiHeart, CiSearch } from "react-icons/ci";

import avatar from "../assets/avatar.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Orders",
    href: "/orders",
  },
  {
    name: "Cart",
    href: "/cart",
  },
  {
    name: "Checkout",
    href: "/checkout",
  },
];

const Navbar = () => {
  const { currentUser, logoutUser } = useAuth();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleLogOut = async () => {
    logoutUser();
  };

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between items-center ">
        {/* left side */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <FaRegChartBar className="size-6" />
          </Link>
          <div className="relative sm:w-72 w-40 space-x-2">
            <CiSearch className="absolute inline-block left-3 inset-y-2" />
            <input
              type="text"
              placeholder="Search here..."
              className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* right side */}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatar}
                    alt="avatat image"
                    className={`size-7 rounded-full ${
                      currentUser ? "ring-2 ring-blue-500" : ""
                    }`}
                  />
                </button>
                {/* dropdown function */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            onClick={() => setIsDropdownOpen(false)}
                            className="block px-4 py-2 text-sm hover:bg-gray-400"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-400"
                          onClick={handleLogOut}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <FaUserCircle className="size-6" />
              </Link>
            )}
          </div>
          <button className="hidden sm:block">
            <CiHeart className="size-6" />
          </button>
          <Link
            to="/cart"
            className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-md"
          >
            <FaOpencart className="size-6" />
            <span className="text-sm font-semibold sm:ml-1">
              {cartItems.length > 0 ? cartItems.length : 0}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
