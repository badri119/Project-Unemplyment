import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [nav, setNav] = useState(false);

  const links = [
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
    {
      id: 5,
      title: "Signup",
      to: "/signup",
    },
  ];

  return (
    <div className="header-container">
      <ul className=" header-links">
        {links.map(({ id, title, to, target }) => (
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
          {links.map(({ id, title, to, target }) => (
            <li key={id} className="hamburger-li">
              <a
                onClick={() => setNav(!nav)}
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
