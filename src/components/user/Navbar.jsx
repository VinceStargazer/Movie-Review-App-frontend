import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { HiOutlineLightBulb } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useTheme } from "../../hooks";
import Container from "../Container";
import DropDownLinks from "./DropDownLinks";

const btnClass = "p-1 rounded text-zinc text-lg hover:text-white hover:bg-tertiary transition ";

const dropDownOptions = [
  { title: "Your watchlist", to: "/user/watchlist" },
  { title: "Your ratings", to: "/user/watched" },
  { title: "Account settings", to: "" },
];

export default function Navbar() {
  const { toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;

  const [searchContent, setSearchContent] = useState("");
  const [focused, setFocused] = useState(false);

  const handleInputChange = ({ target }) => {
    setSearchContent(target?.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchContent.length) {
      navigate("/user/search?query=" + searchContent);
      setSearchContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-secondary">
      <Container className="p-2">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img src="./logo.png" alt="" className="h-10" />
          </Link>
          <ul className="flex items-center space-x-4">
            <li>
              <button
                type="button"
                onClick={toggleTheme}
                className="dark:bg-zinc bg-dark-subtle p-1 rounded"
              >
                <HiOutlineLightBulb className="text-secondary" size={24} />
              </button>
            </li>
            <li className="relative flex items-center">
              <input
                type="text"
                value={searchContent}
                onChange={handleInputChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="w-[24rem] border-2 border-dark-subtle p-1 rounded bg-transparent text-xl outline-none focus:border-zinc transition text-zinc hover:border-zinc"
                placeholder="Search"
              />
              <button
                type="submit"
                className={"absolute right-3 transition " + (focused ? "text-zinc" : "text-dark-subtle")}
              >
                <BsSearch size={20} />
              </button>
            </li>
            {isLoggedIn ? (
              <div className="flex space-x-4">
                <DropDownLinks options={dropDownOptions} />
                <button
                  type="button"
                  onClick={handleLogout}
                  className={btnClass + " font-semibold"}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/auth/login">
                <button type="button" className={btnClass + " font-semibold"}>Login</button>
              </Link>
            )}
          </ul>
        </div>
      </Container>
    </form>
  );
}
