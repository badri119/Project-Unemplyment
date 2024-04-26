import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useCookies } from "react-cookie";
import "./Header.css";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const [cookies, removeCookie] = useCookies(["Token"]); // Update cookie name

  const Logout = async (event) => {
    try {
      event.preventDefault();
      console.log(cookies.Token);

      const response = await axios.get("/logout", {
        params: { token: cookies.Token },
      });

      if (response.data.error) {
        alert(response.data.error); // Set error message received from backend
      } else {
        removeCookie("Token"); // Remove the 'Token' cookie
        navigate("/login");
      }
    } catch (err) {
      // Handle unexpected errors
      console.error("Error during Logout:", err);
    }
  };

  const authenticated = [
    {
      id: 1,
      title: "Topics",
      to: "/topics",
    },
    {
      id: 2,
      title: "Github",
      to: "https://github.com/badri119/Project-Unemployment",
      target: "_blank",
    },
    {
      id: 3,
      title: "Why and future updates",
      to: "/why",
    },
    {
      id: 4,
      title: "Logout",
      to: "",
      click: Logout,
    },
  ];
  const unauthenticated = [
    {
      id: 1,
      title: "Topics",
      to: "/topics",
    },
    {
      id: 2,
      title: "Github",
      to: "https://github.com/badri119/Project-Unemployment",
      target: "_blank",
    },
    {
      id: 3,
      title: "Why and future updates",
      to: "/why",
    },
    {
      id: 4,
      title: "Login",
      to: "/login",
    },
  ];

  // Check if the 'Token' cookie exists
  const isAuthenticated = cookies.Token !== undefined;

  return (
    <div className="header-container">
      <ul className=" header-links">
        {isAuthenticated
          ? authenticated.map(({ id, title, to, target, click }) => (
              <li key={id} className="li-point ">
                <a
                  href={to}
                  target={target}
                  smooth={true}
                  duration={50}
                  className="a-link"
                  onClick={click}
                >
                  {title}
                </a>
              </li>
            ))
          : unauthenticated.map(({ id, title, to, target }) => (
              <li key={id} className="li-point ">
                <a
                  href={to}
                  target={target}
                  smooth={true}
                  duration={50}
                  className="a-link"
                >
                  {title}
                </a>
              </li>
            ))}
      </ul>
      <div onClick={() => setNav(!nav)} className="hamburger">
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>
      {nav && (
        <ul className="hamburger-ul">
          {isAuthenticated
            ? authenticated.map(({ id, title, to, target, click }) => (
                <li key={id} className="hamburger-li">
                  <a
                    click={click ? { click } : setNav(!nav)}
                    href={to}
                    target={target}
                    smooth={true}
                    duration={50}
                    className="hamburger"
                  >
                    {title}
                  </a>
                </li>
              ))
            : unauthenticated.map(({ id, title, to, target }) => (
                <li key={id} className="hamburger-li">
                  <a
                    href={to}
                    target={target}
                    smooth={true}
                    duration={50}
                    className="hamburger"
                  >
                    {title}
                  </a>
                </li>
              ))}
        </ul>
      )}
    </div>
  );
};

export default Header;
